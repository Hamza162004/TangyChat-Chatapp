import { Typography } from '@mui/material';
import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AvatarCard from './AvatarCard';

const ChatItem = ({
    avatar = [],
    _id,
    name,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChatOpen
}) => {
    const avatarData = groupChat ? avatar : [avatar];

    return (
        <Link
            to={`/chat/${_id}`}
            className='hover:bg-gray-200 border-b-black border-b'
            onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}
        >
            <div className={`flex items-center relative p-4 gap-4 ${sameSender ? 'bg-black text-white' : ''}`}>
                <AvatarCard avatar={avatarData} /> {/* Pass the prepared avatar data */}
                <div className='flex flex-col mx-2'>
                    <Typography>{name}</Typography>
                    {newMessageAlert && (
                        <Typography>{newMessageAlert.count} New Messages</Typography>
                    )}
                </div>
                {isOnline && (
                    <span className="bg-green-100 text-green-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        Online
                    </span>
                )}
            </div>
        </Link>
    );
};

export default memo(ChatItem);
