import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import { AttachFile } from '@mui/icons-material'
import FileMenu from '../components/dialogues/FileMenu'
import MessageComponent from '../components/shared/MessageComponent'
import { SampleMessage } from '../constants/SampleData'
import { getSocket } from '../context/Socket'
import { NEW_MESSAGE } from '../constants/event'
import { useParams } from 'react-router-dom'
import chatService from '../service/chatService'
import messageService from '../service/messageService'
import { useSocketEventHandler } from '../utils/helper'
import { useSelector } from 'react-redux'
import { useInfiniteScrollTop } from '6pp'
import { AppContext } from '../context/SideMenuStates'

const Chat = ({}) => {
  const {chatId} = useParams()
  console.log(chatId)

  const user = useSelector((state) => state.user.user); 

  const [chatDetails , setChatDetails] = useState({})
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [messageData,setMessageData] = useState({})
  const [page,setPage] = useState(1)
  const [fileMenuAnchor,setFileMenuAnchor] = useState(null)
  const {setIsFileMenu} = useContext(AppContext)

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const [chatData,messageData] = await Promise.all([
          chatService.getChatDetails(chatId, true),
          messageService.getMessages(chatId)
        ])
        if(chatData.success){
          setChatDetails(chatData.chat); 
        }
        if(messageData.success){
          console.log({messageData})
          setPage(messageData.currentPage)
          setMessageData(messageData)
        }
      } catch (error) {
        console.error('Error fetching chat details:', error);
      }
    };
    setMessages([])
    setOldMessages([])
    setPage(1)
    fetchChatDetails();
  }, [chatId]);

  const fetchChatMessages = async(chatId,page)=>{
    const response = await messageService.getMessages(chatId,page)
    console.log({response})
    setMessageData(response)
  }

  useEffect(() => {
    if(page > 1){
      fetchChatMessages(chatId,page)
    }
  }, [page])
  

  
  const containerRef = useRef(null)
  const socket = getSocket()
  const { data:oldMessages, setData:setOldMessages} = useInfiniteScrollTop(containerRef,messageData?.totalPages,page,setPage,messageData?.messages)


  const sendMessageHandler = () => {
    if(!message.trim()) returns
    console.log({message})
    //emitting event through socket
    socket.emit(NEW_MESSAGE,{chatId,members:chatDetails.members,message})
    setMessage("")
  }

  const newMessageHandler = useCallback((data)=>{
    setMessages(prev=>[...prev,data.message])
  },[])

  const eventHandler = {[NEW_MESSAGE]: newMessageHandler}
  useSocketEventHandler(socket,eventHandler)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessageHandler();
    }
  };

  const allMessages = [...oldMessages,...messages]

const handleFileMenu = (e)=>{
  setIsFileMenu(true)
  setFileMenuAnchor(e.currentTarget)
}
  return (
    <>
      <Stack className='bg-slate-100 ' ref={containerRef} height={'90%'} sx={{ overflowY: 'auto', overflowX: 'hidden' }} padding={'1rem'} spacing={'1rem'}>
        {
          allMessages.length > 0 && allMessages.map((message) => (
            <MessageComponent key={message._id} message={message} user={user} />
          ))
        }
      </Stack>
      <div className='h-[10%] px-10 w-full flex justify-between space-x-5 items-center flex-row'>
        <IconButton onClick={handleFileMenu} style={{cursor:'pointer'}} >
          <AttachFile sx={{ width: '1.3rem', height: '1.3rem' }} />
        </IconButton>
        <input onKeyDown={handleKeyDown} value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Send a message...' id="small-input" className="w-full rounded-full px-2 py-1 text-gray-900 border border-gray-300 bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <button onClick={sendMessageHandler} type="button" className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-1.5 py-1.5 me-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 -rotate-45 text-white">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
      <FileMenu anchor={fileMenuAnchor} />
    </>
  )
}

export default AppLayout()(Chat)