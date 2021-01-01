import moment from 'moment';
import EventBus from 'eventing-bus';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import React, { Component, Fragment } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { getAdminData, toggleAdminPassword, changeAdminPassword } from '../../store/actions/Auth.js';

import './index.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        oldPassword: '',
        newPassword: '',
      }
    }
    props.getAdminData();
  };

  handleChange = (e) => {
    let { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  }

  submitChangePassword = () => {
    let { formData } = this.state;
    if (formData['oldPassword'] !== formData['newPassword']) {
      this.props.changeAdminPassword(formData);
      this.setState({ formData: { newPassword: '', oldPassword: '' } })
    }
    else EventBus.publish("error", "Both are same Passwords");
  }

  render() {
    let { formData } = this.state;
    let { adminData, isAdminPassword } = this.props;
    return (
      <div className='content'>
        <div className="main-container">
          <div className='main-container-head mb-3 mt-3'>
            <p className="main-container-heading">Admin Profile</p>
            {isAdminPassword
              ? <Button variant="outlined" className="submit-btn" onClick={() => this.props.toggleAdminPassword()}>Change Password</Button>
              : <Button variant="outlined" className="confirm-btn" onClick={() => this.props.toggleAdminPassword()}>My Details</Button>
            }
          </div>
          {isAdminPassword
            ? <Fragment>
              <div className="view-data row my-5">
                <div className="view-data-main-title col-12">
                  <p className="text-dark">Admin Details</p>
                </div>

                {adminData['email'] === undefined
                  ? <div className='col-12 text-center blue-loader'>
                    <i className='fa fa-spinner fa-spin fa-5x fa-fw' />
                  </div>
                  : <div className="view-data-body col-12">
                    <div className="view-data-row mt-2 offset-1 col-md-10 col-sm-12 offset-1">
                      <p className="text-dark"><span className="view-data-title">Name:</span> {adminData['role'] ? adminData['role'] : '--'} </p>
                    </div>
                    <div className="view-data-row mt-2 offset-1 col-md-10 col-sm-12 offset-1">
                      <p className="text-dark"><span className="view-data-title">Email:</span> {adminData['email'] ? adminData['email'] : '--'} </p>
                    </div>
                    <div className="view-data-row mt-2 offset-1 col-md-10 col-sm-12 offset-1">
                      <p className="text-dark"><span className="view-data-title">Last Login:</span> {adminData['lastLogin'] ? moment(adminData['lastLogin']).format('lll') : '--'} </p>
                    </div>
                  </div>
                }
              </div>
            </Fragment>
            : <Fragment>
              <div className='edit-add row my-5 mx-5'>
                <div className="edit-add-title col-12">
                  <p className="text-dark">Change Password</p>
                </div>
                <div className="edit-add-body col-12">
                  <ValidatorForm onSubmit={this.submitChangePassword}>
                    <div className="row">
                      <div className='edit-add-field offset-1 col-md-10 col-sm-12 mt-4'>
                        <TextValidator
                          fullWidth
                          type='text'
                          name='oldPassword'
                          value={formData['oldPassword']}
                          variant="outlined"
                          id='standard-full-width'
                          className='form-input-field'
                          onChange={this.handleChange}
                          label={<label>Old Password <span>*</span></label>}
                        />
                      </div>
                      <div className='edit-add-field offset-1 col-md-10 col-sm-12 mt-4'>
                        <TextValidator
                          fullWidth
                          type='text'
                          name='newPassword'
                          value={formData['newPassword']}
                          variant="outlined"
                          id='standard-full-width'
                          className='form-input-field'
                          onChange={this.handleChange}
                          label={<label>New Password <span>*</span></label>}
                        />
                      </div>
                    </div>

                    <div className='col-sm-12 mt-4'>
                      <Button className="submit-btn col-3" type='submit' onSubmit={this.submitChangePassword}>Submit</Button>
                    </div>
                  </ValidatorForm>
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
  getAdminData,
  toggleAdminPassword,
  changeAdminPassword,
};

const mapStateToProps = ({ Auth }) => {
  let { adminData, isAdminPassword } = Auth
  return { adminData, isAdminPassword }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);