import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const host = 'http://localhost';
const port = 3001;

class AddVehicleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carName: '',
            arduinoID: null,
            failedAddingVehicle: false,
            carWeight: null,
            tireSpecs: null,
        };

        this.addVehicle = this.addVehicle.bind(this);
    }

    addVehicle = () => {
        const { carName, arduinoID, carWeight, tireSpecs } = this.state;
        const { email, vehiclesOwned, onHide, name } = this.props;
        const tireSpecFormat = /^[A-Z][0-9]{3}\/[0-9]{2}\/[A-Z][0-9]{2}$/;

        if (!carName || !arduinoID || !carWeight || !tireSpecs || isNaN(carWeight) || !tireSpecFormat.test(tireSpecs)) {
            this.setState({ failedAddingVehicle: true });
            return false;
        }

        axios.post(`${host}:${port}/addVehicle`, {
            email,
            carName,
            arduinoID,
            carWeight,
            tireSpecs,
            vehiclesOwned,
            name
        })
        .then(response => {
            const { token } = response.data;
            window.localStorage.setItem('auth_token', token);
            onHide();
        })
        .catch(error => {
            this.setState({ failedAddingVehicle: true });
        });
    }

    render() {
        const { carName, arduinoID, failedAddingVehicle, carWeight, tireSpecs } = this.state;

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
                            Add a New Vehicle
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
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
                            <Form.Group>
                                <Form.Label>Freno ID</Form.Label>
                                <Form.Control
                                    name="arduinoID"
                                    type="text"
                                    placeholder="XXXXXXXXX"
                                    value={arduinoID}
                                    onChange={evt => this.setState({ arduinoID: evt.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Vehicle Weight (kg)</Form.Label>
                                <Form.Control
                                    name="carWeight"
                                    type="number"
                                    placeholder="300"
                                    value={carWeight}
                                    onChange={evt => this.setState({ carWeight: evt.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Tire Size</Form.Label>
                                <Form.Control
                                    name="tireSpecs"
                                    type="text"
                                    placeholder="P225/50/R17"
                                    value={tireSpecs}
                                    onChange={evt => this.setState({ tireSpecs: evt.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Form>

                        {failedAddingVehicle && (
                            <p style={{ color: 'red', textAlign: 'center', display: 'block' }}>
                                Could not add vehicle. Please try again.
                            </p>
                        )}

                        <Row className="text-center mt-4">
                            <Col>
                                <Button
                                    className="mr-3"variant="outline-danger" onClick={this.props.onHide}>Cancel</Button>
                                <Button variant="outline-success" onClick={() => this.addVehicle()}>Add</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default AddVehicleModal;
