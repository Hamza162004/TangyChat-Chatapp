import { List } from "@mui/material";
import React, { memo, useEffect } from "react";
import NotificationItem from "../shared/NotificationItem";
import requestService from "../../service/requestService";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../redux/Slice/notificationSlice";
import { toast } from "react-hot-toast";

const Notifications = () => {
  const dispatch = useDispatch()
  const { notification, fetched } = useSelector((state) => state.notification);

  const fetchRequests = async () => {
    try {
      const result = await requestService.requestNotification();
      dispatch(setNotification(result.allRequest));
    } catch (error) {
      console.log("Error fetching requests:", error);
    }
  };

  // Function to handle accept/reject request
  const handleRequest = async (requestId, state) => {
    try {
      const result = await requestService.acceptRequest(requestId, state); // Call API to accept/reject request
      console.log(result);
      if(result.status === "accepted"){
        toast.success(`You and ${result.senderUsername} are now friends` );
      }
      fetchRequests(); // Refetch the notifications after handling the request
    } catch (error) {
      console.error("Error handling request:", error);
      toast.error("Error handling request");
    }
  };

  return (
    <>
      <div className="flex items-center py-[32px] px-5 text-orange-500 border-b-[1px] border-black">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      {!notification ? (
        <p>Loading...</p>
      ) : (
        <List>
          {notification.length > 0 ? (
            notification.map((request) => (
              <NotificationItem
                request={request}
                handler={handleRequest}
                key={request._id}
              />
            ))
          ) : (
            <p>No notifications found.</p>
          )}
        </List>
      )}
    </>
  );
};

export default memo(Notifications);
