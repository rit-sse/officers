'use strict';

import { combineReducers } from 'redux';
import auth from './auth';
import officers from './officers';
import committees from './committees';

export default combineReducers({
  auth,
  officers,
  committees,
});
