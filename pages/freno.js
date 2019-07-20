import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Background from '../img/background.jpeg';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import './index.css';

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
            <div style={{ maxWidth: '100%', height: '100%' }}>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                />
                <NavbarBootstrap isAuthenticated={isAuthenticated} name={name} />

                <Container className="my-3">

                    <Row className="justify-content-center">
                        <Col className="text-center">
                            <h1>
                                FRENO
                            </h1>
                            <h1>
                                The Smart Brake Monitor
                            </h1>

                            <Image src={require('../img/freno.jpg')} fluid/>
                        </Col>
                    </Row>
                </Container>

                <Container className="my-3">
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <h2>
                                Immediate deceleration dependant brake lighting. Constant brake
                                data tracking and performace grading. Safer and more efficient driving.
                                No installation required.
                            </h2>
                            <p>
                                watch the demo
                            </p>
                            <Image src={require('../img/freno.jpg')} fluid/>
                        </Col>
                    </Row>
                </Container>
                <Container className="my-3">
                    <Row className="justify-content-center">
                        <Col>
                            <h1>
                                How It Works
                            </h1><hr />
                            <p>
                            Freno uses an accelerometer to monitor deceleration. When deceleration is detected
                            past a certain threshold the LED Strip will light up depending on the amount of
                            deceleration. A soft brake with low deceleration would show 25% of the LED Strip lights
                            lit up, whereas an emergency brake would show 100%. Freno also records any deceleration
                            to the USB. Upload the text file on the USB to your account on this website. Now all
                            of your braking data is displayed on the dashboard.

                            </p>
                            <h1>
                                Set Up
                            </h1><hr />
                            <p>
                            Freno is easy to set up, simply put the electronics into a box or use one of the boxes we
                            have provided. Lay this box down flat into the trunk of back seat of your vehicle.
                            Ensure the wire that the LED strip is attached to can reach your rear window.
                            </p>
                            <h1>
                                Specs
                            </h1><hr/>
                            <h2>
                                Dimensions
                            </h2><hr/>
                            <p>
                                Contained in a 5 x 10 inch box<br/>
                                LED strip: 10 cm<br/>
                                LED strip connecting wire: 50 cm<br/>
                            </p>
                            <h2>
                                Parts
                            </h2><hr/>
                            <p>
                                Microprocessor - Arduino Mega<br/>
                                Accelerometer  - MPU 6050<br/>
                                USB Module     -<br/>
                                LED Strip      -<br/>
                                Battery Pack   -<br/>
                                USB Stick      -<br/>
                            </p>
                            <h2>
                                Documentation
                            </h2><hr/>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Freno;
