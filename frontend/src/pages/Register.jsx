import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actions/user.action";
import { useAlert } from "react-alert";
import { clearError, clearMessage } from "../redux/slices/user.slices";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { message, error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "email",
    password: "",
    avatar: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setFormData({ ...formData, avatar: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, message, error, alert, navigate, isAuthenticated]);
  return (
    <div className=" flex items-center justify-center h-screen w-screen">
      <form
        onSubmit={registerSubmit}
        className="flex flex-col gap-5 items-center justify-center shadow-lg rounded-lg shadow-purple-600 p-6 md:w-[40vw] w-[80vw]"
      >
        <h1 className=" font-bold text-2xl text-slate-900 text-center font-sans">
          Foto-Fiesta Register
        </h1>
        <Avatar src={avatarPreview} />
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={updateProfileDataChange}
          className=" w-full p-3 flex items-center justify-center rounded-lg text-lg border outline-none font-light text-slate-700"
        />
        <input
          type="text"
          placeholder="Username"
          required
          className=" w-full p-3 rounded-lg text-lg border outline-none font-light text-slate-700"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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
            minLength={8}
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

        <button
          className={`" p-3 rounded-lg font-bold text-white hover:opacity-90 w-full bg-purple-700 disabled:opacity-60" ${
            loading ? "opacity-60" : "opacity-100"
          } `}
        >
          {loading ? "Registering" : "Register"}
        </button>
        <Link
          to={"/login"}
          className="self-end text-sm font-extralight text-slate-900 hover:text-purple-800"
        >
          Already register?
        </Link>
      </form>
    </div>
  );
};

export default Register;
