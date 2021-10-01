import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext, AuthState } from "../../contexts/auth_context";
import { NavbarContext, Navbar } from "../../contexts/nav_context";
import MainHeader from "../common/header/header";
import SideBar from "../common/sidebar/sidebar";
import Dashboard from "../dashboard/dashboard";
import EventsPage from "../events/events-og";
import "../home/home.css";
import Profile from "../profile/profile";
interface HomeProps {}

const HomePage: FunctionComponent<HomeProps> = () => {
  const { authState } = useContext(AuthContext);
  const history = useHistory();
  const { navbar } = useContext(NavbarContext);
  const [title, setTitle] = useState<string>("Dashboard");
  const [tab, setTab] = useState(<Dashboard />);
  useEffect(() => {
    if (authState === AuthState.UNAUTHENTICATED) {
      routeChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  useEffect(() => {
    getCurrentTab(navbar);
  }, [navbar]);

  const routeChange = () => {
    let path = `/login`;
    history.push(path);
  };

  const getCurrentTab = (navbar: Navbar) => {
    const titles: string[] = ["Dashboard", "Events", "Profile"];
    switch (navbar) {
      case Navbar.DASHBOARD:
        setTab(<Dashboard />);
        setTitle(titles[0]);
        break;

      case Navbar.PROFILE:
        setTab(<Profile />);
        setTitle(titles[2]);
        break;

      default:
        setTab(<EventsPage />);
        setTitle(titles[1]);
    }
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-left">
          <SideBar />
        </div>

        <div className="dashboard-right">
          <MainHeader title={title} />

          <div className="dashboard-body">{tab}</div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
