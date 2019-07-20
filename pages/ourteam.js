import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import './index.css';

const host = 'http://localhost';
const port = 3001;

class Ourteam extends Component {
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
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                />
                <NavbarBootstrap isAuthenticated={isAuthenticated} name={name} />
                <Container className="my-5">
                    <Card>
                        <Card.Body>
                            <Row className="my-5">
                                <Col className="text-center">
                                    <h1 className="font-35-bold mb-5 mb-md-0">OUR TEAM</h1>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p>
                                        We are a team of six University of Victoria Engineering students who formed
                                        Brakes Supreme as part of our capstone project course ECE/SENG&nbsp;499.
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} className="text-center mb-3 mb-md-0">
                                    <Image
                                        roundedCircle
                                        className="p-1 team-image"
                                        src={require('../img/eli.jpg')}
                                    />
                                    <h1 className="mt-3">Eli</h1>
                                    <p>
                                        Frontend Website Developer
                                        <br/>
                                        Microprocessor Programmer
                                    </p>
                                </Col>
                                <Col md={4} className="text-center mb-3 mb-md-0">
                                    <Image
                                        roundedCircle
                                        className="p-1 team-image"
                                        src={require('../img/shreyas.png')}
                                    />
                                    <h1 className="mt-3">Shreyas</h1>
                                    <p>Front and Backend Website Architect</p>
                                </Col>
                                <Col md={4} className="text-center mb-3 mb-md-0">
                                    <Image
                                        roundedCircle
                                        className="p-1 team-image"
                                        src={require('../img/arshi.jpg')}
                                    />
                                    <h1 className="mt-3">Arshi</h1>
                                    <p>Front and Backend Website Architect</p>
                                </Col>
                            </Row>
                            <div className="my-md-5"></div>
                            <Row>
                                <Col md={4} className="text-center mb-3 mb-md-0">
                                    <Image
                                        roundedCircle
                                        className="p-1 team-image"
                                        src={require('../img/rickus.jpg')}
                                    />
                                    <h1 className="mt-3">Rickus</h1>
                                    <p>Microprocessor System Engineer</p>
                                </Col>
                                <Col md={4} className="text-center mb-3 mb-md-0">
                                    <Image
                                        roundedCircle
                                        className="p-1 team-image"
                                        src={require('../img/sajan.png')}
                                    />
                                    <h1 className="mt-3">Sajan</h1>
                                    <p>Microprocessor System Engineer</p>
                                </Col>
                                <Col md={4} className="text-center mb-3 mb-md-0">
                                    <Image
                                        roundedCircle
                                        className="p-1 team-image"
                                        src={require('../img/adam.jpg')}
                                    />
                                    <h1 className="mt-3">Adam</h1>
                                    <p>Backend Website Developer<br/>Microprocessor Programmer</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="mt-5">
                        <Card.Body className="text-center mb-3">
                            <Row className="mb-3">
                                <Col>
                                    <div className="text-acknowledgements">
                                        ACKNOWLEDGEMENTS
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={{ span: 6, offset: 3}}>
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                <Image
                                                    className="p-1 team-image"
                                                    roundedCircle
                                                    src={require('../img/sima.jpg')}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col>
                                                <h2 className="text-ack-name">
                                                    Dr. Mihai Sima
                                                </h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h5 className="text-secondary text-ack-title">
                                                    Supervisor
                                                </h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p>
                                                    <a href="https://www.ece.uvic.ca/~msima/">{"Dr. Sima's Website"}</a>
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p>
                                                    We would like to thank Dr. Mihai Sima for his help with the grading
                                                    and design of our project. He is a professor of Electrical and
                                                    Computer Engineering at the University of Victoria who specializes
                                                    in embedded systems and microprocessors.
                                                </p>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col sm={{ span: 6, offset: 3}}>
                                    <Row>
                                        <Col>
                                            <Image
                                                roundedCircle
                                                className="p-1 team-image"
                                                src={require('../img/mantis.png')}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <h2 className="text-ack-name">
                                                Dr. Mantis Cheng
                                            </h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h5 className="text-secondary text-ack-title">
                                                Principal Investigator
                                            </h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>
                                                <a href="http://webhome.csc.uvic.ca/~mcheng">{"Dr. Cheng's Website"}</a>
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <Image
                                                roundedCircle
                                                className="p-1 team-image"
                                                src={require('../img/priya.png')}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <h2 className="text-ack-name">
                                                Priya Angara
                                            </h2>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h5 className="text-secondary text-ack-title">
                                                Lab Assistant
                                            </h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>
                                                <a href="https://sites.google.com/a/rigiresearch.com/rigi-research/people/priya-angara">{"Priya's Website"}</a>
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>
                                                We would also like to thank Dr. Mantis Cheng and Priya Angara
                                                from the University of Victoria for providing us with access
                                                to a lab working space and hardware equipment such as
                                                Arduino Mega 2560 microcontrollers. We are very grateful
                                                for their support.
                                            </p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Ourteam;
