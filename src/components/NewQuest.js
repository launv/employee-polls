import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSaveQuestion } from "../actions/questions";
import { InputText } from "primereact/inputtext";
import formatDate from "../utils/date";
import { Card } from "primereact/card";
import Author from "./Author";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

const NewQuest = (props) => {
  const { user, dispatch } = props;
  const navigate = useNavigate();

  const DEFAULT_QUESTION = {
    author: user.id,
    optionOneText: "",
    optionTwoText: "",
  };

  const [question, setQuestion] = useState(DEFAULT_QUESTION);
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState("Would you rather");

  const checkInput = () => {
    if (
      question.optionOneText !== "" &&
      question.optionTwoText !== "" &&
      question.optionOneText !== question.optionTwoText
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    setTitle(
      `Would you rather ${question.optionOneText} vs ${question.optionTwoText}`
    );
    checkInput();
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleSaveQuestion(question)).then(() => {
      setQuestion(DEFAULT_QUESTION);
      setDisabled(true);
      navigate("/");
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const Preview = () => {
    const date = formatDate(new Date().getTime());
    return (
      <Card title={title}>
        <Author name={user.name} date={date} avatar={user.avatarURL} />
      </Card>
    );
  };

  return (
    <div className="new-quest">
      <h1 className="new-quest-heading">Preview</h1>
      <Preview></Preview>
      <form onSubmit={handleSubmit} className="quest-form">
        Would you rather <br />
        <InputText
          className="w-full"
          name="optionOneText"
          value={question.optionOneText}
          placeholder="Option One"
          onChange={handleInputChange}
        />
        <InputText
          className="w-full"
          name="optionTwoText"
          placeholder="Option Two"
          value={question.optionTwoText}
          onChange={handleInputChange}
        />
        {question.optionTwoText !== "" &&
          question.optionOneText === question.optionTwoText && (
            <Message
              className="w-full"
              severity="error"
              text="The second option must be different from the first option"
            />
          )}
        <Button
          data-testid="test-submit-button"
          disabled={disabled}
          className="w-full font-bold add-button p-button"
          label="Submit"
        ></Button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  const user = users[authedUser];
  return { user };
};

export default connect(mapStateToProps)(NewQuest);
