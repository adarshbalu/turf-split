
import React, { FunctionComponent, } from "react";
import './home.css';
import '../../index.css';
import { useHistory } from "react-router";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {

    const history = useHistory();

    const routeChange = () => {
        let path = `/login`;
        history.push(path);
    };

    return (
        <>
            <h1>Home</h1>
            <button id="login" onClick={routeChange}>Login</button>
        </>
    );
}

export default Home;