import React from 'react';
import classes from './Home.module.css'
import { Link, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useSelector,useDispatch } from 'react-redux';

const Home = () => {
  const token =useSelector((state)=>state.Auth.token)
  const verification=async()=>{
    try{
      const res= await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDECVREeZXqI7KQqMpsiP2L-pM5eyQqU9s",{
        method:'POST',
        body:JSON.stringify({
          idToken:token,
          requestType:'VERIFY_EMAIL'
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const data=await res.json();
      if(res.ok){
  
        toast.success("verification mail send successfully")
      }else{
        throw Error(data.error.message)
      }
  
    }catch(err)
    {
      toast.error(err.message)
  
    }
  
  }
  
  return (
    <>
    <div className={classes.homehead}>
      <p>Welcome to Expense Tracker</p>
      <p className={classes.note}>Your Profile is incomplete.&nbsp;
      <NavLink  to="/profile"  style={{color:"blue"}} >complete now</NavLink></p>
    </div>

    <div>
      <button onClick={verification}>Click here to verify email</button>
    </div>
    <div>
     <Link to="/expenses"> <button>Click here to AddExpenses</button></Link> 
    </div>
    <ToastContainer  className="toast-container"/>

    </>
  );
  
};

export default Home;