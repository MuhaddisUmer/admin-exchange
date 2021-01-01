import { connect } from 'react-redux';
import ReactTable from 'react-table-6';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import React, { Component, Fragment } from 'react';

import Loader from '../../components/Loader';
import { getContactRequest, resolveTicket } from '../../store/actions/User.js';

import './index.css';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    props.getContactRequest();
  };

  handleResolve = (id) => this.props.resolveTicket({ data: id });

  render() {
    let { link } = this.state;
    let { allContacts, isLoading } = this.props;
    const columns = [
      {
        id: 'name',
        Header: 'Name',
        accessor: allContacts => allContacts['name'] ? allContacts['name'] : '-',
      }, {
        id: 'email',
        Header: 'Email',
        accessor: allContacts => allContacts['email'] ? allContacts['email'] : '-',
      }, {
        id: 'message',
        Header: 'Message',
        accessor: allContacts => allContacts['message'] ? allContacts['message'] : '-',
      }, {
        id: 'attachment',
        Header: 'Attachment',
        accessor: allContacts => <Fragment>
          {allContacts['attachment'] 
          ? <a href={allContacts['attachment']['location']} target="_blank" rel="noopener noreferrer" download
          className="mx-1 edit-btn user-view-btn">Download</a>
          : "No Attachment"}
        </Fragment>,
        filterable: false,
      }, {
        id: 'actions',
        Header: 'Action',
        accessor: allContacts => <Fragment>
          {allContacts['status'] == "Resolved"
          ? "Resolved"
          : <Button variant="outlined" className="mx-1 view-btn" onClick={() => this.handleResolve(allContacts['_id'])}>Resolve</Button>}
        </Fragment>,
        filterable: false,
      }
    ];

    return (
      <div className='content'>
        <div className="main-container">
          {!allContacts
            ? <Loader />
            : <Fragment>
              <div className='main-container-head mb-3'>
                <p className="main-container-heading">All Contacts Details</p>
              </div>
              <ReactTable
                className="table"
                data={allContacts}
                resolveData={allContacts => allContacts.map(row => row)}
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

const mapDispatchToProps = { getContactRequest, resolveTicket };

const mapStateToProps = ({ User }) => {
  let { allContacts, isLoading } = User
  return { allContacts, isLoading }
};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);