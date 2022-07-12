import { Fragment, useEffect, useRef, useState } from "react";

const CheckoutForm = (props) => {
  const [isShippingSame, setShippingCheckbox] = useState(false);
  const formElement = useRef();

  const [billing, setOrderBilling] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [shipping, setShippingBilling] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    if (isShippingSame) {
      setShippingBilling(billing);
    } else {
      setShippingBilling({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zip: "",
      });
    }
  }, [isShippingSame,billing]);

  const orderSubmitHandler = (event) => {
    event.preventDefault();
    props.onSubmit({
      billing,shipping
    });
    console.log("Order submti call");
  };

  const billingChangeHandler = (event) => {
    setOrderBilling((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const shippingChangeHandler = (event) => {
    setShippingBilling((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (props.triggerSubmitted) {
      formElement.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  }, [props.triggerSubmitted]);

  return (
    <Fragment>
      <h1 className="heading">Checkout</h1>
      <form
        className="form-horizontal"
        ref={formElement}
        onSubmit={orderSubmitHandler}
      >
        <div className="card">
          <div className="card-body">
            <h3 className="card-title mb-3">Billing Address</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label
                   
                    htmlFor="billingInputAddressLine1"
                    className="form-label"
                  >
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="billingInputAddressLine1"
                    tabIndex={9}
                    name="addressLine1"
                    onChange={billingChangeHandler}
                    
                  />
                </div>
                <div className="mb-3">
                  <label
                   
                    htmlFor="billingInputCity"
                    className="form-label"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="billingInputCity"
                    tabIndex={11}
                    name="city"
                    onChange={billingChangeHandler}
                  />
                </div>
                <div className="mb-3">
                  <label
                   
                    htmlFor="billingInputPin"
                    className="form-label"
                  >
                    Pin
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="billingInputPin"
                    name="zip"
                    onChange={billingChangeHandler}
                    tabIndex={13}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label
                   
                    htmlFor="billingInputAddressLine2"
                    className="form-label"
                  >
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="billingInputAddressLine2"
                    name="addressLine2"
                    onChange={billingChangeHandler}
                    tabIndex={10}
                  />
                </div>
                <div className="mb-3">
                  <label
                   
                    htmlFor="billingInputState"
                    className="form-label"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="billingInputState"
                    name="state"
                    onChange={billingChangeHandler}
                    tabIndex={12}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-check mx-3 my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="inputSameAddressCheckbox"
              onChange={(event) => {
                setShippingCheckbox(event.target.checked);
              }}
            />
            <label
              className="form-check-label"
              htmlFor="inputSameAddressCheckbox"
            >
              Is your Billing Address same as Shipping Address?
            </label>
          </div>
        </div>
        {!!!isShippingSame && (
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-3">Shipping Address</h3>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                     
                      htmlFor="shippingInputAddressLine1"
                      className="form-label"
                    >
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shippingInputAddressLine1"
                      name="addressLine1"
                      onChange={shippingChangeHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                     
                      htmlFor="shippingInputCity"
                      className="form-label"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shippingInputCity"
                      name="city"
                      onChange={shippingChangeHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                     
                      htmlFor="shippingInputPin"
                      className="form-label"
                    >
                      Pin
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shippingInputPin"
                      name="zip"
                      onChange={shippingChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                     
                      htmlFor="shippingInputAddressLine2"
                      className="form-label"
                    >
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shippingInputAddressLine2"
                      name="addressLine2"
                      onChange={shippingChangeHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                     
                      htmlFor="shippingInputState"
                      className="form-label"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shippingInputState"
                      name="state"
                      onChange={shippingChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default CheckoutForm;
