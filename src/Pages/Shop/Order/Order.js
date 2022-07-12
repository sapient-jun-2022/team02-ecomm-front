import { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Store/Auth/Auth.context";
import { CLEAR_CART } from "../../../Store/Config/cartConfig";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
//import styles from "./Order.module.css";
import OrderSummary from "./OrderSummary/OrderSummary";

const Order = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [placeOrderTrigger, setPlaceOrderTrigger] = useState(false);
  const placeOrderHandler = () => {
    setPlaceOrderTrigger(true);
  };
  const checkoutHandler = (values) => {
    console.log(values, auth.user, cart);
    const payload = {
      customer:{
        customerId:auth.user._id,
        name:auth.user.name,
        email:auth.user.email,
        billing:values.billing,
        shipping:values.shipping
      },
      products:cart.products,
      total:cart.total
    };
    if (auth.isLoggedIn) {
      fetch(`http://localhost:8000/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(payload)
      }).then((res)=>res.json()).then((data)=>{
        if(data.status){
          dispatch({type:CLEAR_CART});
          alert('Order Created SuccessFully');
          navigate("/");
          return;

        }
      });
    }
  };
  useEffect(() => {
    return () => {
      setPlaceOrderTrigger(false);
    };
  }, [placeOrderTrigger]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-8">
          <CheckoutForm
            triggerSubmitted={placeOrderTrigger}
            onSubmit={checkoutHandler}
          />
        </div>
        <div className="col-md-4">
          <OrderSummary onPlaceOrder={placeOrderHandler} cart={cart} />
        </div>
      </div>
    </Fragment>
  );
};
export default Order;
