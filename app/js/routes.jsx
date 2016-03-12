import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/app';
import Home from './containers/home';
import Edit from './containers/edit';

export default (
  <Route component={App} path='/officers'>
    <IndexRoute component={Home} />
    <Route path='/officers/edit' component={Edit} />
  </Route>
);
