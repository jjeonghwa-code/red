import {
  actions,
  remove,
} from './actions';
import {
  projectList,
} from '../projectList/actions';
import request from '../../../../../../modules/request';

import {
  put,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';

async function removeHelper(editor, projectIDs) {
  const result = await Promise.all(projectIDs.map(id => editor.deleteProject(id)));
  return result;
}

function* removeReq({ params }) {
  const { editor, projects } = params;
  yield call(
    removeHelper,
    editor,
    projects.map(o => o.projectId),
  );
  const { response, error } = yield call(
    request,
    '/api/project',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projects.map(o => o.id)),
    },
  );
  if (response) {
    yield put(remove.success(params, response));
    const { auth } = (yield select()).data;
    yield put(projectList.request({ accountId: auth.response.id }));
  }
  else yield put(remove.failure(params, error));
}
export default [
  takeLatest(actions['REQUEST'], removeReq),
];
