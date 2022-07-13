import {createSelector} from '@reduxjs/toolkit';

const roomSelector = (state) => {
    return state.room;
}



export const selectedUserSelector = createSelector(
    [roomSelector], (room) => {
        return room?.selectedUser;
    }
);

export const messagesSelector = (isGroupChat) => createSelector(
    [roomSelector, selectedUserSelector], (room, selectedUser) => {
        let result = [];

        const {messages} = room;
        if(isGroupChat) {
            result = messages.filter(message => message.receiver === 'all')
        }

        else{
            if(selectedUser){
                const {socketId, userId} = selectedUser;

                result = messages.filter(message => {
                    
                    return ((message.senderId === userId && message.receiver !== 'all') || message.receiver === socketId) 
                })
            }
        }


        return result;
    }
);