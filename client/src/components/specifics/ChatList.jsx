import React, { memo, useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import ChatItem from "../shared/ChatItem";
import chatService from "../../service/chatService";
import Searchbar from "../shared/Searchbar";
import { useInputValidation } from "6pp";
import { useSelector } from "react-redux";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const csearch = useInputValidation("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const {newMessageAlert} = useSelector((state)=>state.chat)

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
      <Searchbar search={csearch} placeholder={"Search a conversation"} />  {/* Passing csearch */}
      <Stack
        width={"100%"}
        direction={"column"}
        borderTop={"black 1px solid"}
        overflow={"auto"}
        style={{ height: "calc(100% - 100px)" }}
      >
        {chats.length > 0 ? (
          chats.map((data) => {
            const { _id, name, avatar } = data;
            const alertForThisChat = newMessageAlert.find(
              (alert) => alert?.chatId.toString() === _id.toString()
            );
            return (
              <ChatItem key={_id} _id={_id} name={name || "Unnamed Chat"} avatar={avatar} newMessageAlert={alertForThisChat} />
            );
          })
        ) : (
          <Typography>No chats found.</Typography>
        )}
      </Stack>
    </>
  );
};

export default memo(ChatList);
