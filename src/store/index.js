import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice/user-slice";
import setupSlice from "./setup-slice/setup-slice";

const store = configureStore({
  reducer: { currentUser: userSlice, setup: setupSlice },
});

export default store;
