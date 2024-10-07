import { List } from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import NotificationItem from "../shared/NotificationItem";
import requestService from "../../service/requestService";

const Notifications = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); 

  const friendRequestHandler = (_id, accept) => {
    console.log(_id + " : " + accept);
  };
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const result = await requestService.requestNotification();
        setRequests(result.allRequest); 
        setLoading(false);
      } catch (error) {
        console.log("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
      <div className="flex items-center py-[32px] px-5 text-orange-500 border-b-[1px] border-black">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <List>
          {requests.length > 0 ? (
            requests.map((request) => (
              <NotificationItem
                request={request}
                handler={friendRequestHandler}
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
