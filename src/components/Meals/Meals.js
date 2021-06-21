import React, { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import styles from "./Meals.module.css";
import AvailableMeals from "./AvailableMeals";
function Meals() {
  return (
    <Fragment>
      <div className={styles.meals}>
        <MealsSummary />
        <AvailableMeals />
      </div>
    </Fragment>
  );
}

export default Meals;
