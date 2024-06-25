import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/user.action";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAlert } from "react-alert";
import { clearError, clearMessage } from "../redux/slices/user.slices";
import Loader from "../components/Loader";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, isAuthenticated, message, error } = useSelector(
    (state) => state.user
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated, alert, error, dispatch, message]);
  if (loading) return <Loader />;
  return (
    <div className=" flex items-center justify-center fixed bg-white  h-screen w-screen">
      <form
        onSubmit={loginSubmit}
        className="flex flex-col gap-5 items-center justify-center shadow-lg rounded-lg shadow-purple-600 p-6 md:w-[40vw] w-[80vw]"
      >
        <h1 className=" font-bold text-2xl text-slate-900 font-sans">
          Foto-Fiesta Login
        </h1>
        <input
          type="email"
          placeholder="E-mail"
          required
          className=" w-full p-3 rounded-lg text-lg border outline-none font-light text-slate-700"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="flex w-full items-center justify-end">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className=" w-full p-3 rounded-lg text-lg border outline-none font-light text-slate-700"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <span
            className="font-light text-slate-700 absolute mr-5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <Link
          to={"/password/forgot"}
          className="self-end text-sm font-extralight text-slate-900 hover:text-purple-800"
        >
          Forgot Password ?
        </Link>
        <button
          className=" p-3 rounded-lg font-bold text-white hover:opacity-90 w-full bg-purple-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Logging..." : "Login"}
        </button>
        <Link
          to={"/register"}
          className="self-end text-sm font-extralight text-slate-900 hover:text-purple-800"
        >
          New User ?
        </Link>
      </form>
    </div>
  );
};

export default Login;
