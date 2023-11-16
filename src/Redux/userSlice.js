import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, USERS, LOADING, IDLE, SUCCEEDED, FAILED } from "../config/config";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: USERS,
  initialState: { data: [], status: IDLE, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
