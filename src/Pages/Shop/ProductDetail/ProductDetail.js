import React, { useEffect, useState } from "react";
import AddToCart from "./addToCart";

import { useParams } from "react-router-dom";

import styles from "./ProductDetail.module.css";

const ProductDetail = (props) => {
  const [product, setProduct] = useState({});
  console.log(product);
  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:8000/products/${params.productId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      });
  }, [params.productId]);
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6">
          <div className={styles["product-image"]}>
            <img src={product.image} alt={product.title} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1>{product.title}</h1>
            <div className="price-section mb-5">Price: ${product.price}</div>
              <AddToCart product={product} />
            <div className="product-description">{product.description}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ProductDetail;
