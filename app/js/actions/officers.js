'use strict';

import api from '../api';

export const GET_OFFICERS_SUCCESS = 'GET_OFFICERS_SUCCESS';
export const GET_OFFICERS_FAILURE = 'GET_OFFICERS_FAILURE';

function getOfficersSuccess(officers) {
  return {
    type: GET_OFFICERS_SUCCESSS,
    officers,
  };
}

function getOfficersFailed(officers) {
  return {
    type: GET_OFFICERS_FAILURE,
    officers,
  };
}

export function getActiveOfficers(active) {
  return dispatch => {
    return api.Officers.all({ active }, true)
      .then(body => dispatch(getOfficersSuccess(body)))
      .catch(error => dispatch(getOfficersFailed(error)));
  };
}

export function getOfficers(page = 1) {
  return dispatch => {
    return api.officers.all({ page })
      .then(body => dispatch(getOfficersSuccess(body)))
      .catch(error => dispatch(getOfficersFailed(error)));
  };
}
