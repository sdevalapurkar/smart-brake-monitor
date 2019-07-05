import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DeleteVehicleModal from '../components/DeleteVehicleModal';

class CarRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteVehicleModal: false,
        };
    }

    render() {
        const { showDeleteVehicleModal } = this.state;
        const { name, vehiclesOwned, email } = this.props;

        let closeDeleteVehicleModal = () => {
            this.setState({ showDeleteVehicleModal: false });
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
                                <Button className="mr-3" variant="outline-info">Edit</Button>
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
            </Card>
        );
    }
}

export default CarRow;
