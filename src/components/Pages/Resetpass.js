import React from "react";
import Input from "../UI/Input";
import classes from "./login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const Resetpass = () => {
  const navigate=useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const Newemail = e.target.email.value;

    const reset = async () => {
      try{
        const res =await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDECVREeZXqI7KQqMpsiP2L-pM5eyQqU9s",
            {
              method: "POST",
              body: JSON.stringify({
                email: Newemail,
                requestType: "PASSWORD_RESET",
              }),
              headers: {
                "Content-Type": "application/json",
              },
            } );
            const data =await res.json();
            if(res.ok){
                toast.success("mail send successfully")
                navigate('/login')
            }else{
                throw Error(data.error.message)
            }
      }catch(err){
         toast.error(err.message)
      }
     
    };
    reset();
  };
  return (
    <>
      <form className={classes.form} style={{ height: "17rem" }} onSubmit={submitHandler}>
        <Input
          label={"Enter Email"}
          input={{
            name: "email",
            type: "email",
            id: "email",
          }}
        ></Input>
        <div className={classes.action}>
          <button className={classes.btn}  type="submit">
            {" "}
            Send Mail
          </button>
        </div>
      </form>
      <ToastContainer  className="toast-container"/>

    </>
  );
};

export default Resetpass;
