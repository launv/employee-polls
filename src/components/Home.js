import { forIn } from "lodash";
import { TabPanel, TabView } from "primereact/tabview";
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
    <div className="card">
      <TabView>
        <TabPanel header="New Questions">
          {!!unansweredQuestions && (
            <QuestList questions={unansweredQuestions} />
          )}
        </TabPanel>
        <TabPanel header="Done">
          {!!answeredQuestions && <QuestList questions={answeredQuestions} />}
        </TabPanel>
      </TabView>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  authedUser,
  questions,
});

export default connect(mapStateToProps)(Home);
