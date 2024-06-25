import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearError, clearMessage } from "../redux/slices/user.slices";
import { resetPasswordAction } from "../redux/actions/user.action";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, message, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const resetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAction(params.token, password));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
      navigate("/login");
    }
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [alert, message, error, dispatch, navigate, isAuthenticated]);
  return (
    <div className=" flex items-center justify-center fixed bg-white  h-screen w-screen">
      <form
        onSubmit={resetPassword}
        className="flex flex-col gap-7 items-center justify-center shadow-lg rounded-lg shadow-purple-600 p-6 md:w-[40vw] w-[80vw]"
      >
        <h1 className=" font-bold text-2xl text-center text-slate-900 font-sans">
          Foto-Fiesta Reset Password
        </h1>
        <div className="flex w-full items-center justify-end">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            required
            className=" w-full p-3 rounded-lg text-lg border outline-none font-light text-slate-700"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="font-light text-slate-700 absolute mr-5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <button
          className=" p-3 rounded-lg font-bold text-white hover:opacity-90 w-full bg-purple-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Changing Password..." : " Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
