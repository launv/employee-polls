import { forIn } from "lodash";
import { Avatar } from "primereact/avatar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { connect } from "react-redux";

const LeaderBoard = (props) => {
  const { users } = props;

  let data = [];

  forIn(users, (user) => {
    const { questions, answers } = user;

    data.push({
      ...user,
      answeredNumber: Object.keys(answers).length,
      createdNumber: questions.length,
    });
  });

  const imageBodyTemplate = (user) => {
    return <Avatar image={user.avatarURL} shape="circle" size="large" />;
  };

  return (
    <DataTable value={data} className="overflow-hidden border rounded-lg">
      <Column header="Image" body={imageBodyTemplate}></Column>
      <Column field="name" header="Name"></Column>
      <Column field="answeredNumber" header="Answered"></Column>
      <Column field="createdNumber" header="Created"></Column>
    </DataTable>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(LeaderBoard);
