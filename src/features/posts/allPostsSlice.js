import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts } from "./allPostApi";

const initialState = {
  allPosts: [],
  loading: false,
};

export const fetchAllAsync = createAsyncThunk(
  "allPosts/fetchAllPosts",
  async () => {
    const response = await fetchAllPosts();
    return response.data.data.posts;
  }
);

export const allPostsSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchAllAsync.fulfilled, (state, action) => {
        state.status = false;
        state.allPosts = action.payload;
      });
  },
});

export default allPostsSlice.reducer;
