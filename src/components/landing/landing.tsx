import React, { FunctionComponent } from "react";
import "./landing.css";
import "../../index.css";
import { useHistory } from "react-router";
import { ReactComponent as Logo } from "../../assets/goal.svg";

interface LandingPageProps {}

const LandingPage: FunctionComponent<LandingPageProps> = () => {
  const history = useHistory();

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
