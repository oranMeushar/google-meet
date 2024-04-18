import React, {useState} from 'react';
import {Container, Image, ButtonsContainer, LogoContainer} from './header.style';
import googleMeetImg from '../../resources/images/googlemeet.png';
import Modal from '../../components/modal/modal';
import JoinMeetingButton from '../joinMeetingButton/joinMeetingButton'
import StartMeetingButton from '../startMeetingButton/startMeetingButton';
import * as api from '../../utils/api';
const Header = () => {


    return (
        <Container>
            <LogoContainer>
                <Image src={googleMeetImg}/>
                <p>Google Meet</p> 
            </LogoContainer>
            <ButtonsContainer>
                <JoinMeetingButton/>
                <StartMeetingButton/>
            </ButtonsContainer>
        </Container>
    );
};

export default Header;