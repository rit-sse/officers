'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { getActiveOfficers } from '../actions/officers';
import Officer from '../components/officer';

function mapStateToProps(state) {
  return {
    officers: state.officers,
  };
}


class Home extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { query } = this.props.location;
    this.props.dispatch(getActiveOfficers(query.date || new Date()));
  }

  render() {
    return (
      <div className='container'>
        <h2>The Leadership Team</h2>
        <h3>Primary Officers</h3>
        <div className='container width-50'>
          <div className='row'>
            {this.props.officers.list.map(officer => {
              if (officer.primaryOfficer) {
                return <Officer officer={officer} />;
              }
            })}
          </div>
        </div>
        <h3>Committee Heads</h3>
        <div className='container width-50'>
          <div className='row'>
            {this.props.officers.list.map(officer => {
              if (!officer.primaryOfficer) {
                return <Officer officer={officer} />;
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
