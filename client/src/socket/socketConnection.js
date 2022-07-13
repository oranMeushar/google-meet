import { io } from 'socket.io-client';
import { store } from '../store';
import { addNewConnection, setConnections, setMessages, addNewMessage } from '../store/room';
import { prepareNewConnection, handleSignalingData, handleParticipantLeftRoom } from '../webRTC/webRTChandler';



let socket;


const connectSocketServer = (userDetails) =>{

    const {token} = userDetails;

    socket = io('http://localhost:5000', {
        auth:{
            token
        }
    });


    socket.on('new-friend-connected', (data) =>{
        prepareNewConnection(data.socketId, false);
        store.dispatch(addNewConnection(data));

        socket.emit('init-connection', data.socketId);
    })
    
    socket.on('init-connection', (data) =>{
        prepareNewConnection(data.socketId, true);
    })

    socket.on('all-connected-friends', (data) =>{
        store.dispatch(setConnections(data));
    })
    
    socket.on('connection-signal', (data) =>{
        handleSignalingData(data);
    })

    socket.on('user-left-room', (data) =>{
        const {socketId, userId} = data;
        handleParticipantLeftRoom(socketId, userId);
    })

    socket.on('public-messages-all', (messages) =>{
        store.dispatch(setMessages(messages));
    })

    socket.on('public-message', (message) =>{
        store.dispatch(addNewMessage(message));
    })

    socket.on('privte-message', (message) =>{
        store.dispatch(addNewMessage(message));
    })



    
}

export const signalPeerData = (signalData) =>{
    socket.emit('connection-signal', signalData);
}

export const exitRoom = (userId) =>{
    socket.emit('exit-room', userId);
}

export const sendPublicMessage = (message) =>{
    socket.emit('public-message', message);
}

export const sendPrivateMessage = (data) =>{
    socket.emit('private-message', data);
}

export const sendPublicFile = (data) =>{
    socket.emit('public-file', data);
}

export const sendPrivaeFile = (data) =>{
    socket.emit('private-file', data);
}

export default connectSocketServer;