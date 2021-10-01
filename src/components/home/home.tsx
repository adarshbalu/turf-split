import { FunctionComponent, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { AuthContext, AuthState } from "../../contexts/auth_context";
import { NavbarContext, Navbar } from "../../contexts/nav_context";
import MainHeader from "../common/header/header";
import SideBar from "../common/sidebar/sidebar";
import Dashboard from "../dashboard/dashboard";
import EventsPage from "../events/events";
import '../home/home.css';
import Profile from "../profile/profile";
interface HomeProps {

}

const HomePage: FunctionComponent<HomeProps> = () => {
    const { authState, } = useContext(AuthContext);
    const history = useHistory();
    const { navbar } = useContext(NavbarContext);

    useEffect(() => {
        if (authState === AuthState.UNAUTHENTICATED) {
            routeChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState]);


    useEffect(() => { }, [navbar]);

    const routeChange = () => {
        let path = `/login`;
        history.push(path);
    };

    const titles: string[] = ["Dashboard", "Events", "Profile"]
    return (
        <>

            <div className="dashboard-container">

                <div className="dashboard-left">
                    <SideBar />
                </div>

                <div className="dashboard-right">
                    <MainHeader title={navbar === Navbar.DASHBOARD ? titles[0] : navbar === Navbar.EVENTS ? titles[1] : titles[2]} />

                    <div className="dashboard-body">
                    {navbar === Navbar.DASHBOARD ? <Dashboard /> : <></>}
                    {navbar === Navbar.PROFILE ? <Profile /> : <></>}
                    {navbar === Navbar.EVENTS ? <EventsPage /> : <></>}
                    </div>
                </div>

            </div>
        </>
    );
}

export default HomePage;