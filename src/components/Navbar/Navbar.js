import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import classes from "./Navbar.module.css";
 import { useSelector,useDispatch } from "react-redux";
 import { authActions } from "../Pages/slices/LoginSlice";

const Navbar = () => {
  const [flag, setFlag] = useState(false);// this is for dropdown
  const dispatch=useDispatch();
  const isLogged =useSelector((state)=>state.Auth.isLogged)
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
            { isLogged && <NavLink to="/home" className={classes.NavLink}>
                Home
              </NavLink>}
            </li>
            <li>
             {isLogged && <NavLink to="/contact" className={classes.NavLink}>
                Contact Us
              </NavLink> }
            </li>
           
          <li>
             {isLogged&& <NavLink to="/about" className={classes.NavLink}>
                About
              </NavLink> }
            </li>
            <li>
             { isLogged && <NavLink to="/login" onClick={() => dispatch(authActions.logout())} className={classes.NavLink}>
                logout
              </NavLink>}
            </li>
            <li>
             { isLogged && <NavLink to="/profile"  className={classes.NavLink}>
                Profile
              </NavLink>}
            </li>
            <li>
            { !isLogged && <NavLink to="/login" className={classes.NavLink}>
                Login/Sign-UP
              </NavLink> }
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
