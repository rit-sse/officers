import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
    this.renderEditLink = this.renderEditLink.bind(this);
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

  renderEditLink() {
    if (this.props.auth.signedIn) {
      return (
        <li>
          <Link to='/officers/edit'>
            <button className='btn btn-link'>Edit Officers</button>
          </Link>
        </li>
      );
    }
    return <li><span/></li>;
  }

  render() {
    return (
      <div className='container'>
        <div id='header' className='page-header'>
          <div className='flex'>
            <h1 className='text-left'>
              <Link className='no-decoration' to='/officers'>
                Officers
              </Link>
              <small> John Renner's Leadership Team&trade;</small>
            </h1>
            <ul className='list-inline bottom-align hidden-xs'>
              {this.renderEditLink()}
              {this.renderLogIn()}
            </ul>
          </div>
        </div>
        {this.props.children}
      </div>

    );
  }
}

export default connect(mapStateToProps)(OfficersApp);
