import React, { useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import { AttachFile } from '@mui/icons-material'
import FileMenu from '../components/dialogues/FileMenu'
import MessageComponent from '../components/shared/MessageComponent'
import { SampleMessage } from '../constants/SampleData'

const Chat = () => {
  const containerRef = useRef(null)
  const sampleMessage = SampleMessage
  const user={
    _id:'234567',
    name:'Hamza Javed'
  }
  return (
    <>
      <Stack className='bg-slate-100' ref={containerRef} height={'90%'} sx={{ overflowY: 'auto', overflowX: 'hidden' }} padding={'1rem'} spacing={'1rem'}>
        {
          sampleMessage.map((message)=>(
            <MessageComponent key={message._id} message={message} user={user} />
          ))
        }
      </Stack>
      <div className='h-[10%] px-10 w-full flex justify-between space-x-5 items-center flex-row'>
        <IconButton >
          <AttachFile sx={{width:'1.3rem',height:'1.3rem'}} />
        </IconButton>

        <input type="text" placeholder='Send a message...' id="small-input" className="w-full rounded-full px-2 py-1 text-gray-900 border border-gray-300 bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

      

        <button type="button" className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-1.5 py-1.5 me-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 -rotate-45 text-white">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>


      </div>
      <FileMenu />
    </>
  )
}

export default AppLayout()(Chat)