import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userSlices from "./slices/user.slices"
import postSlices from "./slices/post.slices"

//slices

const rootReducer = combineReducers({
    user: userSlices,
    postOfFollowings: postSlices,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})
