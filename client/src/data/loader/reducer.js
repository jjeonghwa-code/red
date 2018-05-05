import update from 'react-addons-update';
import {
  ACTIONS,
} from './actions';

const initialState = false;
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ON:
      return update(state, true);
    case ACTIONS.OFF:
      return update(state, false);
    default:
      return state;
  }
};
