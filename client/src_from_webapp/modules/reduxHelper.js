import update from 'react-addons-update';

const WAITING = 'WAITING';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const INIT = 'INIT';
function makeActionLabels(base, arr = [WAITING, SUCCESS, FAILURE, INIT]) {
  return arr.reduce((acc, type) => {
    acc[type] = `${base}/${type}`;
    return acc
  }, {});
}

function makeFetchActions(actions, fetchOptions = {}, { onSuccess, onFailure } = {}) {
  const waiting = () => ({
    type: actions.WAITING,
  });
  const success = (data) => ({
    type: actions.SUCCESS,
    data,
  });
  const failure = (error) => ({
    type: actions.FAILURE,
    error,
  });
  const init = () => ({
    type: actions.INIT,
  });
  return {
    waiting,
    success,
    failure,
    init,
  }
}

const initialState = {
  isFetching: false,
  error: null,
  data: null,
};
function makeFetchReducers(ACTIONS) {
  return (state = initialState, action) => {
    switch (action.type) {
      case ACTIONS.WAITING:
        return update(state, {
          isFetching: { $set: true },
          error: { $set: null },
        });
      case ACTIONS.SUCCESS:
        return update(state, {
          isFetching: { $set: false },
          error: { $set: null },
          data: { $set: action.data },
        });
      case ACTIONS.FAILURE:
        return update(state, {
          isFetching: { $set: false },
          error: { $set: action.error },
          data: { $set: null },
        });
      case ACTIONS.INIT:
        return update(state, {
          isFetching: { $set: false },
          error: { $set: null },
          data: { $set: null },
        });
      default:
        return state;
    }
  }
}

export {
  makeActionLabels,
  makeFetchActions,
  makeFetchReducers,
}
