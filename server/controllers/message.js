import { Message } from "../models/message.js"

const getMessages = async (req, res, next) => {
    const { id } = req.params
    const messages = await Message.find({ chat: id }).populate('sender','username avatar')
    const transformed = messages.map(({ sender, _id, createdAt, content, attachments }) => ({
        _id, createdAt, content, attachments, sender: {
            _id : sender._id,
            username : sender.username,
            avatar : sender.avatar.url
        }
    }))
    res.status(200).json({ success: true, messages : transformed })
}

export { getMessages }