import React, { Fragment } from "react";
import styles from "./HeaderCartButton.module.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function HeaderCartButton(props) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <ShoppingCartIcon />
      </span>
      <span className={styles.title}>Your Cart</span>
      <span className={styles.counter}>3</span>
    </button>
  );
}

export default HeaderCartButton;
