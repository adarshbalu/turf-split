import { createContext, useState } from "react";
import APIService from "../services/api_service";
import User from "../types/user";
import URL from "../utils/urls";

export enum AuthState {
  AUTHENTICATED,
  LOADING,
  UNAUTHENTICATED,
  ERROR,
}
export enum UserState {
  NEW,
  EXISTING,
}

export type AuthContextType = {
  authState: AuthState;
  userState: UserState;
  loginUser: (email: string) => Promise<void>;
  logoutUser: () => void;
  user: User;
  addUsername: (username: string) => Promise<void>;
};

type Props = {
  children: React.ReactNode;
};

const initialState: AuthContextType = {
  authState: AuthState.UNAUTHENTICATED,
  userState: UserState.NEW,
  loginUser: async (email: string) => {},
  logoutUser: () => {},
  user: {} as User,
  addUsername: async (username: string) => {},
};

export const AuthContext = createContext<AuthContextType>(initialState);

const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<User>(initialState.user);
  const [authState, setAuthState] = useState<AuthState>(initialState.authState);
  const [userState, setUserState] = useState<UserState>(UserState.NEW);

  // Stores all the users registered
  let allUsers: User[] = [];

  const getUserData = async (id: number): Promise<void> => {
    try {
      const data: User = await APIService.get(URL.usersPath + id) as User;
        setUserState(UserState.EXISTING);
        setUser(data);
        setAuthState(AuthState.AUTHENTICATED);
        checkUsernameAdded();
        // return data;

    } catch (e) {
      console.log(`Error : ${e}`);
    }
  };

  // Fetch all the users
  const fetchUsers = async () => {
    try {
      const data = await APIService.get(URL.usersPath);
      return data;
    } catch (e) {
      console.log(`Error : ${e}`);
    }
  };

  // Check if the user is already registered.
  const checkUser = async (email: string): Promise<boolean> => {
    let isUserExists: boolean = false;

    allUsers = await fetchUsers();
    for (let u in allUsers) {
      if (email === allUsers[u].email) {
        const newUser: User = allUsers[u] as User;
        isUserExists = true;
        await getUserData(newUser.id!);
        setUserState(UserState.EXISTING);
        setUser(newUser);
        checkUsernameAdded();
        return isUserExists;
      }
    }
    return isUserExists;
  };

  // Add username
  const addUsername = async (username: string) => {
    const newUser: User = { ...user, name: username };
    try {
      const data: User = await APIService.put(URL.usersPath + user.id, newUser) as User;
      setUser(data);
      setUserState(UserState.EXISTING);
    } catch (e) {
      console.log(`Error : ${e}`);
    }
  };

  // Check if username is added
  const checkUsernameAdded = () => {
    if (user.name === "" || user.name === null) {
      setUserState(UserState.NEW);
    } else {
      setUserState(UserState.EXISTING);
    }
  };

  // Create new user
  const createUser = async (email: string) => {
    const newUser: User = {
      email: email,
      name: "",
      balance: 0,
      events: [],
    };
    try {
      const data = await APIService.post(URL.usersPath, newUser) as User;
      allUsers = [...allUsers, newUser];
        setUser(data);
        setAuthState(AuthState.AUTHENTICATED);
        setUserState(UserState.NEW);

    } catch (e) {
      console.log(`Error : ${e}`);
      setAuthState(AuthState.ERROR);
        setTimeout(() => {
          setAuthState(AuthState.UNAUTHENTICATED);
        }, 500);
    }
  };

  // Login user after checking if the user is already registered
  const loginUser = async (email: string) => {
    setAuthState(AuthState.LOADING);

    if (await checkUser(email)) {
      // If the user exists
      setAuthState(AuthState.AUTHENTICATED);
    } else {
      // The user does not exist , create a new user
      await createUser(email);
    }
  };

  // Loogout the user by changing the authstate
  const logoutUser = async () => {
    console.log("Logout");
    clearUserData();
  };

  // Clear user data
  const clearUserData = () => {
    setAuthState(AuthState.UNAUTHENTICATED);
    setUser({} as User);
  };

  // Check if userdata is saved in local storage
  // const checkForAutoLogin = async (): Promise<void> => {
  //     const isUserDataAvailable: boolean = LocalStorage.checkData(LocalStorage.USER_DATA);
  //     if (isUserDataAvailable) {

  //         const newUser: User = JSON.parse(LocalStorage.getData(LocalStorage.USER_DATA)) as User;
  //         setUser(newUser);
  //         console.log('User data found');
  //     } else {
  //         console.log('user data not found');
  //     }
  // }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loginUser,
        logoutUser,
        authState,
        userState,
        addUsername,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
