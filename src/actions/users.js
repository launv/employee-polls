export const ADD_USER_ANSWERS = "ADD_USER_ANSWERS";
export const ADD_USER_QUESTIONS = "ADD_USER_QUESTIONS";

export function addUserAnswers({ authedUser, qid, answer }) {
  return {
    type: ADD_USER_ANSWERS,
    authedUser,
    qid,
    answer,
  };
}

export function addUserQuestions(question) {
  return {
    type: ADD_USER_QUESTIONS,
    authedUser: question.author,
    qid: question.id,
  };
}
