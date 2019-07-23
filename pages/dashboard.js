import React, { Component } from 'react';
import DatePicker from "react-datepicker";;
import NavbarBootstrap from '../components/NavbarBootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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
            arduinoID: 12345,
            currDate: null,
            vehicleSelected: false,
            brakingData: [],
            parsedBrakingData: [],
            dataExistsToDisplay: true,
            data: {
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
                        parsed.push({ x: element.relative_time_count, y: element.dec_x });
                    }
                });

                if (!parsed) {
                    this.setState({ dataExistsToDisplay: false });
                    return;
                }

                this.setState(prevState => ({
                    data: {
                        datasets: [{
                            ...prevState.datasets,
                            data: parsed,
                            label: 'Average Deceleration',
                            backgroundColor: 'rgba(252, 161, 3, 0.5)',
                            borderColor: 'rgb(252, 161, 3)',
                        }],
                    }
                }), () => {
                    console.log(this.state.data);
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
        const { isAuthenticated, name, data, options, vehicleSelected, dataExistsToDisplay } = this.state;

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
                                Deceleration
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
                                {dataExistsToDisplay && (
                                    <Row className="mt-3">
                                        <Col>
                                            <Graph
                                                data={data}
                                                options={options}
                                            />
                                        </Col>
                                    </Row>
                                )}
                            </Card.Body>
                        </Card>
                        <Card className="mt-3">
                            <Card.Header>
                                Braking Torque
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
