import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Container
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

// Card Chart 2
const cardChartData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'white',
            borderColor: 'rgba(255,255,255,.55)',
            data: [1, 18, 9, 17, 34, 22, 11],
        },
    ],
};

const cardChartOpts2 = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },
  
        }],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
            max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
          },
        }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  };

class Cards extends Component {
    render() {
        return (
            <Container fluid style={{ paddingTop: '30px' }}>
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" sm="6" lg="3">
                            <Card className="text-white bg-info">
                                <CardBody className="pb-0">
                                    <ButtonGroup className="float-right">
                                        <ButtonDropdown isOpen={false}>
                                            <DropdownToggle caret className="p-0" color="transparent">
                                                <i className="icon-settings"></i>
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>Action</DropdownItem>
                                                <DropdownItem>Another action</DropdownItem>
                                                <DropdownItem disabled>Disabled action</DropdownItem>
                                                <DropdownItem>Something else here</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </ButtonGroup>

                                    <div className="text-value">9.823</div>
                                    <div>Members online</div>
                                </CardBody>

                                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                                    <Line data={cardChartData2} options={cardChartOpts2} height={70} />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

export default Cards;
