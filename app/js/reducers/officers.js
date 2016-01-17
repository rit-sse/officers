'use strict';

import {
  GET_OFFICERS_SUCCESS,
} from '../actions/officers';

export default function officers(state = [], action) {
  switch (action.type) {
  case GET_OFFICERS_SUCCESS:
    return action.officers;
  default:
    return state;
  }
}
