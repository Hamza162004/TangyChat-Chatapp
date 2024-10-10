import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: [],
  fetched: false,
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
      state.fetched = true;
    },
  },
})

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer
