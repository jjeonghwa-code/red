/*
appList: [{
  id,
  isHttps,
  domain,
  path,
  favicon,
  title,
}]
 */
function getAppList() {
  const appList = localStorage.getItem('appList');
  return appList ? JSON.parse(appList) : appList;
}
function setAppList(appList) {
  localStorage.setItem('appList', JSON.stringify(appList));
}
function addApp(app) {
  const appList = getAppList() || [];
  const newAppList = appList.concat(app);
  setAppList(newAppList);
  return newAppList;
}
function removeApp(app) {
  const appList = getAppList();
  appList.splice(appList.findIndex(o => o.id === app.id), 1);
  setAppList(appList);
  return appList;
}
function getId() {
  return localStorage.getItem('id');
}
function setId(key) {
  localStorage.setItem('id', key);
}
const INIT_APP = [{"favicon":"https://storage.googleapis.com/nonohyes20180219/favicon/nAgrPBYxaXYMiiN4b5s5DeixwWJalptE","title":"NAVER","isHttps":true,"domain":"www.naver.com","path":"","__v":0,"id":"5a94eebe04174f1def7c936c"},{"favicon":"https://storage.googleapis.com/nonohyes20180219/favicon/XSj0JtJffyRc3uvlEfLARYhkKmp2rtQx","title":"페이스북","isHttps":true,"domain":"facebook.com","path":"","__v":0,"id":"5a94eef904174f1def7c936d"},{"favicon":"https://storage.googleapis.com/nonohyes20180219/favicon/wpm5RZ482ElJ1BfB39rUiQD4XEklKhJb","title":"YouTube","isHttps":true,"domain":"youtube.com","path":"","__v":0,"id":"5a94ef1a04174f1def7c936e"}];
function init() {
  if (!getId()) {
    setId('nonmember');
  }
  if (!getAppList()) {
    setAppList(INIT_APP);
  }
}
function isLoggedIn() {
  const id = getId();
  return id && id !== 'nonmember';
}
function getUserInfo() {
  return {
    isLoggedIn: isLoggedIn(),
    id: getId(),
    appList: getAppList(),
  }
}
function setUserInfo({ id, appList }) {
  setAppList(appList);
  setId(id);
}
function removeUserInfo() {
  setId('nonmember');
  setAppList([]);
}
export {
  getId,
  setId,
  addApp,
  removeApp,
  getAppList,
  setAppList,
  isLoggedIn,
  init,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
}
