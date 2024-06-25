import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotMailAction } from "../redux/actions/user.action";
import { useAlert } from "react-alert";
import { clearError, clearMessage } from "../redux/slices/user.slices";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { message, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [mail, setMail] = useState("");
  const mailSending = (e) => {
    e.preventDefault();
    dispatch(forgotMailAction(mail));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, alert, message, navigate, error, isAuthenticated]);
  return (
    <div className=" flex items-center justify-center fixed bg-white  h-screen w-screen">
      <form
        onSubmit={mailSending}
        className="flex flex-col gap-7 items-center justify-center shadow-lg rounded-lg shadow-purple-600 p-6 md:w-[40vw] w-[80vw]"
      >
        <h1 className=" font-bold text-2xl text-center text-slate-900 font-sans">
          Foto-Fiesta Forgot Password
        </h1>
        <input
          type="email"
          placeholder="Enter registered e-mail"
          required
          className=" w-full p-3 rounded-lg text-lg border outline-none font-light text-slate-700"
          onChange={(e) => setMail(e.target.value)}
        />

        <button
          className=" p-3 rounded-lg font-bold text-white hover:opacity-90 w-full bg-purple-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Sending Mail..." : " Request Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
