import { FunctionComponent, useContext } from "react";
import { AuthContext, AuthContextType } from "../../../contexts/auth_context";
import { Navbar, NavbarContext } from "../../../contexts/nav_context";
import '../sidebar/sidebar.css';
interface SideBarProps {

}

const SideBar: FunctionComponent<SideBarProps> = () => {
    const { navbar, changeTab } = useContext(NavbarContext);
    const { logoutUser } = useContext(AuthContext) as AuthContextType;
    const unSelectedTabClass: string = "sidebar-item ";
    const selectorTabClass: string = " sidebar-item__selected";
    const selectedTabClass: string = unSelectedTabClass + selectorTabClass;

    const getSelectedTab = (nav: Navbar): string => {
        if (nav === navbar) {
            return selectedTabClass;
        } else {
            return unSelectedTabClass;
        }
    }

    return (<>
        {/* Sidebar */}
        <nav className="sidebar-container">
            {/* Sidebar top section - Logo , Dashboard , Events , Profile */}
            <div className="sidebar-top">
                <div className="sidebar-logo"> LOGO</div>

                <div
                    className={getSelectedTab(Navbar.DASHBOARD)}
                    onClick={() => changeTab(Navbar.DASHBOARD)}>
                    Dashboard
                </div>

                <div
                    className={getSelectedTab(Navbar.EVENTS)}
                    onClick={() => changeTab(Navbar.EVENTS)}>
                    Events
                </div>

                <div
                    className={getSelectedTab(Navbar.PROFILE)} onClick={() => changeTab(Navbar.PROFILE)}>
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