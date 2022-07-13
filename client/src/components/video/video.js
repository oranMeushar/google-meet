import React, {useState, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import {Container, VideoEl} from './video.style';

const Video = ({stream, isLocalStream, userName, isScreenSharingActive}) => {


    const videoRef = useRef();
    
    const [isClicked, setIsClicked] = useState(false);
    
    useEffect(() =>{
        const video = videoRef.current;

        video && (video.srcObject = stream);

        video && video.play();
        
        // video.onloadmetadata = () => {
        //     video.play();
        // }
        
    },[stream]);


    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (!document.fullscreenElement) {
            video.requestFullscreen().catch(err => {
            console.log(err);
          });
        } 
        else {
          document.exitFullscreen();
        }
      }

    

    return (
        <Container 
            onDoubleClick={toggleFullscreen} 
            isScreenSharingActive={isScreenSharingActive} 
            isClicked={isClicked} 
        >
        <VideoEl ref={videoRef} autoplay={true}  muted={isLocalStream ? true : false}/> 
        <p>{userName}</p>
        </Container>
    );
};

export default Video;