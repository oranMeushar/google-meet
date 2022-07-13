import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Video from '../video/video';
import {Container} from './videosContainer.style';
import Messages from '../messages/messages';

const VideosContainer = () => {

    const localStream = useSelector(state => state.room.localStream);
    const screenSharingStream = useSelector(state => state.room.screenSharingStream);
    const remoteStreams = useSelector(state => state.room.remoteStreams);
    const userName = useSelector(state => state.auth.userName);
    const isScreenSharingActive = useSelector(state => state.room.isScreenSharingActive);

    return (
        <Container>
            <Video 
                stream={screenSharingStream ? screenSharingStream : localStream} 
                isLocalStream 
                userName={userName}
                isScreenSharingActive={isScreenSharingActive}
            />
            {!!remoteStreams.length && remoteStreams.map(remoteStream =>{
                return <Video stream={remoteStream} userName={remoteStream.userName}/>
            })}
            <Messages/>
        </Container>
    );
};

export default VideosContainer;