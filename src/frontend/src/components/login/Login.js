import React, { useState, useEffect, useContext, useRef } from "react";

import classes from "./Login.module.css";

import Card from "../../shared/Card";
import Button from "../../shared/Button";
import Input from "../../shared/Input";

import AuthContext from "../../context/auth-context";
import NavContext from "../../context/nav-context";

const Login = () => {
  const context = useContext(AuthContext);
  const navContext = useContext(NavContext);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 2
      );
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 2);
  };

  const submitHandler = (event) => {
    console.log(formIsValid);
    event.preventDefault();
    if (formIsValid) {
      context.onLogin(enteredEmail, enteredPassword);
      context.storedRole === "ADMIN"
        ? navContext.onGoToTickets()
        : navContext.onGoToHome();
    } else if (!emailIsValid) emailInputRef.current.focus();
    else if (!passwordIsValid) passwordInputRef.current.focus();
  };

  return (
    <Card className={classes.login}>
      <div className={classes.header}>
        <h1>Login</h1>
      </div>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          label="E-Mail"
          value={enteredEmail}
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          type="password"
          id="password"
          label="Password"
          value={enteredPassword}
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          {/* <Button isRevert={true} onClick={context.onSwitchToRegister}>
            Register
          </Button> */}
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
