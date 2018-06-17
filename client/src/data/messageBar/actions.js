import {
  createActionTypes,
} from '../../modules/reduxHelper';

const PROCESS = 'PROCESS';
const CLOSING = 'CLOSING';
const CLOSED = 'CLOSED';
const SHOW_MESSAGE = 'SHOW_MESSAGE';
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
const showMessage = ({ message }) => ({
  type: ACTIONS[SHOW_MESSAGE],
  message,
});
export {
  ACTIONS,
  closed,
  closing,
  process,
  showMessage,
};
