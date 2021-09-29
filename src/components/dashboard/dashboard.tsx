import { FunctionComponent, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext, AuthState } from "../../contexts/auth_context";

interface DashboardProps {

}

const Dashboard: FunctionComponent<DashboardProps> = () => {
    const { user, authState, logoutUser } = useContext(AuthContext);
    const history = useHistory();
    useEffect(() => {
        if (authState === AuthState.UNAUTHENTICATED) {
            routeChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState]);
    const routeChange = () => {
        let path = `/login`;
        history.push(path);
    };
    return (<>
        <h1>Welcome {user.name}</h1>
        {authState === AuthState.AUTHENTICATED ? <button id="logout" onClick={logoutUser}>Logout</button> : <></>}
    </>);
}

export default Dashboard;