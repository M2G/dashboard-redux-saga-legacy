import { all, fork, call, takeEvery, put } from 'redux-saga/effects';
import { SignoutActionTypes } from './types';
import { clearAccessTokenStorage } from '@/services/storage';
import Config from '@/constants/constants';
import { history } from '@/index';
import { signoutSuccess } from '@/actions';

function* signoutFlow() {
  Config.GLOBAL_VAR.token = '';

  yield put(signoutSuccess());
  yield call(clearAccessTokenStorage);
  yield call(forwardTo, history, Config.ROUTER_PATH.SIGNIN);
}

function* signoutRequest() {
  yield call(signoutFlow);
}

function forwardTo(history: string[], url: string) {
  return history.push(url);
}

/*
 * This is our watcher function. We use `take*()` functions to watch Redux for a specific action
 * type, and run our saga, for example the `handleFetch()` saga above.
 */
function* watchSignout() {
  yield takeEvery(SignoutActionTypes.SIGNOUT_USER_REQUEST, signoutRequest);
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* signoutSaga() {
  yield all([fork(watchSignout)]);
}

export {
  signoutRequest,
  signoutFlow,
  signoutSaga
};
