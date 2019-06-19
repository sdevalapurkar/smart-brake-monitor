import React, {Component} from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // TODO
        };
    }

    render() {
        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />
                <NavbarBootstrap
                    isAuthenticated={false}
                />
                <Container className="my-3">
                    <Card>
                        <Card.Header>
                            My Account
                        </Card.Header>
                        <Card.Body>
                            Test
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }

}

export default Account;
