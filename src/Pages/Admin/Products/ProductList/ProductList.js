import { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Fragment>
      <h3>Product List</h3>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Photo</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((_product) => (
              <tr key={_product._id}>
                <th scope="row">1</th>
                <td>{_product.title}</td>
                <td >
                  <div className={styles["table-image"]}>
                    <img
                      className={styles["card-img-top"]}
                      src={_product.image}
                      alt={_product.title}
                    />
                    </div>
                  </td>
                <td>${_product.price}</td>
                <td>
                  <NavLink
                    to={`/admin/add/${_product._id}`}
                    className={"btn"}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </NavLink>
                  {/* <a className="btn" role="button" aria-disabled="true" onClick={}><i className="bi bi-trash"></i></a> */}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
    </Fragment>
  );
};
export default ProductList;
