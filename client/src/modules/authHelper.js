import * as cookie from './cookie';

export const getUserTokenFromCookie = () => {
  const userToken = cookie.get('userToken');
  return userToken && userToken !== '' ? userToken : undefined;
};
export const setUserTokenToCookie = (userToken) => {
  cookie.set('userToken', userToken);
  return true;
};
export const removeUserTokenFromCookie = () => {
  cookie.remove('userToken');
  return true;
};
export const getSecondaryUserTokenFromCookie = () => {
  const userToken = cookie.get('secondaryUserToken');
  return userToken && userToken !== '' ? userToken : undefined;
};
export const setSecondaryUserTokenToCookie = (userToken) => {
  cookie.set('secondaryUserToken', userToken);
  return true;
};
export const removeSecondaryUserTokenFromCookie = () => {
  cookie.remove('secondaryUserToken');
  return true;
};
export const getTokenFromCookie = (label = 'userToken') => {
  const userToken = cookie.get(label);
  return userToken && userToken !== '' ? userToken : undefined;
};
export const setTokenToCookie = (token, label = 'userToken') => {
  cookie.set(label, token);
};
export const removeTokenFromCookie = (label = 'userToken') => {
  cookie.remove(label);
};
