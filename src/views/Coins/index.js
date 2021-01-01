import { connect } from 'react-redux';
import ReactTable from 'react-table-6';
import Button from '@material-ui/core/Button';
import React, { Component, Fragment } from 'react';

import Loader from '../../components/Loader';
import NumberFormat from '../../components/NumberFormat';
import { getAllCoins, toggleViewCoin, toggleEditCoin, toggleAddCoin } from '../../store/actions/Coin_Pair.js';

import './index.css';
import Slider from './slider';


class Coins extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    props.getAllCoins();
  };

  showViewSlider = (allCoins) => this.props.toggleViewCoin(allCoins);

  showEditSlider = (allCoins) => this.props.toggleEditCoin(allCoins);

  showAddSlider = (allCoins) => this.props.toggleAddCoin(allCoins);

  render() {
    let { allCoins } = this.props;
    const columns = [
      {
        id: 'coin',
        Header: 'Coin',
        accessor:
          allCoins => <Fragment>
            {allCoins['symbol'] &&
              <Fragment>
                <img className="coin-img mr-3" src={allCoins['icon']} alt="" />
                <p className="coin-symbol">{allCoins['symbol']}</p>
              </Fragment>}
          </Fragment>,
        filterable: false,
      }, {
        id: 'coinName',
        Header: 'Coin Name',
        accessor: allCoins => allCoins['coinName'] ? allCoins['coinName'] : '-',
      }, {
        id: 'decimalLimit',
        Header: 'Decimals',
        accessor: allCoins => allCoins['decimalLimit'] ? allCoins['decimalLimit'] : '-',
      }, {
        id: 'minWithdraw',
        Header: 'Min Withdraw',
        accessor: allCoins => <Fragment><NumberFormat value={allCoins['minWithdraw']} coin={allCoins['symbol']} /></Fragment>,
        filterable: false,
      }, {
        id: 'maxWithdraw',
        Header: 'Max Withdraw',
        accessor: allCoins => <Fragment><NumberFormat value={allCoins['maxWithdraw']} coin={allCoins['symbol']} /></Fragment>,
        filterable: false,
      }, {
        id: 'withdrawFee',
        Header: 'Withdraw Fee',
        accessor: allCoins => <Fragment><NumberFormat value={allCoins['withdrawFee']} coin={allCoins['symbol']} /></Fragment>,
        filterable: false,
      }, {
        id: 'actions',
        Header: 'Actions',
        accessor: allCoins => <Fragment>
          <Button variant="outlined" className="mx-1 view-btn" onClick={() => this.showViewSlider(allCoins)}><i className='fa fa-eye' /></Button>
          <Button variant="outlined" className="mx-1 edit-btn" onClick={() => this.showEditSlider(allCoins)}><i className='fa fa-edit' /></Button>
        </Fragment>,
        filterable: false,
      }
    ];

    return (
      <div className='content'>
        <div className="main-container">
          <Slider />
              <div className='main-container-head mb-3'>
                <p className="main-container-heading">All Coin Details</p>
                <Button variant="outlined" className="add-btn" onClick={() => this.showAddSlider(allCoins)}><i className='fa fa-plus mr-2' />Add Coin</Button>
              </div>
              <ReactTable
                className="table coins-table"
                data={allCoins}
                resolveData={allCoins => allCoins.map(row => row)}
                columns={columns}
                minRows={8}
                filterable={true}
              />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAllCoins,
  toggleViewCoin,
  toggleEditCoin,
  toggleAddCoin,
};

const mapStateToProps = ({ Coin_Pair }) => {
  let { allCoins, } = Coin_Pair
  return { allCoins, }
};

export default connect(mapStateToProps, mapDispatchToProps)(Coins);