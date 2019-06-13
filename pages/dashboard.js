import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import axios from 'axios';

const host = 'http://localhost';
const port = 3001;

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
        };
    }

    componentDidMount() {
        if (this.props.url.query.name) {
            this.setState({ name: this.props.url.query.name });
            return;
        }

        const email = this.props.url.query.email;

        axios.post(`${host}:${port}/users/getUserByEmail`, {
            'email': email,
        })
        .then(response => {
            const { data } = response;
            this.setState({ name: data.name });
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        const { name } = this.state;

        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />
                <NavbarBootstrap
                    isAuthenticated={true}
                    name={name}
                />
            </div>
        )
    }
}

export default Dashboard;
