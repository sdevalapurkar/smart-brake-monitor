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
        };
    }

    componentDidMount = () => {
        const authToken = window.localStorage.getItem('auth_token');

        if (!authToken) {
            this.setState({ isAuthenticated: false });
        } else {
            axios.post(`${host}:${port}/authstatus`, { headers: { 'Authorization' : `Bearer ${authToken}` } }).then(res => {
                if (res.status === 200) {
                    const { name, email } = res.data.authData;
                    this.setState({
                        isAuthenticated: true,
                        name,
                        email,
                    });
                }
            }).catch(err => {});
        }
    }

    createCarRow = () => {
        let children = [];
        for (let i = 0; i < 5; i++) {
            children.push(<CarRow name={`Car ${i+1}`} />)
        }
        return children
    }

    render() {
        const { isAuthenticated, name, email } = this.state;

        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
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
                                                value={this.state.name}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="emailProfileInput">
                                            <Form.Label>E-mail</Form.Label>
                                            <Form.Control
                                                name="emailProfileInput"
                                                type="text"
                                                placeholder="john.smith@mail.me"
                                                value={this.state.email}
                                                required
                                            />
                                        </Form.Group>
                                        <Row className="justify-content-center">
                                            <Button variant="outline-success" type="submit">
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
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="newPasswordInput">
                                            <Form.Label>New password</Form.Label>
                                            <Form.Control
                                                name="newPasswordInput"
                                                type="password"
                                                required
                                            />
                                        </Form.Group>
                                        <Row className="justify-content-center">
                                            <Button variant="outline-success" type="submit">
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
                                        <Button variant="outline-success" type="submit">
                                            Add Vehicle
                                        </Button>
                                    </Row>
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

export default Account;
