import { connect } from 'react-redux';
import ReactTable from 'react-table-6';
import { Link } from "react-router-dom";
import React, { Component, Fragment } from 'react';

import Loader from '../../components/Loader';
import { getAllUsers } from '../../store/actions/User.js';

import './index.css';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    props.getAllUsers();
  };

  render() {
    let { allUsers, isLoading } = this.props;
    const columns = [
      {
        id: 'email',
        Header: 'Email',
        accessor: allUsers => allUsers['email'] ? allUsers['email'] : '-',
      }, {
        id: 'phone',
        Header: 'Phone',
        accessor: allUsers => allUsers['phone'] ? allUsers['phone'] : '-',
      }, {
        id: 'smsEnabled',
        Header: 'SMS Enabled',
        accessor: allUsers => allUsers['smsEnabled'] ? 'True' : 'False',
      }, {
        id: 'twoFaEnabled',
        Header: '2-fa Enabled',
        accessor: allUsers => allUsers['twoFaEnabled'] ? 'True' : 'False',
      }, {
        id: 'antiPhishEnabled',
        Header: 'Anti-Phish Enabled',
        accessor: allUsers => allUsers['antiPhishEnabled'] ? 'True' : 'False',
      }, {
        id: 'result',
        Header: 'Result',
        accessor: allUsers => allUsers['riskProfiling']['result'] ? allUsers['riskProfiling']['result'] : '-',
      }, {
        id: 'actions',
        Header: 'Action',
        accessor: allUsers => <Fragment>
          <Link to={`/home/singleUser?id=${allUsers['_id']}`} className="mx-1 view-btn user-view-btn">
            <i className='fa fa-eye' />
          </Link>
        </Fragment>,
        filterable: false,
      }
    ];

    return (
      <div className='content'>
        <div className="main-container">
          {!allUsers
            ? <Loader />
            : <Fragment>
              <div className='main-container-head mb-3'>
                <p className="main-container-heading">All Users Details</p>
              </div>
              <ReactTable
                className="table"
                data={allUsers}
                resolveData={allUsers => allUsers.map(row => row)}
                columns={columns}
                minRows={8}
                filterable={true}
              />
            </Fragment>
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAllUsers,
};

const mapStateToProps = ({ User }) => {
  let { allUsers, isLoading } = User
  return { allUsers, isLoading }
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);