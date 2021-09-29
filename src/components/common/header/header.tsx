import { FunctionComponent } from "react";
import '../header/header.css';
interface MainHeaderProps {

}

const MainHeader: FunctionComponent<MainHeaderProps> = () => {
    return (
        <>
            <header className="header-container">
                <h3>Dashboard</h3>
            </header>

        </>
    );
}

export default MainHeader;