import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
    postOfFollowings: [],
    error: null,
    message: ""
}
const postSlices = createSlice({
    name: "post",
    initialState,
    reducers: {
        postOfFollowingsRequest: (state, action) => {
            state.loading = true;
        },
        postOfFollowingsSuccess: (state, action) => {
            state.loading = false;
            state.postOfFollowings = action.payload;
        },
        postOfFollowingsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        likesRequest: (state) => {
            state.loading = true;
        },
        likeSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        likeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        commentRequest: (state) => {
            state.loading = true;
        },
        commentSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload
        },
        commentFailure: (state, action) => {
            state.loading = false;
            state.message = action.payload
        },
        deleteCommentRequest: (state, action) => {
            state.loading = true
        },
        deleteCommentSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload
        },
        deleteCommentFailure: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
})

export const { postOfFollowingsRequest, postOfFollowingsSuccess, postOfFollowingsFailure,
    likesRequest, likeSuccess, likeFailure, commentRequest, commentSuccess, commentFailure,
    deleteCommentRequest, deleteCommentSuccess, deleteCommentFailure, clearMessage, clearError,
} = postSlices.actions;
export default postSlices.reducer;