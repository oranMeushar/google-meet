import React from 'react';
import {Container, ButtonsContainer} from './leaveRoomAlert.style';
import {  useLocation, useNavigate } from 'react-router-dom';

const LeaveRoomAlert = ({setIsClicked}) => {

    const handleLeaveButtonClicked = () =>{
        window.location = window.location.origin;
    }

    return (
        <Container>
            <p>Are you sure you want to leave this meeting?</p>
            <ButtonsContainer>
                <button onClick={handleLeaveButtonClicked}>Leave</button>
                <button onClick={() =>setIsClicked(false)}>Cancel</button>
            </ButtonsContainer>
        </Container>
    );
};

export default LeaveRoomAlert;