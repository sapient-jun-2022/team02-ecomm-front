import { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../Store/Auth/Auth.context";

const Header = () => {
  const auth = useContext(AuthContext);
  const cart = useSelector((state)=>state.cart);
  const navigate = useNavigate();
  let cartHTML = '';
  if(cart?.products.length){
    const totalProduct = cart.products.reduce((total,current)=>(total+current.quantity),0);
    cartHTML = <li className="nav-item">
    <NavLink
      to={`/cart`}
      className={`nav-link position-relative`}
    >
      <i className="bi bi-cart"></i>
      <span className="position-absolute top-5 start-100 translate-middle badge rounded-pill bg-danger">
        {totalProduct}
        <span className="visually-hidden">unread messages</span>
      </span>
    </NavLink>
  </li>;

  }
  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <NavLink className="navbar-brand" to={`/`}>
            Ecomm
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={`/`}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={`/products`}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={`/cart`}
                >
                  Cart
                </NavLink>
              </li>

              {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Admin
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Add Product</a></li>
              <li><a className="dropdown-item" href="#">Manage Products</a></li>
          
            </ul>
          </li> */}
            </ul>
            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {!auth.isLoggedIn && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to={`/login`}
                    >
                      Login
                    </NavLink>
                  </li>
                )}

                {!auth.isLoggedIn && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to={`/signup`}
                    >
                      SignUp
                    </NavLink>
                  </li>
                )}
                {auth.isLoggedIn && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to={`/profile`}
                    >
                      User
                    </NavLink>
                  </li>
                )}
                {auth.isLoggedIn && (
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={() => {
                        auth.loggout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                )}

                {cartHTML}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
