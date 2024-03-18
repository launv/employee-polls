import { forIn } from "lodash";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { connect } from "react-redux";
import "../styles/home.scss";
import QuestList from "./QuestList";

const Home = (props) => {
  const { authedUser, questions } = props;

  let answeredQuestions = [];
  let unansweredQuestions = [];

  forIn(questions, (question) => {
    if (
      [...question.optionOne?.votes, ...question.optionTwo?.votes].includes(
        authedUser
      )
    ) {
      answeredQuestions.push(question);
    } else {
      unansweredQuestions.push(question);
    }
  });

  return (
    <Splitter className="home">
      <SplitterPanel className="splitter-panel">
        <h1 className="splitter-header">New Questions</h1>
        {!!unansweredQuestions && <QuestList questions={unansweredQuestions} />}
      </SplitterPanel>

      <SplitterPanel className="splitter-panel">
        <h1 className="splitter-header">Done</h1>
        {!!answeredQuestions && <QuestList questions={answeredQuestions} />}
      </SplitterPanel>
    </Splitter>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  authedUser,
  questions,
});

export default connect(mapStateToProps)(Home);
