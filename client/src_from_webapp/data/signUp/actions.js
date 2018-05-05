/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from 'modules/apiFetch';

const ACTIONS = makeActionLabels('data/signUp');
const {
  waiting,
  success,
  failure,
} = makeFetchActions(
  ACTIONS
);
const request = () => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const data = await apiFetch({
        path: '/account',
        options: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
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
