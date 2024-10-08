import React, { memo, useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import ChatItem from "../shared/ChatItem";
import chatService from "../../service/chatService";
import Searchbar from "../shared/Searchbar";
import { useInputValidation } from "6pp";

const ChatList = () => {
  const [chats, setChats] = useState([]);

  const csearch = useInputValidation("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const result = await chatService.getChats();
        setChats(result.groupChats);
      } catch (error) {
        console.log("Error fetching chats:", error);
        setChats([]);
      }
    };
    fetchChats();
  }, []);

  return (
    <>
      <Searchbar search={csearch} placeholder={"Search a conversation"} />
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
            return (
              <ChatItem key={_id} _id={_id} name={name || "Unnamed Chat"} avatar={avatar} />
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