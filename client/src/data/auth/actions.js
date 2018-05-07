import {
  createActionTypes,
  action,
} from '../../modules/reduxHelper';

export const actions = createActionTypes('data/auth');
export const auth = {
  request: params => action(actions['REQUEST'], { params }),
  success: (params, response) => action(actions['SUCCESS'], { params, response }),
  failure: (params) => action(actions['FAILURE'], { params }),
};
