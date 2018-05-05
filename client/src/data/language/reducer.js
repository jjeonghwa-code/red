import {
  actions
} from './actions';
import update from 'react-addons-update';

const initialState = {
  types: ['en', 'kr', 'jp'],
  selected: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions['SET']:
      return update(state, {
        selected: { $set: action.selected },
      });
    default:
      return state;
  }
};
