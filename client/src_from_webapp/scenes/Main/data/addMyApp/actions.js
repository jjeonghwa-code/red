/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from 'modules/apiFetch';
import {
  getUserInfo,
  addApp,
} from 'modules/userFromLocal';

const ACTIONS = makeActionLabels('Main/data/addMyApp');
const {
  waiting,
  success,
  failure,
} = makeFetchActions(
  ACTIONS,
);
const request = (app) => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const { isLoggedIn, id } = getUserInfo();
      addApp(app);
      if (isLoggedIn) {
        await apiFetch({
          path: `/account/${id}/addApp`,
          options: {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${id}`,
            },
            body: JSON.stringify(app),
          },
        });
      }
      dispatch(success());
      return true;
    } catch (error) {
      dispatch(failure(error));
      throw error;
    }
  }
};
export {
  ACTIONS,
  request,
};
