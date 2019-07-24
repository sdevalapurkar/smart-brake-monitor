import React, { Component } from 'react';
import DatePicker from "react-datepicker";;
import NavbarBootstrap from '../components/NavbarBootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Graph from '../components/dashboard/Graph'
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

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
            arduinoID: null,
            currDate: null,
            vehicleSelected: false,
            brakingData: [],
            parsedBrakingData: [],
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Average Break Torque',
                    backgroundColor: 'rgba(252, 161, 3, 0.5)',
                    borderColor: 'rgb(252, 161, 3)',
                    data: [7,8,6,7,6,3,3]
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            startDate: new Date(),
            endDate: new Date()
        };

        this.getBrakingData = this.getBrakingData.bind(this);
    }

    createCarRow = () => {
        const { vehiclesOwned } = this.state;
        let myVehicles = [];

        for (let v in vehiclesOwned) {
            myVehicles.push(
                <Card className="mt-3">
                    <Card.Body className="p-3">
                        <Row className="">
                            <Col>
                                <Form.Check
                                    type='radio'
                                    name="selectVehicleRadioButtons"
                                    label={vehiclesOwned[v].id}
                                    onChange={() => this.setState({ arduinoID: vehiclesOwned[v].id })}
                                />
                            </Col>
                            <Col>
                                {vehiclesOwned[v].name}
                            </Col>
                            <Col>
                                {vehiclesOwned[v].weight}
                            </Col>
                            <Col>
                                {vehiclesOwned[v].tireSpecs}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            );
        }

        return myVehicles;
    }

    handleChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.startDate;
        endDate = endDate || this.state.endDate;
        this.setState({ startDate, endDate });
    }

    handleChangeStart = startDate => this.setState({ startDate });

    handleChangeEnd = endDate => this.handleChange({ endDate });

    getBrakingData = () => {
        const { arduinoID, name, email, vehiclesOwned } = this.state;

        axios.post(`${host}:${port}/getBrakingData`, {
            arduinoID,
            name,
            email,
            vehiclesOwned
        })
        .then(res => {
            this.setState({ vehicleSelected: true, brakingData: res.data.brakingData }, () => {
                const parsed = [];
                this.state.brakingData.forEach(element => {
                    if (moment(element.drive_date).format('YYYY-MM-DD') === this.state.currDate) {
                        parsed.push(element);
                    }
                });

                this.setState({ parsedBrakingData: parsed });
            });
        })
        .catch(err => {});
    }

    componentDidMount = () => {
        const authToken = window.localStorage.getItem('auth_token');

        if (authToken) {
            axios.post(`${host}:${port}/authstatus`, { headers: { 'Authorization' : `Bearer ${authToken}` } }).then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    const { name, email, vehiclesOwned } = res.data.authData;
                    this.setState({ isAuthenticated: true, name, email, vehiclesOwned, currDate: moment().format('YYYY-MM-DD') });
                }
            }).catch(err => {});
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
                    <Container className="my-5">
                        <Card>
                            <Card.Header>
                                <h4 className="m-0">
                                    Pick a Vehicle
                                </h4>
                            </Card.Header>
                            <Card.Body>
                                <Card
                                    style={{ border: 'none' }}
                                    className="px-m font-weight-bold"
                                >
                                    <Card.Body className="p-2">
                                        <Row>
                                            <Col>
                                                Freno ID
                                            </Col>
                                            <Col>
                                                Car Name
                                            </Col>
                                            <Col>
                                                Weight (kg)
                                            </Col>
                                            <Col>
                                                Tire Specs
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                                <Form.Group>
                                    {this.createCarRow()}
                                </Form.Group>
                                <Row className="text-right">
                                    <Col>
                                        <Button variant="outline-success" onClick={() => this.getBrakingData()}>
                                            View Data
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
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
                                        <DatePicker
                                            selected={this.state.startDate}
                                            selectsStart
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            onChange={this.handleChangeStart}
                                        />
                                    </Col>
                                    <Col sm={'auto'} className="px-1">
                                        <DatePicker
                                            selected={this.state.endDate}
                                            selectsEnd
                                            startDate={this.state.startDate}
                                            endDate={this.state.endDate}
                                            minDate={this.state.startDate}
                                            maxDate={new Date()}
                                            onChange={this.handleChangeEnd}
                                        />
                                    </Col>
                                    <Col sm={'auto'} className="px-1 pr-3">
                                        <Button variant="outline-success btn-sm">
                                            Update
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
