import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newMessageAlert: [],
  chats: [],
  totalMessagesAlert: 0,
  isChatLoading: false,
  isNewMessageAlertLoading: false,
  fetched: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setNewMessageAlert: (state, action) => {
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === action.payload.chatId
      );
      if (index !== -1) {
        state.newMessageAlert[index].count += 1;
      } else {
        state.newMessageAlert.push({ chatId: action.payload.chatId, count: 1 });
      }
      state.totalMessagesAlert += 1;
    },
    removeMessageAlert: (state, action) => {
      const alertItem = state.newMessageAlert.find(
        (item) => item.chatId === action.payload
      );
      if (alertItem) {
        state.totalMessagesAlert -= alertItem.count;
        state.newMessageAlert = state.newMessageAlert.filter(
          (item) => item.chatId !== action.payload
        );
      }
    },
    setChats: (state, action) => {
      state.chats = action.payload;
      state.fetched = true;
    },
    setChatLoading: (state, action) => {
      state.isChatLoading = action.payload;
    },
    setNewMessageAlertLoading: (state, action) => {
      state.isNewMessageAlertLoading = action.payload;
    },
  },
});

export const {
  setNewMessageAlert,
  removeMessageAlert,
  setChats,
  setChatLoading,
  setNewMessageAlertLoading,
} = chatSlice.actions;

export default chatSlice.reducer;
