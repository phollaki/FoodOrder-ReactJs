import React, { useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useRequest from "../../hooks/use-request";
import { TableBody } from "@material-ui/core";
function Cart(props) {
  const [order, setOrder] = useState(false);
  const cartCtx = useContext(CartContext);
  const { isLoading, error, sendRequest: sendOrder } = useRequest();
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setOrder(true);
  };
  const checkoutCancelHandler = (props) => {
    if (props === false) {
      setOrder(false);
    } else {
      setOrder(true);
    }
  };
  const submitOrderHandler = (userData) => {
    sendOrder({
      url: "https://temperature-fa4fb.firebaseio.com/orders.json",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        user: userData,
        orderedItems: cartCtx.items,
      },
    });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!order && (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button className={styles["button"]} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
      {order && (
        <Checkout
          onSubmitOrder={submitOrderHandler}
          onCheckoutCancel={checkoutCancelHandler}
        />
      )}
    </Modal>
  );
}

export default Cart;
