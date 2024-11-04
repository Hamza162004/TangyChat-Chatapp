import React, { useState, useEffect } from "react";
import Searchbar from '../shared/Searchbar';
import { List, Stack } from '@mui/material';
import UserItem from '../shared/UserItem';
import requestService from "../../service/requestService";
import userService from "../../service/userService";
import { useInputValidation } from '6pp';
import { toast } from "react-hot-toast";
import { Smile } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

const Friends = () => {

  const [users, setUsers] = useState([]);
  const fsearch = useInputValidation("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isFriendLoading, setIsFriendLoading] = useState(true)


  // Function to fetch users
  const fetchUsers = async (searchTerm = "") => {
    setIsFriendLoading(true)
    try {
      const result = await userService.getUsersAPI(searchTerm);
      setUsers(result.users);
    } catch (error) {
      console.log("Error fetching Users:", error);
      setUsers([]);
    }
    setIsFriendLoading(false)
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
      toast.success(`Friend Request sent to ${result.receiverUsername}`);
      // After sending the friend request, refetch the user list
      fetchUsers(fsearch.value);  // Fetch users with the current search term
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Error sending friend request");
    }
  };

  return (
    <>
      <div className="w-full h-full bg-white border-r border-gray-200">
        <div className="p-4 pt-6 pb-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Add Friends
            </h2>
          </div>
          <Searchbar search={fsearch} placeholder={"Search a friend"} />

        </div>
        {
          isFriendLoading ?
            <div className="h-80 flex flex-row items-center justify-center">
            <ThreeDots color={'#4F46E5'} width={100}/> 
            </div>
            : users.length > 0 ?
              <Stack
                width={"100%"}
                direction={"column"}
                style={{ height: "calc(100% - 156px)", overflowY:"auto" , overflowX:"hidden" }}
                >
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
              </Stack> :
              <div className="h-80 flex flex-row items-center justify-center">
                <Smile className="mr-4" size={18} />
                No Users to Add
              </div>

        }

      </div>
      {/* <div className='overflow-auto' style={{height:'calc(100% - 150px)'}}>

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
      </div> */}
    </>
  );
};

export default Friends;
