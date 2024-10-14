import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import UserItem from "../shared/UserItem";
import chatService from "../../service/chatService";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddMembersDialogue = ({
  open,
  handleClose,
  isLoadingAddMember,
  refreshGroupDetails,
}) => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const params = useParams();
  const groupId = params.chatId;

  const selectMemberHandler = (_id) => {
    setSelectedMembers((prev) =>
      prev.includes(_id) ? prev.filter((e) => e != _id) : [...prev, _id]
    );
  };

  const cancelGroup = () => {
    setSelectedMembers([]);
    setMembers([]);
    handleClose();
  };

  const fetchUsers = async () => {
    try {
      const result = await chatService.getMyNonGroupFriends(groupId);
      setMembers(result.friends);
    } catch (error) {
      console.log("Error fetching Members:", error);
      setMembers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedMembers]);

  const addMembersSubmitHandler = async () => {
    try {
      await chatService.addGroupMember(groupId, selectedMembers);
      if (selectedMembers.length > 1) {
        toast.success("Added new members to group");
      } else {
        toast.success("Added new member to group");
      }
      setSelectedMembers([]);
      setMembers([]);
      handleClose();
      refreshGroupDetails();
    } catch (error) {
      console.log("Error in adding members to group:", error);
      toast.error("Error in adding members to group");
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Members</DialogTitle>
      <DialogContent sx={{ width: "20rem" }}>
        <Stack>
          {members.length > 0 ? (
            members.map((member) => (
              <UserItem
                key={member._id}
                isGroupMember={selectedMembers.includes(member._id)}
                user={member}
                addMembers={true}
                handler={selectMemberHandler}
              />
            ))
          ) : (
            <Typography>No Friends to add</Typography>
          )}
        </Stack>
        <DialogActions>
          <Button color="error" onClick={cancelGroup}>
            Cancel
          </Button>
          <Button
            disabled={isLoadingAddMember}
            onClick={addMembersSubmitHandler}
          >
            Add
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddMembersDialogue;
