import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.home}>
      <div>
        <ul className="navbar-nav">
          <li>
            <NavLink to={`/products`}>Shop</NavLink>
          </li>
          <li>
            <NavLink to={`/admin`}>Admin</NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Home;
