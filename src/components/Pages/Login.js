import { useState } from "react";
import Input from "../UI/Input";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import classes from "./login.module.css";
import { NavLink, json , useNavigate} from "react-router-dom";
import { useGlobalContext } from "../Store/ContextProvider";
const Login = () => {
  const ctx=useGlobalContext();

  const navigate=useNavigate();
  const [flag, setflag] = useState(true);
  const toggelhandler=()=>{
     setflag((pre)=>!pre)
  }
  const submithandler = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.Email.value,
      password: e.target.Password.value,
      cfpassword: e.target.cfPassword.value,
    };
    
    if (user.cfpassword === user.password) {
      if (flag) {
        const create = async () => {
          try {
            const res = await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDECVREeZXqI7KQqMpsiP2L-pM5eyQqU9s",
              {
                method: "POST",
                body: JSON.stringify({
                  email: user.email,
                  password: user.password,
                  returnSecureToken: true,
                }),
              }
            );

            const data = await res.json();
             ctx.login(data.idToken)
            if (res.ok) {

              toast.success("login successfully");
        
              navigate('/home')
            } else {
              throw Error(data.error.message);
            }
          } catch (err) {
            toast.error(err.message);
          }
        };
        create();
      } else {
        const create = async () => {
          try {
            const res = await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDECVREeZXqI7KQqMpsiP2L-pM5eyQqU9s",
              {
                method: "POST",
                body: JSON.stringify({
                  email: user.email,
                  password: user.password,
                  returnSecureToken: true,
                }),
              }
            );

            const data =await res.json();
            if (res.ok) {
              toast.success("account created successfully");
            } else {
              throw Error(data.error.message);
            }
          } catch (err) {
            toast.error(err.message);
          }
        };
        create();
      }
    } else {
      toast.error("password doesnt match");
      return;
    }
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <img src="bckimg.jpg" alt="loading" className={classes.bimg}></img>
        <form className={classes.form} onSubmit={submithandler}>
          <h1 style={{ textAlign: "center" }}>{flag ? "Login" : "Sign Up"}</h1>
          <Input
            label={"Email"}
            input={{
              id: "Email",
              type: "email",
              name: "Email",
            }}
          ></Input>
          <Input
            label={"Password"}
            input={{
              id: "Password",
              type: "password",

              name: "Password",
            }}
          ></Input>
          <Input
            label={"confirm Password"}
            input={{
              id: "cfPassword",
              type: "password",
 
              name: "cfPassword",
            }}
          ></Input>
        
          <div className={classes.action}>
            <button className={classes.btn} type="submit">
              {flag ? "Login" : "Create"}
            </button>
             <NavLink  to="/forget"  style={{fontSize:"2rem ",color:"white"}}> forget password</NavLink>
            
          </div>
        </form>
            <div  className={classes.isSignIn}>
           <button type="button"  className={classes.btn} onClick={toggelhandler}>
              {flag ? "create new account" : "login with same "}
            </button>
            </div>
      </div>
      <ToastContainer  className="toast-container"/>
      
    </>
  );
};
export default Login;
