import { connect } from 'react-redux';
import React, { Component } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, } from "reactstrap";

import Loader from '../../components/Loader';
import { getDashboardStats } from '../../store/actions/Auth.js';

import "./index.css"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    props.getDashboardStats();
  }

  render() {
    let { totalUsers, totalDeposits, totalWithdrawals, newUsers, newTrades, pairTrades, newDeposit, coinDeposit, newWithdrawal, coinWithdawal, } = this.props.dashboardStats;

    let new_users = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: newUsers['labels'],
          datasets: [{
            label: "This Month Users",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 10,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: newUsers['data']
          }]
        };
      },
      options: chart_options
    };

    // let new_trades = {
    //   labels: newTrades['labels'],
    //   datasets: [{
    //     data: newTrades['data'],
    //     backgroundColor: ["#296ff5", "#77e30e", "#FFCE56", "#36A2EB", "#FFCE56", '#FFB399', '#ADFF2F', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
    //     hoverBackgroundColor: ["#296ff5", "#77e30e", "#FFCE56", "#36A2EB", "#FFCE56", '#FFB399', '#ADFF2F', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
    //   }]
    // };
    let new_trades = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)");

        return {
          labels: newTrades['labels'],
          datasets: [{
            label: "New Withdrawal",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 10,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: newTrades['data']
          }]
        };
      },
      options: chart_options
    };

    // let pair_trades = {
    //   labels: pairTrades['labels'],
    //   datasets: [{
    //     data: pairTrades['data'],
    //     backgroundColor: ["#296ff5", "#77e30e", "#FFCE56", "#36A2EB", "#FFCE56", '#FFB399', '#ADFF2F', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
    //     hoverBackgroundColor: ["#296ff5", "#77e30e", "#FFCE56", "#36A2EB", "#FFCE56", '#FFB399', '#ADFF2F', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
    //   }]
    // };
    let pair_trades = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)");

        return {
          labels: pairTrades['labels'],
          datasets: [{
            label: "New Withdrawal",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 10,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: pairTrades['data']
          }]
        };
      },
      options: chart_options
    };

    let new_deposit = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: newDeposit['labels'],
          datasets: [{
            label: "New Deposit",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: newDeposit['data']
          }]
        };
      },
      options: chart_options
    };

    let coin_deposit = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: coinDeposit['labels'],
          datasets: [{
            label: "Coin Deposit",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: coinDeposit['data']
          }]
        };
      },
      options: chart_options
    };

    let new_withdrawal = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)");

        return {
          labels: newWithdrawal['labels'],
          datasets: [{
            label: "New Withdrawal",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 10,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: newWithdrawal['data']
          }]
        };
      },
      options: chart_options
    };

    let coin_withdrawal = {
      data: canvas => {
        let ctx = canvas.getContext("2d");
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(0, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: coinWithdawal['labels'],
          datasets: [{
            label: "Coin Withdrawal",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 10,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: coinWithdawal['data']
          }]
        };
      },
      options: chart_options
    };

    return (
      <div className="content">
        {totalUsers == 0
          ? <Loader />
          : <div id="capture">
            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h3">
                      <div tag="h2">New Users</div>
                      <div className='row'>
                        <i className="tim-icons icon-delivery-fast text-primary mx-3" />
                        <h4 className="card-category mx-2">Total Users: {totalUsers}</h4>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={new_users.data}
                        options={new_users.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Trades</h5>
                    <CardTitle tag="h3">
                      <div tag="h2">Trades Stats</div>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={new_trades.data}
                        options={new_trades.options}
                      />
                      {/* <Doughnut data={new_trades} options={donutOptions} /> */}
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Pair Trades</h5>
                    <CardTitle tag="h3">
                      <div tag="h2">Pair Trades Stats</div>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={pair_trades.data}
                        options={pair_trades.options}
                      />
                      {/* <Doughnut data={pair_trades} options={donutOptions} /> */}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h3">
                      <div tag="h2">Withdrawal per Coin</div>
                      <div className='row'>
                        <i className="tim-icons icon-delivery-fast text-primary mx-3" />
                        <h4 className="card-category mx-2">Total Withdrawals: {totalWithdrawals}</h4>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={coin_withdrawal.data}
                        options={coin_withdrawal.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h3">
                      <div tag="h2">Deposit per Coin</div>
                      <div className='row'>
                        <i className="tim-icons icon-delivery-fast text-primary mx-3" />
                        <h4 className="card-category mx-2">Total Deposits: {totalDeposits}</h4>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={coin_deposit.data}
                        options={coin_deposit.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h3">
                      <div tag="h2">Withdrawal History</div>
                      <div className='row'>
                        <i className="tim-icons icon-delivery-fast text-primary mx-3" />
                        <h4 className="card-category mx-2"></h4>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={new_withdrawal.data}
                        options={new_withdrawal.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h3">
                      <div tag="h2">Deposit History</div>
                      <div className='row'>
                        <i className="tim-icons icon-delivery-fast text-primary mx-3" />
                        <h4 className="card-category mx-2"></h4>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={new_deposit.data}
                        options={new_deposit.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  let { dashboardStats } = Auth
  return { dashboardStats }
};

const mapDispatchToProps = { getDashboardStats };
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


let chart_options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: -1,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [{
      barPercentage: 0.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.0)",
        zeroLineColor: "transparent"
      },
      ticks: {
        beginAtZero: true,
        suggestedMin: 10,
        suggestedMax: 10,
        padding: 10,
        fontColor: "#9a9a9a"
      }
    }],
    xAxes: [{
      barPercentage: 0.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.1)",
        zeroLineColor: "transparent"
      },
      ticks: {
        padding: 10,
        fontColor: "#9a9a9a"
      }
    }]
  }
};

let donutOptions = {
  maintainAspectRatio: false,
  legend: {
    display: true
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true
};