import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class LoginModal extends Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="myemail@mail.me" required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="************" required/>
                        </Form.Group>

                        <ButtonToolbar style={{ display: 'block', textAlign: 'center' }}>
                            <Button variant="outline-success" type="submit">
                                Login
                            </Button>
                            &nbsp;
                            &nbsp;
                            <Button variant="outline-danger" type="submit">
                                Cancel
                            </Button>
                        </ButtonToolbar>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default LoginModal;
