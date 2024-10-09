import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { orange } from "../../constants/color";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import moment from "moment";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="flex items-center flex-col w-full h-full border-r border-r-black py-4">
        <Avatar
          src={
            user.user?.avatar?.url
          }
          sx={{
            width: "10rem",
            height: "10rem",
            objectFit: "contain",
            borderColor: orange,
            border: "2px solid",
          }}
        />
        <div className="flex flex-col py-5 font-serif w-full h-full space-y-5">
          <div className="flex flex-col items-center ">
            <div className="flex items-center">
              <AlternateEmailIcon sx={{ width: "1rem" }} />
              <span className="text-black text-xl">{user.user.username}</span>
            </div>
            <span className="text-gray-400 text-xs">Username</span>
          </div>
          <div className="flex flex-col items-center ">
            <div className="flex justify-center">
              <p className="text-black text-md w-[80%] text-center">
                {user.user.bio}
              </p>
            </div>
            <span className="text-gray-400 text-xs">Bio</span>
          </div>
          <div className="flex flex-col items-center ">
            <div className="flex items-center">
              <CalendarMonthIcon sx={{ width: "1rem", margin: "0px 5px" }} />
              <span className="text-black text-md">
                {user.user?.createdAt
                  ? moment(user.user.createdAt).format("MMMM D, YYYY")
                  : "N/A"}
              </span>
            </div>
            <span className="text-gray-400 text-xs">Joined</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
