import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ReteriveCart } from "../Actions/cartActions";
import { CLEAR_CART } from "../Config/cartConfig";
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
  const dispatch = useDispatch();
  const isLoggedIn = !!token;
  

  

  useEffect(()=>{
    setCookie("token", token, 2);
    const fetchCart = (_token) =>dispatch(ReteriveCart(_token));
    const fetchUser = async(_token)=>{
      fetch(`http://localhost:8000/user/authorize`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${_token}`
        },
      }).then((res)=>res.json()).then((data)=>{
        if(data.status){
          setUser(data.user);
        }
      });
    }
    
    if(token){
      fetchCart(token);
      fetchUser(token);
      
    }
    
  },[token,dispatch]);



  

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
        setToken(data.token);
        if (data.user) {
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
    dispatch({type:CLEAR_CART});
  };

  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        loggout: logoutHandler,
        user: user,
        token
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
