import update from 'react-addons-update';
import {
  ACTIONS,
} from './actions';

const initialState = {
  open: false,
  message: '',
};

export default (state = initialState, action) => {
  if (action.error) {
    return update(state, {
      open: { $set: true },
      message: { $set: action.error.message },
    });
  }
  switch (action.type) {
    case ACTIONS.ON:
      return update(state, {
        open: { $set: true },
        message: { $set: action.message },
      });
    case ACTIONS.OFF:
      return update(state, {
        open: { $set: false },
      });
    default:
      return state;
  }
};
