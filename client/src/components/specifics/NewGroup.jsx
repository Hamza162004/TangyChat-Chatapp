import { React, useState, useEffect } from "react";
import { List } from "@mui/material";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import chatService from "../../service/chatService";

const NewGroup = ({
  setIsNotification,
  setIsGroup,
  setIsNewGroup,
  setIsChatList,
  setIsProfile,
  setIsFriends,
}) => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const groupName = useInputValidation("");

  const fetchUsers = async () => {
    try {
      const result = await chatService.getMyFriends();
      setMembers(result.friends);
    } catch (error) {
      console.log("Error fetching Members:", error);
      setMembers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedMembers]);

  const selectMemberHandler = (_id) => {
    setSelectedMembers((prev) =>
      prev.includes(_id) ? prev.filter((e) => e !== _id) : [...prev, _id]
    );
  };

  const cancelGroup = () => {
    setSelectedMembers([]);
  };

  const handleGroup = async () => {
    try {
      const result = await chatService.createGroup(
        groupName.value,
        selectedMembers
      );
      console.log("Result is = ", result);
    } catch (error) {
      console.log("Error making Group:", error);
    }
  };

  const openGroup = () => {
    setIsChatList(false);
    setIsProfile(false);
    setIsFriends(false);
    setIsGroup(true);
    setIsNewGroup(false);
    setIsNotification(false);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center mt-6">
        <a
          onClick={openGroup}
          className="flex items-center mr-4 ml-4 px-2 py-1 bg-black text-white hover:bg-gray-800 rounded-lg cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </a>

        <h1 className="text-2xl font-bold text-orange-500 ml-4">New Group</h1>
      </div>

      <div className="w-full h-[82%]">
        <div className="py-4 px-3 w-full ">
          <div>
            <input
              value={groupName.value}
              onChange={groupName.changeHandler}
              type="text"
              id="small-input"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <span className="px-3 py-2 block mb-2 text-md font-medium text-gray-900 dark:text-white">
          Add Members
        </span>
        <List
          sx={{
            width: "100%",
            height: "70%",
            padding: "0px",
            margin: "0px",
            overflow: "auto",
          }}
        >
          {members.map((user) => (
            <UserItem
              addMembers={true}
              isGroupMember={selectedMembers.includes(user._id)}
              user={user}
              key={user._id}
              handler={selectMemberHandler}
            />
          ))}
        </List>
      </div>
      <div className="flex items-center justify-center mb-3">
        <button
          onClick={cancelGroup}
          type="button"
          className="focus:outline-none rounded-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium text-sm px-5 py-2.5 me-2 mx-3 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleGroup();
            openGroup();
          }}
          type="button"
          className="text-white bg-blue-700 mx-3 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NewGroup;
