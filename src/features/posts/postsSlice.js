import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPost, deletePost, fetchPosts, fetchSinglePost, updatePost } from "./postApi";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  singlePost: [],
  status: false,
};

export const createPostAsync = createAsyncThunk(
  "posts/createPosts",
  async (data) => {
    const response = await createPost(data);
    return response.data.data;
  }
);

export const fetchPostAsync = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetchPosts();
  return response.data.data.posts;
});

export const deletePostAsync = createAsyncThunk(
  "posts/deletePosts",
  async (id) => {
    const response = await deletePost(id);
    if (response.data.success) {
      toast.success("Post deleted");
    }
    return id;
  }
);

export const updatePostAsync = createAsyncThunk(
  "posts/updatePosts",
  async ({ id, data }) => {
    const response = await updatePost(id, data);
    return response.data.data;
  }
);

export const fetchSinglePostAsync = createAsyncThunk(
  "posts/fetchSinglePost",
  async (id) => {
    const response = await fetchSinglePost(id);
    return response.data.data
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.status = false;
        state.posts.push(action.payload);
      })
      .addCase(fetchPostAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        state.status = false;
        state.posts = action.payload;
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.status = false;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload
        );
        state.posts.splice(index, 1);
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        state.status = false;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload._id
        );
        state.posts.splice(index, 1, action.payload);
        toast.success("Post Updated");
      })
      .addCase(fetchSinglePostAsync.fulfilled, (state, action) => {
        state.status = false;
        state.singlePost = action.payload
      })
      
  },
});

// export {extraReducers} = postsSlice.actions;
export default postsSlice.reducer;
