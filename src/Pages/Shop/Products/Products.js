import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <React.Fragment>
      <h1>Products</h1>
      <div className="row">
        {products.map((_product) => (
          <div className="col mb-3" key={_product._id}>
            <div className="card" style={{ width: "18rem" }}>
              <div className={styles["card-image"]}>
                <img
                  className={styles["card-img-top"]}
                  src={_product.image}
                  alt={_product.title}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{_product.title}</h5>
                <p className="card-text">{_product.description}</p>
                <NavLink to={`${_product._id}`} className={"btn btn-primary"}>
                  View
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
export default Products;
