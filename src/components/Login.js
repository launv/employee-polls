import { connect } from "react-redux";
import { handleLogin } from "../actions/shared";
import { forIn } from "lodash";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import "../styles/login.scss";
import { _login } from "../_DATA";

const Login = (props) => {
  const { users } = props;
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isDisable, setIsDisable] = useState(true);

  let options = [];
  forIn(users, (user) => {
    options.push(user);
  });

  const onLogin = () => {
    _login(selectedUser.id, password)
      .then((user) => {
        setError(null);
        props.dispatch(handleLogin(user.id));
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    setIsDisable(!password || password.length < 6);
  }, [password, setIsDisable]);

  return (
    <div className="login">
      <Dropdown
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        options={options}
        optionLabel="name"
        placeholder="Select a user"
        className="w-full"
      />

      {selectedUser && (
        <>
          <Password
            className={`w-full md:w-14rem ${error ? "p-invalid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Message className="w-full" severity="error" text={error} />
          )}
          <Message
            className="w-full"
            severity="success"
            text={`Suggestion: ${selectedUser?.password}`}
          />
        </>
      )}

      <Button
        className="w-full"
        disabled={isDisable}
        label="Login"
        onClick={onLogin}
      ></Button>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Login);
