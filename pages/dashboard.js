import React, { Component } from 'react';
import DatePicker from "react-datepicker";;
import NavbarBootstrap from '../components/NavbarBootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Graph from '../components/dashboard/Graph'
import BrakeInfoCard from '../components/dashboard/BrakeInfoCard'
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
            vehicleName: '',
            currDate: null,
            vehicleSelected: false,
            brakingData: [],
            parsedBrakingData: [],
            dataExistsToDisplay: true,
            data: null,
            options: {
                bezierCurve: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 5
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Deceleration'
                          }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Minutes'
                          }
                    }]
                }
            },
            startDate: new Date(),
            endDate: new Date(),
            startDateTorque: new Date(),
            endDateTorque: new Date()
        };

        this.getBrakingData = this.getBrakingData.bind(this);
        this.updateDeceleration = this.updateDeceleration.bind(this);
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
                                    onChange={() => this.setState({ arduinoID: vehiclesOwned[v].id, vehicleName: vehiclesOwned[v].name })}
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

    handleChangeTorque = ({ startDateTorque, endDateTorque }) => {
        startDateTorque = startDateTorque || this.state.startDateTorque;
        endDateTorque = endDateTorque || this.state.endDateTorque;
        this.setState({ startDateTorque, endDateTorque });
    }

    handleChangeStart = startDate => this.handleChange({ startDate });
    handleChangeEnd = endDate => this.handleChange({ endDate });
    handleChangeStartTorque = startDateTorque => this.handleChangeTorque({ startDateTorque });
    handleChangeEndTorque = endDateTorque => this.handleChangeTorque({ endDateTorque });

    updateDeceleration = () => {
        const { startDate, endDate, brakingData } = this.state;
        const startDateUTC = moment(startDate).format('YYYY-MM-DD');
        const endDateUTC = moment(endDate).format('YYYY-MM-DD');

        const parsed = [];
        let updatedParsed = [];
        brakingData.forEach(element => {
            let date = moment(element.drive_date).format('YYYY-MM-DD');
            if (moment(date).isBetween(startDateUTC, endDateUTC, null, '[]')) {
                updatedParsed.push(element);
                parsed.push({ x: element.relative_time_count, y: element.dec_x });
            }
        });

        if (parsed.length === 0) {
            this.setState({ dataExistsToDisplay: false });
            return;
        }

        if (moment.duration(moment(endDateUTC).diff(moment(startDateUTC))).asDays() < 7) {
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
            }));
        } else {
            let finalDataObject = [];
            finalDataObject.push({x: 0, y: 0});
            let date = moment(updatedParsed[0].drive_date).format('YYYY-MM-DD');
            let avgDecForDay = 0;
            let counter = 0;
            let xCount = 1;
            console.log('updatedparsed: ', updatedParsed);
            updatedParsed.forEach(element => {
                console.log(date);
                console.log(element.drive_date);
                console.log('counter here:', counter);
                console.log('avg here is:', avgDecForDay);
                console.log(moment(date).isSame(moment(element.drive_date)));
                if (moment(date).isSame(moment(element.drive_date))) {
                    avgDecForDay += element.dec_x;
                    counter++;
                } else {
                    console.log('in else case:', avgDecForDay);
                    finalDataObject.push({ x: xCount, y: Math.floor(avgDecForDay/counter * 100) / 100 });
                    xCount++;
                    date = moment(element.drive_date).format('YYYY-MM-DD');
                    avgDecForDay = 0;
                    counter = 0;
                    if (moment(date).isSame(moment(element.drive_date))) {
                        avgDecForDay += element.dec_x;
                        counter++;
                    }
                }
            });

            if (counter !== 0) {
                finalDataObject.push({ x: xCount, y: Math.floor(avgDecForDay/counter * 100) / 100 });
            }

            console.log(finalDataObject);
            this.setState(prevState => ({
                data: {
                    datasets: [{
                        ...prevState.datasets,
                        data: finalDataObject,
                        label: 'Average Deceleration',
                        backgroundColor: 'rgba(252, 161, 3, 0.5)',
                        borderColor: 'rgb(252, 161, 3)',
                    }],
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Deceleration'
                              }
                        }],
                        xAxes: [{
                            ...prevState.xAxes,
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Days'
                              }
                        }]
                    }
                },
            }));
        }

        this.setState({ parsedBrakingData: parsed, dataExistsToDisplay: true });
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
            this.setState({ vehicleSelected: true, brakingData: res.data.brakingData }, () => {
                const parsed = [];

                // Add fake data for visualization purposes
                parsed.push({x: 0, y: 0})

                this.state.brakingData.forEach(element => {
                    if (moment(element.drive_date).format('YYYY-MM-DD') === this.state.currDate) {
                        parsed.push({ x: element.relative_time_count, y: element.dec_x });
                    }
                });

                if (parsed.length === 0) {
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
                            showLine: true,
                        }],
                    }
                }));

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
                    const { name, email, vehiclesOwned } = res.data.authData;
                    this.setState({ isAuthenticated: true, name, email, vehiclesOwned, currDate: moment().format('YYYY-MM-DD') });
                }
            }).catch(err => {});
        } else {
            location.replace('/');
        }
    }

    render() {
        const { isAuthenticated, name, data, options, vehicleSelected, dataExistsToDisplay, vehicleName } = this.state;

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
                        <Row className="text-center">
                            <Col>
                                <h1>
                                    {vehicleName}
                                </h1>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <BrakeInfoCard
                                    topText="Average Brake Rating"
                                    midText="2.2"
                                    botText="Learn More"
                                    onClick={()=>alert("hello world")}
                                    variant="bg-success"
                                />
                            </Col>
                            <Col>
                                <BrakeInfoCard
                                    topText="Average Braking Torque"
                                    midText="15 Nm"
                                    botText="Learn More"
                                    variant="bg-warning"
                                />
                            </Col>
                            <Col>
                                <BrakeInfoCard
                                    topText="Good Braking Streak"
                                    midText="5 Days"
                                    botText="Learn More"
                                    onClick={()=>alert("hello")}
                                    variant="bg-secondary"
                                />
                            </Col>
                        </Row>
                        <Card className="mt-3">
                            <Card.Header>
                                <h5 className="m-0">
                                    Deceleration
                                </h5>
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
                                        <Button onClick={() => this.updateDeceleration()} variant="outline-success btn-sm">
                                            Update
                                        </Button>
                                    </Col>
                                </Row>
                                {!dataExistsToDisplay && (
                                    <Alert className='mt-4' key={0} variant='danger'>
                                        No braking data for this date range, please select a different range.
                                    </Alert>
                                )}
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
                                <h5 className="m-0">
                                    Braking Torque
                                </h5>
                            </Card.Header>
                            <Card.Body>
                                <Row className="justify-content-end">
                                    <Col sm={'auto'} className="px-1">
                                        <DatePicker
                                            selected={this.state.startDateTorque}
                                            selectsStart
                                            startDate={this.state.startDateTorque}
                                            endDate={this.state.endDateTorque}
                                            onChange={this.handleChangeStartTorque}
                                        />
                                    </Col>
                                    <Col sm={'auto'} className="px-1">
                                        <DatePicker
                                            selected={this.state.endDateTorque}
                                            selectsEnd
                                            startDate={this.state.startDateTorque}
                                            endDate={this.state.endDateTorque}
                                            minDate={this.state.startDateTorque}
                                            maxDate={new Date()}
                                            onChange={this.handleChangeEndTorque}
                                        />
                                    </Col>
                                    <Col sm={'auto'} className="px-1 pr-3">
                                        <Button variant="outline-success btn-sm">
                                            Update
                                        </Button>
                                    </Col>
                                </Row>
                                {!dataExistsToDisplay && (
                                    <Alert className='mt-4' key={0} variant='danger'>
                                        No braking data for this date range, please select a different range.
                                    </Alert>
                                )}
                                {dataExistsToDisplay && (
                                    <Row>
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
                    </Container>
                )}
            </div>
        )
    }
}

export default Dashboard;
