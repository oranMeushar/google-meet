import React, {useEffect, useState} from 'react';
import {Button, Form, Title, SubmitButton} from './joinMeetingButton.style';
import Modal from '../../components/modal/modal';
import * as api from '../../utils/api';
import { toast} from 'react-toastify';
import connectSocketServer from '../../socket/socketConnection';
import { setUser } from '../../store/auth';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createStream } from '../../webRTC/webRTChandler';



const JoinMeetingButton = () => {

    const [isClicked, setIsClicked] = useState(false);
    const [meetingId, setMeetingId] = useState('');
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!isClicked) {
            setUserName('');
            setMeetingId('');
        }
    },[isClicked])

    const handleSuccessResponse = (data) =>{

        const successfulCallback = () =>{
            connectSocketServer(data);
            dispatch(setUser(data));
            navigate(`/${meetingId}`);
        };
        createStream(successfulCallback);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = 'room/joinMeeting';
        if(!meetingId.trim().length || !userName.trim().length) {
            toast.error('Please provide both meeting ID and user name');
            return
        }
        const body = {
            meetingId:String(meetingId).trim(),
            userName
        }


        const [result, data] = await api.post(endpoint, body);

        if(result.status === 200) {
            handleSuccessResponse(data);
            
        }

        else{
            toast.error(data.error.message);
            setIsClicked(false);
        }
    }


    return (
        <>
            <Button onClick={()=>setIsClicked(true)}>Join The Meeting</Button>
            <Modal isClicked={isClicked} setIsClicked={setIsClicked}>
                <Form onSubmit={handleSubmit}>
                    <Title>Join A Meeting</Title>
                    <label htmlFor='meeting-id'>
                        <p>Meeting ID</p>
                        <input type='text' id='meeting-id' value={meetingId} onChange={(e) => setMeetingId(e.target.value)} required/>
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

export default JoinMeetingButton;