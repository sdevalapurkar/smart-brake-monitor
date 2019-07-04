import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class AddVehicleModal extends Component {
    render() {
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
                        Title
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Hello world
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AddVehicleModal;
