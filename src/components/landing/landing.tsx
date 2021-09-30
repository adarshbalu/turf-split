
import React, { FunctionComponent, } from "react";
import './landing.css';
import '../../index.css';
import { useHistory } from "react-router";

interface LandingPageProps {

}

const LandingPage: FunctionComponent<LandingPageProps> = () => {

    const history = useHistory();

    const routeChange = () => {
        let path = `/login`;
        history.push(path);
    };

    return (
        <>
            <h1>Welcome</h1>
            <button id="login" onClick={routeChange}>Login</button>
        </>
    );
}

export default LandingPage;