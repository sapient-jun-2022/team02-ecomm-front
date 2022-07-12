import { ADD_CART, RETERIVE_CART } from "../Config/cartConfig";

export const ReteriveCart = (token) => {
  return (dispatch) => {
    fetch(`http://localhost:8000/cart/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          dispatch({ type: RETERIVE_CART, payload: data.cart });
        }
      });
  };
};

export const AddCartToUser = (token, cartData, navigate) => {
  return (dispatch) => {
    const body = JSON.stringify(cartData);
    fetch(`http://localhost:8000/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    }).then((res) =>
      res.json().then((data) => {
        if (data.errorCode === 401) {
          sessionStorage.setItem("addCart", body);
          navigate(`/login?redirect=/products/${cartData.product._id}`);
        }
        if (data.status) {
          // setMessage(`Added into the cart.`);
          dispatch({ type: RETERIVE_CART, payload: data.cart });
          sessionStorage.removeItem("addCart");
        }
      })
    );
  };
};

export const AddCartInLocal = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CART, payload: data });
  };
};

export const DeleteCart = (token,cartData,navigate)=>{
  return (dispatch) => {
    const body = JSON.stringify(cartData);
    fetch(`http://localhost:8000/cart/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    }).then((res) =>
      res.json().then((data) => {
        if (data.errorCode === 401) {
          sessionStorage.setItem("addCart", body);
          navigate(`/login?redirect=/products/${cartData.product._id}`);
        }
        if (data.status) {
          // setMessage(`Added into the cart.`);
          dispatch({ type: RETERIVE_CART, payload: data.cart });
          sessionStorage.removeItem("addCart");
        }
      })
    );
  };

}

export const ClearCart = (token, navigate) => {
  return async (dispatch) => {
    fetch(`http://localhost:8000/cart/clear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) =>
      res.json().then((data) => {
        if (data.errorCode === 401) {
          // sessionStorage.setItem("addCart", body);
          navigate(`/login?redirect=/cart`);
        }
        if (data.status) {
          // setMessage(`Added into the cart.`);
          // dispatch({ type: RETERIVE_CART, payload: cartData });
          //sessionStorage.removeItem("addCart");
        }
      })
    );
  };
};
