import { FunctionComponent, useContext } from "react";
import { AuthContext, AuthContextType } from "../../../contexts/auth_context";
import '../sidebar/sidebar.css';
interface SideBarProps {

}

const SideBar: FunctionComponent<SideBarProps> = () => {
    const { logoutUser } = useContext(AuthContext) as AuthContextType;
    return (<>
        {/* Sidebar */}
        <nav className="sidebar-container">
            {/* Sidebar top section - Logo , Dashboard , Events , Profile */}
            <div className="sidebar-top">
                <div className="sidebar-logo"> LOGO</div>
                <div className="sidebar-item sidebar-item__selected"> Dashboard</div>
                <div className="sidebar-item ">Events</div>
                <div className="sidebar-item">Profile</div>
            </div>
            {/* Sidebar bottom section - Logout */}
            <div className="sidebar-bottom">
                <div onClick={logoutUser}>Logout</div>
            </div>
        </nav>
    </>);
}

export default SideBar;