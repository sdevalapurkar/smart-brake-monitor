import React, {Component} from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CarRow from '../components/CarRow';
import AddVehicleModal from '../components/AddVehicleModal';
import axios from 'axios';

const host = 'http://localhost';
const port = 3001;

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            name: '',
            email: '',
            newName: '',
            newEmail: '',
            succeededProfileUpdate: false,
            failedProfileUpdate: false,
            oldPasswordInput: '',
            newPasswordInput: '',
            succeededPasswordUpdate: false,
            failedPasswordUpdate: false,
            showAddVehicleModal: false,
            vehiclesOwned: [],
        };
    }

    componentDidMount = () => {
        const authToken = window.localStorage.getItem('auth_token');

        if (authToken) {
            axios.post(`${host}:${port}/authstatus`, { headers: { 'Authorization' : `Bearer ${authToken}` } }).then(res => {
                if (res.status === 200) {
                    const { name, email, vehiclesOwned } = res.data.authData;
                    this.setState({
                        isAuthenticated: true,
                        name,
                        email,
                        newName: name,
                        newEmail: email,
                        vehiclesOwned,
                    });
                }
            }).catch(err => {});
        }
    }

    updateProfile = () => {
        const { email, newName, newEmail, name } = this.state;

        if (!newName || !newEmail) {
            this.setState({ failedProfileUpdate: true });
            return false;
        }

        if (newName === name && newEmail === email) {
            this.setState({ failedProfileUpdate: true });
            return false;
        }

        axios.post(`${host}:${port}/updateProfile`, {
            oldEmail: email,
            newName,
            newEmail,
        })
        .then(response => {
            const { newName, newEmail, token } = response.data;
            window.localStorage.setItem('auth_token', token);
            this.setState({ name: newName, email: newEmail, newName, newEmail, succeededProfileUpdate: true });
        })
        .catch(error => {
            this.setState({ failedProfileUpdate: true });
        });
    }

    updatePassword = () => {
        const { email, oldPassword, newPassword } = this.state;

        if (!oldPassword || !newPassword || oldPassword === newPassword) {
            this.setState({ failedPasswordUpdate: true });
            return false;
        }

        axios.post(`${host}:${port}/updatePassword`, {
            email,
            oldPassword,
            newPassword,
        })
        .then(response => {
            this.setState({ succeededPasswordUpdate: true });
        })
        .catch(error => {
            this.setState({ failedPasswordUpdate: true });
        });
    }

    createCarRow = () => {
        const { vehiclesOwned, email, name } = this.state;
        let myVehicles = [];

        if (!vehiclesOwned) {
            return myVehicles;
        }

        for (let i = 0; i < vehiclesOwned.length; i++) {
            myVehicles.push(
                <CarRow
                    userName={name}
                    name={vehiclesOwned[i].name}
                    weight={vehiclesOwned[i].weight}
                    arduinoID={vehiclesOwned[i].id}
                    tireSpecs={vehiclesOwned[i].tireSpecs}
                    vehiclesOwned={vehiclesOwned}
                    email={email}
                />
            );
        }

        return myVehicles;
    }

    render() {
        const {
            isAuthenticated,
            name,
            newName,
            newEmail,
            succeededProfileUpdate,
            failedProfileUpdate,
            succeededPasswordUpdate,
            failedPasswordUpdate,
            showAddVehicleModal,
            email,
            vehiclesOwned
        } = this.state;

        let closeAddVehicleModal = () => {
            this.setState({ showAddVehicleModal: false });
            location.reload();
        }

        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                />
                <NavbarBootstrap
                    isAuthenticated={isAuthenticated}
                    name={name}
                />
                <Container className="my-3">
                    <Row>
                        { /* Left nav */ }
                        <Col md={2}>
                            <Nav defaultActiveKey="/home" className="flex-column">
                                <Nav.Link href="#profile">Profile</Nav.Link>
                                <Nav.Link href="#password">Password</Nav.Link>
                                <Nav.Link href="#manage-vehicles">Manage Vehicles</Nav.Link>
                            </Nav>
                        </Col>

                        { /* Main column */ }
                        <Col>
                            <Card className="mb-3">
                                <Card.Header id="profile">
                                    <b>Profile</b>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="nameProfileInput">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                name="nameProfileInput"
                                                type="text"
                                                placeholder="John Smith"
                                                value={newName}
                                                onChange={evt => this.setState({ newName: evt.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="emailProfileInput">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                name="emailProfileInput"
                                                type="text"
                                                placeholder="john.smith@mail.me"
                                                value={newEmail}
                                                onChange={evt => this.setState({ newEmail: evt.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        {failedProfileUpdate && (
                                            <p style={{ color: 'red', textAlign: 'center', display: 'block' }}>
                                                Could not update profile. Please try again.
                                            </p>
                                        )}
                                        {succeededProfileUpdate && (
                                            <p style={{ color: 'green', textAlign: 'center', display: 'block' }}>
                                                Profile updated successfully.
                                            </p>
                                        )}
                                        <Row className="justify-content-center">
                                            <Button variant="outline-success" onClick={() => this.updateProfile()}>
                                                Update Profile
                                            </Button>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>

                            <Card className="mb-3">
                                <Card.Header id="password">
                                    <b>Password</b>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="oldPasswordInput">
                                            <Form.Label>Old password</Form.Label>
                                            <Form.Control
                                                name="oldPasswordInput"
                                                type="password"
                                                onChange={evt => this.setState({ oldPassword: evt.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="newPasswordInput">
                                            <Form.Label>New password</Form.Label>
                                            <Form.Control
                                                name="newPasswordInput"
                                                type="password"
                                                onChange={evt => this.setState({ newPassword: evt.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        {succeededPasswordUpdate && (
                                            <p style={{ color: 'green', textAlign: 'center', display: 'block' }}>
                                                Password updated successfully.
                                            </p>
                                        )}
                                        {failedPasswordUpdate && (
                                            <p style={{ color: 'red', textAlign: 'center', display: 'block' }}>
                                                Could not update password. Please try again.
                                            </p>
                                        )}
                                        <Row className="justify-content-center">
                                            <Button variant="outline-success" onClick={() => this.updatePassword()}>
                                                Change Password
                                            </Button>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>

                            <Card className="mb-3">
                                <Card.Header id="manage-vehicles">
                                    <b>Manage Vehicles</b>
                                </Card.Header>
                                <Card.Body>
                                    {this.createCarRow()}
                                    <Row className="justify-content-center">
                                        <Button
                                            variant="outline-success"
                                            onClick={() => this.setState({ showAddVehicleModal: true })}
                                        >
                                            Add Vehicle
                                        </Button>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <AddVehicleModal
                    show={showAddVehicleModal}
                    onHide={closeAddVehicleModal}
                    email={email}
                    vehiclesOwned={vehiclesOwned}
                    name={name}
                />
            </div>
        );
    }
}

export default Account;
