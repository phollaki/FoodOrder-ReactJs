import React from "react";
import styles from "./Checkout.module.css";
import useInput from "../../hooks/use-input";
function Checkout(props) {
  const cancelHandler = () => {
    props.onCheckoutCancel(false);
  };

  const {
    enteredValue: enteredFirstName,
    isValid: firstNameIsValid,
    reset: resetFirstName,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    enteredValue: enteredLastName,
    isValid: lastNameIsValid,
    reset: resetLastName,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    enteredValue: enteredEmail,
    isValid: emailIsValid,
    reset: resetEmail,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"));
  const {
    enteredValue: enteredAddress,
    isValid: addressIsValid,
    reset: resetAddress,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid =
    firstNameIsValid && lastNameIsValid && emailIsValid && addressIsValid;

  if (firstNameIsValid && lastNameIsValid && emailIsValid && addressIsValid) {
    formIsValid = true;
  }
  const submitHandler = (event) => {
    event.preventDefault();
    resetAddress();
    resetLastName();
    resetFirstName();
    resetEmail();
    props.onSubmitOrder({
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      address: enteredAddress,
    });
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h2>Your information</h2>
      <div className={styles.userinfo}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={enteredFirstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
        ></input>
      </div>
      <div className={styles.userinfo}>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
        ></input>
      </div>

      <div className={styles.userinfo}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        ></input>
      </div>

      <div className={styles.userinfo}>
        <label
          className={`${styles.userinfo} ${
            addressIsValid ? "" : styles.invalid
          }`}
          htmlFor="address"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          value={enteredAddress}
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
        ></input>
      </div>
      <div className={styles.actions}>
        <button className={styles.btn} onClick={cancelHandler}>
          Cancel
        </button>
        <button
          disabled={!formIsValid}
          className={styles.button}
          onClick={props.onSubmitOrder}
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export default Checkout;
