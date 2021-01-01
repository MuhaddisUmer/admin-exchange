import { connect } from 'react-redux';
import ReactTable from 'react-table-6';
import Button from '@material-ui/core/Button';
import React, { Component, Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Loader from '../../components/Loader';
import NumberFormat from '../../components/NumberFormat';
import { getAllPairs, toggleAddPair, deletePair } from '../../store/actions/Coin_Pair.js';

import './index.css';
import Slider from './slider';

class Pairs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      deleteModal: false
    }
    props.getAllPairs();
  };

  showAddSlider = (allPairs) => this.props.toggleAddPair(allPairs);

  /*========== DELETE PAIRS FUNCTIONS ============= */

  toggledeleteModal = () => this.setState({ deleteModal: !this.state.deleteModal });

  showDeleteModal = (id) => this.setState({ id, deleteModal: true, });

  closedeleteModal = () => this.setState({ deleteModal: false });

  pairDelete = () => {
    this.props.deletePair(this.state.id);
    this.setState({ deleteModal: false })
  };


  render() {
    let { allPairs } = this.props;
    let { deleteModal } = this.state;
    const columns = [
      {
        id: 'symbol',
        Header: 'Pair',
        accessor: allPairs => allPairs['symbol'] ? allPairs['symbol'] : '-',
      }, {
        id: 'altCoinName',
        Header: 'Alt Coin Name',
        accessor: allPairs => allPairs['altCoin']['coinName'] ? allPairs['altCoin']['coinName'] : '-',
      }, {
        id: 'masterCoinName',
        Header: 'Master Coin Name',
        accessor: allPairs => allPairs['masterCoin']['coinName'] ? allPairs['masterCoin']['coinName'] : '-',
      }, {
        id: 'makerFee',
        Header: 'Maker Fee',
        accessor: allPairs => <Fragment><NumberFormat value={allPairs['makerFee']} decimals={'4'} /></Fragment>,
        filterable: false,
      }, {
        id: 'takerFee',
        Header: 'Taker Fee',
        accessor: allPairs => <Fragment><NumberFormat value={allPairs['takerFee']} decimals={'4'} /></Fragment>,
        filterable: false,
      }, {
        id: 'actions',
        Header: 'Action',
        accessor: allPairs => <Fragment>
          <Button variant="outlined" className="delete-btn" onClick={() => this.showDeleteModal(allPairs['_id'])}><i className='fa fa-trash' /></Button>
        </Fragment>,
        filterable: false,
      }
    ];

    return (
      <div className='content'>
        <div className="main-container">
          <Slider />
          <div className='main-container-head mb-3'>
            <p className="main-container-heading">All Pairs Details</p>
            <Button variant="outlined" className="add-btn" onClick={() => this.showAddSlider(allPairs)}><i className='fa fa-plus mr-2' />Add Pair</Button>
          </div>
          <ReactTable
            className="table"
            data={allPairs}
            resolveData={allPairs => allPairs.map(row => row)}
            columns={columns}
            minRows={8}
            filterable={true}
          />

          {/* ========== DELETE PAIRS MODAL ============= */}
          <Fragment>
            <Modal className="delete-modal" isOpen={deleteModal} toggle={this.toggledeleteModal}>
              <ModalHeader toggle={this.toggledeleteModal}>
                <p className="modal-title text-dark">Delete Pair</p>
              </ModalHeader>
              <ModalBody>
                <p className="text-dark">Are you sure you want to delete this Pair?</p>
              </ModalBody>
              <ModalFooter>
                <Button className="cancel-btn col-3" onClick={this.closedeleteModal}>Cancel</Button>
                <Button className="confirm-btn col-3" onClick={this.pairDelete}>Confirm</Button>
              </ModalFooter>
            </Modal>
          </Fragment>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  getAllPairs,
  toggleAddPair,
  deletePair,
};

const mapStateToProps = ({ Coin_Pair }) => {
  let { allPairs, } = Coin_Pair
  return { allPairs, }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pairs);