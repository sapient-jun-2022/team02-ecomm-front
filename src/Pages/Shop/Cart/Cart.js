import { Fragment, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
//import styles from "./Cart.module.css";

import AuthContext from "../../../Store/Auth/Auth.context";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import { useNavigate } from "react-router-dom";
import { AddCartToUser, DeleteCart } from "../../../Store/Actions/cartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const cart = useSelector((state) => state.cart);

  const orderSubmitHandler = () => {
    console.log("orderSubmit");
  };
  const deleteCartHandler = useCallback((product)=>{
    dispatch(DeleteCart(token, { product }, navigate));
  },[dispatch,navigate,token]);

  const addCartHandler = useCallback((product)=>{
    dispatch(AddCartToUser(token, { product }, navigate));
  },[dispatch,navigate,token]);

  // const deleteCartHandler = (product) => {
  //   dispatch(DeleteCart(token, { product }, navigate));
  // };
  // const addCartHandler = (product) => {
  //   dispatch(AddCartToUser(token, { product }, navigate));
  // };

  let cartProductHTML = (
    <p className="text-center">No Products in your cart.</p>
  );
  if (cart?.products.length) {
    cartProductHTML = cart.products.map((_product) => (
      <CartList
        key={_product.productId}
        {..._product}
        onDeleteCart={deleteCartHandler}
        onAddCart={addCartHandler}
      />
    ));
  }

  return (
    <Fragment>
      {console.log(`Cart ${cart}`)}

      <h1 className="heading">Cart</h1>
      <div className="row">
        <div className={`${cart.products.length ? "col-md-8" : "col-md-12"}`}>
          {cartProductHTML}
        </div>
        {!!cart.products.length && (
          <div className="col-md-4">
            <CartSummary
              products={cart.products}
              total={cart.total}
              onPlaceOrder={orderSubmitHandler}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default Cart;
