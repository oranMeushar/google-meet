import React, {useState, useRef} from 'react';
import {Container, ImagesContainer, Image, MessagesContainer, MessageWrapper, SendButton, FooterContainer, PeopleImgeContainer, FileImage} from './messages.style';
import peopleImg from '../../resources/images/two_users.png';
import messagesImg from '../../resources/images/comment.png';
import sendButtonImg from '../../resources/images/send-button.png';
import HideButton from './hideButton/hideButton';
import UsersList from '../usersList/usersList';
import ClickOutHandler from 'react-onclickout';
import { useSelector } from 'react-redux';
import { sendPublicMessage, sendPrivateMessage } from '../../socket/socketConnection';
import { messagesSelector } from '../../store/selectors';
import Message from './message/message';
import attachFileImg from '../../resources/images/attachment.png';
import ShareFile from '../shareFile/shareFile';


const Messages = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [isGroupChat, setIsGroupChat] = useState(true);
    const [isUsersList, setIsUsersList] = useState(false);
    const [isAttachFileClicked, setIsAttachFileClicked] = useState(false);
    const [message, setMessage] = useState('');
    
    
    const selectedUser = useSelector(state =>state.room.selectedUser);
    const connections = useSelector(state =>state.room.connections);
    const messages = useSelector(messagesSelector(isGroupChat));
    const inputRef = useRef();

    const handleButtonClicked = () =>{
        setIsClicked(!isClicked);
    }


    const handleSubmit = (e) =>{
        e.preventDefault();

        if (message.length) {
            if (isGroupChat) {
                sendPublicMessage(message);
            }
    
            else{
                if(selectedUser){
                    sendPrivateMessage({message, receiver:selectedUser.socketId});
                }
            }
    
            setMessage('');
            inputRef.current.focus();
        }
        
        
    };

    const handleGroupedImgClicked = () =>{ 
        setIsUsersList(!isUsersList);
        setIsGroupChat(false);
        inputRef.current.focus();

    }

    const handlePeopleImgClicked = () =>{
        setIsGroupChat(true)
        inputRef.current.focus();
    }



    return (
        <Container isClicked={isClicked}>
            <HideButton handleButtonClicked={handleButtonClicked} isClicked={isClicked}/>
            <ImagesContainer isClicked={isClicked}>
                    <PeopleImgeContainer data-length={`(${connections.length})`}>
                        <ClickOutHandler onClickOut={() => setIsUsersList(false)}>
                            <Image isClicked={!isGroupChat} src={peopleImg} onClick={handleGroupedImgClicked}/>
                        </ClickOutHandler>
                        <UsersList isClicked={isUsersList} inputRef={inputRef}/>
                    </PeopleImgeContainer>
                <Image isClicked={isGroupChat} src={messagesImg} onClick={handlePeopleImgClicked}/>
            </ImagesContainer>
            <MessageWrapper isClicked={isClicked}>
                <MessagesContainer>
                    {messages?.map((message)=> <Message key={message.id} message={message}/>)}
                </MessagesContainer>
                <FooterContainer onSubmit={handleSubmit}>
                    <Image src={attachFileImg} isClicked={isAttachFileClicked}  onClick={() =>setIsAttachFileClicked(!isAttachFileClicked)}/>
                    <input 
                        type='text' 
                        placeholder={isGroupChat ? 'Send a message to everyone' : selectedUser && `Send private message to ${selectedUser.userName}`}
                        onChange={(e)=> setMessage(e.target.value)}
                        value={message}
                        ref={inputRef}
                        disabled={!selectedUser && !isGroupChat}
                    />
                    <SendButton onClick={handleSubmit} src={sendButtonImg}/>
                </FooterContainer>
            </MessageWrapper>
            {isAttachFileClicked && <ShareFile isGroupChat={isGroupChat} selectedUser={selectedUser} setIsAttachFileClicked={setIsAttachFileClicked}/>}
        </Container>
    );
};

export default Messages;