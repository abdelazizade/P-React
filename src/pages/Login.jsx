import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userName") !== null;

    if (isLoggedIn) {
      navigate("/Home");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  // const [userData, setUserData] = useState(null);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!values.email) {
      toast.warning("Email is required.");
      return;
    }

    if (!values.password) {
      toast.warning("Password is required.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/users?email=${values.email}&password=${values.password}`
      );

      if (response.data.length > 0) {
        const user = response.data[0];
        // setUserData(user);
        localStorage.setItem("userName", user.userName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("userImage", user.userImage);
        toast.success("Login successfully");
        navigate("/Home");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="bg-neutral-600 h-screen">
        <div className="m-auto grid gap-2 w-3/4">
          <div className="flex items-center justify-center mb-8">
            <h1 className="ml-3 text-2xl font-bold text-gray-600">BLOGGER</h1>
          </div>
          <form onSubmit={handleLogin} className="grid gap-2">
            <div className="grid grid-cols-1 gap-4">
              <div className="input-wrapper">
                <label className="text-white">Email</label>
                <div className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Your email"
                    value={values.email}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="input-wrapper">
                <label className="text-white">Password</label>
                <div className="input input-bordered flex items-center gap-2">
                  <input
                    type={values.showPassword ? "text" : "password"}
                    className="grow"
                    placeholder="Your password"
                    value={values.password}
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                  />
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </div>
              </div>
              <button
                className="btn bg-neutral-500 text-white hover:bg-neutral-300"
                type="submit">
                Login
              </button>
            </div>
          </form>
          <p className="text-sm text-white text-center">
            New to BLOGGER?{" "}
            <Link
              to="/SignIn"
              className="text-white hover:text-gray-600 font-semibold">
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
