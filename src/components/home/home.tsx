import { FunctionComponent, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { AuthContext, AuthState } from "../../contexts/auth_context";
import MainHeader from "../common/header/header";
import SideBar from "../common/sidebar/sidebar";
import '../home/home.css';
import Profile from "../profile/profile";
interface HomeProps {

}

const HomePage: FunctionComponent<HomeProps> = () => {
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

            <div className="dashboard-container">

                <div className="dashboard-left">
                    <SideBar />
                </div>

                <div className="dashboard-right">
                    <MainHeader title="Dashboard" />
                    <Profile />
                    {/* <Router>
                        <Switch>
                            <Route path="/profile">   <Profile /></Route>
                            <Route path="/events">   <EventsPage /></Route>
                            <Route path="/dashboard">   <Dashboard /></Route>
                        </Switch>

                    </Router> */}
                </div>

            </div>
        </>
    );
}

export default HomePage;