// @ts-ignore
import { USERProfile } from "custom-actions";
import { put, takeLatest, call } from "redux-saga/effects";
import {
  userLoginApi,
  verifyEmailApi,
  verifySeucrityQuestionApi,
  resetpasswordAPi,
  addSeucrityQuestionApi,
  signUpReq,
  getAllSecurityQuestion,
  getSecurityQuestions,
} from "../../api/userApi";
export function* userProfileSaga() {
  yield takeLatest(USERProfile.USER_PROFILE, userProfile);
}

function* userProfile() {
  // const userProfileData = yield call(userProfileDetail);
  yield put({
    type: USERProfile.USER_PROFILE_RESPONSE,
    payload: { id: 1 },
  });
}

export function* userLogin() {
  yield takeLatest(USERProfile.USER_LOGIN, userlogin);
}
function* userlogin(action: any) {
  const response = yield call(userLoginApi, action.body);
  // response = { user: "aashwini", userId: 1 };
  if (response) {
    yield put({
      type: USERProfile.USER_LOGIN_RESPONSE,
      payload: response,
    });
  }
}

export function* userVerifyEmail() {
  yield takeLatest(USERProfile.VERIFY_EMAIL, verifyEmail);
}
function* verifyEmail(action: any) {
  let response = yield call(verifyEmailApi, action.body);
  // response = { user: "aashwini", userId: 1 };
  if (response && !response.errors && !response.error) {
    yield put({
      type: USERProfile.VERIFY_EMAIL_RESPONSE,
      payload: { ...response, step: action.step + 1 },
    });
    yield put({
      type: "USER_SECURITY_QUESTION",
      body: action.body,
    });
  } else {
    yield put({
      type: USERProfile.VERIFY_EMAIL_RESPONSE,
      payload: { ...response },
    });
  }
}
export function* signUP() {
  yield takeLatest("VERIFY_SIGNUP", verifySignUp);
}
function* verifySignUp(action: any) {
  let response = yield call(signUpReq, action.body);
  // response = { user: "aashwini", userId: 1 };
  if (response && !response.errors && !response.error) {
    yield put({
      type: "VERIFY_SIGNUP_RESPONSE",
      payload: { ...response, step: action.step + 1 },
    });
  } else {
    yield put({
      type: "VERIFY_SIGNUP_RESPONSE",
      payload: { ...response },
    });
  }
}
export function* getAllSecurityQuestions() {
  yield takeLatest("ALL_SECURITY_QUESTION", getAlSecurityQuestion);
}
function* getAlSecurityQuestion(action: any) {
  let response = yield call(getAllSecurityQuestion);
  // response = { user: "aashwini", userId: 1 };
  if (response && !response.errors && !response.error) {
    yield put({
      type: "ALL_SECURITY_QUESTION_RESPONSE",
      payload: response.data,
    });
  }
}
export function* getuseSecurityQuestion() {
  yield takeLatest("USER_SECURITY_QUESTION", getuserSecurityQuestion);
}
function* getuserSecurityQuestion(action: any) {
  let response = yield call(getSecurityQuestions, action.body);
  // response = { user: "aashwini", userId: 1 };
  if (response && !response.errors && !response.error) {
    yield put({
      type: "USER_SECURITY_QUESTION_RESPONSE",
      payload: response.data,
    });
  }
}
export function* userVerifySecurityQuestion() {
  yield takeLatest(USERProfile.VERFY_SECURITY_QUESTION, verifySecurityQuestion);
}
function* verifySecurityQuestion(action: any) {
  let response = yield call(verifySeucrityQuestionApi, action.body, action.id);
  // response = { user: "aashwini", userId: 1 };
  if (response && !response.errors && !response.error) {
    yield put({
      type: USERProfile.VERFY_SECURITY_QUESTION_RESPONSE,
      payload: { ...response, step: action.step + 1 },
    });
  } else {
    yield put({
      type: USERProfile.VERFY_SECURITY_QUESTION_RESPONSE,
      payload: { ...response },
    });
  }
}
export function* addSecurityQuestion() {
  yield takeLatest("ADD_SECURITY_QUESTION", adddSecurityQuestion);
}
function* adddSecurityQuestion(action: any) {
  let response = yield call(addSeucrityQuestionApi, action.body, action.id);
  // response = { user: "aashwini", userId: 1 };
  if (response && !response.errors && !response.error) {
    yield put({
      type: "ADD_SECURITY_QUESTION_RESPONSE",
      payload: { ...response, step: action.step + 1 },
    });
  } else {
    yield put({
      type: "ADD_SECURITY_QUESTION_RESPONSE",
      payload: { ...response },
    });
  }
}

export function* userResetPassword() {
  yield takeLatest(USERProfile.RESET_PASSWORD, resetPassword);
}
function* resetPassword(action: any) {
  let response = yield call(resetpasswordAPi, action.body);
  // response = { user: "aashwini", userId: 1 };
  if (response && !response.errors && !response.error) {
    yield put({
      type: USERProfile.RESET_PASSWORD_RESPONSE,
      payload: { ...response, step: action.step },
    });
  }
}
