import styles from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Wiener Schnitzel",
    description: "A german speciality",
    price: 15.49,
  },
  {
    id: "m3",
    name: "Gulash soup",
    description: "Hungarian soup with meal and veggies",
    price: 10.0,
  },
  {
    id: "m4",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => <li>{meal.name}</li>);

  return (
    <section className={styles.meals}>
      <ul>{mealsList}</ul>
    </section>
  );
};
export default AvailableMeals;
