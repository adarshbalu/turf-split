import { FunctionComponent, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext, AuthState } from "../../contexts/auth_context";
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


    return (
        <>

            <div>
                Dashboard



            </div>
        </>
    );
}

export default Dashboard;