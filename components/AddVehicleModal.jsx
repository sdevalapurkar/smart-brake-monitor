import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class AddVehicleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carName: '',
            arduinoID: null,
        };
    }

    render() {
        const { carName, arduinoID } = this.state;

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
                        <Row className="text-center mt-4">
                            <Col>
                                <Button
                                    className="mr-3"variant="outline-danger" onClick={this.props.onHide}>Cancel</Button>
                                <Button variant="outline-success">Add</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default AddVehicleModal;
