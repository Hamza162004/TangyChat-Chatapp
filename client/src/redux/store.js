import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import notificationReducer from "./Slice/notificationSlice";
import chatReducer from "./Slice/chatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    chat: chatReducer
  },
});

export default store;
