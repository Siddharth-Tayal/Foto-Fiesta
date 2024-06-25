import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, clearMessage } from "../redux/slices/user.slices";
// import { updatePassword } from "../redux/actions/user.action";
import { Avatar } from "@material-ui/core";
import { updateProfile } from "../redux/actions/user.action";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { currentUser, message, error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [avatar, setAvatar] = useState(currentUser.avatar.url);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    avatar: "",
  });
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
  const imageHandler = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
        setFormData({
          ...formData,
          avatar: Reader.result,
        });
      }
    };
  };
  const updateProfileHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };
  return (
    <div className=" flex items-center justify-center fixed bg-white top-0 left-0  h-screen w-screen">
      <form
        onSubmit={updateProfileHandler}
        className="flex flex-col gap-7 items-center justify-center shadow-lg rounded-lg shadow-purple-600 p-6 md:w-[40vw] w-[80vw]"
      >
        <h1 className=" font-bold text-2xl text-center text-slate-900 font-sans">
          Foto-Fiesta Update Profile
        </h1>
        <Avatar src={avatar || currentUser.avatar.url} />
        <input type="file" accept="image/*" onChange={imageHandler} />
        <input
          type="text"
          placeholder={"Name"}
          required
          value={formData.name}
          className=" w-full p-3 rounded-lg text-lg border outline-none font-light text-slate-700"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          type="text"
          placeholder={"Email"}
          value={formData.email}
          required
          minLength={"8"}
          className=" w-full p-3 rounded-lg text-lg border outline-none font-light text-slate-700"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <button
          className=" p-3 rounded-lg font-bold text-white hover:opacity-90 w-full bg-purple-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Updating Profile..." : " Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
