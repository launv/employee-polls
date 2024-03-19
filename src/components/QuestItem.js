import { Card } from "primereact/card";
import { connect } from "react-redux";
import formatDate from "../utils/date";
import Author from "./Author";
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";

const QuestItem = (props) => {
  const { question, users } = props;
  const { author, timestamp, optionOne, optionTwo } = question;
  const avatar = users[author].avatarURL;
  const name = users[author].name;

  const date = formatDate(timestamp);
  const title = `Would you rather ${optionOne.text} vs ${optionTwo.text}`;
  const answeredUsers = [
    ...question.optionOne.votes,
    ...question.optionTwo.votes,
  ];

  return (
    <Card title={title}>
      <Author name={name} date={date} avatar={avatar} />

      {answeredUsers?.length > 0 && (
        <div className="flex items-center">
          <p>Answered by: </p>
          <AvatarGroup>
            {answeredUsers.map((user) => {
              return (
                <Avatar
                  key={user}
                  image={users[user].avatarURL}
                  shape="circle"
                  tooltip={"asdwd"}
                />
              );
            })}
          </AvatarGroup>
        </div>
      )}
    </Card>
  );
};

const mapStateToProps = ({ authedUser, users }, { question }) => {
  return { authedUser, question, users };
};

export default connect(mapStateToProps)(QuestItem);
