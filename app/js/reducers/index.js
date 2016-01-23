'use strict';

import { combineReducers } from 'redux';
import auth from './auth';
import officers from './officers';
import committees from './committees';
import initialFormState from './initial-form-state';
import { reducer as form } from 'redux-form';

export default combineReducers({
  auth,
  officers,
  committees,
  initialFormState,
  form,
});
