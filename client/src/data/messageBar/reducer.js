import update from 'react-addons-update';
import {
  ACTIONS,
} from './actions';

const initialState = {
  status: 'CLOSED',
  info: {},
  queue: [],
};

export default (state = initialState, action) => {
  if (action.error) {
    return update(state, {
      queue: {
        $push: [{
          message: action.error,
          key: new Date().getTime(),
        }],
      },
    });
  }
  switch (action.type) {
    case ACTIONS.PROCESS:
      return update(state, {
        status: { $set: 'PROCESS' },
        info: { $set: action.info },
        queue: { $set: action.queue },
      });
    case ACTIONS.CLOSING:
      return update(state, {
        status: { $set: 'CLOSING' },
      });
    case ACTIONS.CLOSED:
      return update(state, {
        status: { $set: 'CLOSED' },
      });
    case ACTIONS.SHOW_MESSAGE:
      return update(state, {
        queue: {
          $push: [{
            message: action.message,
            key: new Date().getTime(),
          }],
        },
      });
    default:
      return state;
  }
};
