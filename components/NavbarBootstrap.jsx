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
import Link from 'next/link';

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
        this.setState({ isAuthenticated: false });
        localStorage.removeItem('auth_token');
        location.replace('/');
    }

    render() {
        const { showSignupModal, showLoginModal } = this.state;
        const { isAuthenticated, name } = this.props;

        const popover = (
            <Popover id="popover-basic" title={name} style={{ textAlign: 'center' }}>
                <NavDropdown.Item href="/dashboard" style={{ textAlign: 'center' }}>Dashboard</NavDropdown.Item>
                <NavDropdown.Item href="/account" style={{ textAlign: 'center' }}>My Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                    <Link>
                        <a href="/" style={{ color: 'red', textAlign: 'center' }} onClick={() => this.logout()}>Logout</a>
                    </Link>
                </NavDropdown.Item>
            </Popover>
        );

        let signupModalClose = () => this.setState({ showSignupModal: false });
        let loginModalClose = () => this.setState({ showLoginModal: false });

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        src={require('../img/logo.png')}
                        height="50px"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/ourteam">Our Team</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                        {isAuthenticated && (
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" />
                    {!isAuthenticated && (
                        <ButtonToolbar className="my-2">
                            <Button className="mr-3" variant="outline-info" size="sm" as="input" value="Sign Up" onClick={() => this.setState({ showSignupModal: true })} />
                            <Button variant="outline-success" size="sm" as="input" value="Login" onClick={() => this.setState({ showLoginModal: true })} />
                        </ButtonToolbar>
                    )}
                    {isAuthenticated && (
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                            <Navbar.Brand>
                                <img
                                    src={require('../img/profile.png')}
                                    height="40px"
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
