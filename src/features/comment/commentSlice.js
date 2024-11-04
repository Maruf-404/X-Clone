import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addComments, deleteComments, fetchComments, updateComments } from "./commentApi";

export const fetchCommentAsync = createAsyncThunk(
  "comment/fetchComment",
  async (id) => {
    const res = await fetchComments(id);
    return res.data.data.comments;
  }
);

export const addCommentAsync = createAsyncThunk(
  "comment/addComment",
  async ({id, data}) => {
    const res = await addComments(id, data);
    return res.data.data;
  }
);


export const deleteCommentAsync = createAsyncThunk(
    "comment/deleteComment",
    async (id) => {
      const res = await deleteComments(id);
      return id;
    }
  );

  export const updateCommentAsync = createAsyncThunk(
    "comment/updateComment",
    async ({id, data}) => {
      const res = await updateComments(id, data);
      return res.data.data
    }
  );


const initialState = {
  comments: [],
  status: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchCommentAsync.fulfilled, (state, action) => {
        state.status = true;
        state.comments = action.payload;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.status = true;
        toast.success("Comment added")
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.status = false;
        const index = state.comments.findIndex((comment) => {
            comment.id === action.payload
        })
        state.comments.splice(index, 1)
        toast.success("Comment deleted")
      })
      .addCase(updateCommentAsync.fulfilled, (state, action) => {
        state.status = false;
        const index = state.comments.findIndex((post) => post.id === action.payload._id)
        state.comments.splice(index, 1,action.payload)
        toast.success("Comment Updated")
      })
  },
});

export default commentSlice.reducer;
