import React from 'react';
import {Container, UserContainer, Image, EmptyMessage} from './usersList.style';
import personImg from '../../resources/images/other.jpg';
import {useSelector, useDispatch} from 'react-redux';
import { setSelectedUser } from '../../store/room';

const UsersList = ({isClicked, inputRef}) => {


    const connections = useSelector(state =>state.room.connections);
    const selectedUser = useSelector(state => state.room.selectedUser);
    const dispatch = useDispatch();

    const handleUserClicked = (connection) => {
        dispatch(setSelectedUser({...connection}));
        inputRef.current.focus();
    }

    return (
        <Container isClicked={isClicked}>
            {

                connections?.length ? 
                connections.map(connection =>{
                    return(
                        <UserContainer isSelected={selectedUser?.userId === connection.userId} onClick={()=>handleUserClicked(connection)}>
                            <Image src={personImg}/>
                            <p>{connection.userName}</p>
                        </UserContainer>
                    )
                }) : <EmptyMessage>You currently have no other connections</EmptyMessage>
            }
            
        </Container>
    );
};

export default UsersList;