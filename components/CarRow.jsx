import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DeleteVehicleModal from '../components/DeleteVehicleModal';
import EditVehicleModal from '../components/EditVehicleModal';

class CarRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteVehicleModal: false,
            showEditVehicleModal: false,
        };
    }

    render() {
        const { showDeleteVehicleModal, showEditVehicleModal } = this.state;
        const { name, vehiclesOwned, email, weight, tireSpecs, arduinoID } = this.props;

        let closeDeleteVehicleModal = () => {
            this.setState({ showDeleteVehicleModal: false });
            location.reload();
        }

        let closeEditVehicleModal = () => {
            this.setState({ showEditVehicleModal: false });
            location.reload();
        }

        return (
            <Card className="mb-3">
                <Card.Body className="p-2">
                    <Container>
                        <Row>
                            <Col>
                                <div className="my-2">
                                    {name}
                                </div>
                            </Col>
                            <Col md={"auto"}>
                                <Button className="mr-3" variant="outline-info" onClick={() => this.setState({ showEditVehicleModal: true })}>Edit</Button>
                                <Button variant="outline-danger" onClick={() => this.setState({ showDeleteVehicleModal: true })}>Delete</Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>

                <DeleteVehicleModal
                    show={showDeleteVehicleModal}
                    onHide={closeDeleteVehicleModal}
                    carName={name}
                    vehiclesOwned={vehiclesOwned}
                    email={email}
                />

                <EditVehicleModal
                    show={showEditVehicleModal}
                    onHide={closeEditVehicleModal}
                    name={name}
                    arduinoID={arduinoID}
                    weight={weight}
                    tireSpecs={tireSpecs}
                    vehiclesOwned={vehiclesOwned}
                    email={email}
                />
            </Card>
        );
    }
}

export default CarRow;
