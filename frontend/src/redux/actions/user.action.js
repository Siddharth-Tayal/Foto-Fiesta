import { allUserFailure, allUserRequest, allUserSuccess, anyUserFail, anyUserPostsFail, anyUserPostsRequest, anyUserPostsSuccess, anyUserRequest, anyUserSuccess, createPostFail, createPostRequest, createPostSuccess, deleteFail, deletePostFail, deletePostRequest, deletePostSuccess, deleteRequest, deleteSuccess, followUnfollowFail, followUnfollowRequest, followUnfollowSuccess, forgotMailFail, forgotMailRequest, forgotMailSuccess, loadUserFail, loadUserRequest, loadUserSuccess, myPostFail, myPostSuccess, myPostsRequest, registerFail, registerRequest, registerSuccess, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess, signInFail, signInStart, signInSuccess, signOutFail, signOutRequest, singOutSuccess, updateCaptionFail, updateCaptionRequest, updateCaptionSuccess, updatePasswordFail, updatePasswordRequest, updatePasswordSuccess, updateUserFail, updateUserRequest, updateUserSuccess } from "../slices/user.slices"
import axios from "axios"
import { posts } from "./post.action";

export const register = (formData) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const { data } = await axios.post('/api/v1/user/register', formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (data.success === false) {
            dispatch(registerFail(data.message))
            return;
        }
        dispatch(registerSuccess(data.user))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
        return;
    }
}
export const login = (formData) => async (dispatch) => {
    try {
        dispatch(signInStart());
        const { data } = await axios.post('/api/v1/user/login', formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (data.success === false) {
            dispatch(signInFail(data.message))
            return;
        }
        dispatch(signInSuccess(data.user))
        dispatch(loadUser())
    } catch (error) {
        dispatch(signInFail(error.response.data.message))
        return;
    }
}
export const logoutAction = () => async (dispatch) => {
    try {
        dispatch(signOutRequest());
        const { data } = await axios.get('/api/v1/user/logout')
        if (data.success === false) {
            dispatch(signOutFail(data.message))
            return;
        }
        dispatch(singOutSuccess(data.user))
    } catch (error) {
        dispatch(signOutFail(error.response.data.message))
        return;
    }
}
export const deleteAccount = () => async (dispatch) => {
    try {
        dispatch(deleteRequest());
        const { data } = await axios.delete('/api/v1/user/delete')
        if (data.success === false) {
            dispatch(deleteFail(data.message))
            return;
        }
        dispatch(deleteSuccess(data.message))
    } catch (error) {
        dispatch(deleteFail(error.response.data.message))
        return;
    }
}
export const updateProfile = (formData) => async (dispatch) => {
    try {
        dispatch(updateUserRequest())
        const { data } = await axios.put('/api/v1/user/updateProfile', formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (data.success === false) {
            dispatch(updateUserFail(data.message))
            return;
        }
        dispatch(updateUserSuccess(data))
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message))
        return;
    }
}
export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest());
        const { data } = await axios.get('/api/v1/user/me');
        if (data.success === false) {
            dispatch(loadUserFail(data.message))
            return;
        }
        dispatch(loadUserSuccess(data.user))
        dispatch(allUser())
        dispatch(posts())
        dispatch(myPostsAction())
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
        return;
    }
}
export const allUser = () => async (dispatch) => {
    try {
        dispatch(allUserRequest());
        const { data } = await axios.get('/api/v1/user/users');
        if (data.success === false) {
            dispatch(allUserFailure(data.message))
            return;
        }
        dispatch(allUserSuccess(data.users))
    } catch (error) {

        dispatch(allUserFailure(error.response.data.message))
        return;
    }
}
export const forgotMailAction = (email) => async (dispatch) => {
    try {
        dispatch(forgotMailRequest());
        const { data } = await axios.post('/api/v1/user/password/forgot', { email }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (data.success === false) {
            dispatch(forgotMailFail(data.message))
            return;
        }
        dispatch(forgotMailSuccess(data.message))
    } catch (error) {

        dispatch(forgotMailFail(error.response.data.message))
        return;
    }
}
export const resetPasswordAction = (token, password) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());
        const { data } = await axios.put(`/api/v1/user/resetPassword/${token}`, { password }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (data.success === false) {
            dispatch(resetPasswordFail(data.message))
            return;
        }
        dispatch(resetPasswordSuccess(data.message))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
        return;
    }
}
export const myPostsAction = () => async (dispatch) => {
    try {
        dispatch(myPostsRequest());
        const { data } = await axios.get(`/api/v1/post/myposts`);
        if (data.success === false) {
            dispatch(myPostFail(data.message))
            return;
        }
        dispatch(myPostSuccess(data.posts))
    } catch (error) {
        dispatch(myPostFail(error.response.data.message))
        return;
    }
}
export const updatePassword = (formData) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        const { data } = await axios.put(`/api/v1/user/updatePassword`, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (data.success === false) {
            dispatch(updatePasswordFail(data.message))
            return;
        }
        dispatch(updatePasswordSuccess(data.message))
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
        return;
    }
}
export const getAnyUser = (id) => async (dispatch) => {
    try {
        dispatch(anyUserRequest());
        const { data } = await axios.get(`/api/v1/user/${id}`);
        if (data.success === false) {
            dispatch(anyUserFail(data.message))
            return;
        }
        dispatch(anyUserSuccess(data.user))

    } catch (error) {
        dispatch(anyUserFail(error.response.data.message))
        return;
    }
}
export const getAnyUserPostsFunction = (id) => async (dispatch) => {
    try {
        dispatch(anyUserPostsRequest());
        const { data } = await axios.get(`/api/v1/post/posts/${id}`);
        if (data.success === false) {
            dispatch(anyUserPostsFail(data.message))
            return;
        }
        dispatch(anyUserPostsSuccess(data.posts))
    } catch (error) {
        dispatch(anyUserPostsFail(error.response.data.message))
        return;
    }
}
export const followUnfollow = (id) => async (dispatch) => {
    try {
        dispatch(followUnfollowRequest());
        const { data } = await axios.get(`/api/v1/user/follow/${id}`);
        if (data.success === false) {
            dispatch(followUnfollowFail(data.message))
            return;
        }
        dispatch(followUnfollowSuccess(data.message))
    } catch (error) {
        dispatch(followUnfollowFail(error.response.data.message))
        return;
    }
}
export const createPostAction = (formData) => async (dispatch) => {
    try {
        dispatch(createPostRequest());
        const { data } = await axios.post(`/api/v1/post/upload`, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (data.success === false) {
            dispatch(createPostFail(data.message));
            return;
        }
        dispatch(createPostSuccess(data.message));
        dispatch(myPostsAction())
    } catch (error) {
        dispatch(createPostFail(error.message));
    }
}
export const deletePostAction = (id) => async (dispatch) => {
    try {
        dispatch(deletePostRequest());
        const { data } = await axios.delete(`/api/v1/post/${id}`)
        if (data.success === false) {
            dispatch(deletePostFail(data.message));
            return;
        }
        dispatch(deletePostSuccess(data.message));
        dispatch(myPostsAction())
    } catch (error) {
        dispatch(deletePostFail(error.message));
    }
}
export const updateCaptionAction = (id, caption) => async (dispatch) => {
    try {
        dispatch(updateCaptionRequest());
        const { data } = await axios.put(`/api/v1/post/${id}`, caption, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (data.success === false) {
            dispatch(updateCaptionFail(data.message));
            return;
        }
        dispatch(updateCaptionSuccess(data.message));
        dispatch(myPostsAction())
    } catch (error) {
        dispatch(updateCaptionFail(error.message));
    }
}