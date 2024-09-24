import { List} from '@mui/material'
import React,{memo} from 'react'
import NotificationItem from '../shared/NotificationItem'
import { SampleRequests } from '../../constants/SampleData'

const Notifications = () => {

  const friendRequestHandler = (_id,accept) =>{
    console.log(_id +" : "+ accept )
  }

  const requests = SampleRequests;

  return (
    <>
      <div className='flex items-center py-[32px] px-5 text-orange-500 border-b-[1px] border-black '>
          <h1 className='text-2xl font-bold'>Notifications</h1>

      </div>
      <List>
        {
          requests.map((request) => (
           <NotificationItem request={request} handler={friendRequestHandler} key={request._id} />
          ))
        }
      </List>
    </>
  )
}

export default memo(Notifications)