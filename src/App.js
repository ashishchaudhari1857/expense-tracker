import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Pages/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Resetpass from "./components/Pages/Resetpass";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import Expenseform from "./components/Pages/Expenseform";
import { useSelector,useDispatch } from "react-redux";
function App() {
  const isLogged=useSelector((state)=>state.Auth.token)
  return (

    <>
      <Navbar></Navbar>
      <Routes>
        <Route index element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>

        {/* <Route path="*" element={<Login></Login>}> </Route> */}
        {isLogged && (
          <>
            <Route path="Home" element={<Home></Home>}></Route>
            <Route path="/forget" element={<Resetpass />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/expenses" element={<Expenseform />}></Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
