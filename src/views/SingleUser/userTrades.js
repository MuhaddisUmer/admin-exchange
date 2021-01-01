import moment from 'moment';
import { connect } from 'react-redux';
import ReactTable from 'react-table-6';
import React, { Component, Fragment } from 'react';

import NumberFormat from '../../components/NumberFormat';

import './index.css';

class UserTrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  render() {
    let { userTrades } = this.props;
    const columns = [
      {
        id: 'pair',
        Header: 'Pair',
        accessor: userTrades => userTrades['pair'] ? userTrades['pair'] : '-',
      }, {
        id: 'action',
        Header: 'Side',
        accessor: userTrades => userTrades['action'] === 'buy' ? 'Buy' : 'Sell',
      }, {
        id: 'amount',
        Header: 'Amount',
        accessor: userTrades => <Fragment><NumberFormat value={userTrades['amount']} /></Fragment>,
        filterable: false,
      }, {
        id: 'unitPrice',
        Header: 'Price',
        accessor: userTrades => <Fragment><NumberFormat value={userTrades['unitPrice']} /></Fragment>,
        filterable: false,
      }, {
        id: 'status',
        Header: 'Status',
        accessor: userTrades => userTrades['status'] ? [userTrades['status']] : '-',
      }, {
        id: 'createdAt',
        Header: 'Created At',
        accessor: userTrades => userTrades['createdAt'] ? moment(userTrades['createdAt']).format('ll') : '-',
        filterable: false,
      }, {
        id: 'total',
        Header: 'Total',
        accessor: userTrades => <Fragment><NumberFormat value={userTrades['amount'] * userTrades['unitPrice']} /></Fragment>,
        filterable: false,
      },
    ];
    return (
      <div className='mt-5'>
        <ReactTable
          className="table wallet-table"
          data={userTrades}
          resolveData={userTrades => userTrades.map(row => row)}
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
  let { userTrades } = User;
  return { userTrades }
};
export default connect(mapStateToProps, mapDispatchToProps)(UserTrades);