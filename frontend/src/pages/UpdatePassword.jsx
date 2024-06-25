import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, clearMessage } from "../redux/slices/user.slices";
import { updatePassword } from "../redux/actions/user.action";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { message, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, alert, message, navigate, error, isAuthenticated]);
  const updatePasswordHandler = (e) => {
    e.preventDefault();
    if (newPassword.toString() !== confirmNewPassword.toString()) {
      alert.error("Confirm Password not matched");
      return;
    }
    const formData = {
      oldPassword,
      newPassword,
    };
    dispatch(updatePassword(formData));
  };
  return (
    <div className=" flex items-center justify-center fixed bg-white top-0 left-0  h-screen w-screen">
      <form
        onSubmit={updatePasswordHandler}
        className="flex flex-col gap-7 items-center justify-center shadow-lg rounded-lg shadow-purple-600 p-6 md:w-[40vw] w-[80vw]"
      >
        <h1 className=" font-bold text-2xl text-center text-slate-900 font-sans">
          Foto-Fiesta Update Password
        </h1>
        <input
          type="text"
          placeholder="Old Password"
          required
          className=" w-full p-3 rounded-lg text-lg border outline-none font-light text-slate-700"
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="New Password"
          required
          minLength={"8"}
          className=" w-full p-3 rounded-lg text-lg border outline-none font-light text-slate-700"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Confirm Password"
          required
          className=" w-full p-3 rounded-lg text-lg border outline-none font-light text-slate-700"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />

        <button
          className=" p-3 rounded-lg font-bold text-white hover:opacity-90 w-full bg-purple-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Updating Password..." : " Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
