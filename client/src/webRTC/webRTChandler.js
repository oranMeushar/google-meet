import { store } from '../store';
import { setLocalStream, setRemoteStreams, setConnections } from '../store/room';
import Peer from 'simple-peer';
import { signalPeerData } from '../socket/socketConnection';

const peers = {};

export const createStream = async (cb) =>{
    const constraints = {
        audio:false,
        video:true
    }

    try{
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        store.dispatch(setLocalStream(stream));
        cb();

    }catch(e){
        console.log('An error occurred while creating stream: ', e);
    }
}

export const prepareNewConnection = (socketId, initiator) =>{
    const localStream = store.getState().room.localStream;

    peers[socketId] = new Peer({
        initiator,
        config:{
            iceServers:[
                {urls:'stun:stun.l.google.com:19302'}
            ]
        },
        stream: localStream
    });


    peers[socketId].on('signal', (data) =>{
        signalPeerData({signal: data, socketId});
    });

    peers[socketId].on('stream', remoteStream =>{

        remoteStream.socketId = socketId;
        const remoteStreams = store.getState().room.remoteStreams;
        const connections = store.getState().room.connections;

        const foundConnection = connections.find(connection => connection.socketId === socketId);
        remoteStream.userName = foundConnection.userName;
        store.dispatch(setRemoteStreams([...remoteStreams, remoteStream]));
    })
}

export const handleSignalingData = (data) =>{
    const {signal, socketId} = data;
    peers[socketId] && peers[socketId].signal(signal);
}

export const closeAllConnections = () =>{
    Object.entries(peers).forEach(peer =>{
        const socketIdConnection = peer[0];
        if(peers[socketIdConnection]){
            peers[socketIdConnection].destroy();
            delete peers[socketIdConnection];
        }
    })
}

export const handleParticipantLeftRoom = (socketId, userId) =>{

    if (peers[socketId]) {
        peers[socketId].destroy();
        delete peers[socketId];
    }
    
    const remoteStreams = store.getState().room.remoteStreams;
    const connections = store.getState().room.connections;

    const filteredRemoteStreams = remoteStreams.filter(stream => stream.socketId !== socketId);
    const filteredConnections = connections.filter(connection => connection.userId !== userId);
    
    store.dispatch(setRemoteStreams(filteredRemoteStreams));
    store.dispatch(setConnections(filteredConnections));
}

export const switchOutgoingTracks = (stream) => {
    for (let socket_id in peers) {
      for (let index in peers[socket_id].streams[0].getTracks()) {
        for (let index2 in stream.getTracks()) {
          if (peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind) {
              peers[socket_id].replaceTrack(
              peers[socket_id].streams[0].getTracks()[index],
              stream.getTracks()[index2],
              peers[socket_id].streams[0]
            );
            break;
          }
        }
      }
    }
  };