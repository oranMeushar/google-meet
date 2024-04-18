const fs = require('fs');
const path = require('path');
const {
     addNewUser,
     getFriendsInAMeeting, 
     removeUser, addNewMessage, 
     getMessages, 
     removeMeetingMessages
    } = require('./socketStore');


const removeMeetingFiles = async (socket) =>{
    const files = await fs.promises.readdir( path.join(__dirname, '../', 'public') );
    const meetingId = socket.user.meetingId.split('-')[4];

    files.forEach(file => {
        const fileStartOfText = file.split('-')[0];

        if (fileStartOfText === meetingId) {
            const filePath = path.join(__dirname, '../', 'public', file);
            fs.unlinkSync(filePath);
        }
    })
}


const connectHandler = (socket, io) =>{
    addNewUser(socket);
    const friendsInAMeeting = getFriendsInAMeeting(socket);


    if (friendsInAMeeting.length) {
        friendsInAMeeting.forEach(friend =>{
            const {socketId} = friend;

            io.to(socketId).emit('new-friend-connected', {
                socketId: socket.id,
                userName:socket.user.userName,
                meetingId:socket.user.meetingId,
                userId:socket.user.userId
            })
        })
        socket.emit('all-connected-friends', friendsInAMeeting);
    }

    const publicMessages = getMessages(socket.user.meetingId);

    socket.emit('public-messages-all', publicMessages);

}


const roomSignalindDataHandler = (socket, signalData) =>{
    const {signal, socketId} = signalData;
    socket.to(socketId).emit('connection-signal', {signal, socketId:socket.id})
}
const roomInitConnectionHandler = (socket, socketId) =>{
    socket.to(socketId).emit('init-connection', {socketId: socket.id})
}

const exitRoomHandler = (socket, userId) =>{
    removeUser(userId);
    const friendsInAMeeting = getFriendsInAMeeting(socket);

    friendsInAMeeting.forEach(user =>{
        socket.to(user.socketId).emit('user-left-room', {socketId: socket.id, userId});
    })

    if(!friendsInAMeeting.length){
        removeMeetingMessages(socket);
        removeMeetingFiles(socket);
    }
}


const publicMessageHandler = (socket, message) =>{
    const newMessage = addNewMessage(socket, message, null);
    const friendsInAMeeting = getFriendsInAMeeting(socket);

    friendsInAMeeting.forEach(friend =>{
        const {socketId} = friend;

        socket.to(socketId).emit('public-message', newMessage)
    })

    socket.emit('public-message', newMessage); 
}

const privateMessageHandler = (socket, data) =>{
    const {message, receiver} = data;
    const newMessage = addNewMessage(socket, message, receiver);
   
    socket.to(receiver).emit('privte-message', newMessage);
    socket.emit('privte-message', newMessage);
}

const disconnectHandler = (socket) =>{
   exitRoomHandler(socket, socket.user.userId);
}


const publicFileHandler = (socket, data) =>{
    const path = `http://localhost:5000/public/${data}`;
    const newMessage = addNewMessage(socket, path, null);
    newMessage.isUrl = true;
    const friendsInAMeeting = getFriendsInAMeeting(socket);

    //TODO:CHANGE PATH
    friendsInAMeeting.forEach(friend =>{
        const {socketId} = friend;
        socket.to(socketId).emit('public-message', newMessage)
    })
    socket.emit('public-message', newMessage);
 }


const privateFileHandler = (socket, data) =>{

    const {receiver, fileName} = data;
    const path = `http://localhost:5000/public/${fileName}`;
    const newMessage = addNewMessage(socket, path, receiver);
    newMessage.isUrl = true;
    socket.to(receiver).emit('privte-message', newMessage);
    socket.emit('privte-message', newMessage);
}

module.exports = {
    connectHandler,
    roomSignalindDataHandler,
    roomInitConnectionHandler,
    exitRoomHandler,
    disconnectHandler,
    publicMessageHandler,
    privateMessageHandler,
    publicFileHandler,
    privateFileHandler
} 