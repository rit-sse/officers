'use strict';

import React from 'react';
import { connect } from 'react-redux';
import LogIn from '../components/log-in';

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

class OfficersApp extends React.Component {
  constructor() {
    super();

    this.renderLogIn = this.renderLogIn.bind(this);
  }

  renderLogIn() {
    if (!this.props.auth.signedIn) {
      return (
        <li>
          <LogIn key='login' dispatch={this.props.dispatch} />
        </li>
      );
    }
    return (
      <li>
        <button
          id='sign-out'
          key='logout'
          className='btn'
          onClick={() => this.props.dispatch(signOut())}
        >
          Sign Out
        </button>
      </li>
    );
  }

  render() {
    return (
      <div className='container'>
        <div id='header' className='page-header'>
          <div className='flex'>
            <h1 className='text-left'>
              Officers
              <small> John Renner's Leadership Team&trade;</small>
            </h1>
            <ul className='list-inline bottom-align hidden-xs'>
              {this.renderLogIn()}
            </ul>
          </div>
        </div>
      </div>

    );
  }
}

export default connect(mapStateToProps)(OfficersApp);
