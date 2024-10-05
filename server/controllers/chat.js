import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { getOtherMember } from "../utils/helper.js";
import { ErrorHandler } from "../utils/utility.js";

const createGroup = async (req, res, next) => {
    try {
        const { name, members } = req.body;

        if (members.length < 2) {
            return next(new ErrorHandler('Group should conatin at least 3 members', 400))
        }

        const allMembers = [...members, req.user]
        const group = await Chat.create({
            name,
            groupChat: true,
            members: allMembers,
            creator: req.user
        })
        console.log({ group })
        return res.status(200).json({ success: true, message: `Group ${name} created successfully` })
    } catch (error) {
        return res.status(400).json({ success: false, message: error })
    }
}

const getMyChats = async (req, res, next) => {
    try {
        const chats = await Chat.find({ members: req.user }).populate('members', 'username avatar')

        const myChats = chats.map(({ _id, name, members, groupChat, creator }) => {
            const filteredMembers = members.filter(member => member._id.toString() !== req.user.toString());
            const otherMember = getOtherMember(members, req.user)
            return {
                _id,
                members: filteredMembers.map(member => { return { _id: member._id, name: member.username } }),
                groupChat,
                creator,
                avatar: groupChat ? filteredMembers.slice(0, 3).map((member) => {
                    return member.avatar
                }) : otherMember.avatar,
                name: groupChat ? name : otherMember.name,
            }
        })

        return res.status(200).json({ success: true, groupChats: myChats })
    } catch (error) {
        return res.status(400).json({ success: false, message: error })
    }
}

const getGroupChats = async (req, res, next) => {
    try {
        // Find all group chats where the current user is a member
        const chats = await Chat.find({ members: req.user, groupChat: true }).populate('members', 'username avatar');
        const myChats = chats.map(({ _id, name, members, creator }) => {
            const filteredMembers = members.filter(member => member._id.toString() !== req.user.toString());

            return {
                _id,
                members: filteredMembers.map(member => {
                    return { _id: member._id, name: member.username };
                }),
                creator,
                avatar: filteredMembers.slice(0, 3).map(member => member.avatar), // Get first 3 avatars
                name,
            };
        });

        return res.status(200).json({ success: true, groupChats: myChats });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const addGroupMember = async(req,res,next)=>{
    const {chatId , members} = req.body
    const chat = await Chat.findById(chatId)
    if (!chat) {
        return next(new ErrorHandler(`No Chat with Id ${chatId} exists`, 400))
    }
    if (!chat.groupChat) {
        return next(new ErrorHandler(`Not a group chat`, 400))
    }
    if (chat.creator.toString()!==req.user.toString()) {
        return next(new ErrorHandler(`Only admin can add members`, 403))
    }

    const newMembers = await Promise.all(
        members.map((i)=>User.findById(i))
    )

    const membersToAdd = newMembers.filter(member => 
        !chat.members.includes(member._id.toString())
    );
    
    if (membersToAdd.length === 0) {
        return next(new ErrorHandler(`All members are already in the group`, 400));
    }
    
    chat.members.push(...newMembers.map((i)=>i._id))
    await chat.save()

    return res.status(200).json({ success: true, group: chat });
}


export { createGroup, getMyChats , getGroupChats, addGroupMember }