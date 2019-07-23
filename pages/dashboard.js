import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Graph from '../components/dashboard/Graph'
import axios from 'axios';
import Router from 'next/router';

const host = 'http://localhost';
const port = 3001;

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            name: '',
            email: '',
            vehiclesOwned: [],
            arduinoID: 12345,
            vehicleSelected: false,
            brakingData: [],
            //     data: {
            //        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            //        datasets: [{
            //            label: 'Average Break Torque',
            //            backgroundColor: 'rgba(252, 161, 3, 0.5)',
            //            borderColor: 'rgb(252, 161, 3)',
            //            data: [7,8,6,7,6,3,3]
            //        }]
            //    },
            data: null,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };

        this.getBrakingData = this.getBrakingData.bind(this);
    }

    getBrakingData = () => {
        const { arduinoID, name, email, vehiclesOwned } = this.state;

        axios.post(`${host}:${port}/getBrakingData`, {
            arduinoID,
            name,
            email,
            vehiclesOwned
        })
        .then(res => {
            this.setState({ vehicleSelected: true, brakingData: res.data.brakingData });
        })
        .catch(err => {});
    }

    componentDidMount = () => {
        const authToken = window.localStorage.getItem('auth_token');

        if (authToken) {
            axios.post(`${host}:${port}/authstatus`, { headers: { 'Authorization' : `Bearer ${authToken}` } }).then(res => {
                if (res.status === 200) {
                    const { name, email, vehiclesOwned } = res.data.authData;
                    this.setState({ isAuthenticated: true, name, email, vehiclesOwned });
                }
            }).catch(err => {
                location.replace('/');
            });
        } else {
            location.replace('/');
        }
    }

    render() {
        const { isAuthenticated, name, data, options, vehicleSelected } = this.state;

        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                />
                <NavbarBootstrap
                    isAuthenticated={isAuthenticated}
                    name={name}
                />
                {!vehicleSelected && (
                    <div>
                        <button onClick={() => this.getBrakingData()}>Click for Vehicle with Freno ID = 12345</button>
                    </div>
                )}
                {vehicleSelected && (
                    <Container className="my-5">
                        <Card>
                            <Card.Header>
                                Torque
                            </Card.Header>
                            <Card.Body>
                                <Row className="justify-content-end">
                                    <Col sm={'auto'} className="px-1">
                                        <Button variant="outline-primary">
                                            Day
                                        </Button>
                                    </Col>
                                    <Col sm={'auto'} className="px-1 pr-3">
                                        <Button variant="outline-primary">
                                            Date Range
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Graph
                                            data={data}
                                            options={options}
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card className="mt-3">
                            <Card.Header>
                                Deceleration
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Graph
                                            data={data}
                                            options={options}
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                )}
            </div>
        )
    }
}

export default Dashboard;
