import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function CarRow(props) {
    return (
        <Card className="mb-3">
            <Card.Body className="p-2">
                <Container>
                    <Row>
                        <Col>
                            <div className="my-2">
                                {props.name}
                            </div>
                        </Col>
                        <Col md={"auto"}>
                            <Button className="mr-3" variant="outline-info">Edit</Button>
                            <Button variant="outline-danger">Delete</Button>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}

export default CarRow;
