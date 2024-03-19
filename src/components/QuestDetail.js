import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import { RadioButton } from "primereact/radiobutton";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { handleQuestionAnswer } from "../actions/questions";
import { addUserAnswers } from "../actions/users";
import formatDate from "../utils/date";
import Author from "./Author";
import NotFound from "./NotFound";

const QuestDetail = (props) => {
  const { users, questions, user, dispatch } = props;
  const { question_id } = useParams();
  const question = questions[question_id];
  const [myAnswer, setMyAnswer] = useState(user.answers[question_id]);
  const [answer, setAnswer] = useState(myAnswer);
  const [idDisable, setIsDisable] = useState(true);

  useEffect(() => {
    setIsDisable(!answer || !!myAnswer);
  }, [answer, myAnswer]);

  if (!question) {
    return <NotFound />;
  }

  const { author, optionOne, optionTwo, timestamp } = question;
  const avatar = users[author].avatarURL;
  const name = users[author].name;
  const date = formatDate(timestamp);
  const title = `Would you rather ${optionOne?.text} vs ${optionTwo?.text}`;
  const options = [optionOne, optionTwo];

  const onSubmit = () => {
    const model = { authedUser: user.id, qid: question_id, answer };

    dispatch(handleQuestionAnswer(model));
    dispatch(addUserAnswers(model));

    setMyAnswer(answer);
  };

  const percentBar = (index) => {
    const optionOneNumber = optionOne.votes.length;
    const optionTwoNumber = optionTwo.votes.length;
    const totalVotes = optionOneNumber + optionTwoNumber;

    const optionOnePercent = (optionOneNumber / totalVotes) * 100;
    const optionTwoPercent = (optionTwoNumber / totalVotes) * 100;
    return index ? optionTwoPercent : optionOnePercent;
  };

  return (
    <div className="quest-detail">
      <Card title={title}>
        <Author name={name} date={date} avatar={avatar} />

        {/* Options */}
        {options &&
          options.map((option, index) => {
            const optionValue = index ? "optionTwo" : "optionOne";
            const isChecked = answer === optionValue;

            return (
              <div key={index} className={index ? "!mt-8" : ""}>
                <div className="flex my-4 align-items-center">
                  <RadioButton
                    inputId={index}
                    name="category"
                    value={optionValue}
                    onChange={(e) => setAnswer(e.value)}
                    checked={isChecked}
                    disabled={!!myAnswer}
                  />
                  <label htmlFor={option.text} className="ml-2">
                    {option.text}
                  </label>
                </div>
                {myAnswer && (
                  <ProgressBar value={percentBar(index)}></ProgressBar>
                )}
              </div>
            );
          })}

        <Button
          disabled={idDisable}
          label="Submit"
          className="w-full mt-8 font-bold add-button p-button"
          onClick={onSubmit}
        ></Button>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ users, questions, authedUser }) => {
  const user = users[authedUser];
  return { users, questions, user };
};

export default connect(mapStateToProps)(QuestDetail);
