import { React, useState } from 'react'
import { List } from '@mui/material'
import UserItem from '../shared/UserItem'
import { SampleRequests } from '../../constants/SampleData'
import { useInputValidation } from '6pp'

const NewGroup = () => {

  const [members, setMembers] = useState(SampleRequests)
  const [selectedMembers, setSelectedMembers] = useState([])
  const selectMemberHandler = (_id) => {
      setSelectedMembers((prev) => (prev.includes(_id)? prev.filter((e)=> e!=_id):[...prev,_id]) )
  }

  const cancelGroup=()=>{
    setSelectedMembers([])
  }

  const handleGroup = () => {

  }

  const groupName = useInputValidation("")
  return (
    <div className='w-full h-full justify-between flex flex-col '>
      <div className='w-full'>
        <div className='py-4 px-3 w-full '>
          <div>
            <label for="small-input" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">New Group</label>
            <input value={groupName.value} onChange={groupName.changeHandler} type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
        </div>
        <span className='px-3 py-2 block mb-2 text-md font-medium text-gray-900 dark:text-white'>Add Members</span>
        <List sx={{ width: '100%', height: '50%', padding: '0px', margin: '0px' }}>
          {
            members.map((user) => (
              <UserItem addMembers={true} isGroupMember={selectedMembers.includes(user._id)} user={user} key={user._id} handler={selectMemberHandler}  />
            ))
          }
        </List>
      </div>
      <div className='flex items-center justify-center mb-5 mt-3'>
        <button onClick={cancelGroup} type="button" class="focus:outline-none rounded-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium text-sm px-5 py-2.5 me-2 mx-3 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
        <button onClick={handleGroup} type="button" class="text-white bg-blue-700 mx-3 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>

      </div>

    </div>
  )
}

export default NewGroup