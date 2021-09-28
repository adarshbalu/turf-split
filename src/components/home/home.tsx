
import React, { FunctionComponent, useContext, useEffect } from "react";
import './home.css';
import '../../index.css';
import { AuthContext, AuthContextType, AuthState } from "../../contexts/auth_context";
import { useHistory } from "react-router";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    const { logoutUser, authState } = useContext(AuthContext) as AuthContextType;
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
            {authState === AuthState.AUTHENTICATED ? <button id="logout" onClick={logoutUser}>Logout</button> : <button id="login" onClick={routeChange}>Login</button>}
        </>
    );
}

export default Home;