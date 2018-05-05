import update from 'react-addons-update';
import {
  ACTIONS,
} from './actions';

const initialState = {
  open: false,
  title: '',
  message: '',
  onConfirm: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ON:
      return update(state, {
        open: { $set: action.open },
        title: { $set: action.title },
        message: { $set: action.message },
        onConfirm: { $set: action.onConfirm },
      });
    case ACTIONS.OFF:
      return update(state, {
        open: { $set: false },
      });
    default:
      return state;
  }
};
