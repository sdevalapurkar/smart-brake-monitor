import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Background from '../img/background.jpeg';
import axios from 'axios';

const host = 'http://localhost';
const port = 3001;

class Freno extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            name: '',
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
        const { isAuthenticated, name } = this.state;

        return (
            <div style={{ backgroundImage: `url(${Background})`, maxWidth: '100%', height: '100%' }}>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />

                <NavbarBootstrap isAuthenticated={isAuthenticated} name={name} />

                <Container className="my-3">
                    <Row className="justify-content-center">
                        <Col className="text-center">
                            <h1>
                                FRENO
                            </h1>
                        </Col>
                    </Row>
                </Container>
                <Container className="my-3">
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <p>
                            &nbsp;&nbsp;&nbsp;When driving, it is extremely important to stay focused and have the ability to
                            respond to situations in a timely manner. Not being able to react to situations effectively
                            can lead to crashes and collisions. It has been shown that rear-end crashes are the most
                            frequent type of vehicle collision, accounting for 29% of all crashes. The current
                            solution used in vehicles to try and tackle this issue are brake lights.
                            </p>
                            <p>
                            &nbsp;&nbsp;&nbsp;Brake lights present at the back of vehicles have two states, on or off. By default,
                            brake lights are switched off and when the brake is engaged they switch on. The purpose
                            of these brake lights is to indicate vehicle deceleration. Currently, brake lights provide an
                            indication as to whether or not the brakes of a vehicle have been applied; however, they
                            do not indicate how suddenly the vehicle is slowing down. A light brake that provides
                            minor deceleration displays the same warning indicator as a sudden brake with a large
                            deceleration. Although the default brake light is a good warning indicator that a vehicle is
                            decelerating, it can be improved as it does not provide information regarding the severity
                            of the brake being applied.
                            </p>
                            <p>
                            &nbsp;&nbsp;&nbsp;Freno aims to address this issue by providing a spectrum of values to describe
                            vehicle braking rather than a boolean state. By providing a range of accurate real-time
                            values, drivers can understand the severity of the brake being applied and make a better
                            decision with respect to how hard they need to brake themselves. Freno will also track
                            brake deceleration readings and through a custom web interface, will allow drivers to
                            track their driving habits with regards to braking and see how it is impacting aspects of
                            their vehicle such as fuel consumption and brake health.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Freno;
