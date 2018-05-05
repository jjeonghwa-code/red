/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from 'modules/apiFetch';

const ACTIONS = makeActionLabels('Main/data/app');
const {
  waiting,
  success,
  failure,
} = makeFetchActions(
  ACTIONS,
);
const request = (id) => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const data = await apiFetch({
        path: `/app/${id}`,
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
