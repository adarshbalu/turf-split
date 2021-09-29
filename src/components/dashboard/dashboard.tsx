import { FunctionComponent, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext, AuthState } from "../../contexts/auth_context";
import SideBar from "../common/sidebar/sidebar";
import '../dashboard/dashboard.css';
interface DashboardProps {

}

const Dashboard: FunctionComponent<DashboardProps> = () => {
    const { authState, } = useContext(AuthContext);
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
        <div className="dashboard-container">
            <div className="dashboard-left"> <SideBar />
            </div>

            <div className="dashboard-right">
                <h1>Dashboard</h1>
                {/* {authState === AuthState.AUTHENTICATED ? <button id="logout" onClick={logoutUser}>Logout</button> : <></>} */}
            </div>

        </div>
    </>);
}

export default Dashboard;