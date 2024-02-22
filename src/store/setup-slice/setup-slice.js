import { createSlice } from "@reduxjs/toolkit";

const setupSlice = createSlice({
  name: "setup",
  initialState: {
    user: null,
    house: null,
    nativeBackend: null,
  },
  reducers: {
    setUser(state, action) {
      const { payload } = action;

      state.user = payload;

      return state;
    },

    setHouse(state, action) {
      const { payload } = action;

      state.house = payload;

      return state;
    },

    setNativeBackend(state, action) {
      const { payload } = action;

      state.nativeBackend = payload;

      return state;
    },
  },
});

export const setupSliceActions = setupSlice.actions;
export default setupSlice.reducer;
