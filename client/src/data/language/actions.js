import {
  createActionTypes,
  action,
} from '../../modules/reduxHelper';

const SET = 'SET';
export const actions = createActionTypes('data/language', [SET]);
export const language = {
  set: (selected = 1) => action(actions[SET], { selected }),
};
