import { Card } from "primereact/card";
import { connect } from "react-redux";
import formatDate from "../utils/date";
import Author from "./Author";

const QuestItem = (props) => {
  const { question, users } = props;
  const { author, timestamp, optionOne, optionTwo } = question;
  const avatar = users[author].avatarURL;
  const name = users[author].name;

  const date = formatDate(timestamp);
  const title = `Would you rather ${optionOne.text} vs ${optionTwo.text}`;

  return (
    <Card title={title}>
      <Author name={name} date={date} avatar={avatar} />
    </Card>
  );
};

const mapStateToProps = ({ authedUser, users }, { question }) => {
  return { authedUser, question, users };
};

export default connect(mapStateToProps)(QuestItem);
