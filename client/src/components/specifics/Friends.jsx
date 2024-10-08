import React, { useState, useEffect } from "react";
import Searchbar from '../shared/Searchbar'
import { List } from '@mui/material'
import UserItem from '../shared/UserItem'
import { SampleChat, SampleRequests } from '../../constants/SampleData'
import Notifications from './Notifications'
import { useInputValidation } from '6pp'
import userService from "../../service/userService";

const Friends = () => {

  const [users, setUsers] = useState([]);
  const fsearch = useInputValidation("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async (searchTerm = "") => {
      try {
        const result = await userService.getUsersAPI(searchTerm);
        console.log(result.users)
        setUsers(result.users);
      } catch (error) {
        console.log("Error fetching Users:", error);
        setUsers([]);
      }
    };

    // Clear previous timeout if search changes
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(() => {
      fetchUsers(fsearch.value);
    }, 100);

    setSearchTimeout(timeoutId);  // Save timeout ID to state

    // Cleanup function to clear timeout on unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [fsearch.value]);

  return (
    <>
      <Searchbar search={fsearch} placeholder={"Find People"} />
      {/* {
        requests.length > 0 && <>
          <h1 className='border-t-[1px] py-2 border-t-black mx-2'>Friend Requests</h1>
          <div className=' max-h-[25%] overflow-auto'>
            <Notifications requests={requests} />
          </div>
        </>
      } */}

      <h1 className='py-3 px-2 border-t-[1px] border-black text-xl text-orange-500 '>Add Friends</h1>
      <div className='overflow-auto' style={{height:'calc(100% - 100px)'}}>


        <List sx={{ width: '100%', padding: '0px', margin: '0px' }}>
          {
            users.map((user) => (
              <UserItem addFriends={true} user={user} key={user._id} />
            ))
          }
        </List>
      </div>
    </>
  )
}

export default Friends