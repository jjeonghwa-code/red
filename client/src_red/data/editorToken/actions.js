import {
  createRequestTypes,
  action,
} from '../../modules/asyncHelper';

export const actions = createRequestTypes('data/editorToken');
export const editorToken = {
  request: params => action(actions['REQUEST'], { params }),
  success: (params, response) => action(actions['SUCCESS'], { params, response }),
  failure: (params, error) => action(actions['FAILURE'], { params, error }),
};
