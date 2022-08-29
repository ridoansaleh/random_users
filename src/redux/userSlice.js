import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../api/client";
import { mapUsersData } from "../utils";
import { INCLUDED_DATA, RESULTS_COUNT } from '../constant'

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await client(
      `https://randomuser.me/api/?inc=${INCLUDED_DATA}&page=1&results=${RESULTS_COUNT}`
    );
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = mapUsersData(action.payload.results);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
