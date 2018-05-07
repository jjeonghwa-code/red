import {
  createActionTypes,
  action,
} from '../../../../modules/reduxHelper';

export const actions = createActionTypes('ManagerPage/data/franchiseeLogin');
export const franchiseeLogin = {
  request: params => action(actions['REQUEST'], { params }),
  success: (params, response) => action(actions['SUCCESS'], { params, response }),
  failure: (params) => action(actions['FAILURE'], { params }),
};
