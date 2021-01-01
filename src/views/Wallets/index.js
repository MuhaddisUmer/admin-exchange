import moment from 'moment';
import EventBus from 'eventing-bus';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import React, { Component, Fragment } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Loader from '../../components/Loader';
import NumberFormat from '../../components/NumberFormat';
import { getAdminWallets } from '../../store/actions/Auth.js';

import './index.css';

class Wallets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedCoin: '',
      selectedWallet: {},
    }
    props.getAdminWallets();
  };

  componentWillReceiveProps({ adminWallets }) {
    if (adminWallets.length != 0) this.setState({ selectedWallet: adminWallets[0] });

  }

  selectWallet = (e) => {
    let { adminWallets } = this.props;
    this.setState({ selectedWallet: (adminWallets.find(({ symbol }) => symbol == e.target.value)) })
  }

  render() {
    let { adminWallets } = this.props;
    let { selectedWallet } = this.state;
    let coinId = selectedWallet['coinId'] || {};
    return (
      <div className='content'>
        <div className="main-container">
          <div className='main-container-head my-3'>
            <p className="main-container-heading">Admin Wallets</p>
          </div>
          {adminWallets.length === 0
            ? <Loader />
            : <Fragment>
              <div className='edit-add row'>
                <div className="edit-add-body col-12">
                  <ValidatorForm onSubmit={this.selectWallet}>
                    <div className="row">
                      <div className='edit-add-field offset-md-4 col-md-4 offset-md-4 col-sm-12 mt-4'>
                        <TextValidator
                          fullWidth
                          type='text'
                          name='altCoin'
                          value={selectedWallet['symbol']}
                          variant="outlined"
                          id='standard-full-width'
                          className='form-input-field'
                          onChange={this.selectWallet}
                          label={<label>Coin Symbol <span>*</span></label>}
                          select
                          SelectProps={{
                            native: true,
                          }}>
                          {adminWallets.map(data => {
                            return (
                              <option value={data['symbol']}>{data['symbol']}</option>
                            );
                          })}
                        </TextValidator>
                      </div>
                    </div>
                  </ValidatorForm>
                </div>
                <div className="edit-add-body col-12 mt-4">
                  <div className="view-data admin-wallet-data">
                    <div className="view-data-main-title col-12">
                      <img className="mb-2" src={coinId['icon']} alt="coin-img" />
                      <p className="text-dark">{selectedWallet['symbol']} Coin Data</p>
                    </div>
                    <div className="view-data-body col-12">
                      <div className="view-data-row mt-2 col-12">
                        <p className="text-dark"><span className="view-data-title">Coin Name:</span> {coinId['coinName'] ? coinId['coinName'] : ' --'} </p>
                      </div>
                      <div className="view-data-row mt-2 col-12">
                        <p className="text-dark"><span className="view-data-title">Coin Type:</span> {selectedWallet['coinType'] ? selectedWallet['coinType'] : ' --'} </p>
                      </div>
                      <div className="view-data-row mt-2 col-12">
                        <p className="text-dark"><span className="view-data-title">Balance:</span> {selectedWallet['balance'] ? <NumberFormat value={selectedWallet['balance']} coin={selectedWallet['symbol']} /> : ' --'} </p>
                      </div>
                      <div className="view-data-row mt-2 col-12">
                        <p className="text-dark"><span className="view-data-title">Reserve Balance:</span> {selectedWallet['reserveBalance'] ? <NumberFormat value={selectedWallet['reserveBalance']} coin={selectedWallet['symbol']} /> : ' --'} </p>
                      </div>
                      <div className="view-data-row mt-2 col-12">
                        <p className="text-dark"><span className="view-data-title">Address:</span> {selectedWallet['address'] ? selectedWallet['address'] : ' --'} </p>
                      </div>
                      <div className="view-data-row mt-2 col-12">
                        <p className="text-dark"><span className="view-data-title">Token:</span> {selectedWallet['isToken'] ? 'true' : 'false'} </p>
                      </div>
                      <div className="view-data-row mt-2 col-12">
                        <p className="text-dark"><span className="view-data-title">Hot Wallet:</span> {selectedWallet['isHotWallet'] ? 'true' : 'false'} </p>
                      </div>
                      <div className="view-data-row mt-2 col-12">
                        <p className="text-dark"><span className="view-data-title">Created At:</span> {selectedWallet['createdAt'] ? moment(selectedWallet['createdAt']).format('ll') : ' --'} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAdminWallets,
};

const mapStateToProps = ({ Auth }) => {
  let { adminWallets, } = Auth
  return { adminWallets, }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);