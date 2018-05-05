/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';

const ACTIONS = makeActionLabels('data/signUp');
const {
  request,
} = makeFetchActions(
  ACTIONS,
  {
    path: '/account',
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
  },
);

export {
  ACTIONS,
  request,
};
