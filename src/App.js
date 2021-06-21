import { Fragment, useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <Fragment>
      <div className={styles.menu}>
        {showCart && <Cart onHideCart={hideCartHandler} />}

        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
      </div>
    </Fragment>
  );
}

export default App;
