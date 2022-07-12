import { memo } from "react";
import styles from "./CartList.module.css";
const CartList = (props) => {
  const changeQuantityHandler = (quantity) => {
    if (quantity > props.quantity) {
      props.onAddCart({
        ...props,
        quantity: quantity - props.quantity,
        _id: props.productId,
      });
    } else {
      props.onDeleteCart({
        quantity: props.quantity - quantity,
        _id: props.productId,
      });
    }
  };
  const deleteProductHandler = () => {
    props.onDeleteCart({ quantity: props.quantity, _id: props.productId });
  };

  return (
    <div className={`card p-2 flex-row mb-2 ${styles["product-card"]}`}>
      {console.log(`CartList ${props}`)}
    
      <img src={props.image} className={styles["product-image"]} alt={props.title} />
      <div className="card-body pt-0">
        <div className="heading">
          <h2 className="p-0 m-0">{props.title}</h2>
        </div>
        <div>
          Quantity:
          <button
            className="btn shadow-none"
            onClick={changeQuantityHandler.bind(this, props.quantity - 1)}
          >
            <i className="bi bi-dash-circle"></i>
          </button>
          {props.quantity}
          <button
            className="btn shadow-none"
            onClick={changeQuantityHandler.bind(this, props.quantity + 1)}
          >
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
        <div>
          Price: ${props.price}, Subtotal: $
          {(+props.price * +props.quantity).toFixed(2)}
        </div>
      </div>
      <div className={`${styles["card-delete"]} flex-fill`}>
        <button className="btn float-end" onClick={deleteProductHandler}>
          <i className="bi bi-x-circle-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default memo(CartList) ;
