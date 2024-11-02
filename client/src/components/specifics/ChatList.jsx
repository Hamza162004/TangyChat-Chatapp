import React, { memo, useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import ChatItem from "../shared/ChatItem";
import chatService from "../../service/chatService";
import Searchbar from "../shared/Searchbar";
import { useInputValidation } from "6pp";
import { useSelector } from "react-redux";
import { Plus, Search } from "lucide-react";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const csearch = useInputValidation("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { newMessageAlert } = useSelector((state) => state.chat)
  const onlineUsers = useSelector((state) => state.onlineUsers._ids)

  useEffect(() => {
    const fetchChats = async (searchTerm = "") => {
      try {
        const result = await chatService.getChats(searchTerm);
        setChats(result.groupChats);
      } catch (error) {
        console.log("Error fetching chats:", error);
        setChats([]);
      }
    };

    // Clear previous timeout if search changes
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(() => {
      fetchChats(csearch.value);
    }, 100);

    setSearchTimeout(timeoutId);  // Save timeout ID to state

    // Cleanup function to clear timeout on unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [csearch.value]);


  return (
    <>
      {/* <Searchbar search={csearch} placeholder={"Search a conversation"} />  
      <Stack
        width={"100%"}
        direction={"column"}
        borderTop={"black 1px solid"}
        overflow={"auto"}
        style={{ height: "calc(100% - 100px)" }}
      >
        {chats.length > 0 ? (
          chats.map((data) => {
            const { _id, name, avatar,members,groupChat } = data;
            const alertForThisChat = newMessageAlert.find(
              (alert) => alert?.chatId.toString() === _id.toString()
            );
            const isOnline = groupChat?false:onlineUsers.includes(members[0]._id)
            return (
              <ChatItem key={_id} _id={_id} isOnline={isOnline} groupChat={groupChat} name={name || "Unnamed Chat"} avatar={avatar} newMessageAlert={alertForThisChat} />
            );
          })
        ) : (
          <Typography>No chats found.</Typography>
        )}
      </Stack> */}
      <div className="w-full h-full bg-white border-r border-gray-200">
        <div className="p-4 pb-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Chats
            </h2>
            <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
              <Plus className="text-purple-600" size={24} />
            </button>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
        </div>
        <Stack
          width={"100%"}
          direction={"column"}
          overflow-Y={"auto"}
          style={{ height: "calc(100% - 156px)" }}
        >
          {chats.length > 0 ? (
            chats.map((data) => {
              const { _id, name, avatar, members, groupChat } = data;
              const alertForThisChat = newMessageAlert.find(
                (alert) => alert?.chatId.toString() === _id.toString()
              );
              const isOnline = groupChat ? false : onlineUsers.includes(members[0]._id)
              return (
                <ChatItem key={_id} _id={_id} isOnline={isOnline} groupChat={groupChat} name={name || "Unnamed Chat"} avatar={avatar} newMessageAlert={alertForThisChat} />
              );
            })
          ) : (
            <Typography>No chats found.</Typography>
          )}
        </Stack>
      </div>
    </>
  );
};

export default memo(ChatList);
