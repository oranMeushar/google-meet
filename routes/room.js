const express = require('express');
const router = express.Router();
const joinRoomController = require('../controllers/joinRoomController');
const fileUpload = require('express-fileupload');

router.post('/joinMeeting', joinRoomController.joinMeeting);
router.post('/startMeeting', joinRoomController.startMeeting);
router.post('/shareFile',fileUpload(), joinRoomController.shareFile);

module.exports = router;