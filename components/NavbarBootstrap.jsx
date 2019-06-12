import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

class NavbarBootstrap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            showSignupModal: false,
            showLoginModal: false,
        };
    }

    render() {
        const { isAuthenticated, showSignupModal, showLoginModal } = this.state;

        let signupModalClose = () => this.setState({ showSignupModal: false });
        let loginModalClose = () => this.setState({ showLoginModal: false });

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
                        <ButtonToolbar>
                            <Button variant="outline-info" size="sm" as="input" value="Sign Up" onClick={() => this.setState({ showSignupModal: true })} />
                            &nbsp;
                            &nbsp;
                            <Button variant="outline-success" size="sm" as="input" value="Login" onClick={() => this.setState({ showLoginModal: true })} />
                        </ButtonToolbar>
                    )}
                    {isAuthenticated && (
                        <Navbar.Brand>
                            <img
                                alt=""
                                src={require('../img/profile.png')} 
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                            />
                        </Navbar.Brand>
                    )}
                </Navbar.Collapse>
                <SignupModal
                    show={showSignupModal}
                    signupModalClose={signupModalClose}
                />
                <LoginModal
                    show={showLoginModal}
                    onHide={loginModalClose}
                />
            </Navbar>
        );
    }
}

export default NavbarBootstrap;
