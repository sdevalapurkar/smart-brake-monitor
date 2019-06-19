import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Router from 'next/router';

class NavbarBootstrap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSignupModal: false,
            showLoginModal: false,
        };

        this.logout = this.logout.bind(this);
    }

    logout = () => {
        Router.push({ pathname: '/' });
    }

    render() {
        const { showSignupModal, showLoginModal } = this.state;
        const { isAuthenticated, name } = this.props;

        const popover = (
            <Popover id="popover-basic" title={name} style={{ textAlign: 'center' }}>
                <NavDropdown.Item href="/account" style={{ textAlign: 'center' }}>My Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                    style={{ color: 'red', textAlign: 'center' }}
                    onClick={() => this.logout()}
                >
                    Logout
                </NavDropdown.Item>
            </Popover>
        );

        let signupModalClose = () => this.setState({ showSignupModal: false });
        let loginModalClose = () => this.setState({ showLoginModal: false });

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
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
                    <Nav className="mr-auto">
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <Nav.Link href="/about">About</Nav.Link>
                        &nbsp;
                        &nbsp;
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
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
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                            <Navbar.Brand>
                                <img
                                    alt=""
                                    src={require('../img/profile.png')} 
                                    width="40"
                                    height="40"
                                    className="d-inline-block align-top"
                                    style={{ cursor: 'pointer' }}
                                />
                            </Navbar.Brand>
                        </OverlayTrigger>
                    )}
                </Navbar.Collapse>
                <SignupModal
                    show={showSignupModal}
                    signupModalClose={signupModalClose}
                />
                <LoginModal
                    show={showLoginModal}
                    loginModalClose={loginModalClose}
                />
            </Navbar>
        );
    }
}

export default NavbarBootstrap;
