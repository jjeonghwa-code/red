/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from 'modules/apiFetch';
import {
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  init,
} from 'modules/userFromLocal';

const ACTIONS = makeActionLabels('data/user');
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
      let data = getUserInfo();
      if (!data.id || !data.appList) {
        init();
        data = getUserInfo();
      }
      if (data.isLoggedIn) {
        data = await apiFetch({
          path: '/app',
          options: {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.id}`,
            },
          },
        });
        setUserInfo({
          id: data.id,
          appList: data.appList,
        });
      }
      return dispatch(success(data));
    } catch (error) {
      return dispatch(failure(error));
    }
  }
};
const logout = () => {
  return (dispatch) => {
    removeUserInfo();
    return dispatch(failure({ message: '로그아웃' }));
  };
};

export {
  ACTIONS,
  request,
  logout,
};
