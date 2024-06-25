import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    myPosts: [],
    anyUser: {},
    anyUserPosts: [],
    message: null,
    error: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerRequest: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.message = "Registered Successfully"
        },
        registerFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signInStart: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        signInFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        loadUserRequest: (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.error = null;
            state.message = null;
        },
        loadUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.isAuthenticated = true;
        },
        loadUserFail: (state) => {
            state.loading = false;
        },
        myPostsRequest: (state, action) => {
            state.loading = true;
        },
        myPostSuccess: (state, action) => {
            state.loading = false;
            state.myPosts = action.payload;
        },
        myPostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        deleteRequest: (state) => {
            state.loading = true;
        },
        deleteSuccess: (state, action) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
        deleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutRequest: (state, action) => {
            state.loading = false;
        },
        singOutSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false;
        },
        signOutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        allUserRequest: (state) => {
            state.loading = true;
        },
        allUserSuccess: (state, action) => {
            state.loading = false;
            state.allUsers = action.payload
        },
        allUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        forgotMailRequest: (state) => {
            state.loading = true;
        },
        forgotMailSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;

        },
        forgotMailFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetPasswordRequest: (state, action) => {
            state.loading = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        },
        resetPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updatePasswordRequest: (state, action) => {
            state.loading = true;
        },
        updatePasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        updatePasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        anyUserRequest: (state, action) => {
            state.loading = true;
        },
        anyUserSuccess: (state, action) => {
            state.loading = false;
            state.anyUser = action.payload;
        },
        anyUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserRequest: (state, action) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.user;
            state.message = action.payload.message
        },
        updateUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        followUnfollowRequest: (state, action) => {
            state.loading = true;
        },
        followUnfollowSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        followUnfollowFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        anyUserPostsRequest: (state, action) => {
            state.loading = true;
        },
        anyUserPostsSuccess: (state, action) => {
            state.loading = false;
            state.anyUserPosts = action.payload;
        },
        anyUserPostsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createPostRequest: (state, action) => {
            state.loading = true;
        },
        createPostSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        createPostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deletePostRequest: (state, action) => {
            state.loading = true;
        },
        deletePostSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        deletePostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateCaptionRequest: (state, action) => {
            state.loading = true;
        },
        updateCaptionSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        updateCaptionFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearMessage: (state) => {
            state.message = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
})

export const { clearMessage, clearError,
    registerRequest, registerSuccess, registerFail, signInStart, signInSuccess, signInFail,
    loadUserRequest, loadUserSuccess, loadUserFail, allUserRequest, allUserSuccess, allUserFailure,
    singOutSuccess, signOutRequest, signOutFail, forgotMailRequest, forgotMailSuccess, forgotMailFail,
    resetPasswordRequest, resetPasswordSuccess, resetPasswordFail, myPostsRequest, myPostSuccess, myPostFail,
    updatePasswordRequest, updatePasswordSuccess, updatePasswordFail, anyUserRequest, anyUserSuccess, anyUserFail,
    followUnfollowRequest, followUnfollowSuccess, followUnfollowFail, anyUserPostsRequest, anyUserPostsSuccess, anyUserPostsFail,
    updateUserRequest, updateUserSuccess, updateUserFail, createPostRequest, createPostSuccess, createPostFail,
    deletePostRequest, deletePostSuccess, deletePostFail, updateCaptionRequest, updateCaptionSuccess, updateCaptionFail,
    deleteRequest, deleteSuccess, deleteFail

} = userSlice.actions;
export default userSlice.reducer;