'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { getOfficers, addOfficer } from '../actions/officers';
import { getCommittees } from '../actions/committees';
import Pagination from '../components/pagination';
import OfficerTable from '../components/officer-table';
import FormModal from '../components/form-modal';

function mapStateToProps(state) {
  return {
    officers: state.officers,
    committees: state.committees,
  };
}

class Edit extends React.Component {
  constructor() {
    super();

    this.state = { officer: { user: {}, committee: {} }, showEdit: false, showAdd: false };

    this.showAdd = this.showAdd.bind(this);
    this.hideAdd = this.hideAdd.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.hideEdit = this.hideEdit.bind(this);
    this.addOfficer = this.addOfficer.bind(this);
  }

  componentDidMount() {
    const { query } = this.props.location;
    this.props.dispatch(getOfficers(query.page || 1));
    this.props.dispatch(getCommittees());
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.query.page !== newProps.location.query.page) {
      const { query } = newProps.location;
      this.props.dispatch(getOfficers(query.page || 1));
    }
  }

  showAdd() {
    this.setState({ showAdd: true });
  }

  hideAdd() {
    this.setState({ showAdd: false });
  }

  showEdit(officer, index) {
    this.setState({ officer, index, showEdit: true });
  }

  hideEdit() {
    this.setState({ officer: { user: {}, committee: {} }, showEdit: false });
  }

  addOfficer(officer) {
    return this.props.dispatch(addOfficer(officer));
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-8 col-xs-offset-2'>
            <h2 className='text-center'>Editing Officers</h2>
          </div>
          <div className='col-xs-2'>
            <button className='btn btn-link add-button' onClick={this.showAdd}>
              <i className='fa fa-2x fa-pencil-square-o' />
            </button>
          </div>
        </div>
        <OfficerTable
          officers={this.props.officers}
          showEdit={this.showEdit}
        />
        <div className='text-center'>
          <Pagination
            total={this.props.officers.total}
            perPage={this.props.officers.perPage}
            currentPage={this.props.location.query.page}
          />
        </div>
        <FormModal
          title='Add'
          show={this.state.showAdd}
          close={this.hideAdd}
          submit={this.addOfficer}
          committees={this.props.committees}
          officer={{ startDate: new Date() }}
        />
        <FormModal
          title='Edit'
          show={this.state.showEdit}
          close={this.hideEdit}
          submit={this.editOfficer}
          committees={this.props.committees}
          officer={this.state.officer}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Edit);
