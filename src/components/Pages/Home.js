import React from 'react';
import classes from './Home.module.css'
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <div className={classes.homehead}>
      <p>Welcome to Expense Tracker</p>
      <p className={classes.note}>Your Profile is incomplete.&nbsp;
      <NavLink  to="/profile"  style={{color:"blue"}} >complete now</NavLink></p>
    </div>
    </>
  );
  
};

export default Home;