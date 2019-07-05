import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const host = 'http://localhost';
const port = 3001;

class EditVehicleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carName: '',
            arduinoID: null,
            failedEditingVehicle: false,
        };

        this.editVehicle = this.editVehicle.bind(this);
    }

    editVehicle = () => {
        const { carName, arduinoID } = this.state;
        const { email, vehiclesOwned, onHide } = this.props;

        if (!carName || !arduinoID || vehiclesOwned.includes(carName)) {
            this.setState({ failedEditingVehicle: true });
            return false;
        }

        axios.post(`${host}:${port}/editVehicle`, {
            email,
            carName,
            arduinoID,
            vehiclesOwned,
            oldCarName: this.props.carName,
        })
        .then(response => {
            const { token } = response.data;
            window.localStorage.setItem('auth_token', token);
            onHide();
        })
        .catch(error => {
            this.setState({ failedEditingVehicle: true });
        });
    }

    render() {
        const { carName, arduinoID, failedEditingVehicle } = this.state;

        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="add-vehicle-modal-title"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="add-vehicle-modal-title">
                            Edit Vehicle
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="todo">
                                <Form.Label>Car Name</Form.Label>
                                <Form.Control
                                    name="carName"
                                    type="text"
                                    placeholder="Red Tesla Model X"
                                    value={carName}
                                    onChange={evt => this.setState({ carName: evt.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="todo">
                                <Form.Label>Freno ID</Form.Label>
                                <Form.Control
                                    name="carName"
                                    type="text"
                                    placeholder="XXXXXXXXX"
                                    value={arduinoID}
                                    onChange={evt => this.setState({ arduinoID: evt.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Form>

                        {failedEditingVehicle && (
                            <p style={{ color: 'red', textAlign: 'center', display: 'block' }}>
                                Could not edit vehicle. Please try again.
                            </p>
                        )}

                        <Row className="text-center mt-4">
                            <Col>
                                <Button
                                    className="mr-3"variant="outline-danger" onClick={this.props.onHide}>Cancel</Button>
                                <Button variant="outline-success" onClick={() => this.editVehicle()}>Edit</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default EditVehicleModal;
