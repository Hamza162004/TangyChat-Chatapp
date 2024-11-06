import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { Camera, X, Check } from 'lucide-react';
import moment from "moment";
import { useSelector } from "react-redux";
import { Mail } from "@mui/icons-material";
import { transformImage } from "../../libs/Features";

const Profile = () => {
  const {user} = useSelector((state) => state.user);
  const [profile,setProfile] = useState(user || null)
  const [isEditing,setIsEditing]=useState(false)
  const [editForm, setEditForm] = useState({ ...profile });

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

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
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              >
                <Check size={20} />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditForm(profile);
                }}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={isEditing ? editForm.avatar.url : user?.avatar?.url}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                <Camera size={20} />
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
                />
              ) : (
                <p className="text-gray-900">{profile.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">{profile.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 resize-none"
                  rows={3}
                />
              ) : (
                <p className="text-gray-900">{profile.bio}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <CalendarMonthIcon sx={{width:'16px'}}/> Joined 
              </label>
              <p className="text-gray-900">{user?.createdAt
                  ? moment(user.createdAt).format("MMMM D, YYYY")
                  : "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
