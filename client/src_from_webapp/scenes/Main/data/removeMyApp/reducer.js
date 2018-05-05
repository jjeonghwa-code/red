import {
  ACTIONS,
} from './actions';
import {
  makeFetchReducers,
} from 'modules/reduxHelper';

export default makeFetchReducers(ACTIONS);
