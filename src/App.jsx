import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewPost from "./components/NewPost";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/NewPost" element={<NewPost />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
