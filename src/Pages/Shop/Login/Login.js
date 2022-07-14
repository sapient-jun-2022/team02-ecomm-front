import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useInput from "../../../Hooks/useInput";
import AuthContext from "../../../Store/Auth/Auth.context";
import Card from "../../../UI/Card/Card";
import Input from "../../../UI/Input/Input";
import { emailValidation, passwordValidation } from "../../../Utils/validation.function";
import styles from "./Login.module.css";


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}




const Login = () => {
  const [loginError,setLoginError] = useState('');
  const {
    value: emailValue,
    error: emailError,
    istouched: emailInputTouched,
    inputChangeHandler: emailInputChangeHandler,
    isValid: emailIsValid,
  } = useInput({
    validation: emailValidation,
    validationDebounceTime:750
  });

  const {
    value: passwordValue,
    error: passwordError,
    istouched: passwordInputTouched,
    inputChangeHandler: passwordInputChangeHandler,
    isValid: passwordIsValid,
  } = useInput({
    validation: passwordValidation,
  });

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const queryParams = useQuery();
  const redirectURL = queryParams.get("redirect");

  useEffect(() => {
    if (authContext.isLoggedIn) {
      navigate("/products");
    }
  }, [navigate, authContext.isLoggedIn]);
  const formSubmitHandler = async (e) => {
   // setAllFieldValidity();
    e.preventDefault();

    if (emailIsValid && passwordIsValid) {
      const loginResponse = await authContext.login(
        emailValue,
        passwordValue
      );
      if (!loginResponse) {
        const error = "Login/Password is not valid.";
         setLoginError(error);  
      } else {
        if (redirectURL) {
          navigate(redirectURL);
        } else {
          navigate("/products");
        }
      }
      //console.log(loginResponse);
    }

    //console.log(formValues.email.value, formValues.password.value)
  };
 

  return (
    <section className={styles["login-box"]}>
      <Card>
        <h1 className="h2 text-center">Login</h1>
        <form
          onSubmit={formSubmitHandler}
          className="needs-validation"
          no-validate="false"
        >
          {loginError && (
            <div className="alert alert-danger">{loginError}</div>
          )}

          

          <Input
            label="Email Address"
            type="text"
            className={`form-control`}
            id="exampleInputEmail1"
            name="email"
            onChange={(e) =>{
              console.log(e);
              emailInputChangeHandler(e.target.value);
            }
          }
            isValid={emailIsValid}
            errorMessage={emailError}
            isTouched={emailInputTouched}
            defaultValue={emailValue}
          />

          <Input
            label="Password"
            type="password"
            className={`form-control`}
            id="exampleInputPassword"
            name="password"
            onChange={(e)=>{
              passwordInputChangeHandler(e.target.value)
            }}
            isValid={passwordIsValid}
            autoComplete="false"
            errorMessage={passwordError}
            isTouched={passwordInputTouched}
            defaultValue={passwordValue}
          />

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </Card>
    </section>
  );
};
export default Login;
