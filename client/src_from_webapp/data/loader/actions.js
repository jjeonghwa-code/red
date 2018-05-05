import {
  makeActionLabels,
} from 'modules/reduxHelper';

const ON = 'ON';
const OFF = 'OFF';
const ACTIONS = makeActionLabels('data/loader', [ON, OFF]);

const on = () => ({
  type: ACTIONS.ON,
});
const off = () => ({
  type: ACTIONS.OFF,
});
function loader (state) {
  return state ? on() : off();
}
export {
  ACTIONS,
  loader,
};
