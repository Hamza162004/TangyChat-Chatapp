import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import notificationReducer from "./Slice/notificationSlice";
import groupReducer from "./Slice/groupSlice"
import creatorReducer from "./Slice/creatorSlice"
import chatReducer from "./Slice/chatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    group: groupReducer,
    creator: creatorReducer,
    chat: chatReducer
  },
});

export default store;
