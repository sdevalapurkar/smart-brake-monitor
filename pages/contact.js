import React, {Component} from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class Contact extends Component {
    render() {
        return (<div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <NavbarBootstrap isAuthenticated={false}/>

            <Container className="my-3">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Contact Us</Card.Title>
                                <Card.Text>
                                    <Form action="https://formspree.io/brakessupreme@gmail.com" method="POST" >
                                        <Form.Group controlId="nameInput">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                name="name"
                                                type="text"
                                                placeholder="John Smith"
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="emailInput">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                name="email"
                                                type="email"
                                                placeholder="john.smith@mail.me"
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="messageTextarea">
                                            <Form.Label>Message</Form.Label>
                                            <Form.Control
                                                name="message"
                                                as="textarea"
                                                rows="5"
                                                placeholder="Go ahead, we're listening..."
                                                required
                                            />
                                        </Form.Group>
                                        <Button variant="outline-info" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>)
    }
}

export default Contact;
