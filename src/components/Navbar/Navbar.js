import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const [flag, setFlag] = useState(false);

  const toggleHandler = () => {
    setFlag((prevState) => !prevState);
  };

  return (
    <>
      <header className={`${classes.header} ${flag ? classes.active : ""}`}>
        <img src="logexpenses.png" alt="loading" className={classes.logo} />

        <nav className={`${classes.navbar} ${flag ? classes.active : ""}`}>
          <ul className={classes.nav}>
            <li>
              <NavLink to="/home" className={classes.NavLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={classes.NavLink}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={classes.NavLink}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={classes.NavLink}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={classes.mobile_nav_btn}>
          <button onClick={toggleHandler}>
            <ion-icon name="menu"></ion-icon>
            <ion-icon name="close"></ion-icon>
          </button>
        </div>
      </header>

  
    </>
  );
};

export default Navbar;
