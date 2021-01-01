import EventBus from 'eventing-bus';
import { connect } from "react-redux";
import React, { Component } from 'react'
import { createBrowserHistory } from "history";
import { ToastContainer, toast } from 'react-toastify';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Login from "./views/Login/index.js";
import Admin from "layouts/Admin.jsx";
import PrivateRoute from './store/PrivateRoute';

import { logout } from './store/actions/Auth';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const hist = createBrowserHistory();

export class App extends Component {
  componentDidMount() {
    EventBus.on('error', (e) => toast.error(e));
    EventBus.on('success', (e) => toast.success(e));
    EventBus.on("tokenExpired", () => this.props.logout());
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <Router history={hist}>
          <Switch>
            <Route path="/login" render={props => <Login {...props} />} />
            <PrivateRoute path="/home" component={props => <Admin {...props} />} />
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
      </div>
    )
  }
}
const mapDispatchToProps = { logout };

const mapStateToProps = ({ Auth }) => {
  let { authToken } = Auth
  return { authToken }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
