import saga from './data/saga';
import AccountManager from './scenes/AccountManager/saga';
import ProjectManager from './scenes/ProjectManager/saga';
import CompletedManager from './scenes/CompletedManager/saga';
import Editor from './scenes/Editor/saga';

export default [
  ...saga,
  ...AccountManager,
  ...ProjectManager,
  ...CompletedManager,
  ...Editor,
];
