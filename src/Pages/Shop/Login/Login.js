import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../../Store/Auth/Auth.context";
import Card from "../../../UI/Card/Card";
//import Input from "../../../UI/Input/Input";
import styles from "./Login.module.css";
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const Login = () => {
  const [formValues, setFormValues] = useState({
    email: {
      value: "",
      valid: false,
      touched: false,
      error: "",
    },
    password: {
      value: "",
      valid: false,
      touched: false,
      error: "",
    },
    valid: false,
    touched: false,
    error: "",
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
    setAllFieldValidity();
    e.preventDefault();

    if (formValues.email.valid && formValues.password.valid) {
      const loginResponse = await authContext.login(
        formValues.email.value,
        formValues.password.value
      );
      if (!loginResponse) {
        setFormValues((prevState) => {
          const error = "Login/Password is not valid.";
          return { ...prevState, error, valid: false, touched: true };
        });
      } else {
        if (redirectURL) {
          navigate(redirectURL);
        } else {
          navigate("/products");
        }
      }
      console.log(loginResponse);
    }

    //console.log(formValues.email.value, formValues.password.value)
  };
  const setAllFieldValidity = () => {
    for (let key of Object.keys(formValues)) {
      if (typeof formValues[key] === "object") {
        _setFieldValidtiy(key, formValues[key].value);
      }
    }
  };

  const _setFieldValidtiy = (name, value) => {
    setFormValues((prevState) => {
      const formControl = prevState[name];
      if (formControl) {
        formControl.touched = true;
        formControl.value = value;
        formControl.error = "";
      }
      switch (name) {
        case "email":
          if (!formControl.value.trim()) {
            formControl.error = "Email address required";
          } else if (!ValidateEmail(formControl.value)) {
            formControl.error = "Email is not valid";
          }
          break;
        case "password":
          if (!formControl.value.trim()) {
            formControl.error = "Password required";
          } else if (formControl.value.trim().length < 5) {
            formControl.error = "Password should be more than 5 character";
          }
          break;
      }
      if (formControl) {
        if (formControl.error) {
          formControl.valid = false;
        } else {
          formControl.valid = true;
        }
      }
      //console.log({ ...prevState, [name]: formControl });

      return { ...prevState, [name]: formControl };
    });
  };
  const inputChangeHandler = (e) => {
    _setFieldValidtiy(e.target.name, e.target.value);
  };

  const isInputValid = (name) => {
    return formValues[name]?.valid && formValues[name]?.touched;
  };
  const getInputClass = (name) => {
    if (formValues[name]?.touched) {
      if (formValues[name]?.valid) {
        return "is-valid";
      } else {
        return "is-invalid";
      }
    } else {
      return "";
    }
    //return (formValues[name]?.valid && formValues[name]?.touched)?'is-valid';
  };

  return (
    <section className={styles["login-box"]}>
      <Card>
        <h1 className="text-center">Login</h1>
        <form
          onSubmit={formSubmitHandler}
          className="needs-validation"
          no-validate="false"
        >
          {formValues.touched && !formValues.valid && (
            <div>{formValues.error}</div>
          )}

          {/* <Input label="Email" type="text"
              className={`form-control ${getInputClass("email")}`}
              id="exampleInputEmail1"
              name="email"
              onChange={inputChangeHandler} /> */}

          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className={`form-control ${getInputClass("email")}`}
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
              onChange={inputChangeHandler}
            />
            {formValues.email.touched && !formValues.email.valid && (
              <div className="invalid-feedback">{formValues.email.error}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control  ${getInputClass("password")}`}
              id="exampleInputPassword1"
              autoComplete="false"
              name="password"
              onChange={inputChangeHandler}
            />
            {formValues.password.touched && !formValues.password.valid && (
              <div className="invalid-feedback">
                {formValues.password.error}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </Card>
     
    </section>
  );
};
export default Login;
