import editorToken from './editorToken/saga';
import auth from './auth/saga';

export default [
  ...editorToken,
  ...auth,
];
