import React, {useState, useEffect, useRef} from 'react';
import {Container, Image, MeetingDetails, AppArrow, DownArrow, MediaButtons, ShareScreenContainer, ImageContainer} from './footer.style';
import audioOffImg from '../../resources/images/audioOff.png';
import audioOnImg from '../../resources/images/audioOn.png';
import cameraOnImg from '../../resources/images/cameraOn.png';
import cameraOffImg from '../../resources/images/cameraOff.png';
import shareScreenImg from '../../resources/images/screen-share.png';
import shareScreenOffImg from '../../resources/images/shareScreenOff.png'; 
import { useSelector, useDispatch } from 'react-redux';
import { setScreenSharingStream, setIsScreenSharingActive, setIsCamera } from '../../store/room';
import { switchOutgoingTracks } from '../../webRTC/webRTChandler';
import LeaveRoomAlert from '../leaveRoomAlert/leaveRoomAlert';
import Modal from '../modal/modal';
import Recorder from '../recorder/recorder';


const Footer = () => {

    const [isAudio, setIsAudio] = useState(true);
    const [isLeaveRoomClicked, setIsLeaveRoomClicked] = useState(false);


    const localStream = useSelector(state => state.room.localStream);
    const isScreenSharingActive = useSelector(state => state.room.isScreenSharingActive);
    const screenSharingStream = useSelector(state => state.room.screenSharingStream);
    const isCamera = useSelector(state => state.room.isCamera);
    const dispatch = useDispatch();

    const handleAudioClicked = () =>{
        setIsAudio(!isAudio);
        localStream && (localStream.getAudioTracks()[0].enabled = !isAudio);
    }

    const handleCameraClicked = () =>{
        dispatch(setIsCamera(!isCamera));
        localStream && (localStream.getVideoTracks()[0].enabled = !isCamera);
    }

    const handleScreenSharingClicked = async () =>{
        if(!isScreenSharingActive){
            let stream = null;
            try{
                stream = await navigator.mediaDevices.getDisplayMedia({audio:false, video:true});
            }
            catch(e){
                console.log(e);
            }
            if(stream){  
               dispatch(setScreenSharingStream(stream));
               dispatch(setIsScreenSharingActive(true));
               switchOutgoingTracks(stream);
            }
        }
        else{
           switchOutgoingTracks(localStream);
           screenSharingStream.getTracks().forEach(track =>track.stop());
           dispatch(setScreenSharingStream(null));
           dispatch(setIsScreenSharingActive(false));
        }
    }

    return (
        <Container>
            <Recorder/>
            <MediaButtons>
                <ImageContainer onClick={ handleAudioClicked}>
                    <Image src={isAudio ? audioOnImg : audioOffImg} />
                </ImageContainer>
                <p onClick={() =>setIsLeaveRoomClicked(true)}>Leave Meeting</p>
                <ImageContainer onClick={handleCameraClicked}>
                    <Image src={isCamera ? cameraOnImg : cameraOffImg} />
                </ImageContainer>
            </MediaButtons>
            <ShareScreenContainer isScreenSharingActive={isScreenSharingActive}>
                <ImageContainer onClick={handleScreenSharingClicked}>
                    <Image src={isScreenSharingActive ? shareScreenOffImg : shareScreenImg} />
                </ImageContainer>
                <p>{isScreenSharingActive ? 'Stop Presenting' : 'Present Now'}</p>
            </ShareScreenContainer>
            <Modal isClicked={isLeaveRoomClicked} setIsClicked={setIsLeaveRoomClicked}>
                <LeaveRoomAlert setIsClicked={setIsLeaveRoomClicked}/>
            </Modal>
        </Container>
    );
};

export default Footer;