'use strict';

import {
  GET_OFFICERS_SUCCESS,
  ADD_OFFICER_SUCCESS,
  EDIT_OFFICER_SUCCESS,
} from '../actions/officers';

export default function officers(state = [], action) {
  switch (action.type) {
  case GET_OFFICERS_SUCCESS:
    return action.officers;
  case ADD_OFFICER_SUCCESS:
    return state.slice().push(action.officer);
  case EDIT_OFFICER_SUCCESS:
    return state.slice().splice(action.index, 1, action.officer);
  default:
    return state;
  }
}
