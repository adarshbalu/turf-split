import { FunctionComponent, useContext } from "react";
import { AuthContext, AuthContextType } from "../../../contexts/auth_context";
import { Navbar, NavbarContext } from "../../../contexts/nav_context";
import '../sidebar/sidebar.css';
interface SideBarProps {

}

const SideBar: FunctionComponent<SideBarProps> = () => {
    const { navbar, changeTab } = useContext(NavbarContext);
    const { logoutUser } = useContext(AuthContext) as AuthContextType;

    return (<>
        {/* Sidebar */}
        <nav className="sidebar-container">
            {/* Sidebar top section - Logo , Dashboard , Events , Profile */}
            <div className="sidebar-top">
                <div className="sidebar-logo"> LOGO</div>

                <div
                    className={navbar === Navbar.DASHBOARD ? "sidebar-item sidebar-item__selected" : "sidebar-item"}
                    onClick={() => changeTab(Navbar.DASHBOARD)}>
                    Dashboard
                </div>

                <div
                    className={navbar === Navbar.EVENTS ? "sidebar-item sidebar-item__selected" : "sidebar-item"}
                    onClick={() => changeTab(Navbar.EVENTS)}>
                    Events
                </div>

                <div
                    className={navbar === Navbar.PROFILE ? "sidebar-item sidebar-item__selected" : "sidebar-item"} onClick={() => changeTab(Navbar.PROFILE)}>
                    Profile
                </div>

            </div>
            {/* Sidebar bottom section - Logout */}
            <div className="sidebar-bottom">
                <div onClick={logoutUser}>Logout</div>
            </div>
        </nav>
    </>);
}

export default SideBar;