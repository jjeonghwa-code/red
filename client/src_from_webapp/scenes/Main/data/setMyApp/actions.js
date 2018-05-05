/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from 'modules/apiFetch';
import {
  getUserInfo,
  setAppList,
} from 'modules/userFromLocal';

const ACTIONS = makeActionLabels('Main/data/setMyApp');
const {
  waiting,
  success,
  failure,
} = makeFetchActions(
  ACTIONS,
);
const request = (appList) => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const { isLoggedIn, id } = getUserInfo();
      setAppList(appList);
      if (isLoggedIn) {
        await apiFetch({
          path: `/account/${id}/setAppList`,
          options: {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${id}`,
            },
            body: JSON.stringify(appList),
          },
        });
      }
      dispatch(success());
    } catch (error) {
      dispatch(failure(error));
    }
  }
};
export {
  ACTIONS,
  request,
};
