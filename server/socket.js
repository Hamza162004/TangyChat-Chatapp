import { Server } from "socket.io";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/event.js";
import { v4 as uuid } from 'uuid'
import { Message } from "./models/message.js";
import { isSocketAuthenticated } from "./middlewares/auth.js";
import { User } from "./models/user.js";

const usersocketIDs = new Map()

const getSockets = (users) => {
    const sockets = users.map((user) => usersocketIDs.get(user._id.toString()))
    return sockets
}

const initializeSocket = (server) => {
    const io = new Server(server, {});

    io.use(isSocketAuthenticated)

    io.on('connection', async (socket) => {
        const user = await User.findById(socket.user)
        usersocketIDs.set(user._id.toString(), socket.id)
        console.log(usersocketIDs);

        socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {

            const messageRealTime = {
                chat: chatId,
                _id: uuid(), //temp id using uuid
                sender: {
                    _id: user._id,
                    username: user.username
                },
                content: message,
                createdAt: new Date().toISOString()
            }

            const messageForDB = {
                chat: chatId,
                sender: user._id,
                content: message
            }

            const membersSocket = getSockets(members)
            io.to(membersSocket).emit(NEW_MESSAGE, {
                chatId,
                message: messageRealTime
            })
            io.to(membersSocket).emit(NEW_MESSAGE_ALERT,{chatId})

            // await Message.create(messageForDB)
        })

        socket.on('disconnect', () => {
            usersocketIDs.delete(user._id.toString())
            console.log('User disconnected')
        })
    });
}

export { initializeSocket }