import React, { useEffect } from "react";
import SuggestionListLarge from "../components/SuggestionListLarge";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearError, clearMessage } from "../redux/slices/post.slices";
import { TbCrownOff } from "react-icons/tb";
import { posts } from "../redux/actions/post.action";
const HomePage = () => {
  const { postOfFollowings, message, error } = useSelector(
    (state) => state.postOfFollowings
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    dispatch(posts());
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [message, error, alert, dispatch]);
  return (
    <div className="md:flex absolute h-auto top-[11vh] bottom-[10vh]">
      <div className="p-3 bg-white w-screen md:w-[80vw] h-screen pb-[10vh] overflow-y-auto">
        {postOfFollowings && postOfFollowings.length === 0 ? (
          <h1 className=" text-zinc-800 text-2xl font-extralight text-center flex flex-col items-center justify-center h-full">
            <TbCrownOff className=" text-8xl" /> You will see the posts of the
            user you are following...{" "}
          </h1>
        ) : (
          postOfFollowings.map((item, index) => (
            <Post
              key={index}
              postImage={item.image.url}
              caption={item.caption}
              ownerId={item.owner._id}
              ownerName={item.owner.name}
              ownerImage={item.owner.avatar.url}
              likes={item.likes}
              comments={item.comments}
              postId={item._id}
            />
          ))
        )}
      </div>

      <SuggestionListLarge />
    </div>
  );
};

export default HomePage;
