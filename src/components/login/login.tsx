import { FunctionComponent, useEffect, useState } from "react";
import "../login/login.css";
import User from "../../types/user";
import { useHistory } from "react-router";

const LoginBox: FunctionComponent = () => {
  const history = useHistory();
  const baseURL = "http://localhost:5000/users";
  let [currentUser, setCurrentUser] = useState<User>({} as User);
  let [users, setUsers] = useState<Array<User>>([]);
  let [email, setEmail] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await fetchUsers();
      setUsers(allUsers);
      console.log("getUsers functions inside useEffect");
    };

    getUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(`${baseURL}`);
    const data = await res.json();

    return data;
  };

  const handleClick = async () => {
    const newUser: User = {
      email: email,
      name: "",
      balance: 0,
      events: [],
    };

    await fetch(`${baseURL}`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json",
      },
    });

    setUsers((prev) => [...prev, newUser]);
    console.log(await fetchUsers());
  };

  const validateEmail = (email: string) => {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-z0-9.-_]+\.[a-z]{2,3}$/;
    return re.test(email);
  };

  const checkUser = async () => {
    let flag: boolean = false;
    const allUsers = await fetchUsers();
    for (let user in allUsers) {
      if (email === allUsers[user].email) {
        const newUser = allUsers[user] as User;

        flag = true;
        setCurrentUser(newUser);
        currentUser = newUser;

        break;
      }
    }

    if (flag) {
      //  routeChange();
      console.log(currentUser);
    } else {
      handleClick();
    }
    return flag;
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
                console.log(await checkUser());
              } else {
                alert("Please enter valid email id");
              }
            }}
          >
            Submit
          </button>
        </form>
        {JSON.stringify(currentUser) ?? "No user logged in"}
      </div>
    </>
  );
};

export default LoginBox;
