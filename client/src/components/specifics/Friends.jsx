import React  from 'react'
import Searchbar from '../shared/Searchbar'
import { List } from '@mui/material'
import UserItem from '../shared/UserItem'
import { SampleChat, SampleRequests } from '../../constants/SampleData'
import Notifications from './Notifications'
import { useInputValidation } from '6pp'

const Friends = () => {
  const users = SampleRequests
  let requests = SampleRequests
  let isLoadingSendFriendRequest = false;
  const fsearch = useInputValidation("")
  const addFriendHandler =(_id)=>{
    console.log(_id)
  }

  return (
    <>
      <Searchbar search={fsearch} placeholder={"Find People"} />
      {
        requests.length>0 && <div className='border-t-[1px] border-t-black'>
        <Notifications requests={requests}/>
      </div>
      }
      
      
      <div className='border-t-[1px] border-black'>
      <h1 className='mx-2 mt-2'>Add Friends</h1>

        <List sx={{width:'100%',padding:'0px',margin:'0px'}}>
          {
            users.map((user)=>(
              <UserItem addFriends={true} user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
            ))
          }
        </List>
      </div>
    </>
  )
}

export default Friends