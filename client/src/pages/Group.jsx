import React, { useEffect, useState, lazy, Suspense } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Done, Edit } from "@mui/icons-material";
import { Backdrop, TextField, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import UserItem from "../components/shared/UserItem";
import { orange } from "../constants/color";
import chatService from "../service/chatService";
import { useSelector, useDispatch } from "react-redux";
import { setGroup } from "../redux/Slice/groupSlice";
import { setCreator } from "../redux/Slice/creatorSlice";
import { toast } from "react-hot-toast";
import { Check, LogOut, Pencil, Plus, Trash2, UserMinus, Users, X } from "lucide-react";
import { transformImage } from "../libs/Features";

const Group = () => {
  const ConfirmDeleteDialogue = lazy(() =>
    import("../components/dialogues/ConfirmDeleteDialogue")
  );
  const AddMembersDialogue = lazy(() =>
    import("../components/dialogues/AddMembersDialogue")
  );
  const [groupNewName, setGroupNewName] = useState("");
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const [isAddMembers, setIsAddMembers] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.user || {});
  const creatorId = useSelector((state) => state.creator.creator);

  const { chatId } = useParams();

  const updateGroupName = async () => {
    try {
      await chatService.updateChatDetails(chatId, groupNewName);
      toast.success("Updated Group Name!")
      setIsEdit(false);
    } catch (error) {
      console.log("Error updating Group Name:", error);
      toast.error("Error updating Group Name")
    }
  };

  const fetchGroupDetail = async () => {
    try {
      const result = await chatService.getChatDetails(chatId);
      setGroupNewName(result.chat.name);
      setGroupMembers(result.chat.members);
      dispatch(setCreator(result.chat.creator));
    } catch (error) {
      console.log("Error fetching Group Details:", error);
    }
  };

  const refreshGroupDetails = () => {
    fetchGroupDetail();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchGroupDetail();
      } catch (error) {
        console.log("Error fetching Group Details:", error);
      }
    };

    fetchData();
  }, [chatId]);

  const closeConfirmDeleteDialog = () => {
    console.log("Please Close naa")
    setIsDeleteDialog(false);
  };

  const deleteHandler = async () => {
    try {
      await chatService.leaveGroup(chatId);
      const result = await chatService.getGroupChats();
      toast.success("Group left!")
      dispatch(setGroup(result.groupChats));
      closeConfirmDeleteDialog();
    } catch (error) {
      console.log("Error leaving Group :", error);
      toast.error("Error leaving Group");
    }
  };

  const removeMemberHandler = async (_id) => {
    try {
      const result = await chatService.removeGroupMember(chatId, _id);
      toast.success(`${result.removedUser} removed from Group`)
      fetchGroupDetail();
    } catch (error) {
      console.log("Error in deleting group member:", error);
      toast.error("Error in deleting group member")
    }
  };

  return (
    <>
      {/* <div className="flex items-center h-full flex-col w-full  px-5 pt-8">
        <div className="flex items-center">
          {isEdit ? (
            <>
              <TextField
                label="GroupName"
                variant="standard"
                value={groupNewName}
                onChange={(e) => setGroupNewName(e.target.value)}
              />
              <button
                className="text-green-500 hover:text-green-400"
                onClick={updateGroupName}
              >
                <Done />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl mx-3">{groupNewName}</h1>
              {currentUser && creatorId === currentUser._id && (
                <button
                  className="text-gray-500 hover:text-gray-400"
                  onClick={() => setIsEdit(true)}
                >
                  <Edit />
                </button>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col w-full h-[85%] my-10 sm:px-20 xs:px-10">
          <Typography
            sx={{
              alignSelf: "flex-start",
              fontSize: "18px",
              color: orange,
              fontWeight: "bold",
            }}
          >
            Members
          </Typography>
          <div className="flex items-center self-center py-2 overflow-y-auto  flex-col w-[60%] space-y-4  h-[60%]">
            {groupMembers.map((i) => (
              <div className="border-[1px] border-gray-600 rounded-xl px-3 py-1 w-full ">
                <UserItem
                  key={i._id}
                  user={i}
                  handler={removeMemberHandler}
                  isGroupMember={true}
                  addMembers={true}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col pt-10 items-center">
            {creatorId === currentUser._id && (
              <button
                onClick={() => setIsAddMembers(true)}
                type="button"
                className="text-white flex items-center bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Members
              </button>
            )}

            <button
              onClick={() => setIsDeleteDialog(true)}
              type="button"
              className="text-white flex items-center bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
              Exit Group
            </button>
          </div>
        </div>
        
        {isAddMembers && (
          <Suspense fallback={<Backdrop open />}>
            <AddMembersDialogue
              handleClose={() => setIsAddMembers(false)}
              open={isAddMembers}
              refreshGroupDetails={refreshGroupDetails}
            />
          </Suspense>
        )}
      </div> */}
      <div className="h-full w-full bg-white flex flex-col">
        <div className="relative h-64 bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center px-6">
          <Link
            to={`/chat/${chatId}`}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="text-white" size={24} />
          </Link>

          <div className="text-center">
            <div className="mb-4 bg-white/10 p-4 rounded-full inline-block backdrop-blur-sm">
              <Users className="text-white" size={32} />
            </div>
            {isEdit ? (
              <div className="flex flex-row">
                <input
                  type="text"
                  value={groupNewName}
                  onChange={(e) => setGroupNewName(e.target.value)}
                  className="text-2xl font-bold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white text-center w-full max-w-md"
                />
                <button
                  onClick={updateGroupName}
                  className="p-1.5 ml-4 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Check className="text-white/80" size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <h2 className="text-2xl font-bold text-white">{groupNewName}</h2>
                {
                  currentUser?._id === creatorId &&
                  <button
                    onClick={() => setIsEdit(true)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                    <Pencil className="text-white/80" size={16} />
                  </button>
                }

              </div>
            )}
            <p className="text-white/80 mt-2">{groupMembers.length} members</p>
          </div>
        </div>

        <div className="flex-1 px-6 py-8 justify-between">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Members</h3>
              {
                currentUser?._id === creatorId &&
                <button
                onClick={() => setIsAddMembers(true)}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Plus size={20} />
                <span>Add Member</span>
              </button>
              }
              
            </div>

            <div className="space-y-3 overflow-y-auto h-54">
              {groupMembers.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={member?.avatar?.url ? transformImage(member?.avatar?.url) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s"}
                      alt={member.username}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{member.username}</h4>
                      {
                        member._id === creatorId && <span className={`text-sm ${member._id === creatorId ? 'text-indigo-600' : 'text-gray-500'
                          }`}>
                          Admin
                        </span>
                      }

                    </div>
                  </div>
                  {currentUser._id === creatorId && member._id !== creatorId && (
                    <button
                      onClick={() => removeMemberHandler(member._id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <UserMinus size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
          </div>
        </div>
        <div className="mb-20 space-y-3 flex items-center justify-center">
            {currentUser?._id === creatorId && (
              <button
                onClick={() => setIsDeleteDialog(true)}
                className="w-40 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Trash2 size={20} />
                <span>Delete Group</span>
              </button>
            ) }
              <button
                className="w-40 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <LogOut size={20} />
                <span>Leave Group</span>
              </button>
            
          </div>
      </div>
      {isAddMembers && (
        <Suspense fallback={<Backdrop open />}>
          <AddMembersDialogue
            handleClose={() => setIsAddMembers(false)}
            open={isAddMembers}
            refreshGroupDetails={refreshGroupDetails}
          />
        </Suspense>
      )}
      {isDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialogue
              handleClose={closeConfirmDeleteDialog}
              deleteHandler={deleteHandler}
              open={isDeleteDialog}
            />
          </Suspense>
        )}
    </>
  );
};



export default AppLayout()(Group);
