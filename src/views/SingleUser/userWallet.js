import EventBus from 'eventing-bus';
import { connect } from 'react-redux';
import ReactTable from 'react-table-6';
import Button from '@material-ui/core/Button';
import React, { Component, Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import NumberFormat from '../../components/NumberFormat';

import './index.css';

class UserWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  copied = () => EventBus.publish("success", 'Wallet Address Copied');

  render() {
    let { userWallet } = this.props;
    const columns = [
      {
        id: 'coin',
        Header: 'Coin',
        accessor:
          userWallet => <Fragment>
            {userWallet['symbol'] &&
              <Fragment>
                <img className="coin-img mr-3" src={userWallet['coinId']['icon']} alt="" />
                <p className="coin-symbol">{userWallet['symbol']}</p>
              </Fragment>}
          </Fragment>,
        filterable: false,
      }, {
        id: 'coinName',
        Header: 'Coin Name',
        accessor: userWallet => userWallet['coinId']['coinName'] ? userWallet['coinId']['coinName'] : '-',
      }, {
        id: 'confirmedBalance',
        Header: 'Confirmed Balance',
        accessor: userWallet => <Fragment><NumberFormat value={userWallet['confirmedBalance']} coin={userWallet['symbol']} /></Fragment>,
        filterable: false,
      }, {
        id: 'onholdBalance',
        Header: 'Onhold Balance',
        accessor: userWallet => <Fragment><NumberFormat value={userWallet['onholdBalance']} coin={userWallet['symbol']} /></Fragment>,
        filterable: false,
      }, {
        id: 'address',
        Header: 'Address',
        accessor: userWallet => <Fragment>
          {(userWallet['address']) && <CopyToClipboard text={userWallet['address']}
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
          data={userWallet}
          resolveData={userWallet => userWallet.map(row => row)}
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
  let { userWallet } = User;
  return { userWallet }
};
export default connect(mapStateToProps, mapDispatchToProps)(UserWallet);