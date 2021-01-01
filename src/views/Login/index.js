import { connect } from "react-redux";
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import logo from '../../assets/img/title.png';
import { login, isloginDisabled } from "../../store/actions/Auth";

import './index.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        email: '',
        password: '',
      }
    }
  };

  handleLogin = () => {
    this.props.login({ data: this.state.formData, history: this.props.history });
    this.props.isloginDisabled();
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  render() {
    let { isLogin } = this.props;
    let { formData } = this.state;
    return (
      <div className="login-page">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 login-area">
            <div className="login-form">
              <p className="login-title">【ＬＯＧＩＮ】</p>
              <hr className='mt-3' />
              <ValidatorForm className="validator-form mt-4" onSubmit={this.handleLogin}>
                <TextValidator
                  className="login-input-fields"
                  type="text"
                  name="email"
                  label="Email"
                  margin="dense"
                  variant="outlined"
                  onChange={this.handleChange}
                  value={formData.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['Email can not be empty', 'Email is not valid']}
                />
                <br />
                <TextValidator
                  className="login-input-fields"
                  margin="dense"
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  validators={['required']}
                  onChange={this.handleChange}
                  value={formData.password}
                  errorMessages={['Password can not be empty']}
                />
                <Button type="Submit" onClick={this.handleLogin} variant="contained" className='text-white login-btn mt-4'
                  disabled={isLogin}>
                  {!isLogin
                    ? "ＬＯＧＩＮ"
                    : <div><i className="fa fa-spinner fa-spin"></i></div>
                  }
                </Button>
              </ValidatorForm>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 login-area">
            <img className="login-page-logo" src={logo} alt='logo' />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login,
  isloginDisabled,
};

const mapStateToProps = ({ Auth }) => {
  let { isLogin, } = Auth
  return { isLogin, }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);