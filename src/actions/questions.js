import { _saveQuestion, _saveQuestionAnswer } from "../_DATA";
import { addUserQuestions as addUserQuestions } from "./users";

export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const SAVE_QUESTION = "SAVE_QUESTION";

export function handleQuestionAnswer({ authedUser, qid, answer }) {
  return (dispatch) => {
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    }).then(() => {
      dispatch(saveAnswerQuestion({ authedUser, qid, answer }));
    });
  };
}

export function handleSaveQuestion(question) {
  return (dispatch) => {
    return _saveQuestion(question)
      .then((formattedQuestion) => {
        dispatch(saveQuestion(formattedQuestion));
        dispatch(addUserQuestions(formattedQuestion));
      })
      .catch((e) => console.log("Error: ", e));
  };
}

function saveAnswerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

function saveQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question,
  };
}
