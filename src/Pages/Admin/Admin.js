import { Fragment } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <Fragment>
      <h1 className="heading">Admin</h1>
      <div className="row">
        <div className="col-sm-2">
          <ul className="nav nav-pills flex-column ">
            <li className="nav-item">
                <NavLink to={`product`} className={({isActive})=>{
                    return `nav-link ${isActive?'active':''}`
                }}>Product</NavLink>
             
            </li>
            <li className="nav-item">
            <NavLink to={`add`} className={({isActive})=>{
                    return `nav-link ${isActive?'active':''}`
                }}>Add Product</NavLink>
              
            </li>
          </ul>
        </div>
        <div className="col-sm-9">

            <Outlet />

        </div>
      </div>
    </Fragment>
  );
};
export default Admin;
