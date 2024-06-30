import { List} from '@mui/material'
import React,{memo} from 'react'
import NotificationItem from '../shared/NotificationItem'

const Notifications = ({requests}) => {

  const friendRequestHandler = (_id,accept) =>{
    console.log(_id +" : "+ accept )
  }

  return (
    <>
    <h1 className='mx-2 mt-2'>Friend Requests</h1>
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