const AppError = require('../utils/appError');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');

const isAuth = async(socket, next) =>{

    const {token} = socket.handshake.auth;

    if(!token){
        return next(new AppError('Invalid credentials', 'Failed', 401));
    }
  

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); 

    if(!decoded){
        return next(new AppError('Invalid token', 'Failed', 401));
    }

    socket.user = decoded
    next();

}

module.exports = isAuth;