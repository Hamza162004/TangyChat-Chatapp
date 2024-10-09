import React from "react";
import { Stack } from "@mui/material";
import { useInputValidation } from "6pp";
import GroupListItem from "../shared/GroupListItem";

const GroupList = ({
  w = "100%",
  chats = [],
  chatId,
  setIsNotification,
  setIsGroup,
  setIsNewGroup,
  setIsChatList,
  setIsProfile,
  setIsFriends,
}) => {
  const gsearch = useInputValidation("");

  const openCreateGroup = () => {
    setIsChatList(false);
    setIsProfile(false);
    setIsFriends(false);
    setIsGroup(false);
    setIsNewGroup(true);
    setIsNotification(false);
  };

  return (
    <>
      <div className="flex items-center py-8 px-5 text-orange-500">
        <h1 className="text-2xl font-bold">Manage Groups</h1>

        <button
          onClick={openCreateGroup}
          title="Create Groups"
          className="ml-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            className="w-10 h-10 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clipRule="evenodd"
              fill="black"
            />
          </svg>
        </button>
      </div>

      <Stack width={w} direction={"column"} borderTop={"black 1px solid"}>
        {chats?.map((data, index) => {
          const { avatar, _id, groupChat, members, userName } = data;
          if (groupChat) {
            return (
              <GroupListItem
                chatId={chatId}
                sameSender={chatId === _id}
                index={index}
                avatar={avatar}
                name={userName}
                _id={_id}
                key={_id}
                groupChat={groupChat}
              />
            );
          }
          return <></>;
        })}
      </Stack>
    </>
  );
};

export default GroupList;
