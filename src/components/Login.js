import { forIn } from "lodash";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { _login } from "../_DATA";
import { handleLogin } from "../actions/shared";
import "../styles/login.scss";

const Login = (props) => {
  const { users } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isDisable, setIsDisable] = useState(true);

  let options = [];
  forIn(users, (user) => {
    options.push(user);
  });

  const onLogin = () => {
    _login(username, password)
      .then((user) => {
        setError(null);
        props.dispatch(handleLogin(user.id));
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    setIsDisable(
      !username || username.length < 3 || !password || password.length < 6
    );
  }, [username, password, setIsDisable]);

  return (
    <div className="login">
      <InputText
        className={"w-full"}
        name="username"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <Password
        label="Password"
        className={`w-full ${error ? "p-invalid" : ""}`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        feedback={false}
      />
      {error && <Message className="w-full" severity="error" text={error} />}

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
