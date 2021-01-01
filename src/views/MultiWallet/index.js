import moment from 'moment';
import { connect } from 'react-redux';
import ReactTable from 'react-table-6';
import Button from '@material-ui/core/Button';
import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Loader from '../../components/Loader';
import NumberFormat from '../../components/NumberFormat';
import { getMultiWallets, toggleSendNew } from '../../store/actions/Auth.js';


import './index.css';
import Slider from './slider';

class MultiWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      multiwalletModal: false,
      withdrawals: [],
      Status: {
        0: "Pending",
        1: "Success",
        2: "Failed",
        3: "Cancelled"
      }
    }
    props.getMultiWallets();
  };

  showSendNew = () => this.props.toggleSendNew();

  toggleMultiWalletModal = () => this.setState({ multiwalletModal: !this.state.multiwalletModal });

  showMultiWallet = (withdrawals) => this.setState({ withdrawals, multiwalletModal: true, });


  render() {
    let { multiWallets } = this.props;
    let { multiwalletModal, withdrawals, Status } = this.state;
    const columns = [
      {
        id: 'createdAt',
        Header: 'Date',
        accessor: multiWallets => multiWallets['createdAt'] ? moment(multiWallets['createdAt']).format('ll') : '-',
      }, {
        id: 'totalAmount',
        Header: 'Amount',
        accessor: multiWallets => multiWallets['totalAmount'] ? <NumberFormat value={multiWallets['totalAmount']} coin={multiWallets['symbol']} /> : '-',
      }, {
        id: 'status',
        Header: 'Status',
        accessor: multiWallets => Status[multiWallets['status']],
      }, {
        id: 'actions',
        Header: 'Action',
        accessor: multiWallets => <Fragment>
          <Button variant="outlined" className="view-btn" onClick={() => this.showMultiWallet(multiWallets['withdrawals'])}><i className='fa fa-eye' /></Button>
        </Fragment>,
        filterable: false,
      }
    ];

    return (
      <div className='content'>
        <div className="main-container">
          <Slider />
          <div className='main-container-head mb-3'>
            <p className="main-container-heading">Multi Wallet Transaction</p>
            <Button variant="outlined" className="add-btn" onClick={() => this.showSendNew()}>Send New</Button>
          </div>
          <ReactTable
            className="table"
            data={multiWallets}
            resolveData={multiWallets => multiWallets.map(row => row)}
            columns={columns}
            minRows={8}
            filterable={true}
          />

          {/* ========== MULTI WALLET MODAL ============= */}
          <Fragment>
            <Modal className="multi-wallet-modal" isOpen={multiwalletModal} toggle={this.toggleMultiWalletModal}>
              <ModalHeader toggle={this.toggleMultiWalletModal}>
                <p className="modal-title text-dark">Multi Wallets</p>
              </ModalHeader>
              <ModalBody>
                <div className="col-md-9 col-sm-19 text-center">
                  <div className="col-12 body-title"><p>Address</p></div>
                  {withdrawals.map(data => {
                    return (
                      <div className="col-12 body-text mt-2">
                        <p>{data['address'] ? data['address'] : '--'}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="col-md-3 col-sm-3 text-center">
                  <div className="col-12 body-title"><p>Value</p></div>
                  {withdrawals.map(data => {
                    return (
                      <div className="col-12 body-text mt-2">
                        <p>{data['value'] ? data['value'] : '--'}</p>
                      </div>
                    )
                  })}
                </div>
              </ModalBody>
            </Modal>
          </Fragment>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  getMultiWallets,
  toggleSendNew,
};

const mapStateToProps = ({ Auth }) => {
  let { multiWallets } = Auth;
  return { multiWallets }
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiWallet);