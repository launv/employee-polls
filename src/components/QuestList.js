import { connect } from "react-redux";
import QuestItem from "./QuestItem";
import { Link } from "react-router-dom";

const QuestList = (props) => {
  const { questions } = props;

  return (
    <ul className="divide-y">
      {questions &&
        questions.map((q) => (
          <li key={q.id}>
            <Link to={`/questions/${q.id}`}>
              <QuestItem question={q} />
            </Link>
          </li>
        ))}
    </ul>
  );
};

const mapStateToProps = (_, { questions }) => {
  return { questions };
};

export default connect(mapStateToProps)(QuestList);
