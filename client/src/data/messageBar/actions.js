import {
  createActionTypes,
} from '../../modules/reduxHelper';

const PROCESS = 'PROCESS';
const CLOSING = 'CLOSING';
const CLOSED = 'CLOSED';
const ACTIONS = createActionTypes('data/messageBar', [PROCESS, CLOSING, CLOSED]);

const closed = () => ({
  type: ACTIONS[CLOSED],
});
const closing = () => ({
  type: ACTIONS[CLOSING],
});
const process = ({ info, queue }) => ({
  type: ACTIONS[PROCESS],
  info,
  queue,
});
export {
  ACTIONS,
  closed,
  closing,
  process,
};
