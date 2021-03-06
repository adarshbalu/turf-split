import { FunctionComponent, useContext } from "react";
import {
  AuthContext,
  AuthContextType,
  AuthState,
} from "../../../contexts/auth_context";
import { Navbar, NavbarContext } from "../../../contexts/nav_context";
import "../sidebar/sidebar.css";
import { ReactComponent as Football } from "../../../assets/football.svg";
import CircularProgress from "@mui/material/CircularProgress";

interface SideBarProps {}

const SideBar: FunctionComponent<SideBarProps> = () => {
  const { navbar, changeTab, resetTab } = useContext(NavbarContext);
  const { logoutUser, authState } = useContext(AuthContext) as AuthContextType;
  const unSelectedTabClass: string = "sidebar-item ";
  const selectorTabClass: string = " sidebar-item__selected";
  const selectedTabClass: string = unSelectedTabClass + selectorTabClass;

  const getSelectedTab = (nav: Navbar): string => {
    if (nav === navbar) {
      return selectedTabClass;
    } else {
      return unSelectedTabClass;
    }
  };

  return (
    <>
      {/* Sidebar */}
      <nav className="sidebar-container">
        {/* Sidebar top section - Logo , Dashboard , Events , Profile */}
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <Football className="App-logo" width={50} height={50} />
            <span>TurfSplit</span>
          </div>

          <div
            className={getSelectedTab(Navbar.DASHBOARD)}
            onClick={() => changeTab(Navbar.DASHBOARD)}
          >
            Dashboard
          </div>

          <div
            className={getSelectedTab(Navbar.EVENTS)}
            onClick={() => changeTab(Navbar.EVENTS)}
          >
            Events
          </div>

          <div
            className={getSelectedTab(Navbar.PROFILE)}
            onClick={() => changeTab(Navbar.PROFILE)}
          >
            Profile
          </div>
        </div>
        {/* Sidebar bottom section - Logout */}
        <div className="sidebar-bottom">
          {authState === AuthState.LOADING ? (
            <CircularProgress />
          ) : (
            <div
              className="logout-button"
              onClick={() => {
                logoutUser();
                resetTab();
              }}
            >
              Logout
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default SideBar;
