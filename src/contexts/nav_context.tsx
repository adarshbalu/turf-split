import { createContext, useState } from "react";


export enum Navbar {
    DASHBOARD, PROFILE, EVENTS,
}

export type NavContextType = {

    changeTab: (navbar: Navbar) => void,
    navbar: Navbar,
}

type Props = {
    children: React.ReactNode;
};

const initialState: NavContextType = {
    navbar: {} as Navbar,
    changeTab: (navbar: Navbar) => { },
}

export const NavbarContext = createContext<NavContextType>(initialState);

const NavbarContextProvider = (props: Props) => {

    const [navbar, setNavbar] = useState<Navbar>(Navbar.DASHBOARD);

    const changeTab = (navbar: Navbar) => {
        setNavbar(navbar);
    }
    return (
        <NavbarContext.Provider value={{ navbar, changeTab }}>
            {props.children}
        </NavbarContext.Provider>

    );
}

export default NavbarContextProvider;