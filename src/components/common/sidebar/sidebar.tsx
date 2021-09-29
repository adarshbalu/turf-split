import { FunctionComponent } from "react";
import '../sidebar/sidebar.css';
interface SideBarProps {

}

const SideBar: FunctionComponent<SideBarProps> = () => {
    return (<>
        {/* Sidebar */}
        <nav className="sidebar-container">
            {/* Sidebar top section - Logo , Dashboard , Events , Profile */}
            <div className="sidebar-top">
                <div className="sidebar-logo"> LOGO</div>
                <div className="sidebar-item"> Dashboard</div>
                <div className="sidebar-item sidebar-item__selected">Events</div>
                <div className="sidebar-item">Profile</div>
            </div>
            {/* Sidebar bottom section - Logout */}
            <div className="sidebar-bottom">
                <div>Logout</div>
            </div>
        </nav>
    </>);
}

export default SideBar;