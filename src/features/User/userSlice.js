import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./userApi";
import { toast } from "react-toastify";

export const fetchUserAsync = createAsyncThunk("user/fetchUser", async()=> {
    const res = await fetchUserProfile();
    return res.data.data
})

const initialState = {
    user: [],
    status: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserAsync.pending, (state) => {
            state.status = true
        })
        .addCase(fetchUserAsync.rejected, (state) => {
            state.status = true
            toast.error("Server error please refresh page or try later ")
        })
        .addCase(fetchUserAsync.fulfilled, (state, action) => {
            state.status = false
            state.user = action.payload;
        })
    }

})

export default userSlice.reducer;