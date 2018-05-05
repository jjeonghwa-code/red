/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from 'modules/apiFetch';

const ACTIONS = makeActionLabels('data/removeAccount');
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
          method: 'DELETE',
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
