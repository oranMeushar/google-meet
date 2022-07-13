const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {createServer} = require('http');

const registerSocketServer = require('./socket/socketServer');

const errorHandler = require('./controllers/error');
const roomRoute = require('./routes/room');

const app = express();
const httpServer = createServer(app);


dotenv.config({
    path:'./config/config.env'
});

app.use(express.json({limit:'50kb'}));
app.use('/public', express.static('public'));

app.use(cors());



app.use('/room', roomRoute);
app.use(errorHandler);

registerSocketServer(httpServer);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () =>{
   console.log(`Server starts listening on port ${PORT}`); 
})


