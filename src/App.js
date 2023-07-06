import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Pages/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Resetpass from "./components/Pages/Resetpass";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import { useGlobalContext } from "./components/Store/ContextProvider";
import Expenseform from "./components/Pages/Expenseform";
function App() {
  const ctx = useGlobalContext();
  const isLogged = ctx.isLogged;
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
