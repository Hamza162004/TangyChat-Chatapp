import React, { useEffect, useState, useParams, lazy, Suspense } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Done, Edit } from '@mui/icons-material'
import { Backdrop, TextField, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { SampleRequests } from '../constants/SampleData'
import UserItem from '../components/shared/UserItem'
import { orange } from '../constants/color'

const Group = () => {
  const ConfirmDeleteDialogue = lazy(()=> import('../components/dialogues/ConfirmDeleteDialogue'))
  const AddMembersDialogue = lazy(()=> import('../components/dialogues/AddMembersDialogue'))
  const [groupName, setGroupName] = useState('')
  const [groupNewName, setGroupNewName] = useState('')
  const [isDeleteDialog,setIsDeleteDialog] = useState(false)
  const [isAddMembers,setIsAddMembers] = useState(false)
  const groupMembers = SampleRequests;
  const [isEdit, setIsEdit] = useState(false)

  const chatId = useSearchParams()[0].get('group')


  const updateGroupName = () => {
    setIsEdit(false)
  }

  useEffect(() => {
    setGroupName(`GroupName ${chatId}`)
    setGroupNewName(`GroupName ${chatId}`)

    return () => {
      setGroupName("")
      setGroupNewName("")
      setIsEdit(false)
    }
  }, [chatId])

  const closeConfirmDeleteDialog =()=>{
    setIsDeleteDialog(false)
  }

  const deleteHandler=()=>{
    console.log('del')
    closeConfirmDeleteDialog()
  }

  const removeMemberHandler=(_id)=>{
console.log('remove'+_id)
  }

  return (
    <>
      <div className='flex items-center h-full flex-col w-full  px-5 pt-8'>
        <div className='flex items-center'>
          {
            isEdit ?
              <>
                <TextField label="GroupName" variant="standard" value={groupNewName} onChange={(e) => setGroupNewName(e.target.value)} />
                <button className='text-green-500 hover:text-green-400' onClick={updateGroupName}>
                  <Done />
                </button>

              </> :
              <>
                <h1 className='text-2xl mx-3'>{groupNewName}</h1>
                <button className='text-gray-500 hover:text-gray-400' onClick={() => setIsEdit(true)} >
                  <Edit />
                </button>
              </>
          }
        </div>
        <div className='flex flex-col w-full h-[85%] my-10 sm:px-20 xs:px-10'>
          <Typography sx={{ alignSelf: 'flex-start', fontSize: '18px', color:orange, fontWeight:'bold' }} >Members</Typography>
          <div className='flex items-center self-center py-2 overflow-y-auto  flex-col w-[60%] space-y-4  h-[60%]'>
            {
              groupMembers.map((i)=>(
                <div className='border-[1px] border-gray-600 rounded-xl px-3 py-1 w-full '>
                <UserItem key={i._id} user={i} handler={removeMemberHandler}  addMembers={true} isGroupMember={true} />
                </div>
                
              ))
            }
          </div>
          <div className='flex flex-col pt-10 items-center'>
            <button onClick={()=> setIsAddMembers(true)} type="button" className="text-white flex items-center bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 mr-2">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
              Add Members</button>
            <button onClick={()=>setIsDeleteDialog(true)} type="button" className="text-white flex items-center bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 mr-2">
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
              </svg>
              Delete Group</button>
          </div>
        </div>
        {
          isDeleteDialog && <Suspense fallback={<Backdrop open/>}>
            <ConfirmDeleteDialogue handleClose={closeConfirmDeleteDialog} deleteHandler={deleteHandler} open={isDeleteDialog}/>
            </Suspense>
        }
        {
          isAddMembers && <Suspense fallback={<Backdrop open/>}>
            <AddMembersDialogue handleClose={()=>setIsAddMembers(false)} open={isAddMembers} />
          </Suspense>
        }
      </div>
    </>
  )
}

export default AppLayout()(Group) 