import saga from './data/saga';
import AccountManager from './scenes/AccountManager/saga';
import EditorManager from './scenes/EditorManager/saga';
import CompletedManager from './scenes/CompletedManager/saga';

export default [
  ...saga,
  ...AccountManager,
  ...EditorManager,
  ...CompletedManager,
];
