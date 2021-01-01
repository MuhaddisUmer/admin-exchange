import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import Loader from '../../components/Loader';
import { getSingleUser } from '../../store/actions/User.js';

import './index.css';
import UserDetails from './userDetails';
import UserWallet from './userWallet';
import UserTrades from './userTrades';
import UserHistory from './userHistory';
import UserSettings from './userSettings';

class SingleUser extends Component {
  constructor(props) {
    let link = document.location.href.replace("#", "");
    const { query } = require('url').parse(link, true);
    super(props);
    this.state = {
      userId: query['id'],
      activeTab: '1',
    }
    props.getSingleUser(this.state.userId)
  };

  toggle = tab => {
    const { activeTab } = this.state
    if (activeTab !== tab) this.setState({ activeTab: tab });
  }

  render() {
    let { activeTab } = this.state;
    let { userDetails, userWallet, userTrades, userHistory } = this.props;
    return (
      <div className='content'>
        <div className='main-container user-details'>
          <div className='main-container-head mb-3'>
            <p className="main-container-heading">User Details</p>
          </div>
          <hr className='py-3' />
          <Nav tabs>
            <NavItem className='nav-items'>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}>
                <p className='text-dark'>Details</p>
              </NavLink>
            </NavItem>
            <NavItem className='nav-items'>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}>
                <p className='text-dark'>Wallet</p>
              </NavLink>
            </NavItem>
            <NavItem className='nav-items'>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}>
                <p className='text-dark'>Trades</p>
              </NavLink>
            </NavItem>
            <NavItem className='nav-items'>
              <NavLink
                className={classnames({ active: activeTab === '4' })}
                onClick={() => { this.toggle('4'); }}>
                <p className='text-dark'>History</p>
              </NavLink>
            </NavItem>
            <NavItem className='nav-items'>
              <NavLink
                className={classnames({ active: activeTab === '5' })}
                onClick={() => { this.toggle('5'); }}>
                <p className='text-dark'>Settings</p>
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              {userDetails['email'] === undefined
                ? <Loader />
                : <UserDetails />
              }
            </TabPane>
            <TabPane tabId="2">
              {userWallet.length === 0
                ? <Loader />
                : <UserWallet />
              }
            </TabPane>
            <TabPane tabId="3">
              {userTrades.length === 0
                ? <Loader />
                : <UserTrades />
              }
            </TabPane>
            <TabPane tabId="4">
              {userHistory.length === 0
                ? <Loader />
                : <UserHistory />
              }
            </TabPane>
            <TabPane tabId="5">
              {userDetails['isActive'] === undefined || userDetails['smsEnabled'] === undefined
                || userDetails['twoFaEnabled'] === undefined
                ? <Loader />
                : <UserSettings />
              }
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getSingleUser,
};

const mapStateToProps = ({ User }) => {
  let { userDetails, userWallet, userTrades, userHistory } = User;
  return { userDetails, userWallet, userTrades, userHistory }
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);