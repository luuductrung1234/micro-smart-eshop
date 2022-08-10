import React, { useState, useEffect, useContext, useRef } from "react";

import classes from "./Home.module.css";

import Card from "../../shared/Card";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import AuthContext from "../../context/auth-context";

import { addNewTicket } from "../../services/ticketService";

const Home = () => {
  const context = useContext(AuthContext);
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [amountIsValid, setAmountIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const amountInputRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(!isNaN(enteredAmount) && enteredAmount > 0);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [enteredAmount]);

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const validateAmountHandler = () => {
    setAmountIsValid(!isNaN(enteredAmount) && enteredAmount > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      addNewTicket(parseInt(context.storedUserId), enteredAmount);
      setEnteredAmount(0);
    } else if (!amountIsValid) amountInputRef.current.focus();
  };

  return (
    <Card className={classes.home}>
      <h3>Create new ticket</h3>
      <form onSubmit={submitHandler}>
        <Input
          ref={amountInputRef}
          type="number"
          id="amount"
          label="Amount"
          value={enteredAmount}
          isValid={amountIsValid}
          onChange={amountChangeHandler}
          onBlur={validateAmountHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Home;
