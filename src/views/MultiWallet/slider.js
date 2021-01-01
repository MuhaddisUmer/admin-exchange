import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import React, { Component, Fragment } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { toggleSendNew, sendNewTransactions } from '../../store/actions/Auth.js';

export class Slider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      right: false,
      formData: [{
        address: '',
        value: '',
      }],
    }
  };

  handleChange = (e, i) => {
    const { name, value } = e.target;
    let formData = [...this.state.formData];
    formData[i] = { ...formData[i], [name]: value };
    this.setState({ formData });
  };

  addInput = () => {
    this.setState(prevState => ({
      formData: [...prevState.formData, { address: "", value: "" }]
    }))
  };

  removeInput = (i) => {
    let formData = [...this.state.formData];
    formData.splice(i, 1);
    this.setState({ formData });
  }

  submitTransactions = () => this.props.sendNewTransactions(this.state.formData);


  /*========== SEND NEW SLIDER  ============= */

  sendNew = () => {
    let { formData } = this.state;
    return (
      <div className='edit-add row'>
        <div className="edit-add-title col-12">
          <p className="text-dark">Send New Transactions</p>
        </div>
        <div className="edit-add-title col-12">
          <Button className="submit-btn col-4" onClick={this.addInput}><i className='fa fa-plus mr-2' />Add</Button>
        </div>
        <div className="edit-add-body col-12">
          <ValidatorForm onSubmit={this.submitTransactions}>
            {formData.map((el, i) => {
              return (
                <div className="row" key={i}>
                  <div className='edit-add-field col-md-5 col-sm-12 mt-4'>
                    <TextValidator
                      fullWidth
                      type='text'
                      name='address'
                      value={el['address']}
                      variant="outlined"
                      id='standard-full-width'
                      className='form-input-field'
                      onChange={(e) => this.handleChange(e, i)}
                      label="Address"
                    />
                  </div>
                  <div className='edit-add-field col-md-5 col-sm-12 mt-4'>
                    <TextValidator
                      fullWidth
                      type='text'
                      name='value'
                      value={el['value']}
                      variant="outlined"
                      id='standard-full-width'
                      className='form-input-field'
                      onChange={(e) => this.handleChange(e, i)}
                      label="Value"
                    />
                  </div>
                  <div className='cancel-input col-md-2 col-sm-12 mt-4'>
                    <Button className="delete-btn" onClick={() => this.removeInput(i)}><i class="fas fa-times"></i></Button>
                  </div>
                </div>
              );
            })
            }
            <div className='edit-add-buttons col-sm-12 mt-4'>
              <Button className="cancel-btn col-4" onClick={() => this.props.toggleSendNew()}>Cancel</Button>
              <Button className="submit-btn col-4" type='submit' onSubmit={this.submitTransactions}>Send</Button>
            </div>
          </ValidatorForm>
        </div>
      </div >
    );
  };

  render() {
    let { showSendSlider } = this.props;

    return (
      <div>
        <Drawer anchor='right' open={showSendSlider}>
          <div className="slider" role="presentation">
            {showSendSlider
              ? this.sendNew()
              : null
            }
          </div>
        </Drawer>
      </div>
    )
  }
}

const mapDispatchToProps = {
  toggleSendNew,
  sendNewTransactions
};

const mapStateToProps = ({ Auth }) => {
  let { showSendSlider } = Auth;
  return { showSendSlider };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);