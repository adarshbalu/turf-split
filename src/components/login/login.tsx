import { FunctionComponent, useContext, useEffect, useState } from "react";
import "../login/login.css";
import { useHistory } from "react-router";
import { AuthContext, AuthContextType, AuthState, UserState, } from "../../contexts/auth_context";

const LoginBox: FunctionComponent = () => {

  const history = useHistory();
  const { authState, loginUser, addUsername, userState, } = useContext(AuthContext) as AuthContextType;


  let [email, setEmail] = useState("");


  const handleClick = async () => {
    await loginUser(email);

  };

  useEffect(() => {

    if (authState === AuthState.AUTHENTICATED) {
      if (userState === UserState.NEW) {

        setUserName();
      } else {

        routeChange();
      }
    } else if (authState === AuthState.ERROR) {
      alert("Error occured");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, userState]);


  const setUserName = async () => {
    const username: string = prompt("Enter username to continue : ") ?? "";
    if (username !== "") {
      await addUsername(username);

    }
    routeChange();
  }

  const validateEmail = (email: string): boolean => {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-z0-9.-_]+\.[a-z]{2,3}$/;
    return re.test(email);
  };



  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  return (
    <>
      <div className="login-box">
        <h1>Login</h1>
        <form
          action="submit"
          onSubmit={(e) => {
            e.preventDefault();
            if (validateEmail(email)) {
              setEmail("");
            }
          }}
        >
          <label htmlFor="email"> Email </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={async (e) => {
              if (validateEmail(email)) {
                await handleClick();
              } else {
                alert("Please enter valid email id");
              }
            }}
          >
            Submit
          </button>
        </form>
        {/* {JSON.stringify(currentUser) ?? "No user logged in"} */}
        {authState === AuthState.LOADING ? <h3>Loading</h3> : <></>}
      </div>
    </>
  );
};

export default LoginBox;
