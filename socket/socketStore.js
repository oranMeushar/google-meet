const moment = require('moment-timezone');
const uuid = require('uuid');


let connectedUsers = [];
let messages = [];






const addNewUser = (socket) => {
    const {meetingId, userName, userId} = socket.user;
    connectedUsers.push({
        meetingId,
        userName,
        userId,
        socketId:socket.id
    })
}

const getFriendsInAMeeting = (socket) => {
    return connectedUsers.filter(user => (user.meetingId === socket.user.meetingId && user.userId !== socket.user.userId))
}

const isMeetingExist = (meetingId) =>{
    return connectedUsers.find(user => (user.meetingId === meetingId));
}

const removeUser = (userId) =>{
    const updatedConnectedUsers = connectedUsers.filter(user => user.userId !== userId);
    connectedUsers = updatedConnectedUsers;
    return connectedUsers;
}

const addNewMessage = (socket, content, receiverSocketId = null) =>{

    const message = {
        id:uuid.v4(),
        meetingId:socket.user.meetingId,
        senderId:socket.user.userId,
        senderName:socket.user.userName,
        receiver: receiverSocketId ?? 'all',
        content,
        time:moment().format('HH:mm')
    };
    messages.push(message);
    return message;
}

const getMessages = (meetingId, receiver = 'all') =>{
    return messages.filter(message =>message.meetingId === meetingId && message.receiver === receiver);
}

const removeMeetingMessages = (socket) =>{
    messages = messages.filter(message => message.meetingId !== socket.user.meetingId);
}

module.exports = {
    addNewUser,
    getFriendsInAMeeting,
    isMeetingExist,
    removeUser,
    addNewMessage,
    getMessages,
    removeMeetingMessages
}

