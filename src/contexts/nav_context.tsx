import { createContext, useState } from "react";


export enum Navbar {
    DASHBOARD, PROFILE, EVENTS,
}

export type NavContextType = {

    changeTab: (navbar: Navbar) => void,
    navbar: Navbar,
    resetTab: () => void,
}

type Props = {
    children: React.ReactNode;
};

const initialState: NavContextType = {
    navbar: {} as Navbar,
    changeTab: (navbar: Navbar) => { },
    resetTab: () => { },
}

export const NavbarContext = createContext<NavContextType>(initialState);

const NavbarContextProvider = (props: Props) => {

    const [navbar, setNavbar] = useState<Navbar>(Navbar.DASHBOARD);

    const changeTab = (navbar: Navbar) => {
        setNavbar(navbar);
    }

    const resetTab = () => {
        setNavbar(Navbar.DASHBOARD);
    }

    return (
        <NavbarContext.Provider value={{ resetTab, navbar, changeTab }}>
            {props.children}
        </NavbarContext.Provider>

    );
}

export default NavbarContextProvider;