import { List } from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import NotificationItem from "../shared/NotificationItem";
import requestService from "../../service/requestService";

const Notifications = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define fetchRequests outside of useEffect so it can be reused
  const fetchRequests = async () => {
    setLoading(true); // Set loading to true before fetching requests
    try {
      const result = await requestService.requestNotification();
      setRequests(result.allRequest); // Update the requests state with the fetched data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.log("Error fetching requests:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(); // Call fetchRequests when component mounts
  }, []);

  // Function to handle accept/reject request
  const handleRequest = async (requestId, state) => {
    try {
      await requestService.acceptRequest(requestId, state); // Call API to accept/reject request
      fetchRequests(); // Refetch the notifications after handling the request
    } catch (error) {
      console.error("Error handling request:", error);
    }
  };

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
