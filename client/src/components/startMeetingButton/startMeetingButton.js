import React, {useEffect, useState} from 'react';
import {Button, Form, Title, SubmitButton} from './startMeetingButton.style';
import Modal from '../../components/modal/modal';
import * as api from '../../utils/api';
import { toast} from 'react-toastify';
import { v4 } from 'uuid';
import {useNavigate} from 'react-router-dom';
import { setUser } from '../../store/auth';
import { useDispatch } from 'react-redux';
import connectSocketServer from '../../socket/socketConnection';
import { createStream } from '../../webRTC/webRTChandler';


const StartMeetingButton = () => {

    const [isClicked, setIsClicked] = useState(false);
    const [userName, setUserName] = useState('');
    const [meetingId, setMeetingId] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        if(isClicked) {
            setMeetingId(v4());
        }

        else{
            setUserName('');
            setMeetingId(0);
        }
    },[isClicked])


    const handleSuccessResponse = (data) =>{
        const successfulCallback = () =>{
            connectSocketServer(data);
            dispatch(setUser(data));
            navigate(`/${meetingId}`)
        };
        createStream(successfulCallback);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = 'room/startMeeting';
        if(!userName.trim().length) {
            toast.error('Please provide a user name');
            return
        }
        const body = {
            userName,
            meetingId:String(meetingId).trim()
        }
        
        const [result, data] = await api.post(endpoint, body);
        
        if(result.status === 200) {
            handleSuccessResponse(data);
        }

        else{
            toast.error('An error occurred while trying to create a new meeting')
        }
    }

    return (
        <>
            <Button onClick={()=>setIsClicked(true)}>Start a Meeting</Button>
            <Modal isClicked={isClicked} setIsClicked={setIsClicked}>
                <Form onSubmit={handleSubmit}>
                    <Title>Start A Meeting</Title>
                    <label htmlFor='meeting-id'>
                        <p>Meeting ID: {meetingId}</p>
                    </label>
                    <label htmlFor='user-name'>
                        <p>User Name</p>
                        <input type='text' id='user-name' value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                    </label>
                    <SubmitButton onClick = {handleSubmit}>Send</SubmitButton>
                </Form>
            </Modal>

        </>
    );
};

export default StartMeetingButton;