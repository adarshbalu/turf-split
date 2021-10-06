import React, { FunctionComponent, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext, AuthState } from "../../contexts/auth_context";
import "../dashboard/dashboard.css";
import NextToPayCard from "./next_to_pay";
interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  const { authState, user } = useContext(AuthContext);

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
      <div className="user-info">
        <div className="user-info-box balance">
          <h1>{`Balance: ₹ ${Math.round(user?.balance) ?? 0}`}</h1>
        </div>
        <div className="user-info-box eventnum">
          <h1>{`Total Events: ${
            user.events === undefined ? 0 : user.events.length
          }`}</h1>
        </div>
      </div>
      <NextToPayCard />
    </>
  );
};

export default Dashboard;
