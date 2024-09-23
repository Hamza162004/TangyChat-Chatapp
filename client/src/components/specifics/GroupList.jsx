import React from 'react'
import Searchbar from '../shared/Searchbar'
import { Stack } from '@mui/material'
 import { useInputValidation } from '6pp'
import GroupListItem from '../shared/GroupListItem'

const GroupList = ({w='100%',chats=[],chatId}) => {
  const gsearch = useInputValidation("")
  return (
    <>
        <div className='flex items-center py-8 px-5 text-orange-500 '>
          <h1 className='text-xl font-bold'>Manage Groups</h1>

        </div>
        <Stack width={w} direction={'column'} borderTop={'black 1px solid'}>
          {
              chats?.map((data , index)=>{
                const {avatar , _id , groupChat,members,userName} = data
                if (groupChat){
                  return <GroupListItem chatId={chatId} sameSender={chatId===_id} index={index} avatar={avatar} name={userName} _id={_id} key={_id} groupChat={groupChat} />
                }
                return <></>
              })
          }
      </Stack>
    </>
  )
}

export default GroupList