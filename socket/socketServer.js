const {Server} = require('socket.io');
const isAuth = require('../middleware/isAuth');
const {
    connectHandler, 
    roomSignalindDataHandler, 
    roomInitConnectionHandler, 
    exitRoomHandler, 
    disconnectHandler, 
    publicMessageHandler, 
    privateMessageHandler,
    publicFileHandler,
    privateFileHandler
} = require('./handlers');


const registerSocketServer = (httpServer) =>{

    const io = new Server(httpServer, {
        cors:{
            origin: 'http://localhost:3000',
            method: ['GET', 'POST']
        }
    })

    io.use((socket, next) =>{
        isAuth(socket, next);
    })



    io.on('connect', (socket) =>{
        connectHandler(socket, io);  

        socket.on('disconnect', () =>{
            disconnectHandler(socket);
        });


        socket.on('connection-signal', (signalData) =>{
            roomSignalindDataHandler(socket, signalData);
        })

        socket.on('init-connection', (socketId) =>{
            roomInitConnectionHandler(socket, socketId);
        })

        socket.on('exit-room', (userId) =>{
            exitRoomHandler(socket, userId);
        })

        socket.on('public-message', (message) =>{
            publicMessageHandler(socket, message);
        })

        socket.on('private-message', (data) =>{
            privateMessageHandler(socket, data);
        })

        socket.on('public-file', (data) =>{
            publicFileHandler(socket, data);
        })

        socket.on('private-file', (data) =>{
            privateFileHandler(socket, data);
        })

    })

}


module.exports = registerSocketServer;