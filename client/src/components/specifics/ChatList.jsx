import React from 'react'
import { Stack } from '@mui/material'
import ChatItem from '../shared/ChatItem'
import Searchbar from '../shared/Searchbar'
import { useInputValidation } from '6pp'

const ChatList = ({w='100%', chats = [] , chatId , onlineUsers = [] , newMessagesAlert =[{ chatId:"" ,count:0 }],handleDeleteChat}) => {
    const csearch=useInputValidation("")
  return (
      <>
      <Searchbar search={csearch} placeholder={'Search a conversation'}/>
      <Stack width={w} direction={'column'} borderTop={'black 1px solid'}>
          {
              chats?.map((data , index)=>{
                const {avatar , _id , groupChat,members,userName} = data

                const newMessageAlert = newMessagesAlert.find(
                    ({chatId}) => chatId === _id       
                )

                const isOnline = members?.some((member)=> onlineUsers.includes(_id))

                  return <ChatItem index={index} newMessageAlert={newMessageAlert} isOnline={isOnline} avatar={avatar} name={userName} _id={_id} key={_id} groupChat={groupChat} sameSender={chatId===_id} handleDeleteChatOpen={handleDeleteChat} />
              })
          }
      </Stack>
      </>
    )
  }

export default ChatList