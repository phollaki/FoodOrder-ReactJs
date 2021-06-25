import { useEffect, useState } from "react";
import useRequest from "../../hooks/use-request";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const { isLoading, error, sendRequest: fetchTasks } = useRequest();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const transformTasks = (mealObj) => {
      const loadedMeals = [];

      for (const mealKey in mealObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealObj[mealKey].name,
          description: mealObj[mealKey].description,
          price: mealObj[mealKey].price,
        });
      }

      setMeals(loadedMeals);
    };

    fetchTasks(
      { url: "https://temperature-fa4fb.firebaseio.com/meals.json" },
      transformTasks
    );
  }, [fetchTasks]);

  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={styles.loading}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.name}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  return (
    <section className={styles.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
};
export default AvailableMeals;
