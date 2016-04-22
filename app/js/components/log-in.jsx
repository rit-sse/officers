import React from 'react';
import { signIn } from '../actions/auth';
import API from '../api';

export default class LogIn extends React.Component {
  constructor() {
    super();
    this.state = { disableLogin: true };
  }

  componentDidMount() {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    API
      .Auth
      .clientId()
      .then( ({ token }) => {
        const auth2 = gapi.auth2.init({
          client_id: token, // eslint-disable-line camelcase
          cookie_policy: 'single_host_origin', // eslint-disable-line camelcase
        });
        auth2.attachClickHandler(this.refs.button, { prompt: 'select_account' }, googleUser => {
          this.props.dispatch(signIn(googleUser));
        });
      })
      .catch( err => console.log(err) );
  }

  render() {
    return (
      <button disable={this.state.disableLogin} id='login' className='btn btn-primary' ref='button'>
        <i className='fa fa-google' /> Sign In
      </button>
    );
  }
}
