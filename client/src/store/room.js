
import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  connections:[],
  localStream:null,
  remoteStreams:[],
  isScreenSharingActive:false,
  screenSharingStream:null,
  isCamera:true,
  selectedUser:null,
  messages:[]
}

const room = createSlice({
  name: 'room', 
  initialState,
  reducers: {
    addNewConnection: (state, action) => {
      state.connections.push(action.payload)
    },
    setLocalStream:(state, action) => {
        state.localStream = action.payload;
    },
    setConnections:(state, action) => {
        state.connections = action.payload;
    },
    clearRoom:(state, action) => {
        for (const key in initialState) {
            state[key] = initialState[key];
        }
    },
    setRemoteStreams:(state, action) => {
      state.remoteStreams = action.payload;
    },
    setIsScreenSharingActive:(state, action) => {
      state.isScreenSharingActive = action.payload;
    },
    setScreenSharingStream:(state, action) => {
      state.screenSharingStream = action.payload;
    },
    setIsCamera:(state, action) => {
      state.isCamera = action.payload;
    },
    setSelectedUser:(state, action) => {
      state.selectedUser = action.payload;
    },
    setMessages:(state, action) => {
      state.messages = action.payload;
    },
    addNewMessage:(state, action) => {
      state.messages.push(action.payload);
    },

  },

  extraReducers: {
  },
  
})

export const { 
  addNewConnection,
  setLocalStream,
  setConnections,
  clearRoom,
  setRemoteStreams,
  setIsScreenSharingActive,
  setScreenSharingStream,
  setIsCamera,
  setSelectedUser,
  setMessages,
  addNewMessage
} = room.actions

export default room.reducer