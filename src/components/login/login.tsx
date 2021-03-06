import { FunctionComponent, useContext, useEffect, useState } from "react";
import "../login/login.css";
import { useHistory } from "react-router";

import {
  AuthContext,
  AuthContextType,
  AuthState,
  UserState,
} from "../../contexts/auth_context";
import { LinearProgress } from "@mui/material";

const LoginBox: FunctionComponent = () => {
  const history = useHistory();

  const { autoLogin, authState, loginUser, addUsername, userState } = useContext(
    AuthContext
  ) as AuthContextType;

  let [email, setEmail] = useState("");

  const handleClick = async () => {
    await loginUser(email);
  };

  useEffect(() => {
    if (autoLogin()) {
      let path = `/home`;
      history.push(path);
    }

  }, [authState]);

  useEffect(() => {
    if (authState === AuthState.AUTHENTICATED) {
      if (userState === UserState.NEW) {
        setUserName();
      } else {
        routeChange();
      }
    } else if (authState === AuthState.ERROR) {
      alert("Authentication failed");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, userState]);

  const setUserName = async () => {
    const username: string = prompt("Enter username to continue : ") ?? "";
    if (username !== "") {
      await addUsername(username);
    }
    routeChange();
  };

  const validateEmail = (email: string): boolean => {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-z0-9.-_]+\.[a-z]{2,3}$/;
    return re.test(email);
  };

  const routeChange = () => {
    let path = `/home`;
    history.push(path);
  };

  return (
    <div className="main-div">
      <div className="login-box">
        <h1>Login</h1>
        <form
          className="form-padding"
          action="submit"
          onSubmit={(e) => {
            e.preventDefault();
            if (validateEmail(email)) {
              setEmail("");
            }
          }}
        >
          <label className="label-style" htmlFor="email">
            Enter email address
          </label>
          <input
            className="input-field"
            type="text"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            className="login-button"
            type="submit"
            onClick={async (e) => {
              if (validateEmail(email)) {
                await handleClick();
              } else {
                alert("Please enter valid email id");
              }
            }}
          >
            Submit
          </button>
        </form>
        {/* {JSON.stringify(currentUser) ?? "No user logged in"} */}
        {authState === AuthState.LOADING ? <LinearProgress /> : <></>}
      </div>
    </div>
  );
};

export default LoginBox;
