import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import axios from 'axios';
import Router from 'next/router';

const host = 'http://localhost';
const port = 3001;

class SignupModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            emailUsed: false,
        };

        this.signup = this.signup.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal = () => {
        this.setState({ email: '', name: '', password: '', emailUsed: false });
        this.props.signupModalClose();
    }

    signup = () => {
        const { name, email, password } = this.state;
        const expression = /\S+@\S+/;

        if (!expression.test(String(email).toLowerCase())) return;
        if (!name) return;
        if (!password) return;
        if (/\d/.test(name)) return;

        axios.post(`${host}:${port}/createuser`, {
            'name': name,
            'email': email,
            'password': password,
        })
        .then(response => {
            Router.push({ pathname: '/dashboard', query: { name: name, email: email } });
            this.setState({ email: '', name: '', password: '', emailUsed: false });
        })
        .catch(error => {
            this.setState({ emailUsed: true });
        });
    }

    render() {
        const { emailUsed, name, password, email } = this.state;

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => this.closeModal()}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create an Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                value={name}
                                placeholder="John Smith"
                                required
                                onChange={evt => this.setState({ name: evt.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                placeholder="myemail@mail.me"
                                required
                                onChange={evt => this.setState({ email: evt.target.value })}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="************"
                                required
                                onChange={evt => this.setState({ password: evt.target.value })}
                            />
                        </Form.Group>

                        {emailUsed && (
                            <p style={{ color: 'red', textAlign: 'center', display: 'block' }}>
                                Sorry, this email address is already in use. Please use a different email.
                            </p>
                        )}

                        <ButtonToolbar style={{ display: 'block', textAlign: 'center' }}>
                            <Button variant="outline-info" type="submit" onClick={() => this.signup()}>
                                Sign Up
                            </Button>
                        </ButtonToolbar>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SignupModal;
