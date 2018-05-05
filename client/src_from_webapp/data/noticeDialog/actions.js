/* global fetch */
import {
  makeActionLabels,
} from 'modules/reduxHelper';

const ON = 'ON';
const OFF = 'OFF';
const ACTIONS = makeActionLabels('data/noticeDialog', [ON, OFF]);

const off = () => {
  return {
    type: ACTIONS.OFF,
    open: false,
    title: '',
    message: '',
    onConfirm: null,
  };
};
const on = (data) => {
  let title, message, onConfirm;
  if (!data) {
    message = '알 수 없는 에러';
  } else if (typeof data === 'string') {
    message = data;
  } else if (typeof data === 'object') {
    title = data.title;
    message = data.message;
    onConfirm = data.onConfirm;
  } else {
    message = '에러가 있습니다.';
  }
  return {
    type: ACTIONS.ON,
    open: true,
    title: title || message ? '에러' : '알림',
    message,
    onConfirm,
  };
};
const error = (e) => {
  const error = e.error || e;
  console.error(error);
  let message = '에러가 발생했습니다.';
  if (error.message && error.message !== '') {
    if (error.message === 'Failed to fetch') {
      message = '서버에 연결할 수 없습니다.';
    } else {
      message = error.message ? error.message : '알수없는에러';
    }
  } else {
    console.error(error);
    message = `에러가 있습니다. ${JSON.stringify(error)}`;
  }
  return {
    type: ACTIONS.ON,
    open: true,
    title: 'ERROR',
    message,
  };
};

export {
  ACTIONS,
  on,
  off,
  error,
};
