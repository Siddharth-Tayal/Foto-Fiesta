import { commentFailure, commentRequest, commentSuccess, deleteCommentFailure, deleteCommentRequest, deleteCommentSuccess, likeFailure, likeSuccess, likesRequest, postOfFollowingsFailure, postOfFollowingsRequest, postOfFollowingsSuccess } from "../slices/post.slices"
import axios from "axios"
export const posts = () => async (dispatch) => {
    try {
        dispatch(postOfFollowingsRequest());
        const { data } = await axios.get('/api/v1/post/posts');
        if (data.success === false) {
            dispatch(postOfFollowingsFailure(data.message));
            return;
        }
        dispatch(postOfFollowingsSuccess(data.posts));
    } catch (error) {
        dispatch(postOfFollowingsFailure(error.message));
    }
}
export const likeAction = (id) => async (dispatch) => {
    try {
        dispatch(likesRequest());
        const { data } = await axios.get(`/api/v1/post/${id}`);
        if (data.success === false) {
            dispatch(likeFailure(data.message));
            return;
        }
        dispatch(likeSuccess(data.message));

    } catch (error) {
        dispatch(likeFailure(error.message));
    }
}
export const commentAction = (id, comment) => async (dispatch) => {
    try {
        dispatch(commentRequest());
        const { data } = await axios.put(`/api/v1/post/comment/${id}`, { comment }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (data.success === false) {
            dispatch(commentFailure(data.message));
            return;
        }
        dispatch(commentSuccess(data.message));
    } catch (error) {
        dispatch(commentFailure(error.message));
    }
}
export const deleteComment = (id) => async (dispatch) => {
    try {
        dispatch(deleteCommentRequest());
        const { data } = await axios.delete(`/api/v1/post/comment/${id}`)
        if (data.success === false) {
            dispatch(deleteCommentFailure(data.message));
            return;
        }
        dispatch(deleteCommentSuccess(data.message));
    } catch (error) {
        dispatch(deleteCommentFailure(error.message));
    }
}
export const deleteCommentAdmin = (id, commentId) => async (dispatch) => {
    try {
        dispatch(deleteCommentRequest());
        const { data } = await axios.post(`/api/v1/post/comment/${id}`, { commentId }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(data)
        if (data.success === false) {
            dispatch(deleteCommentFailure(data.message));
            return;
        }
        dispatch(deleteCommentSuccess(data.message));
    } catch (error) {
        dispatch(deleteCommentFailure(error.message));
    }
}