import { setAuthedUser } from "./authedUser";
import { _getUsers, _getQuestions } from "../_DATA";

export const RECEIVE_DATA = "RECEIVE_DATA";

function receiveData(users, questions) {
  return {
    type: RECEIVE_DATA,
    users,
    questions,
  };
}

export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => {
        dispatch(receiveData(users, questions));
      }
    );
  };
}

export function handleLogin(AUTHED_ID) {
  return (dispatch) => {
    dispatch(setAuthedUser(AUTHED_ID));
  };
}
