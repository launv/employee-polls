import {
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
  generateUID,
} from "../_DATA";

describe("_saveQuestion", () => {
  it("should save the question to the store and return the formatted question", async () => {
    const question = {
      optionOneText: "Option 1",
      optionTwoText: "Option 2",
      author: "testAuthor",
    };

    const savedQuestion = await _saveQuestion(question);
    const { author, optionOne, optionTwo } = savedQuestion;

    expect(author).toBe("testAuthor");
    expect(optionOne.text).toBe("Option 1");
    expect(optionTwo.text).toBe("Option 2");
  });

  it("should reject the promise with an error message if the question is missing the required properties", async () => {
    const question = {
      optionOneText: "Option 1",
      optionTwoText: "Option 2",
    };

    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should update the user's answers and question votes", async () => {
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    const res = await _saveQuestionAnswer({ authedUser, qid, answer });

    expect(res).toEqual(true);
  });

  it("should throw an error if the authedUser, qid, or answer is missing", async () => {
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    await expect(
      _saveQuestionAnswer({ authedUser: null, qid, answer })
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
    await expect(
      _saveQuestionAnswer({ authedUser, qid: null, answer })
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
    await expect(
      _saveQuestionAnswer({ authedUser, qid, answer: null })
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});

describe("generateUID", () => {
  it("should return a string", () => {
    const result = generateUID();
    expect(typeof result).toBe("string");
  });

  it("should return difference string", () => {
    const id1 = generateUID();
    const id2 = generateUID();
    const id3 = generateUID();

    expect(id1 !== id2 && id1 !== id3 && id2 !== id3).toBe(true);
  });
});

describe("_getUsers", () => {
  it("should return a promise", () => {
    const result = _getUsers();
    expect(result).toBeInstanceOf(Promise);
  });

  it("should return the users object", async () => {
    const result = await _getUsers();
    expect(Object.keys(result).length).toEqual(4);
  });
});
