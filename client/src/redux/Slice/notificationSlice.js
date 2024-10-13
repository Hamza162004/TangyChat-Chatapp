import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: [],
  fetched: false,
  notificationCount:0
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
      state.fetched = true;
      state.notificationCount = action.payload.length
    },
    incrementNotificationCount:(state)=>{
      state.notificationCount += 1;
    },
    resetNotificationCount:(state)=>{
      state.notificationCount = 0;
    }
  },
})

export const { setNotification , incrementNotificationCount , resetNotificationCount } = notificationSlice.actions

export default notificationSlice.reducer
