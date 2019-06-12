import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

class NavbarBootstrap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            email: '',
            password: '',
        };

        this.authenticateUser = this.authenticateUser.bind(this);
    }

    authenticateUser() {
        const { email, password } = this.state;
    }

    render() {
        const { isAuthenticated } = this.state;

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={require('../img/logo.png')} 
                        width="100"
                        height="50"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" />
                    {!isAuthenticated && (
                        <Form inline>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Email"
                                    aria-label="Email"
                                    type="email"
                                    aria-describedby="basic-addon1"
                                    onChange={evt => this.setState({ email: evt.target.value })}
                                />
                            </InputGroup>

                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">*</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Password"
                                    type="password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    onChange={evt => this.setState({ password: evt.target.value })}
                                />
                            </InputGroup>

                            <Button size="sm" as="input" value="Submit" onClick={() => this.authenticateUser()} />
                        </Form>
                    )}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavbarBootstrap;
