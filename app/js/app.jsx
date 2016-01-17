'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import routes from './routes';
import { Router, browserHistory } from 'react-router';

window.onload = () =>  {
  gapi.load('auth2', () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>,
      document.getElementById('app')
    );
  });
};
