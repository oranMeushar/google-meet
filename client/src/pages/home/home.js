import React, {useState, useEffect, useRef} from 'react';
import {Container} from './home.style';
import Header from '../../components/header/header';
import HomeMainSection from './homeMainSection/homeMainSection';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../store/auth';
import { clearRoom, setLocalStream } from '../../store/room';
import { closeAllConnections } from '../../webRTC/webRTChandler';
import { exitRoom } from '../../socket/socketConnection';





const Home = () => {
  const localStream = useSelector(state =>state.room.localStream);
  const screenSharingStream = useSelector(state =>state.room.screenSharingStream);
  const user = useSelector(state => state.auth);

  const dispatch = useDispatch();


  useEffect(() => {

    if(user?.userId){
      localStream && localStream.getTracks().forEach(track => track.stop());
      screenSharingStream && screenSharingStream.getTracks().forEach(track => track.stop());
      
      dispatch(clearUser());
      dispatch(clearRoom());
      closeAllConnections();
      exitRoom(user.userId);
    }
  },[])

    return (
        <Container>
          <Header/>
          <HomeMainSection/>
        </Container>
    );
};

export default Home;