
import React, { FunctionComponent, useContext, useEffect } from "react";
import './home.css';
import '../../index.css';
import { AuthContext, AuthContextType, AuthState } from "../../contexts/auth_context";
import { useHistory } from "react-router";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    const { authState } = useContext(AuthContext) as AuthContextType;
    const history = useHistory();
    useEffect(() => {
        // logoutUser();
        //  routeChange();
    }, [authState]);
    const routeChange = () => {
        let path = `/login`;
        history.push(path);
    };

    return (
        <>
            <h1>Home</h1>
            <button id="login" onClick={routeChange} disabled={authState !== AuthState.UNAUTHENTICATED}>Login</button>
        </>
    );
}

export default Home;