import { Fragment } from "react";

const CartSummary = (props) => {
  return (
    <Fragment>
      <p className="price-heading">Price Detail ({props.products.length} Items)</p>
      <div className="row">
        <div className="col-md-6">Total Price</div>
        <div className="col-md-6 ">
          <span className="d-block float-end">${parseFloat(props.total).toFixed(2)}</span>
        </div>
      </div>
      <hr />
      <div className="row">
        <button className="btn btn-primary" onClick={props.onPlaceOrder}>Place Order</button>
      </div>
    </Fragment>
  );
};
export default CartSummary;
