import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import React, { Component, } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { updateUser, toggleIsActive, toggleIsPassword, toggleIsSMS, toggleIsTwoFA } from '../../store/actions/User.js';

import './index.css';
import { Fragment } from 'react';

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      isActiveData: {
        isActive: props.userDetails['isActive'],
      },
      passwordData: {
        password: '',
      },
      smsData: {
        smsEnabled: props.userDetails['smsEnabled'],
      },
      twoFaData: {
        twoFaEnabled: props.userDetails['twoFaEnabled'],
      },
    }
  };
  showChangePassword = () => this.setState({ showPassword: false });

  handleChange = (e) => {
    let { passwordData } = this.state;
    passwordData[e.target.name] = e.target.value;
    this.setState({ passwordData });
  }

  submitIsActive = () => {
    let { userDetails } = this.props;
    let { isActiveData } = this.state;
    isActiveData['isActive'] = (!userDetails['isActive']).toString()
    this.props.updateUser({ data: isActiveData, id: userDetails['_id'] });
    this.props.toggleIsActive(true);
  }

  submitChangePassword = () => {
    let { userDetails } = this.props;
    let { passwordData } = this.state;
    this.props.updateUser({ data: passwordData, id: userDetails['_id'] });
    this.setState({ showPassword: true, passwordData: {} });
    this.props.toggleIsPassword(true);
  }

  submitSMSDisabled = () => {
    let { userDetails } = this.props;
    let { smsData } = this.state;
    smsData['smsEnabled'] = !userDetails['smsEnabled']
    this.props.updateUser({ data: smsData, id: userDetails['_id'] });
    this.props.toggleIsSMS(true);
  }

  submitTwoFaDisabled = () => {
    let { userDetails } = this.props;
    let { twoFaData } = this.state;
    twoFaData['twoFaEnabled'] = !userDetails['twoFaEnabled']
    this.props.updateUser({ data: twoFaData, id: userDetails['_id'] });
    this.props.toggleIsTwoFA(true);
  }

  render() {
    let { showPassword, passwordData } = this.state;
    let { userDetails, isActive, isPassword, isSMS, isTwoFA } = this.props;
    return (
      <div className='user-settings'>
        <div className='row mt-5'>
          <div className='edit-add offset-md-1 col-md-4 col-sm-12'>
            <div className="edit-add-title col-12">
              <p className="text-dark">Active/Deactive</p>
            </div>
            <div className="edit-add-body col-12">
              {isActive
                ? <div className='col-12 text-center blue-loader'>
                  <i className='fa fa-spinner fa-spin fa-3x fa-fw' />
                </div>
                : <Button className={userDetails['isActive'] ? "cancel-btn col-8 mt-4" : "submit-btn col-8 mt-4"} onClick={this.submitIsActive}>
                  {userDetails['isActive']
                    ? 'Deactive'
                    : 'Active'}
                </Button>
              }
            </div>
          </div>

          <div className='edit-add offset-md-2 col-md-4 col-sm-12'>
            <div className="edit-add-title col-12">
              <p className="text-dark">Change Password</p>
            </div>
            <div className="edit-add-body col-12">
              {isPassword
                ? <div className='col-12 text-center blue-loader'>
                  <i className='fa fa-spinner fa-spin fa-3x fa-fw' />
                </div>
                : <Fragment>
                  {showPassword
                    ? <Button className="submit-btn col-8 mt-4" onClick={this.showChangePassword}>Change</Button>
                    : <ValidatorForm onSubmit={this.submitChangePassword}>
                      <div className="row">
                        <div className='edit-add-field col-md-12 col-sm-12 mt-3'>
                          <TextValidator
                            fullWidth
                            type='text'
                            name='password'
                            value={passwordData['password']}
                            variant="outlined"
                            id='standard-full-width'
                            className='form-input-field'
                            onChange={this.handleChange}
                            label={<label>Password <span>*</span></label>}
                          />
                        </div>
                        <div className='col-sm-12 mt-4'>
                          <Button className="submit-btn col-6" type='submit' onSubmit={this.submitChangePassword}>Submit</Button>
                        </div>
                      </div>
                    </ValidatorForm>
                  }
                </Fragment>
              }
            </div>
          </div>
        </div>

        <div className='row mt-5 mb-4'>
          <div className='edit-add offset-md-1 col-md-4 col-sm-12'>
            <div className="edit-add-title col-12">
              <p className="text-dark">Disable SMS Authentication</p>
            </div>
            <div className="edit-add-body col-12">
              {isSMS
                ? <div className='col-12 text-center blue-loader'>
                  <i className='fa fa-spinner fa-spin fa-3x fa-fw' />
                </div>
                : <Fragment>
                  {userDetails['smsEnabled']
                    ? <Button className="cancel-btn col-8 mt-4" onClick={this.submitSMSDisabled}>Disable</Button>
                    : <p className="mt-4">SMS Authentication is already Disable</p>
                  }
                </Fragment>
              }
            </div>
          </div>

          <div className='edit-add offset-md-2 col-md-4 col-sm-12'>
            <div className="edit-add-title col-12">
              <p className="text-dark">Disable 2-FA Authentication</p>
            </div>
            <div className="edit-add-body col-12">
              {isTwoFA
                ? <div className='col-12 text-center blue-loader'>
                  <i className='fa fa-spinner fa-spin fa-3x fa-fw' />
                </div>
                : <Fragment>
                  {userDetails['twoFaEnabled']
                    ? <Button className="cancel-btn col-8 mt-4" onClick={this.submitTwoFaDisabled}>Disable</Button>
                    : <p className="mt-4">2-FA Authentication is already Disable</p>
                  }
                </Fragment>
              }
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = {
  updateUser,
  toggleIsActive,
  toggleIsPassword,
  toggleIsSMS,
  toggleIsTwoFA,
};

const mapStateToProps = ({ User }) => {
  let { userDetails, isActive, isPassword, isSMS, isTwoFA } = User;
  return { userDetails, isActive, isPassword, isSMS, isTwoFA }
};
export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);