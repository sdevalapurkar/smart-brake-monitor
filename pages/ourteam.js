import React, { Component } from 'react';
import NavbarBootstrap from '../components/NavbarBootstrap';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Background from '../img/background.jpeg';
import axios from 'axios';
import './ourteam.css';

class Ourteam extends Component {

  constructor(props) {
    super(props);

    this.state = {
        isAuthenticated: false,
        name: '',
    };
  }

  componentDidMount = () => {
      const authToken = window.localStorage.getItem('auth_token');

      if (authToken) {
          axios.post(`${host}:${port}/authstatus`, { headers: { 'Authorization' : `Bearer ${authToken}` } }).then(res => {
              if (res.status === 200) {
                  this.setState({ isAuthenticated: true, name: res.data.authData.name });
              }
          }).catch(err => {});
      }
  }


  render() {
    return (

      <div style={{ backgroundImage: `url(${Background})`, maxWidth: '100%', height: '100%' }}>
          <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossorigin="anonymous"
          />
          <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
              integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
              crossorigin="anonymous"
          />
          <link
              href="https://fonts.googleapis.com/css?family=Raleway"
              rel="stylesheet"
          />
          <header>
            <NavbarBootstrap
                isAuthenticated={false}
            />
            <div className="head">
              <h1>Our Team</h1>
              <div>
                <p>
                  We are a team of five University of Victoria Engineering students.
                  Brakes Supreme was created as part of our capstone project course: ECE/SENG 499.
                  Our group was formed in May 2019.
                </p>
              </div>
            </div>
          </header>

          <main>
            <div>
              <div className="us">
                <div className="us-one">
                  <p>
                    <Image
                      width={140}
                      height={140}
                      src={require('../img/eli.jpg')}  />
                      <p className="us-title">Eli</p>
                      <p>Software/Hardware</p>
                  </p>
                </div>
                <div className="us-two">
                  <p className="us-picture">
                    <Image
                      width={140}
                      height={140}
                      src={require('../img/arshi.jpg')}  />
                    <p className="us-title">Arshi</p>
                    <p>Software</p>
                  </p>
                </div>
                <div className="us-three">
                  <p className="us-picture">
                    <Image
                      width={140}
                      height={140}
                      src={require('../img/shreyas.png')}  />
                    <p className="us-title">Shreyas</p>
                    <p>Software</p>
                  </p>
                </div>
              </div>
              <div className="us">
                <div className="us-one">
                  <p className="us-picture">
                    <Image
                      width={140}
                      height={140}
                      src={require('../img/rickus.jpg')}  />
                    <p className="us-title">Rickus</p>
                    <p>Hardware</p>
                  </p>
                </div>
                <div className="us-two">
                  <p className="us-picture">
                    <Image
                      width={140}
                      height={140}
                      src={require('../img/sajan.png')}  />
                    <p className="us-title">Sajan</p>
                    <p>Hardware</p>
                  </p>
                </div>
                <div className="us-three">
                  <p className="us-picture">
                    <Image
                      width={140}
                      height={140}
                      src={require('../img/adam.jpg')}  />
                    <p className="us-title">Adam</p>
                    <p>Software/Hardware</p>
                  </p>
                </div>
              </div>
            </div>

            <div className="ack">
              <h1>Acknowledgements</h1>
            </div>
            <div className="ack">
              <h1>
                <Image
                  className="ack-image"
                  src={require('../img/sima.jpg')}
                  width={340}
                  height={240}
                />
              </h1>
              <Card style={{ width: '40rem' }} bg="#f8f9fa" border="dark">
                <Card.Body>
                  <Card.Title>Mihai Sima</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Supervisor</Card.Subtitle>
                  <Card.Text>
                  We would like to thank Mihai Sima for
                   his help with the grading and design.
                  Professor Mihai Sima specializes in embedded systems and electrical engineering.
                  </Card.Text>
                  <Card.Link href="https://www.ece.uvic.ca/~msima/">Website</Card.Link>
                </Card.Body>
              </Card>

            </div>


          </main>
          <div className="m-5"/>
      </div>

    )
  }
}

export default Ourteam;
