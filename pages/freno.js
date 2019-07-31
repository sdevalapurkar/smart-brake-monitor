import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
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
            <div style={{ maxWidth: '100%', height: '100%' }}>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                />
                <NavbarBootstrap isAuthenticated={isAuthenticated} name={name} />

                <Container className="my-5">
                    <Card className="mt-5 justify-content-center">
                        <Card.Body className="mb-3">
                            <Row className="my-5">
                                <Col className="text-center">
                                    <h1 className="font-35-bold mb-5 mb-md-0">FRENO</h1>
                                </Col>
                                <Col xs={12} md={6} className="text-center">
                                    <h3>
                                        Accident If You <b>Don't Know</b><br/>
                                        Prevention If You <b>Freno</b>
                                    </h3>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col  md={8} className="text-center mb-3 mb-md-0">
                                    <Card style={{ borderRadius: '1em', boxShadow: '0px 5px 32px -16px' }}>
                                        <Image src={require('../img/freno.jpg')} fluid style={{ border: '7px solid #ADAFB2'}} rounded className="p-1"/>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="justify-content-center mt-5">
                                <Col  md={10} className="text-center mb-3 mb-md-0">
                                    <h2>
                                        Immediate deceleration dependant brake lighting. Constant brake
                                        data tracking and performance grading. Safer and more efficient driving.
                                        No installation required.
                                    </h2><br /><br />
                                    <h1>
                                        Short Demo
                                    </h1>
                                    <YouTube videoId='BtLwoNJ6klE' className="freno-video"/>
                                </Col>
                            </Row>
                            <Row className="justify-content-center mt-5">
                                <Col md={10} className="mb-md-0">
                                    <h1>
                                        How It Works
                                    </h1><hr />
                                    <p>
                                        Freno uses an accelerometer to monitor deceleration. When deceleration is detected
                                        past a certain threshold an LED Strip will light up depending on the amount of
                                        deceleration. A soft brake with low deceleration would show 33% of the LED Strip lights
                                        lit up, whereas an emergency brake would show 100%. Freno also records any deceleration
                                        to the USB. Upload the .csv file on the USB to your account on this website. Your
                                        braking data will be displayed on the dashboard page.
                                    </p>
                                    <h1>
                                        Set Up
                                    </h1><hr />
                                    <p>
                                        Freno is easy to set up. First put the electronics into a box or use one of the boxes we
                                        have provided. Next, lay this box down flat into the trunk or back seat of your vehicle.
                                        Attach the LED strip to your rear window or bumper. Plug in the USB and hit the Arduino
                                        reset button to begin. When finished press the button on the breadboard to write your data
                                        to the USB. Remember to upload the FRENO.csv file on the USB to your BrakesSupreme account.
                                    </p>
                                    <h1>
                                        Parts
                                    </h1><hr/><br/>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col md={18} lg={18} className="mb-3 mb-md-0" >
                                    <CardDeck>
                                        <Card style={{ width: '18rem', borderRadius: '1em', boxShadow: '0px 5px 32px -16px' }}>
                                          <Card.Img variant="top" src={require('../img/accelerometer.png')} style={{ borderRadius: '1em 1em 0em 0em' }}/>
                                          <Card.Body>
                                            <Card.Title>Accelerometer</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">MPU 6050</Card.Subtitle>
                                            <Card.Text>
                                                Used for triple axis monitoring of acceleration and gyroscopic orientation.
                                            </Card.Text>
                                          </Card.Body>
                                          <Card.Footer>
                                              <Card.Link href="https://store.invensense.com/datasheets/invensense/MPU-6050_DataSheet_V3%204.pdf">Documentation</Card.Link>
                                              <Card.Link href="https://www.amazon.com/MPU-6050-MPU6050-Accelerometer-Gyroscope-Converter/dp/B008BOPN40">Amazon</Card.Link>
                                          </Card.Footer>
                                        </Card>
                                        <Card style={{ width: '18rem', borderRadius: '1em', boxShadow: '0px 5px 32px -16px' }}>
                                          <Card.Img variant="top" src={require('../img/arduino_mega.png')} style={{ borderRadius: '1em 1em 0em 0em' }}/>
                                          <Card.Body>
                                            <Card.Title>Microcontroller</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Arduino Mega 2560</Card.Subtitle>
                                            <Card.Text>
                                                Controls the components and runs the code.
                                            </Card.Text>
                                          </Card.Body>
                                          <Card.Footer>
                                              <Card.Link href="https://www.arduino.cc/en/Guide/ArduinoMega2560">Documentation</Card.Link>
                                              <Card.Link href="https://www.amazon.com/ELEGOO-ATmega2560-ATMEGA16U2-Projects-Compliant/dp/B01H4ZLZLQ/ref=sr_1_4?keywords=arduino+mega&qid=1564082728&s=electronics&sr=1-4">Amazon</Card.Link>
                                          </Card.Footer>
                                        </Card>
                                        <Card style={{ width: '18rem', borderRadius: '1em', boxShadow: '0px 5px 32px -16px' }}>
                                          <Card.Img variant="top" src={require('../img/usb_module.png')} style={{ borderRadius: '1em 1em 0em 0em' }}/>
                                          <Card.Body>
                                            <Card.Title>USB Module</Card.Title>
                                            <Card.Subtitle className="text-muted">IC CH376S</Card.Subtitle>
                                            <Card.Text>
                                                Supports USB writing for data capturing.
                                            </Card.Text>
                                          </Card.Body>
                                          <Card.Footer>
                                              <Card.Link href="https://arduinobasics.blogspot.com/2015/05/ch376s-usb-readwrite-module.html">Documentation</Card.Link>
                                              <Card.Link href="https://www.amazon.ca/Read-write-Supports-Transfer-Interface-Communication/dp/B00XDLRL0U/ref=sr_1_fkmr0_1?keywords=ice+ch376s&qid=1564109238&s=gateway&sr=8-1-fkmr0">Amazon</Card.Link>
                                          </Card.Footer>
                                        </Card>
                                    </CardDeck>
                                </Col>
                            </Row>
                            <Row className="marg-top justify-content-center">
                                <Col md={18} lg={18} className="mb-3 mb-md-0" >
                                    <CardDeck>
                                        <Card style={{ width: '18rem', borderRadius: '1em', boxShadow: '0px 5px 32px -16px' }}>
                                          <Card.Img variant="top" src={require('../img/led_strip.png')} style={{ borderRadius: '1em 1em 0em 0em' }}/>
                                          <Card.Body>
                                            <Card.Title>LED Light Strip</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">WS2812</Card.Subtitle>
                                            <Card.Text>
                                                36 LED addressable light strip. 60cm long.
                                            </Card.Text>
                                          </Card.Body>
                                          <Card.Footer>
                                              <Card.Link href="https://en.wikipedia.org/wiki/LED_strip_light">Wiki</Card.Link>
                                              <Card.Link href="https://www.amazon.com/ELEGOO-ATmega2560-ATMEGA16U2-Projects-Compliant/dp/B01H4ZLZLQ/ref=sr_1_4?keywords=arduino+mega&qid=1564082728&s=electronics&sr=1-4">Amazon</Card.Link>
                                          </Card.Footer>
                                        </Card>
                                        <Card style={{ width: '18rem', borderRadius: '1em', boxShadow: '0px 5px 32px -16px' }}>
                                          <Card.Img variant="top" src={require('../img/dbattery.png')} style={{ borderRadius: '1em 1em 0em 0em' }}/>
                                          <Card.Body>
                                            <Card.Title>D Battery Pack</Card.Title>
                                            <Card.Text>
                                                Powers the microcontroller and components.
                                            </Card.Text>
                                          </Card.Body>
                                          <Card.Footer>
                                              <Card.Link href="https://en.wikipedia.org/wiki/D_battery">Wiki</Card.Link>
                                          </Card.Footer>
                                        </Card>
                                        <Card style={{ width: '18rem', borderRadius: '1em', boxShadow: '0px 5px 32px -16px' }}>
                                          <Card.Img variant="top" src={require('../img/usb_stick.png')} style={{ borderRadius: '1em 1em 0em 0em' }}/>
                                          <Card.Body>
                                            <Card.Title>USB Stick</Card.Title>
                                            <Card.Text>
                                                Stores all of the braking data.
                                            </Card.Text>
                                          </Card.Body>
                                          <Card.Footer>
                                              <Card.Link href="https://en.wikipedia.org/wiki/USB">Wiki</Card.Link>
                                          </Card.Footer>
                                        </Card>
                                    </CardDeck>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="mt-5 justify-content-center">
                        <Card.Body className="mb-3">
                            <Row className="justify-content-center mt-5">
                                <Col md={10} className="mb-3 mb-md-0">
                                    <h1>
                                        References
                                    </h1><hr /><br/>
                                    <h4>
                                        Research
                                    </h4>
                                    <br/>
                                    <p>
                                        [1] U.S. Dept. of Transportation. National Highway Traffic Safety Administration. "Analyses
                                        of Rear-End Crashes and Near-Crashes in the 100-Car Naturalistic Driving Study to
                                        Support Rear-Signaling Countermeasure Development" [Online]. Available: <a href="https://www.nhtsa.gov/sites/nhtsa.dot.gov/files/analyses20of20rear-end20crashes20and20near-crashes20dot20hs2081020846.pdf">
                                        https://www.nhtsa.gov/sites/nhtsa.dot.gov/files/analyses20of20rear-end20crashes20and20near-crashes20dot20hs2081020846.pdf</a><br/><br/>
                                        [2] “Electronic Brake Monitoring,” Electronic Brake Monitoring | MGM Brakes. [Online].
                                        Available: <a href="https://mgmbrakes.com/products/product-models/electronic-brake-monitoring/">
                                        https://mgmbrakes.com/products/product-models/electronic-brake-monitoring/</a>. [Accessed: 16-Jun-2019].<br/><br/>
                                        [3] D. E. Fumi and I. A. Sultan, “A novel in-vehicle real-time brake-monitoring system,”
                                        Proceedings of the Institution of Mechanical Engineers, Part D: Journal of Automobile
                                        Engineering, vol. 223, no. 6, pp. 793–804, 2009<br/><br/>
                                        [4] I. Alvarez and M. Bowman. "Trusted vehicle telematics using blockchain data analytics"
                                        U.S. Patent 10 284 654, May 7, 2019.<br/><br/>
                                        [5] K. Flick. "Vehicle tracker with user notifications and associated methods" U.S. Patent 6
                                        888 495, May 3, 2005.<br/><br/>
                                        [6] B. Wallace, R. Goubran, F. Knoefel, S. Marshall, M. Porter and A. Smith, "Driver Unique
                                        Acceleration Behaviours and Stability over Two Years," 2016 IEEE International
                                        Congress on Big Data (BigData Congress), San Francisco, CA, 2016, pp. 230-235.<br/><br/>
                                        [7] F. Monnerat, J. Dias, M. Alves, “Fleet management: A vehicle and driver assignment
                                        model,” European Journal of Operational Research, vol. 278, no. 1, p. 64-75, March,
                                        2019. [Online serial]. Available: <a href="https://www.sciencedirect.com/science/article/abs/pii/S0377221719302607">
                                        https://www.sciencedirect.com/science/article/abs/pii/S0377221719302607</a>. [Accessed June. 1, 2019].<br/><br/>
                                        [8] Motus. "Don’t Just Drive. Arrive. A Better Way to Get Going With Motus" [Online].
                                        Available: <a href="https://www.motus.com/">https://www.motus.com/</a><br/><br/>
                                        [9] D. Shinar, B. Gurion, “Fleet Study Evaluation of an Advance Brake Warning System,”
                                        Human Factors, vol. 42, no. 3, p. 482-489, Sept, 2000. [Online serial]. Available: <a href="https://journals-sagepub-com.ezproxy.library.uvic.ca/doi/pdf/10.1518/001872000779698141">
                                        https://journals-sagepub-com.ezproxy.library.uvic.ca/doi/pdf/10.1518/001872000779698141</a>.
                                        [Accessed June. 1, 2019].<br/><br/>
                                        [10] W. W. Wierwille et al. “Evaluation of Enhanced Brake Lights Using Surrogate Safety
                                        Measures” [Online]. "Available: <a href="https://pdfs.semanticscholar.org/1a3c/70b98dc5df5e6ec49b2e4354948e023c13a6.pdf">
                                        https://pdfs.semanticscholar.org/1a3c/70b98dc5df5e6ec49b2e4354948e023c13a6.pdf</a><br/><br/>
                                        [11] Facebook Inc. "Getting Started" [Online]. Available: <a href="https://reactjs.org/docs/getting-started.html">
                                        https://reactjs.org/docs/getting-started.html</a><br/><br/>
                                        [12] Node.js Foundation. "API Reference Documentation" [Online]. Available: <a href="https://nodejs.org/en/docs/">https://nodejs.org/en/docs/</a><br/><br/>
                                        [13] The PostgreSQL Global Development Group. "Documentation" [Online]. Available:
                                        <a href="https://www.postgresql.org/docs/">https://www.postgresql.org/docs/</a><br/><br/>
                                        [14] restfulapi.net. "REST API Tutorial" [Online]. Available: <a href="https://restfulapi.net/">https://restfulapi.net/</a><br/><br/>
                                        [15] Mozilla and individual contributors. "An overview of HTTP" [Online]. Available: <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview">
                                        https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview</a><br/><br/>
                                        [16] Raspberry Pi Foundation. "Raspberry Pi 3 Model B+" [Online]. Available: <a href="https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/">
                                        https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/</a><br/><br/>
                                    </p>
                                    <h4>Hardware</h4>
                                    <p><br/>
                                        [17] Arduino Basics. "CH376S USB Read/Write Module" [Online]. Available: <a href="https://arduinobasics.blogspot.com/2015/05/ch376s-usb-readwrite-module.html">https://arduinobasics.blogspot.com/2015/05/ch376s-usb-readwrite-module.html</a><br/><br/>
                                        [18] Arduino Basics. "How to use CH376S USB read/write module" [Video file]. Available: <a href="https://www.youtube.com/watch?v=yK3631kMKBU">https://www.youtube.com/watch?v=yK3631kMKBU</a><br/><br/>
                                        [19] How To Mechatronics. "How To Control WS2812B Individually Addressable LEDs using Arduino" [Video file]. Available: <a href="https://www.youtube.com/watch?v=UhYu0k2woRM">https://www.youtube.com/watch?v=UhYu0k2woRM</a><br/><br/>
                                        [20] Adafruit. "RGB LED Strips - Arduino Code" [Online]. Available: <a href="https://learn.adafruit.com/rgb-led-strips/arduino-code">https://learn.adafruit.com/rgb-led-strips/arduino-code</a><br/><br/>
                                        [21] Random Nerd Tutorials. "Guide for WS2812B Addressable RGB LED Strip with Arduino" [Online]. Available: <a href="https://randomnerdtutorials.com/guide-for-ws2812b-addressable-rgb-led-strip-with-arduino/">https://randomnerdtutorials.com/guide-for-ws2812b-addressable-rgb-led-strip-with-arduino/</a><br/><br/>
                                        [22] How To Mechatronics. "Arduino and MPU6050 Accelerometer and Gyroscope Tutorial" [Online]. Available: <a href="https://howtomechatronics.com/tutorials/arduino/arduino-and-mpu6050-accelerometer-and-gyroscope-tutorial/">https://howtomechatronics.com/tutorials/arduino/arduino-and-mpu6050-accelerometer-and-gyroscope-tutorial/</a><br/><br/>
                                        [23] Maker Pro. "How to Interface Arduino and the MPU 6050 Sensor" [Online]. Available: <a href="https://maker.pro/arduino/tutorial/how-to-interface-arduino-and-the-mpu-6050-sensor">https://maker.pro/arduino/tutorial/how-to-interface-arduino-and-the-mpu-6050-sensor</a><br/><br/>
                                    </p>
                                    <h4>Web Application</h4>
                                    <p><br/>
                                        [24] Heroku Dev Center. "Error Pages" [Online]. Available: <a href="https://devcenter.heroku.com/articles/error-pages">https://devcenter.heroku.com/articles/error-pages</a><br/><br/>
                                        [25] Geekality. "Heroku Deploy Sub Directory" [Online]. Available: <a href="https://www.geekality.net/2019/03/13/heroku-deploy-sub-directory/">https://www.geekality.net/2019/03/13/heroku-deploy-sub-directory/</a><br/><br/>
                                        [26] Heroku Dev Center. "Git" [Online]. Available: <a href="https://devcenter.heroku.com/articles/git">https://devcenter.heroku.com/articles/git</a><br/><br/>
                                        [27] Sciencing. "Calculate Brake Torque" [Online]. Available: <a href="https://sciencing.com/calculate-brake-torque-6076252.html">https://sciencing.com/calculate-brake-torque-6076252.html</a><br/><br/>
                                        [28] Geotab. "What is G-Force and How is it Related to Harsh Driving?" [Online]. Available: <a href="https://www.geotab.com/blog/what-is-g-force/">https://www.geotab.com/blog/what-is-g-force/</a><br/><br/>
                                        [29] Continental Tire. "How To Read A Tire Sidewall" [Online]. Available: <a href="https://www.continentaltire.com/news/how-read-tire-sidewall">https://www.continentaltire.com/news/how-read-tire-sidewall</a><br/><br/>
                                    </p>

                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default Freno;
