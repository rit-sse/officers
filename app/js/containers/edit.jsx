'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { getOfficers } from '../actions/officers';
import Pagination from '../components/pagination';
import OfficerTable from '../components/officer-table';

function mapStateToProps(state) {
  return {
    officers: state.officers,
  };
}


class Edit extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { query } = this.props.location;
    this.props.dispatch(getOfficers(query.page || 1));
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.query.page !== newProps.location.query.page) {
      const { query } = newProps.location;
      this.props.dispatch(getOfficers(query.page || 1));
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-8 col-xs-offset-2'>
            <h2 className='text-center'>Editing Officers</h2>
          </div>
          <div className='col-xs-2'>
            <button className='btn btn-link add-button'><i className='fa fa-2x fa-pencil-square-o' /></button>
          </div>
        </div>
        <OfficerTable
          officers={this.props.officers}
        />
        <div className='text-center'>
          <Pagination
            total={this.props.officers.total}
            perPage={this.props.officers.perPage}
            currentPage={this.props.location.query.page}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Edit);
