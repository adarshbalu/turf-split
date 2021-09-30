import { createContext, useState } from "react";


enum Navbar {
    DASHBOARD, PROFILE, EVENTS,
}

export type NavContextType = {

    // changeTab:()=>void,
    navbar: Navbar,
}

type Props = {
    children: React.ReactNode;
};

const initialState: NavContextType = {
    navbar: {} as Navbar.DASHBOARD,
    // changeTab:()=>{},
}

export const NavbarContext = createContext<NavContextType>(initialState);

const NavbarContextProvider = (props: Props) => {

    const [navbar, setNavbar] = useState<Navbar>(initialState.navbar);


    return (
        <NavbarContext.Provider value={{ navbar }}>
            {props.children}
        </NavbarContext.Provider>

    );
}

export default NavbarContextProvider;