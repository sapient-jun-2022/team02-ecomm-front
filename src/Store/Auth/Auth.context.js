import { createContext } from "react";

const auth = {
  isLoggedIn: false,
  login: async (email, password) => {},
  loggout: () => {},
  token: "",
  user: null,
};

const AuthContext = createContext(auth);
export default AuthContext;
