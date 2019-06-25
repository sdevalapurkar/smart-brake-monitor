import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import SignupModal from '../components/SignupModal';
import Background from '../img/background.jpeg';
import axios from 'axios';
import './index.css';

const host = 'http://localhost';
const port = 3001;

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            name: '',
            showSignupModal: false,
        };
    }

    componentDidMount = () => {
        const authToken = window.localStorage.getItem('auth_token');

        if (authToken) {
            axios.post(`${host}:${port}/authstatus`, { headers: { 'Authorization' : `Bearer ${authToken}` } }).then(res => {
                if (res.status === 200) {
                    this.setState({ isAuthenticated: true, name: res.data.authData.name });
                }
            }).catch(err => {});
        }
    }

    render() {
        const { name, isAuthenticated, showSignupModal } = this.state;

        let signupModalClose = () => this.setState({ showSignupModal: false });

        return (
            <div style={{ backgroundImage: `url(${Background})`, maxWidth: '100%', height: '100%' }}>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
                    integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Raleway"
                    rel="stylesheet"
                />
                <header>
                    <NavbarBootstrap
                        isAuthenticated={isAuthenticated}
                        name={name}
                    />

                    <div className="head">
                        <h1>You Brake <br/>We Monitor</h1>
                        <div>
                            <strong>Focus on driving and leave the rest to us.</strong>
                            <p></p>
                            <p>With real-time brake monitoring and reporting, we not only give you an insight on your driving habits and behaviours but also keep you and other drivers safe on the road.</p>
                        </div>
                    </div>
                    <div className="signupdiv" >
                        <button className="signup" onClick={() => this.setState({ showSignupModal: true })}>Sign Up Now!</button>
                    </div>
                </header>

                <main>
                    <div>
                        <div className="services">
                            <div className="service-one">
                                <p className="service-icon"><i className="fas fa-car"></i></p>
                                <p className="service-title">Brake Monitoring</p>
                                <p>Our flagship product, Freno, provides drivers with real-time brake monitoring and reporting. Brake application severity is identified and drivers are automatically notified.</p>
                            </div>
                            <div className="service-two">
                                <p className="service-icon"><i className="fas fa-chart-bar"></i></p>
                                <p className="service-title">Data Analytics</p>
                                <p>All your braking data is collected, aggregated and displayed visually on a dashboard pinpointing driving habits and trends.</p>
                            </div>
                            <div className="service-three">
                                <p className="service-icon"><i className="fas fa-user-friends"></i></p>
                                <p className="service-title">Fleet Management</p>
                                <p>Many vehicles and fleets can be managed and kept track of with our simple and user-friendly interface.</p>
                            </div>
                        </div>
                    </div>
                </main>

                <footer>
                    <h3>Brakes Supreme</h3>
                    <p></p>
                    <p className="service-icon"><i className="far fa-envelope"></i><br /></p>
                    <a className="email-name" href="mailto:brakessupreme@gmail.com"> brakessupreme@gmail.com</a>
                </footer>

                <SignupModal
                    show={showSignupModal}
                    signupModalClose={signupModalClose}
                />
            </div>
        )
    }
}

export default Index;
