import classes from "./Profile.module.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, json, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeActions } from "./slices/Themeslice";

const Profile = () => {
  const flag=useSelector((state)=>state.Theme.themeChanger)

  const dispatch =useDispatch();
  const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  const [user, setuser] = useState({
    displayName: "",
  photoUrl: "",
  });
  
  const Nameonchamgehandler = (e) => {
    setuser((prevUser) => ({
      ...prevUser,
      displayName: e.target.value,
    }));
  };
  const Urlonchamgehandler = (e) => {
    setuser((prevUser) => ({
      ...prevUser,
      photoUrl: e.target.value,
    }));
  };

  const verification = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDECVREeZXqI7KQqMpsiP2L-pM5eyQqU9s",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            requestType: "VERIFY_EMAIL",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("verification mail send successfully");
      } else {
        throw Error(data.error.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const userdetail = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDECVREeZXqI7KQqMpsiP2L-pM5eyQqU9s",
        {
          method: "POST",
          body: JSON.stringify({
            idToken:token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        console.log("this is data" ,data);
        setuser(data.users[0]);
        dispatch(ThemeActions.user(data.users[0]))
      } else {
        throw Error(data.error.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const update = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDECVREeZXqI7KQqMpsiP2L-pM5eyQqU9s",
        {
          method: "POST",
          body: JSON.stringify({
            idToken:token,
            displayName: user.displayName,
            photoUrl: user.photoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.json();
      if (!res.ok) 
      {
        throw Error(data.error.message);
      }else{
        toast.success("update successfully")
      }
    } catch (err) {
      toast.error(" thred", err.message);
    }

  };
  const submitHandler = (e) => {
    e.preventDefault();
    update();
  };

  useEffect(() => {
    userdetail();
     { (user.displayName && user.photoUrl )&& update()}
  }, []);
  return (
    <>
      <div>
        <div className={classes.profile}>
          <div className={classes.quote}>learn to never quit</div>
          <div>
            <p className={classes.note} style={{backgroundColor: flag&&"black"}}>
              your profile is 64% completed.A complete profile has higher chance
              to land a job
              <NavLink to="/profile">Complete Profile</NavLink>
            </p>
          </div>
        </div>
        <div className={classes.profile_container}>
          <section className={classes.section1}>
          <h1 style={{fontFamily:"revert" ,fontSize:"3rem"}}>Your Profile</h1>

            <img src={user.photoUrl} alt="loading"></img>
               <h2 style={{marginTop:"5px", fontSize:"2rem"}}>{user.displayName}</h2>
               <h2 style={{marginTop:"5px"}}>{user.email}</h2>
               <div>
        <button  style={{marginTop:"5px"}}onClick={verification}>Click here to verify email</button>
      </div>
          </section>
          <section>
            <form className={classes.form} style={{color: flag&&"black"}} onSubmit={submitHandler}>
              <div className={classes.infocontainer}>
                 <div className={classes.label}>
                  Full Name
                  </div>
                  <div>
                <input
                  type="text"
                  value={user.displayName}
                  onChange={Nameonchamgehandler}
                  name="name"
                ></input>
                </div>
              </div>
              <div>
              <div className={classes.infocontainer}>
                 <div className={classes.label}>
                 Profile photo url
                  </div>
                  <div>
                <input
                  type="text"
                  value={user.photoUrl}
                  onChange={Urlonchamgehandler}
                  name="url"
                  style={{overflow:"hidden"}}
                ></input>
                </div>
              </div>
              </div>
              <div>
              <div className={classes.infocontainer}>
                 <div className={classes.label}>
                 email
                  </div>
                  <div>
                <input
                  type="text"
                  value={user.email}
                ></input>
                </div>
              </div>
              </div>
              <div>
              <div className={classes.infocontainer}>
                 <div className={classes.label}>
                 emailVerified
                  </div>
                  <div>
                <input
                  type="text"
                  value={user.emailVerified}
                ></input>
                </div>
              </div>
              </div>
              <button className={classes.btn} type="submit">
                update
              </button>
            
              <ion-icon  style={{color: flag&&"gray"}} onClick={() => navigate("/home")}  name="arrow-round-back"></ion-icon>
              
            </form>
          </section>
        </div>
      </div>
    
      <ToastContainer className="toast-container" />
    </>
  );
};

export default Profile;
