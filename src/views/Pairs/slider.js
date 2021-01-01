import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import React, { Component, Fragment } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { getAllCoins, toggleAddPair, addPair } from '../../store/actions/Coin_Pair.js';

export class Slider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      right: false,
      formData: {
        altCoin: 'ETH',
        masterCoin: 'BTC',
      },
    }
    props.getAllCoins();
  };


  /*========== ADD PAIRS FUNCTIONS ============= */

  handleAddChange = (e) => {
    let { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  submitAddPair = () => {
    let data = this.state.formData;
    this.props.addPair({ data });
  };


  /*========== ADD PAIRS SLIDER  ============= */

  pairAdd = (allCoins) => {
    let { formData } = this.state;
    return (
      <div className='edit-add row'>
        <div className="edit-add-title col-12">
          <p className="text-dark">Add New Pair</p>
        </div>
        <div className="edit-add-body col-12">
          <ValidatorForm onSubmit={this.submitAddPair}>
            <div className="row">
              <div className='edit-add-field col-md-12 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='altCoin'
                  value={formData['altCoin']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Alt Coin <span>*</span></label>}
                  select
                  SelectProps={{
                    native: true,
                  }}>
                  {allCoins.map(data => {
                    return (
                      <option value={data['symbol']}>{data['symbol']}</option>
                    );
                  })}
                </TextValidator>
              </div>
              <div className='edit-add-field col-md-12 col-sm-12 mt-4'>
                <TextValidator
                  fullWidth
                  type='text'
                  name='masterCoin'
                  value={formData['masterCoin']}
                  variant="outlined"
                  id='standard-full-width'
                  className='form-input-field'
                  onChange={this.handleAddChange}
                  label={<label>Master Coin <span>*</span></label>}
                  select
                  SelectProps={{
                    native: true,
                  }}>
                  {allCoins.map(data => {
                    return (
                      <option value={data['symbol']}>{data['symbol']}</option>
                    );
                  })}
                </TextValidator>
              </div>
              <div className='edit-add-buttons col-sm-12 mt-4'>
                <Button className="cancel-btn col-4" onClick={() => this.props.toggleAddPair()}>Cancel</Button>
                <Button className="submit-btn col-4" type='submit' onSubmit={this.submitAddPair}>Add</Button>
              </div>
            </div>
          </ValidatorForm>
        </div>
      </div >
    );
  };

  render() {
    let { showPairSlider, showPairType, allCoins } = this.props;

    return (
      <div>
        <Drawer anchor='right' open={showPairSlider}>
          <div className="slider" role="presentation">
            {showPairType == 'add'
              ? this.pairAdd(allCoins)
              : null
            }
          </div>
        </Drawer>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAllCoins,
  toggleAddPair,
  addPair
};

const mapStateToProps = ({ Coin_Pair }) => {
  let { showPairSlider, showPairType, allCoins } = Coin_Pair;
  return { showPairSlider, showPairType, allCoins };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);