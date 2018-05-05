/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from 'modules/apiFetch';

const ACTIONS = makeActionLabels('Main/AddApp/data/add');

const {
  waiting,
  success,
  failure,
  init,
} = makeFetchActions(
  ACTIONS,
);
const request = (body) => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const data = await apiFetch({
        path: '/app',
        options: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        },
      });
      return dispatch(success(data));
    } catch (error) {
      return dispatch(failure(error));
    }
  }
};
const requestWithCustomImg = (body) => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const data = await apiFetch({
        path: '/app',
        options: {
          method: 'POST',
          body,
        },
      });
      dispatch(success(data));
      return data;
    } catch (error) {
      dispatch(failure(error));
      throw error;
    }
  }
};
export {
  ACTIONS,
  request,
  requestWithCustomImg,
  init,
};
