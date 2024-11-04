import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { orange } from "../../constants/color";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { Camera, X, Check } from 'lucide-react';
import moment from "moment";
import { useSelector } from "react-redux";
import { Mail } from "@mui/icons-material";
import { transformImage } from "../../libs/Features";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {/* <div className="flex items-center flex-col w-full h-full border-r border-r-black py-4">
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
      </div> */}
      <div className="w-full h-full bg-white border-r border-gray-200">
        <div className="p-6 flex  flex-col">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={user.user?.avatar?.url ? transformImage(user.user?.avatar?.url,300):"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s"}
                alt={user.user?.username}
                className="w-24 h-24 rounded-full border-4 border-orange-100"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.user.username}</h2>
            <p className="text-orange-600 font-medium">Online</p>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">About</h3>
              <p className="text-gray-700">{user.user.bio}</p>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail size={18} className="text-gray-400" />
                  <span>{user.user.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <CalendarMonthIcon size={18} className="text-gray-400" />
                  <span>
                    Joined {user.user?.createdAt ? moment(user.user.createdAt).format("MMMM D, YYYY") : "N/A"}
                  </span>
                </div>
              </div>
            </div>  
          </div>
          <button className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mt-6">
              Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
