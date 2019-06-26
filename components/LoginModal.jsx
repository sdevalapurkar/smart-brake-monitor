import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import axios from 'axios';
import Router from 'next/router';

const host = 'http://smart-brake-monitor-server.herokuapp.com';
// const port = 3001;
const port = process.env.PORT;

class LoginModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            failedAuth: false,
        };

        this.login = this.login.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal = () => {
        this.setState({ email: '', password: '', failedAuth: false });
        this.props.loginModalClose();
    }

    login = () => {
        const { email, password } = this.state;
        const expression = /\S+@\S+/;

        if (!expression.test(String(email).toLowerCase())) return;
        if (!password) return;

        axios.post(`${host}:${port}/authenticate`, {
            'email': email,
            'password': password,
        })
        .then(response => {
            const token = response.data.token;
            window.localStorage.setItem('auth_token', token);
            this.setState({ email: '', password: '', failedAuth: false });
            Router.push({ pathname: '/dashboard' });
        })
        .catch(error => {
            console.log(error);
            this.setState({ failedAuth: true });
        });
    }

    render() {
        const { password, email, failedAuth } = this.state;

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
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="john.smith@mail.me"
                                required
                                value={email}
                                onChange={evt => this.setState({ email: evt.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="************"
                                required
                                value={password}
                                onChange={evt => this.setState({ password: evt.target.value })}
                            />
                        </Form.Group>

                        {failedAuth && (
                            <p style={{ color: 'red', textAlign: 'center', display: 'block' }}>
                                Incorrect credentials. Please try again.
                            </p>
                        )}

                        <ButtonToolbar style={{ display: 'block', textAlign: 'center' }}>
                            <Button variant="outline-success" onClick={() => this.login()}>
                                Login
                            </Button>
                        </ButtonToolbar>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default LoginModal;
