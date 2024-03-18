import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../actions/shared";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

const Profile = (props) => {
  const navigate = useNavigate();

  const { avatarURL, name } = props;

  const logout = () => {
    props.dispatch(handleLogin(null));
    navigate("/");
  };

  return (
    <div className="profile">
      <Avatar image={avatarURL} shape="circle" />
      <p className="user-name">{name},</p>
      <Button label="Logout" link onClick={logout} />
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];
  const { avatarURL, name } = user;
  return {
    avatarURL,
    name,
  };
};

export default connect(mapStateToProps)(Profile);
