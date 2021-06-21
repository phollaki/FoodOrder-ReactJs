import { Fragment } from "react";
import styles from "./App.module.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
function App() {
  return (
    <Fragment>
      <Header />
      <main className={styles.menu}>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
