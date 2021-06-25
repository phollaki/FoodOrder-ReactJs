import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import { ShoppingCart } from "@material-ui/icons";
import CartContext from "../../store/cart-context";

function HeaderCart(props) {
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const [btnIsHighlighted, setbtnIsHighlighted] = useState(false);
  useEffect(() => {
    if (items === 0) {
      return;
    }
    setbtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setbtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const totalItemInCart = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnStyles = `${styles.button} ${btnIsHighlighted ? styles.bump : ""} `;

  return (
    <button className={btnStyles} onClick={props.onShowCart}>
      <span className={styles.icon}>
        <ShoppingCart />
      </span>
      <span>
        <h3>Your cart</h3>
      </span>
      <span className={styles.badge}>{totalItemInCart}</span>
    </button>
  );
}

export default HeaderCart;
