/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from 'modules/apiFetch';
import { setId } from 'modules/userFromLocal';

const ACTIONS = makeActionLabels('data/login');
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
        path: '/account/login',
        options: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
      });
      setId(data.id);
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
