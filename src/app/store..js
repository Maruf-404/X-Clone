import { configureStore } from '@reduxjs/toolkit'
import postReducer from "../features/posts/postsSlice"
import allPostsReducer  from '../features/posts/allPostsSlice'
import userReducer from '../features/User/userSlice'
import commentReducer from '../features/comment/commentSlice'

export const store = configureStore({
    reducer: {
        post: postReducer,
        allPost: allPostsReducer,
        user: userReducer,
        Comment: commentReducer,
    }
})