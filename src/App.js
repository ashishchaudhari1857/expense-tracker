import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Pages/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Resetpass from "./components/Pages/Resetpass";
import Home from "./components/Pages/Home";
import ContextProvider from "./components/Store/ContextProvider";
import Profile from "./components/Pages/Profile";
function App() {
  return (
    <>
      <ContextProvider>
        <Navbar></Navbar>
        
        <Routes>
          <Route index element={<Home></Home>}></Route>
          <Route path="Home" element={<Home></Home>}></Route>
          <Route path="/forget" element={<Resetpass />}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
