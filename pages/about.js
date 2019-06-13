import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Cards from '../components/Cards';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';

class About extends Component {
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
              <Jumbotron fluid>
                <h1>About</h1>
                <p>
                  We are a hella group of codebois bringing the craziest lifesaving new brakes to the VEHICLE market
                </p>
                <p>
                    <Image
                    src={require('../img/logo.png')}
                    width="40"
                    height="40"
                    fluid />
                </p>

              </Jumbotron>

          </div>

        )
    }
}

export default About;
