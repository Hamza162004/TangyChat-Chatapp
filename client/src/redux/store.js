import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import notificationReducer from "./Slice/notificationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;
