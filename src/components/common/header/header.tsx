import { FunctionComponent } from "react";
import '../header/header.css';
interface MainHeaderProps {
    title: string
}

const MainHeader: FunctionComponent<MainHeaderProps> = (props: MainHeaderProps) => {
    return (
        <>
            <header className="header-container">
                <h3>{props.title}</h3>
            </header>

        </>
    );
}

export default MainHeader;