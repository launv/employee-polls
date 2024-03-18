import { ADD_USER_ANSWERS, ADD_USER_QUESTIONS } from "../actions/users";
import { RECEIVE_DATA } from "../actions/shared";

const userAnswers = (user = {}, action) => {
  const { qid, answer } = action;
  const { answers } = user;

  return {
    ...user,
    answers: {
      ...answers,
      [qid]: answer,
    },
  };
};

const userQuestions = (user = {}, action) => {
  const { qid } = action;
  const { questions } = user;

  return {
    ...user,
    questions: questions.concat(qid),
  };
};

export default function users(state = {}, action) {
  const { authedUser } = action;
  const user = state[authedUser];

  switch (action.type) {
    case ADD_USER_ANSWERS: {
      return {
        ...state,
        [authedUser]: userAnswers(user, action),
      };
    }

    case ADD_USER_QUESTIONS: {
      return {
        ...state,
        [authedUser]: userQuestions(user, action),
      };
    }

    case RECEIVE_DATA:
      return action.users ?? [];

    default:
      return state;
  }
}
