import { Fragment } from "react";
import styles from './OrderSummary.module.css';

const OrderSummary = (props) => {
  return (
    <Fragment>
      <h2 className="heading">Order Summary</h2>
      <div className="product-list">
        {!!props.cart.products && props.cart.products.map((singleProduct,index)=> <div
          className={`d-flex ${styles["summary-section"]} border-bottom py-2`} key={index}
        >
          <div>
            <img
              src={singleProduct.image}
              className={styles["item-image"]}
              alt={singleProduct.description}
            />
          </div>
          <div>
            <p className={`${styles["item-heading"]} p-0 m-0`}>{singleProduct.description}</p>
            <div className={styles["item-price-summary"]}>
              <span>{singleProduct.quantity}</span> X <span>${singleProduct.price.toFixed(2)}</span>
              <span> = </span> <span>${singleProduct.subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>) }
       
      </div>
      <div className="order-summary px-2 py-2">
        <div className="row">
          <div className="col-md-6">SubTotal:</div>
          <div className="col-md-6 ">
            <div className="float-end">${props.cart.total.toFixed(2)}</div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">Shipping Charge:</div>
          <div className="col-md-6 ">
            <div className="float-end">$00.00</div>
          </div>
        </div>
        <div className="row border-bottom pb-2">
          <div className="col-md-6 fw-bold">Total:</div>
          <div className="col-md-6 ">
            <div className="float-end">${props.cart.total.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="d-grid gap-2">
        <button className="btn btn-primary btn-block" onClick={props.onPlaceOrder}>Place Order</button>
      </div>
    </Fragment>
  );
};

export default OrderSummary;
