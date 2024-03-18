import { ANSWER_QUESTION, SAVE_QUESTION } from "../actions/questions";
import { RECEIVE_DATA } from "../actions/shared";

const answerModel = (answer = {}, action) => {
  const { authedUser } = action;
  const { votes } = answer;

  return {
    ...answer,
    votes: votes.concat(authedUser),
  };
};

const questionModel = (question = {}, action) => {
  const { answer } = action;

  return {
    ...question,
    [answer]: answerModel(question[answer], action),
  };
};

export default function questions(state = {}, action) {
  switch (action.type) {
    case ANSWER_QUESTION:
      const { qid } = action;

      return {
        ...state,
        [qid]: questionModel(state[qid], action),
      };

    case SAVE_QUESTION:
      const { question } = action;
      const { id } = question;

      return {
        ...state,
        [id]: question,
      };

    case RECEIVE_DATA:
      return action.questions ?? [];

    default:
      return state;
  }
}
