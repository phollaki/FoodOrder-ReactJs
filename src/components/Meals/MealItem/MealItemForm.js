import React from "react";
import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";
function MealItemForm(props) {
  return (
    <form className={styles.mealform}>
      <Input
        label="Amount"
        input={{
          type: "number",
          id: "amount" + props.id,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button className={styles.button} type="submit">
        + Add
      </button>
    </form>
  );
}

export default MealItemForm;
