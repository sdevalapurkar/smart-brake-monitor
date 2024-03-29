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
            carName: (this.props.name).toString(),
            arduinoID: parseInt(this.props.arduinoID),
            failedEditingVehicle: false,
            carWeight: parseFloat(this.props.weight),
            tireSpecs: (this.props.tireSpecs).toString(),
        };

        this.editVehicle = this.editVehicle.bind(this);
    }

    editVehicle = () => {
        const { carName, arduinoID, carWeight, tireSpecs } = this.state;
        const { email, vehiclesOwned, onHide, userName } = this.props;
        const tireSpecFormat = /^[A-Z][0-9]{3}\/[0-9]{2}\/[A-Z][0-9]{2}$/;

        if (
            carName === this.props.name &&
            carWeight === this.props.weight &&
            tireSpecs === this.props.tireSpecs
        ) {
            this.setState({ failedEditingVehicle: true });
            return false;
        }

        if (isNaN(carWeight) || !tireSpecFormat.test(tireSpecs)) {
            this.setState({ failedEditingVehicle: true });
            return false;
        }

        axios.post(`${host}:${port}/editVehicle`, {
            email,
            carName,
            arduinoID,
            vehiclesOwned,
            carWeight,
            tireSpecs,
            userName,
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
        const { carName, arduinoID, failedEditingVehicle, carWeight, tireSpecs } = this.state;

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
                            <Form.Group>
                                <Form.Label>Car Name</Form.Label>
                                <Form.Control
                                    name="carName"
                                    type="text"
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
                                    value={arduinoID}
                                    onChange={evt => this.setState({ arduinoID: parseFloat(evt.target.value) })}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Vehicle Weight (kg)</Form.Label>
                                <Form.Control
                                    name="carWeight"
                                    type="number"
                                    value={carWeight}
                                    onChange={evt => this.setState({ carWeight: parseFloat(evt.target.value) })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Tire Size</Form.Label>
                                <Form.Control
                                    name="tireSpecs"
                                    type="text"
                                    value={tireSpecs}
                                    onChange={evt => this.setState({ tireSpecs: evt.target.value })}
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
