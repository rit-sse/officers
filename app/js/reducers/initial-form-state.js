import { LOAD } from '../actions/form';

export default function load(state= {}, action) {
  switch (action.type) {
  case LOAD:
    return { data: action.data };
  default:
    return state;
  }

}
