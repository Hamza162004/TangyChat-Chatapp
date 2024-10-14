import React, { useState, useEffect } from "react";
import Searchbar from '../shared/Searchbar';
import { List } from '@mui/material';
import UserItem from '../shared/UserItem';
import requestService from "../../service/requestService";
import userService from "../../service/userService";
import { useInputValidation } from '6pp';
import { toast } from "react-hot-toast";

const Friends = () => {

  const [users, setUsers] = useState([]);
  const fsearch = useInputValidation("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Function to fetch users
  const fetchUsers = async (searchTerm = "") => {
    try {
      const result = await userService.getUsersAPI(searchTerm);
      setUsers(result.users);
    } catch (error) {
      console.log("Error fetching Users:", error);
      setUsers([]);
    }
  };

  // Call fetchUsers on search input changes
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(() => {
      fetchUsers(fsearch.value);
    }, 100);

    setSearchTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fsearch.value]);

  // Handle sending friend request and then refresh users
  const handleSendRequest = async (receiverId) => {
    try {
      const result = await requestService.sendFriendRequestAPI(receiverId);
      toast.success(`Friend Request sent to ${result.receiverUsername}` );
      // After sending the friend request, refetch the user list
      fetchUsers(fsearch.value);  // Fetch users with the current search term
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Error sending friend request");
    }
  };

  return (
    <>
      <Searchbar search={fsearch} placeholder={"Find People"} />
      
      <h1 className='py-3 px-2 border-t-[1px] border-black text-xl text-orange-500 '>Add Friends</h1>
      <div className='overflow-auto' style={{height:'calc(100% - 150px)'}}>

        <List sx={{ width: '100%', padding: '0px', margin: '0px' }}>
          {
            users.map((user) => (
              <UserItem
                addFriends={true}
                user={user}
                key={user._id}
                handler={handleSendRequest}  // Pass the handler here
              />
            ))
          }
        </List>
      </div>
    </>
  );
};

export default Friends;
