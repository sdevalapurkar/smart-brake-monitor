import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const host = 'http://localhost';
const port = 3001;

class SignupModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
        };

        this.signup = this.signup.bind(this);
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
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

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
                        Create an Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="John Smith"
                                required
                                onChange={evt => this.setState({ name: evt.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
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
                                placeholder="************"
                                required
                                onChange={evt => this.setState({ password: evt.target.value })}
                            />
                        </Form.Group>

                        <ButtonToolbar style={{ display: 'block', textAlign: 'center' }}>
                            <Button variant="outline-info" type="submit" onClick={() => this.signup()}>
                                Sign Up
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

export default SignupModal;
