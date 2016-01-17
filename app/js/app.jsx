'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/app';

window.onload = () =>  {
  gapi.load('auth2', () => {
    React.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('app')
    );
  });
};
