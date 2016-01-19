'use strict';

import api from '../api';

export const GET_OFFICERS_SUCCESS = 'GET_OFFICERS_SUCCESS';
export const GET_OFFICERS_FAILURE = 'GET_OFFICERS_FAILURE';
export const ADD_OFFICER_SUCCESS = 'ADD_OFFICER_SUCCESS';
export const ADD_OFFICER_FAILURE = 'ADD_OFFICER_FAILURE';
export const EDIT_OFFICER_SUCCESS = 'EDIT_OFFICER_SUCCESS';
export const EDIT_OFFICER_FAILURE = 'EDIT_OFFICER_FAILURE';

function getOfficersSuccess(officers) {
  return {
    type: GET_OFFICERS_SUCCESS,
    officers,
  };
}

function getOfficersFailure(error) {
  return {
    type: GET_OFFICERS_FAILURE,
    error,
  };
}

function addOfficerSuccess(officer) {
  return {
    type: ADD_OFFICER_SUCCESS,
    officer,
  };
}

function addOfficerFailure(error) {
  return {
    type: ADD_OFFICER_FAILURE,
    error,
  };
}

function editOfficerSuccess(officer, index) {
  return {
    type: EDIT_OFFICER_SUCCESS,
    officer,
    index,
  };
}

function editOfficerFailure(error) {
  return {
    type: EDIT_OFFICER_FAILURE,
    error,
  };
}

export function getActiveOfficers(active) {
  return dispatch => {
    return api.Officers.all({ active }, true)
      .then(body => dispatch(getOfficersSuccess(body)))
      .catch(error => dispatch(getOfficersFailure(error)));
  };
}

export function getOfficers(page = 1) {
  return dispatch => {
    return api.Officers.all({ page })
      .then(body => dispatch(getOfficersSuccess(body)))
      .catch(error => dispatch(getOfficersFailure(error)));
  };
}

export function addOfficer(officer) {
  return dispatch => {
    return api.Officers.create(officer)
      .then(o => dispatch(addOfficerSuccess(o)))
      .catch(error => dispatch(addOfficerFailure(error)));
  };
}

export function editOfficer(officer, index) {
  return dispatch => {
    return api.Officer.update(officer.id, officer)
      .then(o => dispatch(editOfficerSuccess(o, index)))
      .catch(error => dispatch(editOfficerFailure(error)));
  };
}
