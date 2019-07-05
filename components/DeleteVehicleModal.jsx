import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const host = 'http://localhost';
const port = 3001;

class DeleteVehicleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteVehicleFailed: false,
        };
    }

    deleteVehicle = () => {
        const { carName, vehiclesOwned, email, onHide } = this.props;

        axios.post(`${host}:${port}/deleteVehicle`, {
            carName,
            vehiclesOwned,
            email
        })
        .then(response => {
            const { token } = response.data;
            window.localStorage.setItem('auth_token', token);
            onHide();
        })
        .catch(error => {
            this.setState({ deleteVehicleFailed: true });
        });
    }

    render() {
        const { carName, vehiclesOwned, onHide, email } = this.props;
        const { deleteVehicleFailed } = this.state;

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
                            Delete a Vehicle
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to delete this vehicle?</p>

                        {deleteVehicleFailed && (
                            <p style={{ color: 'red', textAlign: 'center', display: 'block' }}>
                                Could not delete vehicle. Please try again.
                            </p>
                        )}

                        <Row className="text-center mt-4">
                            <Col>
                                <Button
                                    className="mr-3" variant="outline-primary" onClick={onHide}>Cancel</Button>
                                <Button variant="outline-danger" onClick={() => this.deleteVehicle()}>Delete</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default DeleteVehicleModal;
