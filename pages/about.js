import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Cards from '../components/Cards';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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

              <Row className="justify-content-md-center">
                <h1>About Us</h1>
              </Row>
              <Row className="justify-content-md-center">
                <h6>
                  We are University of Victoria Engineering students.<br />
                  Brakes Supreme was created as part of our capstone project course: ECE/SENG 499.<br />
                  Our group was formed in May 2019<br />
                </h6>
              </Row>
              <Row>
                <Col md="auto">
                  <Figure>
                    <Figure.Image
                      width={110}
                      height={118}
                      alt="110x118"
                      src={require('../img/logo.png')}
                    />
                    <Figure.Caption>
                      Adam - software
                    </Figure.Caption>
                  </Figure>
                </Col>
                <Col md="auto">
                  <Figure>
                    <Figure.Image
                      width={110}
                      height={118}
                      alt="110x118"
                      src={require('../img/logo.png')}
                    />
                    <Figure.Caption>
                      Arshi - software
                    </Figure.Caption>
                  </Figure>
                </Col>
              </Row>
              <Row>
                <Col md="auto">
                  <Figure>
                    <Figure.Image
                      width={110}
                      height={118}
                      alt="110x118"
                      src={require('../img/logo.png')}
                    />
                    <Figure.Caption>
                      Shreyas - software
                    </Figure.Caption>
                  </Figure>
                </Col>
                <Col md="auto">
                  <Figure>
                    <Figure.Image
                      width={110}
                      height={118}
                      alt="110x118"
                      src={require('../img/logo.png')}
                    />
                    <Figure.Caption>
                      Eli - soft/hardware
                    </Figure.Caption>
                  </Figure>
                </Col>
              </Row>
              <Row>
                <Col md="auto">
                  <Figure>
                    <Figure.Image
                      width={110}
                      height={118}
                      alt="110x118"
                      src={require('../img/logo.png')}
                    />
                    <Figure.Caption>
                      Sajan - hardware
                    </Figure.Caption>
                  </Figure>
                </Col>
                <Col md="auto">
                  <Figure>
                    <Figure.Image
                      width={110}
                      height={118}
                      alt="110x118"
                      src={require('../img/logo.png')}
                    />
                    <Figure.Caption>
                      Rickus - hardware
                    </Figure.Caption>
                  </Figure>
                </Col>
              </Row>

          </div>

        )
    }
}

export default About;
