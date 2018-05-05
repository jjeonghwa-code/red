const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createActionTypes(base, types = [ REQUEST, SUCCESS, FAILURE ]) {
  return types.reduce((acc, type) => {
    acc[type] = `${base}/${type}`;
    return acc
  }, {})
}
export function action(type, payload = {}) {
  return { type, ...payload }
}