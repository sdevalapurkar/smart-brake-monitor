import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
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
        };
    }

    componentDidMount = () => {
        const authToken = window.localStorage.getItem('auth_token');

        if (!authToken) {
            this.setState({ isAuthenticated: false });
        } else {
            axios.post(`${host}:${port}/authstatus`, { headers: { 'Authorization' : `Bearer ${authToken}` } }).then(res => {
                if (res.status === 200) {
                    this.setState({ isAuthenticated: true, name: res.data.authData.name });
                }
            }).catch(err => {});
        }
    }

    render() {
        const { name, isAuthenticated } = this.state;

        return (
            <div style={{ backgroundImage: `url(${Background})`, maxWidth: '100%', height: '100%' }}>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
                    integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
                    crossorigin="anonymous"
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
                    <div className="signupdiv"><a className="signup">Sign Up Now!</a></div>
                </header>

                <main>
                    <div>
                        <div className="services">
                            <div className="service-one">
                                <p className="service-icon"><i className="far fa-calendar-alt"></i></p>
                                <p className="service-title">Planning</p>
                                <p>Mauris vitae turpis ut sem blandit consequat et at ligula. Suspendisse quam lectus, tristique dapibus sapien et, tempus suscipit nisl.</p>
                            </div>
                            <div className="service-two">
                                <p className="service-icon"><i className="fas fa-crop"></i></p>
                                <p className="service-title">Design</p>
                                <p>Nulla eu metus faucibus, vehicula tortor quis, venenatis odio. Nullam purus mauris, feugiat in odio vitae, posuere volutpat libero. Sed et convallis libero.</p>
                            </div>
                            <div className="service-three">
                                <p className="service-icon"><i className="fas fa-code"></i></p>
                                <p className="service-title">Development</p>
                                <p>Ut ornare vitae enim a rhoncus. Nullam aliquet tristique scelerisque. Sed volutpat dictum risus ac laoreet. Suspendisse id lorem in enim sollicitudin varius.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Index;
