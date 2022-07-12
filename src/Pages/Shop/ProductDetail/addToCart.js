import { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AddCartInLocal, AddCartToUser } from "../../../Store/Actions/cartActions";
import AuthContext from "../../../Store/Auth/Auth.context";

const AddToCart = (props) => {
  const [quantity, setQuantity] = useState(1);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const productIDInput = useRef();
  const [message,setMessage]  =useState("");
  const dispatch = useDispatch();



  const submitHandler = (event) => {
    event.preventDefault();

    props.product.quantity = quantity;
    const data = {
      product: props.product,
    };
    //console.log(data); return;
    if(auth.token){
      dispatch(AddCartToUser(auth.token,data,navigate));
    }else{
      dispatch(AddCartInLocal(data))
    }
    
  };

  return (
    <form className="form-inline mb-5" onSubmit={submitHandler}>
      <div className="row">
        <div className="col-md-2">
          <input
            type="number"
            min={"1"}
            max={"10"}
            className="form-control"
            placeholder="QTY"
            defaultValue={quantity}
            id="addToCartQuantityInput"
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <input
            type="hidden"
            name="productId"
            defaultValue={props.product._id}
            ref={productIDInput}
          />
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
      {message && <div className="alert alert-light" role={`alert`}>
        {message} <NavLink className={`alert-link`} to={`/cart`}>Cart</NavLink>

      </div>}
      
    </form>
  );
};

export default AddToCart;
