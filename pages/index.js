import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Background from '../img/background.jpeg';

class Index extends Component {
    render() {
        return (
            <div style={{ backgroundImage: `url(${Background})`, maxWidth: '100%', height: '100%' }}>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />
                <NavbarBootstrap
                    isAuthenticated={false}
                />
            </div>
        )
    }
}

export default Index;
