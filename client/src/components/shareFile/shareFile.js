import React, {useState, useEffect, useRef} from 'react';
import { sendPublicFile, sendPrivaeFile } from '../../socket/socketConnection';
import {Container, Header, FileInput, ImagePreview, ImageContainer, Image, SendFileButton} from './shareFile.style';
import  * as api from '../../utils/api';
import { useSelector } from 'react-redux';
import { toast} from 'react-toastify';

const ShareFile = ({isGroupChat, selectedUser}) => {

    const [fileInput, setFileInput] = useState('');
    const [previewURL, setPreviewURL] = useState('');
    const [isValidInput, setIsValidInput] = useState(false);

    const userDetails = useSelector(state => state.auth)

    const fileRef = useRef();


    useEffect(() => {
        if(fileInput){
            const fileReader = new FileReader();
            fileReader.onload = () =>{
                setPreviewURL(fileReader.result);
            }
            fileReader.readAsDataURL(fileInput);
            setIsValidInput(true);
        }
        else{
            setPreviewURL('');
            setIsValidInput(false);
        }
    },[fileInput])


    const handleSuccesResponse = () =>{
        const subMeetingId = userDetails.meetingId.split('-')[4];
        if (isGroupChat) {
            sendPublicFile(`${subMeetingId}-${fileInput.name}`);
        }
        else{
            const data = {
                receiver: selectedUser.socketId, 
                fileName:`${subMeetingId}-${fileInput.name}`
            };
            sendPrivaeFile(data);
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFileInput(e.target.files[0]);
        }
        else{
            setFileInput('');
        }
    }

    const handleSubmitFile = async(e) => {
        e.preventDefault();
        const endPoint = 'room/shareFile';
        const subMeetingId = userDetails.meetingId.split('-')[4];
        const formData = new FormData();
        
        formData.set('image', fileInput);
        formData.set('meetingId', subMeetingId);

        const [result, data] = await api.postWithFile(endPoint, formData);
        if (result.status === 200) {
            handleSuccesResponse();
        }
        else{
            toast.error(data.message);
        }
    }
    
    return (
        <Container>
            <Header>{isGroupChat ? 'Share file with everyone' : selectedUser ? `Share file with ${selectedUser.userName}` :'Please select private chat or group chat'}</Header>
            <FileInput ref={fileRef} onChange={handleFileChange} type='file' accept = '.jpg,.png,.jpeg,.pdf,.doc,.docx' name='image'/>

            <ImagePreview >
                <ImageContainer>
                    { previewURL && <Image src={previewURL} alt='Preivew'/>}
                </ImageContainer>
                <button type='button'  onClick={()=>fileRef.current.click()}>Pick a file/image</button>
            </ImagePreview>

            {
                isValidInput && 
                <SendFileButton 
                    disabled={!isGroupChat && !selectedUser }
                    type='button' onClick={handleSubmitFile} 
                    isValidInput={isValidInput}>
                    Send File
                </SendFileButton>
            }
        </Container>
    );
};

export default ShareFile;