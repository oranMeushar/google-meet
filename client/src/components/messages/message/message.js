import React from 'react';
import { useSelector } from 'react-redux';
import { Container,DetailsContainer } from './message.style';

const Message = ({message}) => {

    const userId = useSelector(state =>state.auth.userId);
    const isUrl = message.isUrl;

    const fileName = isUrl && message.content.split('-')[1];
    

    return (
        <Container className={message.senderId === userId ? 'right' : 'left'}>
            <DetailsContainer>
                <p>{message.senderName}</p>
                <p>{message.time}</p>
            </DetailsContainer>
            {isUrl ? <a href={message.content} target="_blank" rel="noreferrer" download>{fileName}</a> :
             <p>{message.content}</p>
            }
        </Container>
    );
};

export default Message;