import moment from 'moment';
import EventBus from 'eventing-bus';
import { connect } from 'react-redux';
import ReactTable from 'react-table-6';
import Button from '@material-ui/core/Button';
import React, { Component, Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import NumberFormat from '../../components/NumberFormat';

import './index.css';

class UserHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: {
        0: 'Pending',
        1: 'Completed',
        2: 'Failed',
        3: 'Cancelled',
      },
    }
  };

  copied = () => EventBus.publish("success", 'Wallet Address Copied');

  render() {
    let { userHistory } = this.props;
    let { condition } = this.state;
    const columns = [
      {
        id: 'symbol',
        Header: 'Symbol',
        accessor: userHistory => userHistory['symbol'] ? userHistory['symbol'] : '-',
      }, {
        id: 'activityType',
        Header: 'Activity Type',
        accessor: userHistory => userHistory['activityType'] ? userHistory['activityType'] : '-',
      }, {
        id: 'status',
        Header: 'Status',
        accessor: userHistory => userHistory['status'] ? condition[userHistory['status']] : '-',
      }, {
        id: 'value',
        Header: 'Value',
        accessor: userHistory => <Fragment><NumberFormat value={userHistory['value']} coin={userHistory['symbol']} /></Fragment>,
        filterable: false,
      }, {
        id: 'createdAt',
        Header: 'Created At',
        accessor: userHistory => userHistory['createdAt'] ? moment(userHistory['createdAt']).format('ll') : '-',
        filterable: false,
      }, {
        id: 'transactionHash',
        Header: 'Transaction Hash',
        accessor: userHistory => <Fragment>
          {(userHistory['transactionHash']) && <CopyToClipboard text={userHistory['transactionHash']}
            onCopy={this.copied}>
            <Button variant="outlined" className='mx-1 view-btn'><i className='fa fa-clipboard' /></Button>
          </CopyToClipboard>}
        </Fragment>,
        filterable: false,
      }, {
        id: 'toAddress',
        Header: 'To Address',
        accessor: userHistory => <Fragment>
          {(userHistory['toAddress']) && <CopyToClipboard text={userHistory['toAddress']}
            onCopy={this.copied}>
            <Button variant="outlined" className='mx-1 view-btn'><i className='fa fa-clipboard' /></Button>
          </CopyToClipboard>}
        </Fragment>,
        filterable: false,
      },
    ];
    return (
      <div className='mt-5'>
        <ReactTable
          className="table wallet-table"
          data={userHistory}
          resolveData={userHistory => userHistory.map(row => row)}
          columns={columns}
          minRows={8}
          filterable={true}
        />
      </div>
    )
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = ({ User }) => {
  let { userHistory } = User;
  return { userHistory }
};
export default connect(mapStateToProps, mapDispatchToProps)(UserHistory);