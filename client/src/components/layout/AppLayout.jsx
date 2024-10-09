import React, { useState, useContext, useEffect } from "react";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import SideMenu from "./SideMenu";
import ChatList from "../specifics/ChatList";
import { SampleChat } from "../../constants/SampleData";
import { useParams } from "react-router-dom";
import Profile from "../specifics/Profile";
import Friends from "../specifics/Friends";
import NewGroup from "../specifics/NewGroup";
import GroupList from "../specifics/GroupList";
import { AppContext } from "../../context/SideMenuStates";
import Notifications from "../specifics/Notifications";
import userService from "../../service/userService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slice/userSlice";

const AppLayout = () => (WrappedComponents) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const {
      isProfile,
      setIsProfile,
      isChatList,
      setIsChatList,
      isFriends,
      setIsFriends,
      isNewGroup,
      setIsNewGroup,
      isGroup,
      setIsGroup,
      isNotification,
      setIsNotification,
    } = useContext(AppContext);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    };

    const dispatch = useDispatch()

    useEffect(()=>{
      const getMyProfile = async ()=>{
        const res = await userService.getMyProfileAPI()
        dispatch(setUser(res.user))
      }
      getMyProfile()
    },[])

    return (
      <>
        <Title />
        <Grid container height={"100vh"}>
          <SideMenu
            isNotification={isNotification}
            setIsNotification={setIsNotification}
            isGroup={isGroup}
            setIsGroup={setIsGroup}
            isNewGroup={isNewGroup}
            setIsNewGroup={setIsNewGroup}
            isChatList={isChatList}
            isProfile={isProfile}
            isFriends={isFriends}
            setIsFriends={setIsFriends}
            setIsChatList={setIsChatList}
            setIsProfile={setIsProfile}
          />
          <Grid
            item
            height={"100%"}
            overflow={"hidden"}
            sm={3.2}
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              borderRight: "1px solid black",
            }}
          >
            {isChatList && (
              <ChatList
                // chats={SampleChat}
                // chatId={chatId}
                // handleDeleteChat={handleDeleteChat}
              />
            )}
            {isProfile && <Profile />}
            {isFriends && (
              <>
                <Friends />
              </>
            )}
            {isGroup && (
              <GroupList
                chats={SampleChat}
                chatId={chatId}
                setIsNotification={setIsNotification}
                setIsGroup={setIsGroup}
                setIsNewGroup={setIsNewGroup}
                setIsChatList={setIsChatList}
                setIsProfile={setIsProfile}
                setIsFriends={setIsFriends}
              />
            )}
            {isNewGroup && (
              <NewGroup
                setIsNotification={setIsNotification}
                setIsGroup={setIsGroup}
                setIsNewGroup={setIsNewGroup}
                setIsFriends={setIsFriends}
                setIsChatList={setIsChatList}
                setIsProfile={setIsProfile}
              />
            )}
            {isNotification && <Notifications />}
          </Grid>
          <Grid item xs={10} sm={8} bgcolor={"white"} height={"100%"}>
            <WrappedComponents {...props} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
