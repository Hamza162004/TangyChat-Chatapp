import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newMessageAlert : [{
    chatId : "",
    count : 0
  }]
}

export const chatSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNewMessageAlert: (state, action) => {
      const index = state.newMessageAlert.findIndex(
        (item)=> item.chatId === action.payload.chatId
      )
      if (index !== -1){
        state.newMessageAlert[index].count += 1;
      }
      else{
        state.newMessageAlert.push({chatId:action.payload.chatId, count: 1})
      }
    },
    removeMessageAlert:(state,action)=>{
        state.newMessageAlert = state.newMessageAlert.filter((item)=>item.chatId !== action.payload)
    }
  },
})

export const { setNewMessageAlert,removeMessageAlert } = chatSlice.actions

export default chatSlice.reducer
