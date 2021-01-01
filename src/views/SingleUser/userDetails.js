import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import './index.css';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  render() {
    let { userDetails } = this.props;
    return (
      <div className="view-data row mt-5 mr-5 mb-3">
        <div className="view-data-body col-12">
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Email:</span> {userDetails['email'] ? userDetails['email'] : '--'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Phone:</span> {userDetails['phone'] ? userDetails['phone'] : "--"} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">SMS Enabled:</span> {userDetails['smsEnabled'] ? 'True' : 'False'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">2-fa Enabled:</span> {userDetails['twoFaEnabled'] ? 'True' : 'False'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Anti-PhishEnabled:</span> {userDetails['antiPhishEnabled'] ? 'True' : 'False'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Risk Profiling Score:</span> {userDetails['riskProfiling']['score'] ? userDetails['riskProfiling']['score'] : '-'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Last IP:</span> {userDetails['lastIp'] ? userDetails['lastIp'] : '--'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Last Login:</span> {userDetails['lastLogin'] ? moment(userDetails['lastLogin']).format('ll') : '--'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Created At:</span> {userDetails['createdAt'] ? moment(userDetails['createdAt']).format('ll') : '--'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Updated At:</span> {userDetails['updatedAt'] ? moment(userDetails['updatedAt']).format('ll') : '--'} </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = ({ User }) => {
  let { userDetails } = User;
  return { userDetails }
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);