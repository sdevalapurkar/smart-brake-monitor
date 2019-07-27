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
import DefaultOptions from '../components/dashboard/DefaultOptions';
import MultiDayOptions from '../components/dashboard/MultiDayOptions';

const host = 'http://localhost';
const port = 3001;

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arduinoID: null,
            vehicleName: null,
            vehicleWeight: null,
            vehicleTireSpecs: null,
            decelerationDatasets: [{
                data: null,
                label: 'Average Deceleration',
                backgroundColor: 'rgba(252, 161, 3, 0.5)',
                borderColor: 'rgb(252, 161, 3)',
                showLine: true
            }],
            decelerationData: null,
            decelerationOptions: DefaultOptions,
            decelerationStartDate: new Date(),
            decelerationEndDate: new Date(),
            decelerationDataExistsToDisplay: false,
            torqueDataExistsToDisplay: false
        };
    }

    calculateRating = (totalDeceleration, numDataPoints) => {
        const ratingRatio = totalDeceleration/numDataPoints;

        if (ratingRatio < 0.5) {
            return 'text-success border-success';
        }
        if (ratingRatio < 0.9) {
            return 'text-warning border-warning';
        }

        return 'text-danger border-danger';
    }

    calculateBrakingTorque = (deceleration) => {
        const { vehicleTireSpecs, vehicleWeight } = this.state;

        // calculate wheel radius
        const tireSpecsArr = vehicleTireSpecs.split('/');
        const sidewallHeight = (parseInt(tireSpecsArr[1]) * parseInt(tireSpecsArr[0].substr(1))) / 100;
        const wheelRadius = (0.001) * (((parseInt(tireSpecsArr[2].substr(1)) * 25.4) + (2 * sidewallHeight)) / 2);

        // calculate braking torque
        const brakingTorque = vehicleWeight * deceleration * wheelRadius;

        return brakingTorque;
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

    handleChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.decelerationStartDate;
        endDate = endDate || this.state.decelerationEndDate;
        this.setState({ decelerationStartDate: startDate, decelerationEndDate: endDate });
    }

    handleDecelerationChangeStart = startDate => this.handleChange({ startDate });
    handleDecelerationChangeEnd = endDate => this.handleChange({ endDate });

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
                const decelerationParsed = [];
                const torqueParsed = [];
                const numDataPoints = this.state.brakingData.length;

                // Add initial data points for the day
                decelerationParsed.push({x: 0, y: 0})
                torqueParsed.push({ x: 0, y: 0 });

                let brakingTorque = 0;
                let totalBrakingTorque = 0;
                let totalDeceleration = 0;

                // calculate individual and overall deceleration and braking torque
                this.state.brakingData.forEach(element => {
                    brakingTorque = Math.floor(this.calculateBrakingTorque(element.dec_x) * 100) / 100;
                    totalBrakingTorque += Math.floor(brakingTorque * 100) / 100;
                    totalDeceleration += Math.floor(element.dec_x * 100) / 100;

                    // add deceleration and braking torque values for graph if data for the day exists
                    if (moment(element.drive_date).format('YYYY-MM-DD') === this.state.currDate) {
                        decelerationParsed.push({ x: element.relative_time_count, y: element.dec_x });
                        torqueParsed.push({ x: element.relative_time_count, y: brakingTorque });
                    }
                });

                // calculate ratings for avg deceleration and braking torque (for cards)
                const rating = this.calculateRating(totalDeceleration, numDataPoints);

                // update necessary state for cards
                this.setState({
                    finalAvgBrakingTorque: Math.floor(totalBrakingTorque/numDataPoints * 100) / 100,
                    finalAvgBrakeRating: Math.floor(totalDeceleration/numDataPoints * 100) / 100,
                    finalBrakeRatingVariant: rating
                });

                // if no data exists for the day
                if (decelerationParsed.length === 1) {
                    this.setState({ decelerationDataExistsToDisplay: false, torqueDataExistsToDisplay: false });
                    return;
                }

                this.setState(prevState => ({
                    decelerationDatasets: prevState.decelerationDatasets.map(
                        el => true === true? { ...el, data: decelerationParsed }: el
                    )
                }), () => {
                    let tempDataStore = {};
                    tempDataStore.datasets = this.state.decelerationDatasets;
                    this.setState({ decelerationData: tempDataStore, decelerationDataExistsToDisplay: true });
                });
            });
        })
        .catch(err => {});
    }

    updateDeceleration = () => {
        const { decelerationStartDate, decelerationEndDate, brakingData } = this.state;
        const startDateUTC = moment(decelerationStartDate).format('YYYY-MM-DD');
        const endDateUTC = moment(decelerationEndDate).format('YYYY-MM-DD');
        const decelerationParsed = [];
        let updatedDecelerationParsed = [];

        brakingData.forEach(element => {
            let date = moment(element.drive_date).format('YYYY-MM-DD');

            if (moment(date).isBetween(startDateUTC, endDateUTC, null, '[]')) {
                updatedDecelerationParsed.push(element);
                decelerationParsed.push({ x: element.relative_time_count, y: element.dec_x });
            }
        });

        if (decelerationParsed.length === 0) {
            this.setState({ decelerationDataExistsToDisplay: false });
            return;
        }

        if (moment.duration(moment(endDateUTC).diff(moment(startDateUTC))).asDays() < 2) {
            this.setState(prevState => ({
                decelerationDatasets: prevState.decelerationDatasets.map(
                    el => true === true? { ...el, data: decelerationParsed }: el
                )
            }), () => {
                let tempDataStore = {};
                tempDataStore.datasets = this.state.decelerationDatasets;
                this.setState({ decelerationData: tempDataStore, decelerationOptions: DefaultOptions });
            });
        } else {
            let finalDataObject = [];
            let date = moment(updatedDecelerationParsed[0].drive_date).format('YYYY-MM-DD');
            let avgDecForDay = 0;
            let lastDate = date;
            let counter = 0;

            updatedDecelerationParsed.forEach(element => {
                if (moment(date).isSame(moment(element.drive_date))) {
                    avgDecForDay += element.dec_x;
                    counter++;
                } else {
                    let tempDate = new Date(date);

                    tempDate.setHours(tempDate.getHours() + 8);
                    tempDate = tempDate.setHours(0,0,0,0);

                    finalDataObject.push({ x: tempDate, y: Math.floor(avgDecForDay/counter * 100) / 100 });

                    date = moment(element.drive_date).format('YYYY-MM-DD');
                    console.log(date);
                    let newTempDate = new Date(date);
                    console.log(newTempDate);
                    // newTempDate.setHours(newTempDate.getHours() + 8);
                    // newTempDate = newTempDate.setHours(0,0,0,0);
                    // console.log(newTempDate);
                    lastDate = newTempDate;
                    avgDecForDay = 0;
                    counter = 0;

                    if (moment(date).isSame(moment(element.drive_date))) {
                        avgDecForDay += element.dec_x;
                        counter++;
                    }
                }
            });

            console.log('last date', lastDate);

            if (counter !== 0) {
                finalDataObject.push({ x: lastDate, y: Math.floor(avgDecForDay/counter * 100) / 100 });
            }

            console.log(finalDataObject);

            this.setState(prevState => ({
                decelerationDatasets: prevState.decelerationDatasets.map(
                    el => true === true? { ...el, data: finalDataObject }: el
                )
            }), () => {
                let tempDataStore = {};
                tempDataStore.datasets = this.state.decelerationDatasets;
                this.setState({ decelerationData: tempDataStore, decelerationOptions: MultiDayOptions });
            });

            // this.setState(prevState => ({
            //     xAxesOptions: prevState.xAxesOptions.map(
            //         el => true === true? {
            //             ...el,
            //             type: 'time',
            //             time: {
            //                 unit: 'day',
            //                 unitStepSize: 1,
            //                 displayFormats: {
            //                     'day': 'MMM DD',
            //                 },
            //                 tooltipFormat: 'MMM DD'
            //             },
            //             ticks: {
            //                 stepSize: 1
            //             },
            //             scaleLabel: {
            //                 display: true,
            //                 labelString: 'Dates'
            //             }
            //         }: el
            //     )
            // }));
        }

        this.setState({ decelerationDataExistsToDisplay: true });
    }

    render() {
        const {
            isAuthenticated,
            name,
            vehicleSelected,
            vehicleName,
            finalAvgBrakeRating,
            finalBrakeRatingVariant,
            finalAvgBrakingTorque,
            decelerationStartDate,
            decelerationEndDate,
            decelerationData,
            decelerationOptions,
            decelerationDataExistsToDisplay
        } = this.state;

        console.log('WHAT IS DATAA: ', decelerationData);

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
                                            selected={decelerationStartDate}
                                            selectsStart
                                            startDate={decelerationStartDate}
                                            endDate={decelerationEndDate}
                                            onChange={this.handleDecelerationChangeStart}
                                        />
                                    </Col>
                                    <Col sm={'auto'} className="px-1">
                                        <DatePicker
                                            selected={decelerationEndDate}
                                            selectsEnd
                                            startDate={decelerationStartDate}
                                            endDate={decelerationEndDate}
                                            minDate={decelerationStartDate}
                                            maxDate={new Date()}
                                            onChange={this.handleDecelerationChangeEnd}
                                        />
                                    </Col>
                                    <Col sm={'auto'} className="px-1 pr-3">
                                        <Button onClick={() => this.updateDeceleration()} variant="outline-success btn-sm">
                                            Update
                                        </Button>
                                    </Col>
                                </Row>
                                {!decelerationDataExistsToDisplay && (
                                    <Alert className='mt-4' key={0} variant='danger'>
                                        No braking data for this date range, please select a different range.
                                    </Alert>
                                )}
                                {decelerationDataExistsToDisplay && (
                                    <Row className="mt-3">
                                        <Col>
                                            <Graph
                                                data={decelerationData}
                                                options={decelerationOptions}
                                            />
                                        </Col>
                                    </Row>
                                )}
                            </Card.Body>
                        </Card>
                    </Container>
                )}
            </div>
        );
    }
}

export default Dashboard;
