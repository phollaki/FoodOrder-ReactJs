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
    hasError: firstNameError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    enteredValue: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    enteredValue: enteredEmail,
    isValid: emailIsValid,
    hasError: emailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"));
  const {
    enteredValue: enteredAddress,
    isValid: addressIsValid,
    hasError: addressError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  return (
    <div className={styles.userInfo}>
      <h2>Your information</h2>
      <div className={styles.userinfo}>
        <label>First Name</label>
        <input
          type="text"
          id="firstName"
          value={enteredFirstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          style={
            firstNameError
              ? { backgroundColor: "pink" }
              : { backgroundColor: "white" }
          }
        ></input>
      </div>
      <div className={styles.userinfo}>
        <label>Last Name</label>
        <input
          type="text"
          id="lastName"
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          style={
            lastNameError
              ? { backgroundColor: "pink" }
              : { backgroundColor: "white" }
          }
        ></input>
      </div>

      <div className={styles.userinfo}>
        <label>Email</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          style={
            emailError
              ? { backgroundColor: "pink" }
              : { backgroundColor: "white" }
          }
        ></input>
      </div>

      <div className={styles.userinfo}>
        <label>Address</label>
        <input
          type="text"
          id="address"
          value={enteredAddress}
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          style={
            addressError
              ? { backgroundColor: "pink" }
              : { backgroundColor: "white" }
          }
        ></input>
      </div>
      <div className={styles.actions}>
        <button className={styles.btn} onClick={cancelHandler}>
          Cancel
        </button>
        <button className={styles.button}>Confirm</button>
      </div>
    </div>
  );
}

export default Checkout;
