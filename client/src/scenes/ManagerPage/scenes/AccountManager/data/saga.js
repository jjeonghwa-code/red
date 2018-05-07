import accountList from './accountList/saga';
import accountCreate from './accountCreate/saga';
import accountUpdate from './accountUpdate/saga';
import accountRemove from './accountRemove/saga';

export default [
  ...accountList,
  ...accountCreate,
  ...accountUpdate,
  ...accountRemove,
];
