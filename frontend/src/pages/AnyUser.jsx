import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import SuggestionListLarge from "../components/SuggestionListLarge";
import { Avatar, Dialog } from "@material-ui/core";
import {
  followUnfollow,
  getAnyUser,
  getAnyUserPostsFunction,
  loadUser,
} from "../redux/actions/user.action";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { useAlert } from "react-alert";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { clearError, clearMessage } from "../redux/slices/user.slices";
import {
  clearError as postClearError,
  clearMessage as postClearMessage,
} from "../redux/slices/post.slices";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { posts } from "../redux/actions/post.action";
import { TbCrownOff } from "react-icons/tb";

const AnyUser = () => {
  const id = useParams().id;
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { anyUser, currentUser, message, error, anyUserPosts } = useSelector(
    (state) => state.user
  );
  const { message: postMessage, error: postError } = useSelector(
    (state) => state.postOfFollowings
  );
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const followUnfollowHandler = async () => {
    await dispatch(followUnfollow(id));
    await dispatch(loadUser());
  };
  useEffect(() => {
    if (id.toString() === currentUser._id.toString()) {
      navigate("/account");
    }
    dispatch(getAnyUser(id));
    dispatch(posts());
    dispatch(getAnyUserPostsFunction(id));
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert.error("error");
      dispatch(clearError());
      navigate("/account");
    }
    if (postMessage) {
      alert.success(postMessage);
      dispatch(postClearMessage());
    }
    if (postError) {
      alert.error("postError");
      dispatch(postClearError());
      navigate("/");
    }
  }, [
    dispatch,
    id,
    message,
    error,
    postMessage,
    postError,
    alert,
    currentUser,
    navigate,
  ]);
  let isFollowing;
  if (anyUser && anyUser.followers && currentUser) {
    isFollowing = anyUser.followers.filter(
      (item) => item._id.toString() === currentUser._id.toString()
    );
  }
  if (
    anyUserPosts === undefined ||
    anyUser.posts === undefined ||
    anyUser.followers === undefined ||
    anyUser.following === undefined
  )
    return <Loader />;
  return (
    <div className="md:flex absolute top-[11vh] left-0 ">
      <div className=" p-3 bg-white w-screen md:w-[80vw] h-screen pb-[10vh] overflow-y-auto">
        <div className=" mx-auto py-3 flex items-center gap-8 sm:gap-[150px] w-fit ">
          <div className=" flex flex-col items-center justify-center  gap-2">
            <Avatar src={anyUser.avatar.url} />
            <p className=" font-semibold sm:text-lg text-sm">{anyUser.name}</p>
          </div>
          <div className=" flex items-center justify-center gap-8">
            <div className=" flex flex-col items-center justify-center text-sm sm:text-lg">
              <p>{anyUser.posts && anyUser.posts.length}</p>
              <p>Posts</p>
            </div>
            <div
              onClick={() => setShowFollowers(true)}
              className=" cursor-pointer flex flex-col items-center justify-center text-sm sm:text-lg"
            >
              <p>{anyUser.followers && anyUser.followers.length}</p>
              <p>Follower</p>
            </div>
            <div
              onClick={() => setShowFollowings(true)}
              className=" cursor-pointer flex flex-col items-center justify-center text-sm sm:text-lg"
            >
              <p>{anyUser.following && anyUser.following.length}</p>
              <p>Following</p>
            </div>
          </div>
        </div>
        <div className=" flex items-center py-5 border-b-2 justify-evenly">
          <button
            onClick={followUnfollowHandler}
            className=" flex items-center justify-center p-3 gap-2 text-white font-semibold text-base rounded-lg hover:opacity-75 bg-blue-700"
            style={{ backgroundColor: isFollowing.length > 0 ? "red" : "blue" }}
          >
            {isFollowing.length > 0 ? "Unfollow" : "Follow"}
            {isFollowing.length > 0 ? (
              <AiOutlineUserDelete />
            ) : (
              <AiOutlineUserAdd />
            )}
          </button>
        </div>
        <div>
          <h2 className=" p-5 pb-0 items-center flex gap-2 text-slate-800 font-extralight text-xl">
            <TfiLayoutGrid3Alt />
            Posts :
          </h2>
          {anyUser.posts && anyUser.posts.length === 0 && (
            <div className=" flex flex-col gap-4 items-center justify-center text-xl mx-auto p-7">
              <TbCrownOff className=" text-8xl font-semibold text-slate-800" />{" "}
              <h1 className=" text-center text-slate-800"> No posts yets.. </h1>{" "}
            </div>
          )}
          {anyUserPosts &&
            anyUserPosts.map((item, index) => (
              <Post
                isAccount={false}
                isDelete={false}
                isAnyUser={true}
                key={index}
                postImage={item && item.image && item.image.url}
                caption={item && item.caption}
                ownerId={anyUser._id}
                ownerName={anyUser.name}
                ownerImage={anyUser.avatar.url}
                likes={item && item.likes}
                comments={item && item.comments}
                postId={item && item._id}
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
          {anyUser.followers.map((item, index) => (
            <div key={index} className=" flex gap-4 items-center">
              <Avatar src={item.avatar.url} />
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
          {anyUser.following.map((item, index) => (
            <div key={index} className=" flex gap-4 items-center">
              <Avatar src={item.avatar.url} />
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

export default AnyUser;
