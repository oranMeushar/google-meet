const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const socketStore = require('../socket/socketStore');
const fs = require('fs');
const path = require('path');


const generateToken = (meetingId, userName, userId) =>{
    const jwtOptions = {
        expiresIn:process.env.JWT_EXPIRE  * 60 * 60  //* 4 hour
    };
    return jwt.sign({meetingId, userName, userId}, process.env.JWT_SECRET, jwtOptions)
}

const joinMeeting = catchAsync(async(req, res, next) =>{

    const {meetingId, userName} = req.body;

    const isMeetingExist = socketStore.isMeetingExist(meetingId);
    
    if(!isMeetingExist){
        return next(new AppError('Meeting was not found', 'Failed', 404));
    }
    
    const userId = uuid.v4();
    const token = generateToken(meetingId, userName, userId);

    res.status(200).json({
        status:'Success',
        token,
        userName,
        meetingId,
        userId
    })
});

const startMeeting = catchAsync(async(req, res, next) =>{

    const {meetingId, userName} = req.body;

    const userId = uuid.v4();
    const token = generateToken(meetingId, userName, userId);


    res.status(200).json({
        status:'Success',
        token,
        userName,
        meetingId,
        userId
    })
});



const shareFile = catchAsync(async(req, res, next) =>{
    const file = req.files.image;
    const exists = fs.existsSync(path.join(__dirname, '../public'))
    const {meetingId} = req.body;
    
    if(exists) {
      file.mv(path.join(__dirname, '../public', `${meetingId}-${file.name}`), function (error) {
        if (error) {
            console.log(error);
            return next(new AppError('Failed to upload file', 'Failed', 400));
        } else {
            res.status(200).json({ status:'Success'})
        }
      });
    }
});


module.exports = {
    joinMeeting,
    startMeeting,
    shareFile
}