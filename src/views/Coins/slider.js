import moment from 'moment';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import React, { Component, Fragment } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import NumberFormat from '../../components/NumberFormat';
import { toggleViewCoin, toggleEditCoin, editCoin, toggleAddCoin, addCoin } from '../../store/actions/Coin_Pair.js';

export class Slider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      right: false,
      formData: {},
      addCoin: {
        coinName: '', coinType: '', symbol: '', icon: '', decimalLimit: '', status: false, isFiat: false, isToken: false, platform: '', contractAddress: '', isMaster: false,
        confirmations: '', minDeposit: '', minWithdraw: '', maxWithdraw: '', withdrawFee: '', testExplorer: '', mainExplorer: '',
        server: {
          host: '',
          port: '',
        },
        apiServer: {
          host: '',
          port: '',
        },
      },
    };
  };

  componentWillReceiveProps({ singleCoin }) {
    this.setState({ formData: singleCoin })
  };

  /*========== EDIT COIN FUNCTIONS ============= */

  handleEditChange = (e) => {
    let { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  editServerChange = (e) => {
    let { formData } = this.state;
    formData['server'][e.target.name] = e.target.value
    this.setState({ formData })
  };

  editAPIServerChange = (e) => {
    let { formData } = this.state;
    formData['apiServer'][e.target.name] = e.target.value
    this.setState({ formData })
  };

  submitEditCoin = () => {
    let data = this.state.formData;
    this.props.editCoin({ data, id: this.props.singleCoin['_id'] });
  };

  /*========== ADD COIN FUNCTIONS ============= */

  handleAddChange = (e) => {
    let { addCoin } = this.state;
    addCoin[e.target.name] = e.target.value;
    this.setState({ addCoin });
  };

  addServerChange = (e) => {
    let { addCoin } = this.state;
    addCoin['server'][e.target.name] = e.target.value
    this.setState({ addCoin })
  };

  addAPIServerChange = (e) => {
    let { addCoin } = this.state;
    addCoin['apiServer'][e.target.name] = e.target.value
    this.setState({ addCoin })
  };

  submitAddCoin = () => {
    let data = this.state.addCoin;
    if (data['isToken'])
      data['platform'] = 'ethereum';
    this.props.addCoin({ data });
  };


  /*========== VIEW COIN SLIDER ============= */

  coinView = (singleCoin) => {
    return (
      <div className="view-data row">
        <div className="view-data-main-title col-12">
          {singleCoin['symbol'] &&
            <Fragment>
              <img className="mb-2" src={singleCoin['icon']} alt="coin-img" />
              <p className="text-dark">{singleCoin['symbol']} Coin Data</p>
            </Fragment>
          }
        </div>
        <div className="view-data-body col-12">
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Coin Name:</span> {singleCoin['coinName'] ? singleCoin['coinName'] : '--'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Decimals:</span> {singleCoin['decimalLimit'] ? singleCoin['decimalLimit'] : "--"} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Status:</span> {singleCoin['status'] ? 'true' : 'false'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Fiat:</span> {singleCoin['isFiat'] ? 'true' : 'false'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Token:</span> {singleCoin['isToken'] ? 'true' : 'false'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Master Coin:</span> {singleCoin['isMaster'] ? 'true' : 'false'} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Confirmations:</span> {singleCoin['confirmations'] ? singleCoin['confirmations'] : "--"} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Min Deposit:</span> {singleCoin['minDeposit'] ? <NumberFormat value={singleCoin['minDeposit']} coin={singleCoin['symbol']} /> : "--"} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Min Withdraw:</span> {singleCoin['minWithdraw'] ? <NumberFormat value={singleCoin['minWithdraw']} coin={singleCoin['symbol']} /> : "--"} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Max Withdraw:</span> {singleCoin['maxWithdraw'] ? <NumberFormat value={singleCoin['maxWithdraw']} coin={singleCoin['symbol']} /> : "--"} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Withdraw Fee:</span> {singleCoin['withdrawFee'] ? <NumberFormat value={singleCoin['withdrawFee']} coin={singleCoin['symbol']} /> : "--"} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Test Explorer:</span> {singleCoin['testExplorer'] ? singleCoin['testExplorer'] : "--"} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Main Explorer:</span> {singleCoin['mainExplorer'] ? singleCoin['mainExplorer'] : "--"} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <span className="view-data-sub-title text-dark">Node Server:</span>
            <p className="text-dark ml-2"><span className="view-data-title">Host:</span> {singleCoin['server'] ? singleCoin['server']['host'] : "--"} </p>
            <p className="text-dark ml-2"><span className="view-data-title">Port:</span> {singleCoin['server'] ? singleCoin['server']['port'] : "--"} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <span className="view-data-sub-title text-dark">API Server:</span>
            <p className="text-dark ml-2"><span className="view-data-title">Host:</span> {singleCoin['apiServer'] ? singleCoin['apiServer']['host'] : "--"} </p>
            <p className="text-dark ml-2"><span className="view-data-title">Port:</span> {singleCoin['apiServer'] ? singleCoin['apiServer']['port'] : "--"} </p>
          </div>
          <div className="view-data-row mt-2 col-12">
            <p className="text-dark"><span className="view-data-title">Created At:</span> {singleCoin['createdAt'] ? moment(singleCoin['createdAt']).format('ll') : '--'} </p>
          </div>
        </div>
        <div className="view-data-footer mt-4 col-12">
          <Button className="cancel-btn" onClick={() => this.props.toggleViewCoin({})}>Close Slider</Button>
        </div>
      </div>
    );
  };

  /*========== EDIT COIN SLIDER  ============= */

  coinEdit = (singleCoin) => {
    let { formData } = this.state;
    return (
      <div className='edit-add row'>
        <div className="edit-add-title col-12">
          <p className="text-dark">Edit {singleCoin['symbol']} Coin Data</p>
        </div>
        <div className="edit-add-body col-12">
          <ValidatorForm onSubmit={this.submitEditCoin}>
            <div className="row">
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='coinName'
                  value={formData['coinName']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleEditChange}
                  label={<label>Coin Name <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='icon'
                  value={formData['icon']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleEditChange}
                  label={<label>Coin Icon <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='decimalLimit'
                  value={formData['decimalLimit']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleEditChange}
                  label={<label>Decimals <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='status'
                  value={formData['status']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleEditChange}
                  label={<label>Status <span>*</span></label>}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value='true'>true</option>
                  <option value='false'>false</option>
                </TextValidator>
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='confirmations'
                  value={formData['confirmations']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleEditChange}
                  label={<label>Confirmations <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='minDeposit'
                  value={formData['minDeposit']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleEditChange}
                  label={<label>Min Deposit <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='minWithdraw'
                  value={formData['minWithdraw']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleEditChange}
                  label={<label>Min Withdraw <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='maxWithdraw'
                  value={formData['maxWithdraw']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleEditChange}
                  label={<label>Max Withdraw <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-12 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='withdrawFee'
                  value={formData['withdrawFee']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleEditChange}
                  label={<label>Withdraw Fee <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-12 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='testExplorer'
                  value={formData['testExplorer']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleEditChange}
                  label={<label>Test Explorer <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-12 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='mainExplorer'
                  value={formData['mainExplorer']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleEditChange}
                  label={<label>Main Explorer <span>*</span></label>}
                />
              </div>
              <hr className='my-4' />
              {formData['server'] &&
                <Fragment>
                  <p className='col-12 text-dark edit-add-sub-title'>Node Server</p>
                  <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                    <TextValidator
                      fullWidth
                      type='text'
                      name='host'
                      value={formData['server']['host']}
                      variant="outlined"
                      id='standard-full-width'
                      className='form-input-field'
                      onChange={this.editServerChange}
                      label={<label>Host <span>*</span></label>}
                    />
                  </div>
                  <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                    <TextValidator
                      fullWidth
                      type='number'
                      name='port'
                      value={formData['server']['port']}
                      variant="outlined"
                      id='standard-full-width'
                      className='form-input-field'
                      onChange={this.editServerChange}
                      label={<label>Port <span>*</span></label>}
                    />
                  </div>
                </Fragment>
              }
              <hr className='my-4' />
              {formData['apiServer'] &&
                <Fragment>
                  <p className='col-12 text-dark edit-add-sub-title'>API Server</p>
                  <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                    <TextValidator
                      fullWidth
                      type='text'
                      name='host'
                      value={formData['apiServer']['host']}
                      variant="outlined"
                      id='standard-full-width'
                      className='form-input-field'
                      onChange={this.editAPIServerChange}
                      label={<label>Host <span>*</span></label>}
                    />
                  </div>
                  <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                    <TextValidator
                      fullWidth
                      type='number'
                      name='port'
                      value={formData['apiServer']['port']}
                      variant="outlined"
                      id='standard-full-width'
                      className='form-input-field'
                      onChange={this.editAPIServerChange}
                      label={<label>Port <span>*</span></label>}
                    />
                  </div>
                </Fragment>
              }
              <div className='edit-add-buttons col-sm-12 mt-4'>
                <Button className="cancel-btn col-4" onClick={() => this.props.toggleEditCoin({})}>Cancel</Button>
                <Button className="submit-btn col-4" type='submit' onSubmit={this.submitEditCoin}>Submit</Button>
              </div>
            </div>
          </ValidatorForm>
        </div>
      </div>
    );
  };

  /*========== ADD COIN SLIDER  ============= */

  coinAdd = () => {
    let { addCoin } = this.state;
    return (
      <div className='edit-add row'>
        <div className="edit-add-title col-12">
          <p className="text-dark">Add New Coin</p>
        </div>
        <div className="edit-add-body col-12">
          <ValidatorForm onSubmit={this.submitAddCoin}>
            <div className="row">
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='coinName'
                  value={addCoin['coinName']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Coin Name <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='coinType'
                  value={addCoin['coinType']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Coin Type <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='symbol'
                  value={addCoin['symbol']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Coin Symbol <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='icon'
                  value={addCoin['icon']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Coin Icon <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='decimalLimit'
                  value={addCoin['decimalLimit']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Decimals <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='status'
                  value={addCoin['status']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Status <span>*</span></label>}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value='true'>true</option>
                  <option value='false'>false</option>
                </TextValidator>
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='isFiat'
                  value={addCoin['isFiat']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Fiat <span>*</span></label>}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value='true'>true</option>
                  <option value='false'>false</option>
                </TextValidator>
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='isToken'
                  value={addCoin['isToken']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Token <span>*</span></label>}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value='true'>true</option>
                  <option value='false'>false</option>
                </TextValidator>
              </div>
              {addCoin['isToken'] == "true"
                ? <div className='edit-add-field col-12 mt-4'>
                  <TextValidator
                    fullWidth
                    type='text'
                    name='contractAddress'
                    value={addCoin['contractAddress']}
                    variant="outlined"
                    id='standard-full-width'
                    className='form-input-field'
                    onChange={this.handleAddChange}
                    label={<label>Contract <span>*</span></label>}
                  />
                </div>
                : null
              }
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='isMaster'
                  value={addCoin['isMaster']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Master Coin <span>*</span></label>}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value='true'>true</option>
                  <option value='false'>false</option>
                </TextValidator>
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='confirmations'
                  value={addCoin['confirmations']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Confirmations <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='minDeposit'
                  value={addCoin['minDeposit']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Min Deposit <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='minWithdraw'
                  value={addCoin['minWithdraw']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Min Withdraw <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='maxWithdraw'
                  value={addCoin['maxWithdraw']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Max Withdraw <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='number'
                  name='withdrawFee'
                  value={addCoin['withdrawFee']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Withdraw Fee <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-12 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='testExplorer'
                  value={addCoin['testExplorer']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Test Explorer <span>*</span></label>}
                />
              </div>
              <div className='edit-add-field col-md-12 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='mainExplorer'
                  value={addCoin['mainExplorer']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Main Explorer <span>*</span></label>}
                />
              </div>
              <hr className='my-4' />
              <Fragment>
                <p className='col-12 text-dark edit-add-sub-title'>Node Server</p>
                <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                  <TextValidator
                    fullWidth
                    type='text'
                    name='host'
                    value={addCoin['server']['host']}
                    variant="outlined"
                    id='standard-full-width'
                    className='form-input-field'
                    onChange={this.addServerChange}
                    label={<label>Host <span>*</span></label>}
                  />
                </div>
                <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                  <TextValidator
                    fullWidth
                    type='number'
                    name='port'
                    value={addCoin['server']['port']}
                    variant="outlined"
                    id='standard-full-width'
                    className='form-input-field'
                    onChange={this.addServerChange}
                    label={<label>Port <span>*</span></label>}
                  />
                </div>
              </Fragment>
              <hr className='my-4' />
              <Fragment>
                <p className='col-12 text-dark edit-add-sub-title'>API Server</p>
                <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                  <TextValidator
                    fullWidth
                    type='text'
                    name='host'
                    value={addCoin['apiServer']['host']}
                    variant="outlined"
                    id='standard-full-width'
                    className='form-input-field'
                    onChange={this.addAPIServerChange}
                    label={<label>Host <span>*</span></label>}
                  />
                </div>
                <div className='edit-add-field col-md-6 col-sm-12 mt-4'>
                  <TextValidator
                    fullWidth
                    type='number'
                    name='port'
                    value={addCoin['apiServer']['port']}
                    variant="outlined"
                    id='standard-full-width'
                    className='form-input-field'
                    onChange={this.addAPIServerChange}
                    label={<label>Port <span>*</span></label>}
                  />
                </div>
              </Fragment>
              <div className='edit-add-buttons col-sm-12 mt-4'>
                <Button className="cancel-btn col-4" onClick={() => this.props.toggleAddCoin({})}>Cancel</Button>
                <Button className="submit-btn col-4" type='submit' onSubmit={this.submitAddCoin}>Add</Button>
              </div>
            </div>
          </ValidatorForm>
        </div>
      </div >
    );
  };

  render() {
    let { showCoinSlider, showCoinType, singleCoin } = this.props;

    return (
      <div>
        <Drawer anchor='right' open={showCoinSlider}>
          <div className="slider" role="presentation">
            {showCoinType == 'view' ? this.coinView(singleCoin)
              : showCoinType == 'edit' ? this.coinEdit(singleCoin)
                : showCoinType == 'add' ? this.coinAdd(singleCoin)
                  : null
            }
          </div>
        </Drawer>
      </div>
    )
  }
}

const mapDispatchToProps = { toggleViewCoin, toggleEditCoin, editCoin, toggleAddCoin, addCoin };
const mapStateToProps = ({ Coin_Pair }) => {
  let { showCoinSlider, showCoinType, singleCoin } = Coin_Pair;
  return { showCoinSlider, showCoinType, singleCoin };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);