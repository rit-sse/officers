'use strict';
import { combineReducers } from 'redux';
import auth from './auth';
import officers from './officers';

export default combineReducers({
  auth,
  officers,
});
