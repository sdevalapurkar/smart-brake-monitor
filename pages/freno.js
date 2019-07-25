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
import YouTube from 'react-youtube';
import CardDeck from 'react-bootstrap/CardDeck';
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
            <div style={{ backgroundImage: `url(${Background})`, maxWidth: '100%', height: '100%' }}>
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
                            <h2>
                                Accident If You <b>Don't Know</b><br/>
                            Prevention If You <b>Freno</b><br/>
                            </h2>

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
                            </h2><br />
                            <h1>Quick Demo</h1>
                            <YouTube videoId='BtLwoNJ6klE'/>
                        </Col>
                    </Row>
                </Container>
                <Container className="my-3">
                    <Row className="justify-content-center">
                        <Col>
                            <br />
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
                                Freno is easy to set up. First put the electronics into a box or use one of the boxes we
                                have provided. Next, lay this box down flat into the trunk or back seat of your vehicle.
                                Attach the LED strip to your rear window or bumper. Plug in the USB and hit the Arduino
                                reset button to begin. When finished press the button to write your data to the USB.
                                Remember to upload the FRENO.txt file on the USB to your BrakesSupreme account.
                            </p>
                            <h1>
                                Parts
                            </h1><hr/><br />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <CardDeck>
                                <Card style={{ width: '18rem' }}>
                                  <Card.Img variant="top" src={require('../img/freno.jpg')} />
                                  <Card.Body>
                                    <Card.Title>Accelerometer</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">MPU 6050</Card.Subtitle>
                                    <Card.Text>
                                        Used for triple axis monitoring of acceleration and gyroscopic orientation.
                                    </Card.Text>
                                    <Card.Link href="http://wiki.sunfounder.cc/index.php?title=MPU6050_Module">Wiki</Card.Link>
                                    <Card.Link href="https://www.amazon.com/MPU-6050-MPU6050-Accelerometer-Gyroscope-Converter/dp/B008BOPN40">Amazon</Card.Link>
                                  </Card.Body>
                                </Card>
                                <Card style={{ width: '18rem' }}>
                                  <Card.Img variant="top" src={require('../img/freno.jpg')} />
                                  <Card.Body>
                                    <Card.Title>Microcontroller</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Arduino Mega</Card.Subtitle>
                                    <Card.Text>
                                        Controls the components and runs the code.
                                    </Card.Text>
                                    <Card.Link href="https://en.wikipedia.org/wiki/Arduino">Wiki</Card.Link>
                                    <Card.Link href="https://www.amazon.com/ELEGOO-ATmega2560-ATMEGA16U2-Projects-Compliant/dp/B01H4ZLZLQ/ref=sr_1_4?keywords=arduino+mega&qid=1564082728&s=electronics&sr=1-4">Amazon</Card.Link>
                                  </Card.Body>
                                </Card>
                                <Card style={{ width: '18rem' }} >
                                  <Card.Img variant="top" src={require('../img/freno.jpg')} />
                                  <Card.Body>
                                    <Card.Title>USB Module</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">IC CH376S</Card.Subtitle>
                                    <Card.Text>
                                        Supports USB writing for data capturing.
                                    </Card.Text>
                                    <Card.Link href="http://wiki.sunfounder.cc/index.php?title=MPU6050_Module">Wiki</Card.Link>
                                    <Card.Link href="https://www.amazon.com/MPU-6050-MPU6050-Accelerometer-Gyroscope-Converter/dp/B008BOPN40">Amazon</Card.Link>
                                  </Card.Body>
                                </Card>
                            </CardDeck>
                        </Col>
                    </Row>
                    <br />
                    <Row className="justify-content-center">
                        <Col>
                            <CardDeck>
                                <Card style={{ width: '18rem' }}>
                                  <Card.Img variant="top" src={require('../img/freno.jpg')} />
                                  <Card.Body>
                                    <Card.Title>LED Light Strip</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">WS2812</Card.Subtitle>
                                    <Card.Text>
                                        40 LED addressable light strip. 60cm long.
                                    </Card.Text>
                                    <Card.Link href="https://en.wikipedia.org/wiki/LED_strip_light">Wiki</Card.Link>
                                    <Card.Link href="https://www.amazon.com/ELEGOO-ATmega2560-ATMEGA16U2-Projects-Compliant/dp/B01H4ZLZLQ/ref=sr_1_4?keywords=arduino+mega&qid=1564082728&s=electronics&sr=1-4">Amazon</Card.Link>
                                  </Card.Body>
                                </Card>
                                <Card style={{ width: '18rem' }}>
                                  <Card.Img variant="top" src={require('../img/freno.jpg')} />
                                  <Card.Body>
                                    <Card.Title>D Battery Pack</Card.Title>
                                    <Card.Text>
                                        Powers the microcontroller and components.
                                    </Card.Text>
                                    <Card.Link href="https://en.wikipedia.org/wiki/D_battery">Wiki</Card.Link>
                                  </Card.Body>
                                </Card>
                                <Card style={{ width: '18rem' }}>
                                  <Card.Img variant="top" src={require('../img/freno.jpg')} />
                                  <Card.Body>
                                    <Card.Title>USB Stick</Card.Title>
                                    <Card.Text>
                                        Stores the data.
                                    </Card.Text>
                                    <Card.Link href="https://en.wikipedia.org/wiki/USB">Wiki</Card.Link>
                                  </Card.Body>
                                </Card>
                            </CardDeck>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Freno;
