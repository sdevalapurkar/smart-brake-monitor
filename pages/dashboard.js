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
            vehicleWeight: null,
            vehicleTireSpecs: null,
            currDate: null,
            vehicleSelected: false,
            brakingData: [],
            parsedBrakingData: [],
            dataExistsToDisplay: true,
            torqueDataExistsToDisplay: false,
            data: null,
            torqueData: null,
            torqueOptions: {
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
                            labelString: 'Braking Torque'
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
            endDateTorque: new Date(),
            finalAvgBrakingTorque: 0,
            finalAvgBrakeRating: 0,
            finalBrakeRatingVariant: '',
            finalBrakingTorqueVariant: '',
        };

        this.getBrakingData = this.getBrakingData.bind(this);
        this.updateDeceleration = this.updateDeceleration.bind(this);
        this.updateBrakingTorque = this.updateBrakingTorque.bind(this);
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
                                    onChange={() => this.setState({
                                        arduinoID: vehiclesOwned[v].id,
                                        vehicleName: vehiclesOwned[v].name,
                                        vehicleWeight: vehiclesOwned[v].weight,
                                        vehicleTireSpecs: vehiclesOwned[v].tireSpecs
                                    })}
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

    updateBrakingTorque = () => {
        const { startDateTorque, endDateTorque, brakingData, vehicleTireSpecs, vehicleWeight } = this.state;
        const startDateTorqueUTC = moment(startDateTorque).format('YYYY-MM-DD');
        const endDateTorqueUTC = moment(endDateTorque).format('YYYY-MM-DD');

        const parsed = [];
        let updatedParsed = [];
        brakingData.forEach(element => {
            let date = moment(element.drive_date).format('YYYY-MM-DD');
            if (moment(date).isBetween(startDateTorqueUTC, endDateTorqueUTC, null, '[]')) {
                updatedParsed.push(element);

                // calculate wheel radius
                const tireSpecsArr = vehicleTireSpecs.split('/');
                const sidewallHeight = (parseInt(tireSpecsArr[1]) * parseInt(tireSpecsArr[0].substr(1))) / 100;
                const wheelRadius = (0.001) * (((parseInt(tireSpecsArr[2].substr(1)) * 25.4) + (2 * sidewallHeight)) / 2);
                // calculate braking torque
                const brakingTorque = vehicleWeight * element.dec_x * wheelRadius;

                parsed.push({ x: element.relative_time_count, y: Math.floor(brakingTorque * 100) / 100 });
            }
        });

        if (parsed.length === 0) {
            this.setState({ torqueDataExistsToDisplay: false });
            return;
        }

        if (moment.duration(moment(endDateTorqueUTC).diff(moment(startDateTorqueUTC))).asDays() < 7) {
            this.setState(prevState => ({
                torqueData: {
                    datasets: [{
                        ...prevState.datasets,
                        data: parsed,
                        label: 'Braking Torque',
                        backgroundColor: 'rgba(252, 161, 3, 0.5)',
                        borderColor: 'rgb(252, 161, 3)',
                    }],
                }
            }));
        } else {
            let finalDataObject = [];
            let date = moment(updatedParsed[0].drive_date).format('YYYY-MM-DD');
            let avgTorqueForDay = 0;
            let counter = 0;
            let lastDate = date;
            let xCount = 1;
            console.log('updatedparsed: ', updatedParsed);
            updatedParsed.forEach(element => {
                console.log(date);
                console.log(element.drive_date);
                console.log('counter here:', counter);
                console.log('avg here is:', avgTorqueForDay);
                console.log(moment(date).isSame(moment(element.drive_date)));
                if (moment(date).isSame(moment(element.drive_date))) {
                    // calculate wheel radius
                    const tireSpecsArr = vehicleTireSpecs.split('/');
                    const sidewallHeight = (parseInt(tireSpecsArr[1]) * parseInt(tireSpecsArr[0].substr(1))) / 100;
                    const wheelRadius = (0.001) * (((parseInt(tireSpecsArr[2].substr(1)) * 25.4) + (2 * sidewallHeight)) / 2);
                    // calculate braking torque
                    const brakingTorque = vehicleWeight * element.dec_x * wheelRadius;
                    avgTorqueForDay += brakingTorque;
                    counter++;
                } else {
                    console.log(new Date());
                    console.log('please be right', element.drive_date);
                    console.log('pleaseee', new Date(element.drive_date));
                    console.log(moment(element.drive_date));
                    console.log('type of new date', typeof(new Date()));
                    console.log('type of mement', typeof(moment(element.drive_date)));
                    let tempDate = new Date(element.drive_date);
                    tempDate.setHours(tempDate.getHours() - 8);
                    tempDate = tempDate.setHours(0,0,0,0);
                    finalDataObject.push({ x: tempDate, y: Math.floor(avgTorqueForDay/counter * 100) / 100 });
                    xCount++;
                    date = moment(element.drive_date).format('YYYY-MM-DD');
                    let newTempDate = new Date(date);
                    newTempDate.setHours(newTempDate.getHours() + 8);
                    newTempDate = newTempDate.setHours(0,0,0,0);
                    lastDate = newTempDate;
                    avgTorqueForDay = 0;
                    counter = 0;
                    if (moment(date).isSame(moment(element.drive_date))) {
                        // calculate wheel radius
                        const tireSpecsArr = vehicleTireSpecs.split('/');
                        const sidewallHeight = (parseInt(tireSpecsArr[1]) * parseInt(tireSpecsArr[0].substr(1))) / 100;
                        const wheelRadius = (0.001) * (((parseInt(tireSpecsArr[2].substr(1)) * 25.4) + (2 * sidewallHeight)) / 2);
                        // calculate braking torque
                        const brakingTorque = vehicleWeight * element.dec_x * wheelRadius;
                        avgTorqueForDay += brakingTorque;
                        counter++;
                    }
                }
            });

            if (counter !== 0) {
                finalDataObject.push({ x: lastDate, y: Math.floor(avgTorqueForDay/counter * 100) / 100 });
            }

            console.log(finalDataObject);
            this.setState(prevState => ({
                torqueData: {
                    datasets: [{
                        ...prevState.datasets,
                        data: finalDataObject,
                        label: 'Braking Torque',
                        backgroundColor: 'rgba(252, 161, 3, 0.5)',
                        borderColor: 'rgb(252, 161, 3)',
                        showLine: true,
                    }],
                },
                torqueOptions: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Braking Torque'
                              }
                        }],
                        xAxes: [{
                            ...prevState.xAxes,
                            type: 'time',
                            time: {
                                unit: 'day',
                                unitStepSize: 1,
                                displayFormats: {
                                    'day': 'MMM DD',
                                },
                                tooltipFormat: 'MMM DD'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Dates'
                              }
                        }]
                    }
                },
            }));
        }

        this.setState({ torqueDataExistsToDisplay: true });
    }

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

        console.log('parsed maaaaaan: ', parsed);

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
            // finalDataObject.push({x: 0, y: 0});
            let date = moment(updatedParsed[0].drive_date).format('YYYY-MM-DD');
            let avgDecForDay = 0;
            let lastDate = date;
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
                    let tempDate = new Date(date);
                    console.log('BUGGGG: ', element.drive_date);
                    tempDate.setHours(tempDate.getHours() + 8);
                    tempDate = tempDate.setHours(0,0,0,0);
                    finalDataObject.push({ x: tempDate, y: Math.floor(avgDecForDay/counter * 100) / 100 });
                    xCount++;
                    date = moment(element.drive_date).format('YYYY-MM-DD');
                    let newTempDate = new Date(date);
                    newTempDate.setHours(newTempDate.getHours() + 8);
                    newTempDate = newTempDate.setHours(0,0,0,0);
                    lastDate = newTempDate;
                    avgDecForDay = 0;
                    counter = 0;
                    if (moment(date).isSame(moment(element.drive_date))) {
                        avgDecForDay += element.dec_x;
                        counter++;
                    }
                }
            });

            if (counter !== 0) {
                finalDataObject.push({ x: lastDate, y: Math.floor(avgDecForDay/counter * 100) / 100 });
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
                        showLine: true,
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
                            type: 'time',
                            time: {
                                unit: 'day',
                                unitStepSize: 1,
                                displayFormats: {
                                    'day': 'MMM DD',
                                },
                                tooltipFormat: 'MMM DD'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Dates'
                              }
                        }]
                    }
                },
            }), () => {
                console.log(this.state.data);
            });
        }

        this.setState({ parsedBrakingData: parsed, dataExistsToDisplay: true });
    }

    getBrakingData = () => {
        const { arduinoID, name, email, vehiclesOwned, vehicleTireSpecs, vehicleWeight } = this.state;

        axios.post(`${host}:${port}/getBrakingData`, {
            arduinoID,
            name,
            email,
            vehiclesOwned
        })
        .then(res => {
            this.setState({ vehicleSelected: true, brakingData: res.data.brakingData }, () => {
                const parsed = [];
                const torqueParsed = [];
                let finalBrakingTorque = 0;
                let finalBrakeRating = 0;

                // Add fake data for visualization purposes
                parsed.push({x: 0, y: 0})
                torqueParsed.push({ x: 0, y: 0 });

                this.state.brakingData.forEach(element => {
                    // calculate wheel radius
                    const tireSpecsArr = vehicleTireSpecs.split('/');
                    const sidewallHeight = (parseInt(tireSpecsArr[1]) * parseInt(tireSpecsArr[0].substr(1))) / 100;
                    const wheelRadius = (0.001) * (((parseInt(tireSpecsArr[2].substr(1)) * 25.4) + (2 * sidewallHeight)) / 2);
                    // calculate braking torque
                    const brakingTorque = vehicleWeight * element.dec_x * wheelRadius;

                    finalBrakingTorque += Math.floor(brakingTorque * 100) / 100;
                    finalBrakeRating += Math.floor(element.dec_x * 100) / 100;

                    if (moment(element.drive_date).format('YYYY-MM-DD') === this.state.currDate) {
                        parsed.push({ x: element.relative_time_count, y: element.dec_x });
                        torqueParsed.push({ x: element.relative_time_count, y: Math.floor(brakingTorque * 100) / 100 });
                    }
                });

                console.log('parsed', parsed);

                if (parsed.length === 1) {
                    this.setState({ dataExistsToDisplay: false, torqueDataExistsToDisplay: false });
                } else {
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
                        },
                        torqueData: {
                            datasets: [{
                                ...prevState.datasets,
                                data: torqueParsed,
                                label: 'Braking Torque',
                                backgroundColor: 'rgba(252, 161, 3, 0.5)',
                                borderColor: 'rgb(252, 161, 3)',
                                showLine: true,
                            }],
                        }
                    }));
                }

                let variantRating = '';

                if (finalBrakeRating/this.state.brakingData.length < 0.5) {
                    variantRating = 'text-success border-success';
                } else if (finalBrakeRating/this.state.brakingData.length < 0.7) {
                    variantRating = 'text-info border-info';
                } else if (finalBrakeRating/this.state.brakingData.length < 0.9) {
                    variantRating = 'text-warning border-warning';
                } else {
                    variantRating = 'text-danger border-danger';
                }

                this.setState({
                    parsedBrakingData: parsed,
                    finalAvgBrakingTorque: finalBrakingTorque/this.state.brakingData.length,
                    finalAvgBrakeRating: finalBrakeRating/this.state.brakingData.length,
                    finalBrakeRatingVariant: variantRating
                }, () => {
                    console.log('YOOOOOOOOOOOO', this.state.finalAvgBrakeRating, this.state.finalAvgBrakingTorque);
                });
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
        const {
            isAuthenticated,
            name,
            data,
            torqueData,
            options,
            torqueOptions,
            vehicleSelected,
            dataExistsToDisplay,
            vehicleName,
            finalAvgBrakingTorque,
            finalAvgBrakeRating,
            finalBrakeRatingVariant,
            torqueDataExistsToDisplay
        } = this.state;

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
                        <Row className="mt-4">
                            <Col>
                                <BrakeInfoCard
                                    topText="Average Brake Rating"
                                    midText={finalAvgBrakeRating}
                                    botText="Learn More"
                                    onClick={()=>alert("hello world")}
                                    variant={finalBrakeRatingVariant}
                                />
                            </Col>
                            <Col>
                                <BrakeInfoCard
                                    topText="Average Braking Torque"
                                    midText={`${finalAvgBrakingTorque} Nm`}
                                    botText="Learn More"
                                    variant={finalBrakeRatingVariant}
                                />
                            </Col>
                        </Row>
                        <Card className="mt-3">
                            <Card.Header>
                                <h5 className="m-0">
                                    {`Deceleration for ${vehicleName}`}
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
                                    {`Braking Torque for ${vehicleName}`}
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
                                        <Button onClick={() => this.updateBrakingTorque()} variant="outline-success btn-sm">
                                            Update
                                        </Button>
                                    </Col>
                                </Row>
                                {!torqueDataExistsToDisplay && (
                                    <Alert className='mt-4' key={0} variant='danger'>
                                        No braking data for this date range, please select a different range.
                                    </Alert>
                                )}
                                {torqueDataExistsToDisplay && (
                                    <Row>
                                        <Col>
                                            <Graph
                                                data={torqueData}
                                                options={torqueOptions}
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
