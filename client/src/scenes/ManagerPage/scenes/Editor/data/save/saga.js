import {
  actions,
  save,
} from './actions';
import request from '../../../../../../modules/request';
import { push } from 'react-router-redux';
import {
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';

const SECONDS = 2000;
const INTERVAL = 5;
// 썸네일 길이뿐 아니라 썸네일의 내용도 비교할 필요가 잇다.
async function saveHelper (editor, thumbnails, projectId) {
  editor.remoteEditor('command', { type: 'save' });
  let thumbnailsReturned = [];
  for (let i = 0; i < INTERVAL; i += 1) {
    try {
      thumbnailsReturned = (await editor.getProjectThumbnails(projectId || editor.getProjectId())).urls;
    } catch(e) {
      break;
    }
    if (thumbnails.length === thumbnailsReturned.length &&
      thumbnails.map((o, i) => o !== thumbnailsReturned[i]).reduce((acc, cur) => acc && cur)) {
      break;
    }
    await new Promise((resolve) => {
      setTimeout(resolve, SECONDS);
    });
  }
  return thumbnailsReturned;
}
function* post({ params }) {
  const { editor, project, accountId } = params;
  const { thumbnails, projectId, ...rest } = project;
  const results = yield call(
    saveHelper,
    editor,
    thumbnails,
    projectId
  );
  if (results.length > 0){
    const { response, error } = yield call(
      request,
      '/api/project',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          thumbnails: results,
          projectId: projectId || editor.getProjectId(),
          accountId,
          ...rest,
        })
      }
    );
    if (response) {
      yield put(push('/basket'));
      yield put(save.success(params, response));
    } else {
      yield put(save.failure(params, 'SAVE ERROR'));
    }
  }
  else yield put(save.failure(params, 'SAVE ERROR'));
}
export default [
  takeLatest(actions['REQUEST'], post),
];
