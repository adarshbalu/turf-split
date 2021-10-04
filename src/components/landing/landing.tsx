import React, { FunctionComponent, useContext, useEffect } from "react";
import "./landing.css";
import "../../index.css";
import { useHistory } from "react-router";
import { ReactComponent as Logo } from "../../assets/goal.svg";
import { AuthContext } from "../../contexts/auth_context";

interface LandingPageProps {}

const LandingPage: FunctionComponent<LandingPageProps> = () => {
  const history = useHistory();
  const { autoLogin, authState } = useContext(AuthContext);
  useEffect(() => {
    if (autoLogin()) {
      let path = `/home`;
      history.push(path);
    }

  }, [authState]);
  const routeChange = () => {

    let path = `/login`;
    history.push(path);

  };

  return (
    <div className="welcome-page">
      <div className="welcome-box">
        <div className="txt-area">
          <h1>Welcome</h1>
          <p>Login to continue</p>
          <button
            className="login-button-welcome"
            id="login"
            onClick={routeChange}
          >
            Login
          </button>
        </div>
        <div id="image">
          <Logo width={400} height={400} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
