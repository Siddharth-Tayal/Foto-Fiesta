import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import {
  AiFillDelete,
  AiOutlineDelete,
  AiOutlineMore,
  AiOutlineSend,
  AiOutlineUpload,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  commentAction,
  deleteComment,
  deleteCommentAdmin,
  likeAction,
  posts,
} from "../redux/actions/post.action";
import { Avatar, Dialog } from "@material-ui/core";
import {
  deletePostAction,
  getAnyUserPostsFunction,
  myPostsAction,
  updateCaptionAction,
} from "../redux/actions/user.action";
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isAnyUser = false,
  isDelete = false,
  isAccount = false,
}) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [writeComment, setWriteComment] = useState(false);
  const [showCaptionUpdate, setShowCaptionUpdate] = useState(false);
  const [formData, setFormData] = useState({
    caption: "",
  });
  const showLikeHandler = () => {
    setShowLikes(!showLikes);
  };
  useEffect(() => {
    likes.forEach((item) => {
      if (item._id.toString() === currentUser._id.toString()) {
        setLiked(true);
      }
    });
  }, [currentUser._id, likes]);
  const handleLike = (id) => {
    setLiked(!liked);
    dispatch(likeAction(id));
  };
  const deleteCommentHandler = () => {
    dispatch(deleteComment(postId));
  };
  const deleteAdminCommentHandler = (commentId) => {
    dispatch(deleteCommentAdmin(postId, commentId));
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(commentAction(postId, comment));
  };
  const adminPostDelete = () => {
    dispatch(deletePostAction(postId));
  };
  const adminCaptionUpdate = (e) => {
    e.preventDefault();
    dispatch(updateCaptionAction(postId, formData));
  };
  return (
    <div className="flex flex-col gap-2 items-start p-3 h-[80vh] bg-neutral-200 border-neutral-300 my-8 rounded-lg">
      <div className="flex items-center justify-center gap-3">
        <Avatar src={ownerImage} />
        <Link
          to={`/user/${ownerId}`}
          className=" font-semibold text-lg text-slate-800"
        >
          {ownerName}
        </Link>
      </div>
      <img
        src={postImage}
        alt=""
        onDoubleClick={() => handleLike(postId)}
        className=" bg-neutral-100 rounded-lg h-[60%] w-full object-contain"
      />{" "}
      <p className=" text-slate-800 text-lg font-light px-3">{caption}</p>
      <div className=" flex items-center justify-center gap-7 text-2xl px-3">
        {liked ? (
          <FaHeart
            className=" text-red-600 cursor-pointer"
            onClick={() => handleLike(postId)}
          />
        ) : (
          <FaRegHeart
            onClick={() => handleLike(postId)}
            className=" cursor-pointer"
          />
        )}
        <FaRegComment
          onClick={() => setWriteComment(!writeComment)}
          className=" cursor-pointer"
        />
        {isDelete && (
          <AiOutlineDelete
            className=" cursor-pointer"
            onClick={adminPostDelete}
          />
        )}
        {isAccount && (
          <AiOutlineMore
            className=" cursor-pointer"
            onClick={() => setShowCaptionUpdate(!showCaptionUpdate)}
          />
        )}
      </div>
      <button
        disabled={likes.length === 0}
        onClick={showLikeHandler}
        className=" cursor-pointer flex items-center justify-center text-sm font-normal text-slate-600 px-3 py-1 bg-white rounded-md hover:bg-neutral-200 hover:border-white hover:border-2 duration-300"
      >
        {likes.length} likes
      </button>
      <button
        disabled={comments.length === 0}
        onClick={() => setShowComments(!showComments)}
        className=" cursor-pointer flex items-center justify-center text-sm font-normal text-slate-600 px-3 py-1 bg-white rounded-md hover:bg-neutral-200 hover:border-white hover:border-2 duration-300"
      >
        {comments.length === 0
          ? "No comments yet"
          : `${comments.length} Comments`}
      </button>
      {showLikes && (
        <Dialog open={showLikes} fullWidth onClose={() => setShowLikes(false)}>
          <div className="flex flex-col gap-2  p-3 rounded-lg shadow-lg md:w-[100%]">
            <h2 className=" font-light text-slate-800 text-xl p-3">
              Liked by :
            </h2>
            {likes.map((item, index) => (
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
      )}
      {showComments && (
        <Dialog
          open={showComments}
          fullWidth
          onClose={() => setShowComments(false)}
        >
          <div className="flex flex-col gap-2  p-3 rounded-lg shadow-lg md:w-[100%]">
            <h2 className=" font-light text-slate-800 text-xl p-3">
              Comments :
            </h2>
            {comments.map((item, index) => (
              <div
                key={index}
                className=" rounded-lg p-3 flex flex-col gap-2 bg-slate-200"
              >
                <div className=" flex gap-4 items-center">
                  <Avatar src={item.user.avatar.url} />
                  <Link
                    className=" text-lg font-semibold text-slate-700"
                    to={`/user/${item._id}`}
                  >
                    {item.user.name}
                  </Link>
                  <p className=" text-sm font-light text-slate-800 p-3">
                    {item.comment}
                  </p>
                </div>
                {isAccount ? (
                  <button className=" p-1 rounded-lg items-center flex justify-center">
                    {" "}
                    <AiFillDelete
                      onClick={() => deleteAdminCommentHandler(item._id)}
                      className=" text-lg hover:text-red-800"
                    />
                  </button>
                ) : (
                  item.user._id === currentUser._id && (
                    <button className=" p-1 rounded-lg items-center flex justify-center">
                      {" "}
                      <AiFillDelete
                        onClick={() => deleteCommentHandler()}
                        className=" text-lg hover:text-red-800"
                      />
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
        </Dialog>
      )}
      {writeComment && (
        <Dialog
          open={writeComment}
          fullWidth
          onClose={() => setWriteComment(false)}
        >
          <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto  p-3 rounded-lg shadow-lg md:w-[100%]">
            <h2 className=" font-light text-slate-800 text-xl p-3">
              Add Comment :
            </h2>
            <form
              onSubmit={handleCommentSubmit}
              className=" w-[100%] flex items-center justify-center"
            >
              <input
                type="text"
                placeholder="Comment here..."
                onChange={(e) => setComment(e.target.value)}
                className=" h-[50px] px-3 font-light text-xl w-[80%] text-slate-800 outline-none border rounded-l-lg shadow-lg"
              />
              <button className=" h-[50px] px-5 bg-blue-600 text-xl rounded-r-lg text-white font-bold hover:opacity-90">
                <AiOutlineSend className=" " />
              </button>
            </form>
          </div>
        </Dialog>
      )}
      {showCaptionUpdate && (
        <Dialog
          open={showCaptionUpdate}
          fullWidth
          onClose={() => setShowCaptionUpdate(false)}
        >
          <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto  p-3 rounded-lg shadow-lg md:w-[100%]">
            <h2 className=" font-light text-slate-800 text-xl p-3">
              Update Caption :
            </h2>
            <form
              onSubmit={adminCaptionUpdate}
              className=" w-[100%] flex items-center justify-center"
            >
              <input
                type="text"
                placeholder="Caption..."
                onChange={(e) =>
                  setFormData({ ...formData, caption: e.target.value })
                }
                className=" h-[50px] px-3 font-light text-xl w-[80%] text-slate-800 outline-none border rounded-l-lg shadow-lg"
              />
              <button className=" h-[50px] px-5 bg-blue-600 text-xl rounded-r-lg text-white font-bold hover:opacity-90">
                <AiOutlineUpload className=" " />
              </button>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Post;
