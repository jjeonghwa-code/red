/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from '../../../../../../modules/apiFetch';

const ACTIONS = makeActionLabels('Main/AppList/data');
const {
  waiting,
  success,
  failure,
} = makeFetchActions(
  ACTIONS,
);
const request = () => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const data = await apiFetch({
        path: '/app',
      });
      dispatch(success(data));
    } catch (error) {
      dispatch(failure(error));
    }
  }
};

export {
  ACTIONS,
  request,
};
