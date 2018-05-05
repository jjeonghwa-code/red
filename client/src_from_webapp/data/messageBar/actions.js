/* global fetch */
import {
  makeActionLabels,
} from 'modules/reduxHelper';

const ON = 'ON';
const OFF = 'OFF';
const ACTIONS = makeActionLabels('data/messageBar', [ON, OFF]);

const off = () => {
  return {
    type: ACTIONS.OFF,
    open: false,
  };
};
const on = (input) => {
  let message;
  if (typeof input === 'string') {
    message = input;
  } else {
    message = input.message;
  }
  return {
    type: ACTIONS.ON,
    open: true,
    message,
  };
};

export {
  ACTIONS,
  on,
  off,
};
