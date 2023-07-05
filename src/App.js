import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Pages/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Resetpass from "./components/Pages/Resetpass";
import HOME from "./components/Pages/Home.js";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route index element={<HOME></HOME>}></Route>
        <Route path="home" element={<HOME></HOME>}></Route>
        <Route path="/forget" element={<Resetpass />}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </>
  );
}

export default App;
