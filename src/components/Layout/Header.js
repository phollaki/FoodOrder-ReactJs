import React from "react";
import styles from "./Header.module.css";
import meals from "../../assets/meals.jpg";
import { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton />
      </header>
      <div className={styles.backgroundImg}>
        <img src={meals} alt="A table full of delicious food"></img>
      </div>
    </Fragment>
  );
};

export default Header;
