import React, { useEffect, useState } from "react";
import SuggestionListLarge from "../components/SuggestionListLarge";
import { Avatar, Dialog } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import {
  deleteAccount,
  logoutAction,
  myPostsAction,
} from "../redux/actions/user.action";
import { clearError, clearMessage } from "../redux/slices/user.slices";
import {
  clearError as postClearError,
  clearMessage as postClearMessage,
} from "../redux/slices/post.slices";
import { useAlert } from "react-alert";
import { TbCrownOff } from "react-icons/tb";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
const MyProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const { currentUser, myPosts, message, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { message: postMessage, error: postError } = useSelector(
    (state) => state.postOfFollowings
  );
  useEffect(() => {
    const functionProfile = async () => {
      if (!isAuthenticated) {
        navigate("/login");
      }
      await dispatch(myPostsAction());
      if (message) {
        alert.success(message);
        await dispatch(clearMessage());
      }
      if (error) {
        alert.error(error);
        await dispatch(clearError());
      }
      if (postMessage) {
        alert.success(postMessage);
        await dispatch(postClearMessage());
      }
      if (postError) {
        alert.error(postError);
        await dispatch(postClearError());
      }
    };
    functionProfile();
  }, [
    message,
    error,
    postMessage,
    postError,
    alert,
    dispatch,
    isAuthenticated,
    navigate,
  ]);
  const logoutHandler = () => {
    dispatch(logoutAction());
  };
  const deleteAccountHandler = () => {
    dispatch(deleteAccount());
  };
  return (
    <div className="md:flex absolute top-[11vh] left-0 ">
      <div className=" p-3 bg-white w-screen md:w-[80vw] h-screen pb-[10vh] overflow-y-auto">
        <div className=" mx-auto py-3 flex items-center gap-8 sm:gap-[150px] w-fit ">
          <div className=" flex flex-col items-center justify-center  gap-2">
            <Avatar src={currentUser.avatar.url} />
            <p className=" font-semibold sm:text-lg text-sm text-center">
              {currentUser.name}
            </p>
          </div>
          <div className=" flex items-center justify-center gap-8">
            <div className=" flex flex-col items-center justify-center text-sm sm:text-lg">
              <p>{myPosts.length}</p>
              <p>Posts</p>
            </div>
            <div
              onClick={() => setShowFollowers(true)}
              className=" cursor-pointer flex flex-col items-center justify-center text-sm sm:text-lg"
            >
              <p>{currentUser.followers.length}</p>
              <p>Follower</p>
            </div>
            <div
              onClick={() => setShowFollowings(true)}
              className=" cursor-pointer flex flex-col items-center justify-center text-sm sm:text-lg"
            >
              <p>{currentUser.following.length}</p>
              <p>Following</p>
            </div>
          </div>
        </div>
        <div className=" border-b-2 py-9 flex items-center justify-center gap-4 flex-wrap">
          <Link
            to={"/profile/update"}
            className=" p-3 rounded-lg bg-slate-700 hover:bg-slate-500 duration-300 text-white font-semibold "
          >
            Edit Profile
          </Link>

          <Link
            to={"/password/update"}
            className=" p-3 rounded-lg bg-slate-700 hover:bg-slate-500 duration-300 text-white font-semibold "
          >
            Edit Password
          </Link>
          <p
            onClick={logoutHandler}
            className=" p-3 rounded-lg bg-blue-700 hover:bg-blue-500 duration-300 cursor-pointer text-white font-semibold "
          >
            Logout
          </p>

          <button
            onClick={deleteAccountHandler}
            className=" p-3 rounded-lg bg-red-700 hover:bg-red-500 duration-300 text-white font-semibold "
          >
            Delete Account
          </button>
        </div>
        <div>
          <h2 className=" p-5 items-center flex gap-2 text-slate-800 font-extralight text-xl">
            <TfiLayoutGrid3Alt />
            Posts :
          </h2>
          {myPosts.length === 0 && (
            <div className=" flex flex-col gap-4 items-center justify-center text-xl mx-auto p-7">
              <TbCrownOff className=" text-8xl font-semibold text-slate-800" />{" "}
              <h1 className=" text-center text-slate-800"> No posts yets.. </h1>{" "}
            </div>
          )}
          {myPosts.map((item, index) => (
            <Post
              isAccount={true}
              isDelete={true}
              key={index}
              postImage={item.image.url}
              caption={item.caption}
              ownerId={currentUser._id}
              ownerName={currentUser.name}
              ownerImage={currentUser.avatar.url}
              likes={item.likes}
              comments={item.comments}
              postId={item._id}
            />
          ))}
        </div>
      </div>
      <Dialog
        open={showFollowers}
        fullWidth
        onClose={() => setShowFollowers(false)}
      >
        <div className="flex flex-col gap-2  p-3 rounded-lg shadow-lg md:w-[100%]">
          <h2 className=" font-light text-slate-800 text-xl p-3">
            Followers :
          </h2>
          {currentUser.followers.map((item, index) => (
            <div key={index} className=" flex gap-4 items-center">
              <Avatar src={item.avatar && item.avatar.url} />
              <Link
                className=" text-lg font-semibold text-slate-700"
                to={`/user/${item._id}`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </Dialog>
      <Dialog
        open={showFollowings}
        fullWidth
        onClose={() => setShowFollowings(false)}
      >
        <div className="flex flex-col gap-2  p-3 rounded-lg shadow-lg md:w-[100%]">
          <h2 className=" font-light text-slate-800 text-xl p-3">
            Followings :
          </h2>
          {currentUser.following.map((item, index) => (
            <div key={index} className=" flex gap-4 items-center">
              <Avatar src={item.avatar && item.avatar.url} />
              <Link
                className=" text-lg font-semibold text-slate-700"
                to={`/user/${item._id}`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </Dialog>
      <SuggestionListLarge />
    </div>
  );
};

export default MyProfile;
