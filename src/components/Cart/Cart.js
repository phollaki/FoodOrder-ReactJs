import React, { useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useRequest from "../../hooks/use-request";
function Cart(props) {
  const [order, setOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);
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
    setIsSubmitting(true);
    sendOrder({
      url: "https://temperature-fa4fb.firebaseio.com/order.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    cartCtx.clearItem();
    setIsSubmitting(false);
    setDidSubmitted(true);
    cartCtx.clearItem();
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

  const cartModelContent = (
    <React.Fragment>
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
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmit = (
    <React.Fragment>
      <p>Ordered meals successfully!</p>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmitted && cartModelContent}
      {isSubmitting && !didSubmitted && isSubmittingModalContent}
      {!isSubmitting && didSubmitted && didSubmit}
    </Modal>
  );
}

export default Cart;
