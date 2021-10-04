import React, { FunctionComponent, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext, AuthState } from "../../contexts/auth_context";
import { EventContext } from "../../contexts/event_context";
import '../dashboard/dashboard.css';
import NextToPayCard from "./next_to_pay";
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
                <h3> Dashboard</h3>
                <NextToPayCard />

            </div>
        </>
    );
}

export default Dashboard;