import projectList from './projectList/saga';
import update from './update/saga';
import remove from './remove/saga';

export default [
  ...projectList,
  ...update,
  ...remove,
];
