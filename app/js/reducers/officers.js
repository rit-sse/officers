'use strict';

import {
  GET_OFFICERS_SUCCESS,
  ADD_OFFICER_SUCCESS,
  EDIT_OFFICER_SUCCESS,
} from '../actions/officers';

export default function officers(state = { list: [], total: 0, perPage: 15 }, action) {
  switch (action.type) {
  case GET_OFFICERS_SUCCESS:
    return Object.assign({}, state, {
      list: action.officers,
      total: action.total,
      perPage: action.perPage,
    });
  case ADD_OFFICER_SUCCESS:
    const list = state.list.slice();
    list.push(action.officer);
    return Object.assign({}, state, {
      list,
      total: state.total + 1,
      perPage: action.perPage,
    });
  case EDIT_OFFICER_SUCCESS:
    const editList = state.list.slice();
    editList.splice(action.index, 1, action.officer);
    return Object.assign({}, state, {
      list: editList,
      total: state.total,
      perPage: action.perPage,
    });
  default:
    return state;
  }
}
