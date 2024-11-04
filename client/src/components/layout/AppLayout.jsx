import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
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
import chatService from "../../service/chatService";
import requestService from "../../service/requestService";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/Slice/userSlice";
import {
  CURRENT_ONLINE_USERS,
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  USER_CONNECTED,
  USER_DISCONNECTED,
} from "../../constants/event";
import {
  incrementNotificationCount,
  setIsNotificationLoading,
  setNotification,
} from "../../redux/Slice/notificationSlice";
import { setChats, setChatLoading } from "../../redux/Slice/chatSlice";
import { useSocketEventHandler } from "../../utils/helper";
import { getSocket } from "../../context/Socket";
import { setNewMessageAlert } from "../../redux/Slice/chatSlice";
import {
  addOnlineUser,
  removeOnlineUser,
  setOnlineUsers,
} from "../../redux/Slice/onlineUsersSlice";

const AppLayout = () => (WrappedComponents) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const chatIdRef = useRef(chatId);
    const { notificationCount } = useSelector((state) => state.notification);

    useEffect(() => {
      chatIdRef.current = chatId;
    }, [chatId]);

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

    const dispatch = useDispatch();

    useEffect(() => {
      const getMyProfile = async () => {
        const res = await userService.getMyProfileAPI();
        dispatch(setUser(res.user));
      };
      getMyProfile();
    }, []);

    useEffect(() => {
      const getMyChats = async (searchTerm = "") => {
        dispatch(setChatLoading(true));
        const res = await chatService.getChats(searchTerm);
        dispatch(setChats(res.groupChats));
        dispatch(setChatLoading(false));
      };
      getMyChats();
    }, []);

    useEffect(() => {
      getNotifications();
    }, []);

    const getNotifications = async () => {
      dispatch(setIsNotificationLoading(true));
      const result = await requestService.requestNotification();
      dispatch(setNotification(result.allRequest));
      dispatch(setIsNotificationLoading(false));
    };

    const socket = getSocket();

    const newMessageAlertHandler = useCallback((data) => {
      console.log("----Received message Alert-----");
      if (data.chatId === chatIdRef.current) {
        console.log("ChatId presnt :", chatIdRef.current);
        return;
      }
      dispatch(setNewMessageAlert(data));
    }, []);

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotificationCount());
      console.log("---New Request---");
      getNotifications();
    }, []);

    const onlineUsersInfoHandler = useCallback((data) => {
      console.log("Online Users : ", data);
      dispatch(setOnlineUsers(data));
    }, []);

    const newUserOnlineHandler = useCallback((data) => {
      console.log("New User : ", data.userId);
      dispatch(addOnlineUser(data.userId));
    }, []);

    const userDisconnectedHandler = useCallback((data) => {
      console.log("User Disconnected : ", data.userId);
      dispatch(removeOnlineUser(data.userId));
    }, []);

    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [CURRENT_ONLINE_USERS]: onlineUsersInfoHandler,
      [USER_CONNECTED]: newUserOnlineHandler,
      [USER_DISCONNECTED]: userDisconnectedHandler,
    };
    useSocketEventHandler(socket, eventHandler);

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
