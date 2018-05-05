import {
  createActionTypes,
} from '../../modules/reduxHelper';

const ON = 'ON';
const OFF = 'OFF';
const ACTIONS = createActionTypes('data/loader', [ON, OFF]);

const on = () => ({ type: ON });
const off = () => ({ type: OFF });

export {
  ACTIONS,
  on,
  off,
};
