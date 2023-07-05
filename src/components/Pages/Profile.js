import Input from "../UI/Input";
import classes from "./Profile.module.css";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, json ,useNavigate} from "react-router-dom";
import { useGlobalContext } from "../Store/ContextProvider";


const Profile = () => {
  const ctx = useGlobalContext();
  const navigate =useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const EnterName = e.target.name.value;
    const EnterUrl = e.target.url.value;
    e.target.reset()
    const update = async () => {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDECVREeZXqI7KQqMpsiP2L-pM5eyQqU9s",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: ctx.token,
              displayName: EnterName,
              photoUrl: EnterUrl,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = res.json();
        if (res.ok) {
          toast.success("profile update successfully");
        } else {
          throw Error(data.error.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
    update();
  };
  return (
    <>
      <div>
        <div className={classes.profile}>
          <div className={classes.quote}>learn to never quit</div>
          <div>
            <p className={classes.note}>
              your profile is 64% completed.A complete profile has higher chance
              to land a job
              <NavLink to="profile">Complete Profile</NavLink>
            </p>
          </div>
        </div>

        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <label>
              <ion-icon name="contact"></ion-icon>
              Full Name
            </label>
            <input type="text" name="name"></input>
          </div>
          <div>
            <label>
              <ion-icon name="link"></ion-icon>
              Profile photo URL
            </label>
            <input type="text" name="url"></input>
          </div>
          <button className={classes.btn} type="submit">
            update
          </button>
        </form>
        <div className={classes.backbtn}>
          <button className={classes.btn} style={{width:"50%",justifyContent:"center"}} onClick={()=>navigate('/home')}>Back</button>
        </div>
      </div>
      <ToastContainer className="toast-container" />
    </>
  );
};

export default Profile;
