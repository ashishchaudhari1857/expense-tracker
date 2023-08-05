import React from "react";
import classes from "./Home.module.css";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  return (
    <>
      <div className={classes.homehead}>
        <p>Money often costs too much</p>
        <p className={classes.note}>
          Your Profile is incomplete.&nbsp;
          <NavLink to="/profile" style={{ color: "blue" }}>
            complete now
          </NavLink>
        </p>
      </div>

      <div className={classes.container}>
        <div>
          <Link to="/expenses">
            {" "}
            <button className={classes.btn}>Click here to AddExpenses</button>
          </Link>
        </div>
        <section className={classes.content}>
          <div className={classes.Home_headline}>
            <img className={classes.wallet} src="/imgwallet.png"></img>
            wallet
            <h1>Keep All your Finance</h1>
            <img
              src="/moneypig.png"
              style={{ marginLeft: "20%" }}
              className={classes.pig}
            ></img>
            <h5 style={{ marginLeft: "20%", color: "purple" }}>
              Save and Secure
            </h5>
          </div>

          <div>
            <img src="/imgmobile2.png"></img>
            <img className={classes.mobile1} src="/mobileimg.png"></img>
            <h1 className={classes.invitation}>What Are You Waiting for ???</h1>
            <NavLink to="/login">
              <button
                style={{
                  marginLeft: "20%",
                  fontSize: "1.5rem",
                  backgroundColor: "skyblue",
                  padding: "2px",
                }}
              >
                Enroll Now{" "}
              </button>
            </NavLink>
            <p style={{ fontSize: "1.5rem", fontFamily: "monospace" }}>
              "At our core, we are dedicated to guiding you on a transformative
              journey towards financial empowerment.
            </p>
          </div>
        </section>
        <div className={classes.images}>
          <img className={classes.save1} src="/save1.png"></img>
          <h3>
            Investing in Your Future, Navigating Your Finances Today. "Discover
            the Power of Smart Financial Choices – Your Journey to Prosperity
            Begins Here
          </h3>
          <img className={classes.track} src="/track.png"></img>
        </div>
        <ToastContainer className="toast-container" />
      </div>
    </>
  );
};

export default Home;
