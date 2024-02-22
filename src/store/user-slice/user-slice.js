import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "currentUser",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      const { payload } = action;

      state.currentUser = payload;

      return state;
    },
  },
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
