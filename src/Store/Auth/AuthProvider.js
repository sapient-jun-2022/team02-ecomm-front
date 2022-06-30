import {  useState } from "react";
import AuthContext from "./Auth.context";

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const AuthProvider = (props) => {
  const [token, setToken] = useState(getCookie("token"));
  const [user, setUser] = useState(null);
  const isLoggedIn = !!token;

  const loginHandler = async (email, password) => {
    if (email && password) {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.token !== undefined) {
        setCookie("token", data.token, 2);
        setToken(data.token);
        if(data.user){
            setUser(data.user);

        }
        return true;
      } else {
        return false;
      }
    }
  };
  const logoutHandler = () => {
    setToken("");
    setCookie("token", "", 2);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        loggout: logoutHandler,
        user: user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
