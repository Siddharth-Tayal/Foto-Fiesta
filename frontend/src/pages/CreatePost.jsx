import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../redux/actions/user.action";
import { useAlert } from "react-alert";
import { clearError, clearMessage } from "../redux/slices/user.slices";
import { AiOutlineCloudUpload } from "react-icons/ai";
const CreatePost = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { currentUser, message, error, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const [formData, setFormData] = useState({
    caption: "",
    image: "",
    ownerId: currentUser._id,
  });
  const imageHandler = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPreview(Reader.result);
        setFormData({
          ...formData,
          image: Reader.result,
        });
      }
    };
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
  });
  const createPostHandler = (e) => {
    e.preventDefault();
    dispatch(createPostAction(formData));
  };
  return (
    <div className=" h-[100vh] flex items-center justify-center fixed top-0 left-0 p-5 w-screen bg-white ">
      <form
        onSubmit={createPostHandler}
        className=" w-[80vw] h-auto  flex flex-col items-center gap-5 justify-center "
      >
        <div className=" w-full flex items-center  gap-3 flex-col">
          <img src={avatarPreview} className=" h-[25vh]" alt="" />
        </div>
        <div className=" w-full flex items-center justify-center gap-3 flex-col">
          {" "}
          <input
            type="file"
            required
            className="flex bg-black rounded-lg"
            accept="image/*"
            onChange={imageHandler}
          />
          <h3>Caption : </h3>
          <input
            type="text"
            placeholder="Caption..."
            className=" p-3 rounded-lg font-thin text-xl w-[50%] text-slate-700 border-none outline-none shadow-lg"
            onChange={(e) => [
              setFormData({ ...formData, caption: e.target.value }),
            ]}
          />
          <button
            type="submit"
            className=" flex justify-center gap-2 items-center p-3 rounded-lg w-[50%] text-white bg-blue-700 disabled:cursor-progress disabled:opacity-90 hover:opacity-90 "
            disabled={loading}
          >
            {loading ? "Uploading..." : " Upload"}
            <AiOutlineCloudUpload className=" text-2xl " />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
