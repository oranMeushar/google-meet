import React, {useState, useRef} from 'react';
import {Container, CircleContainer, Circle, RecorderButton} from './recorder.style';

const Recorder = () => {

    const [showRecord, setShowRecord] = useState(false);
    const [isRecordStart, setIsRecordStart] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [stream, setStream] = useState(null);
    const [chunks, setChunks] = useState([]);


    const anchorRef = useRef();

    const startRecording = async(e) =>{
        e.stopPropagation();

        const screenStream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
        const i_stream = new MediaStream(screenStream);
        const i_mediaRecorder = new MediaRecorder(i_stream);
        let i_chunks = [];
        i_mediaRecorder.start();

        i_mediaRecorder.ondataavailable = (e) => {
            i_chunks.push(e.data);
        }
        setStream(i_stream); 
        setMediaRecorder(i_mediaRecorder);
        setIsRecordStart(true);
        setChunks(i_chunks);
        
    }

    const stopRecording = async(e) =>{
        e.stopPropagation();

        const anchorEl = anchorRef.current;        
        const {state} = mediaRecorder;
        if(state === 'recording'){
            mediaRecorder.stop();
            mediaRecorder.onstop = (e) => {
                const recordingName = prompt('Enter a name for your record');
    
                stream.getTracks().forEach(track => track.stop());
                const blob = new Blob(chunks, {
                    type:'video/webm'
                });
    
                const url = window.URL.createObjectURL(blob);
                
                anchorEl.href = url;
                anchorEl.download = recordingName + '.webm';
                anchorEl.click();
            }
        }
        
        setStream(null); 
        setMediaRecorder(null);
        setChunks([]);
        setIsRecordStart(false);
    }
    
    return (
        <Container>
            <CircleContainer onClick={() =>setShowRecord(!showRecord)} >
                <Circle/>
                <Circle/>
                <Circle/>
                <RecorderButton onClick = {isRecordStart ? stopRecording: startRecording} showRecord={showRecord}>{isRecordStart ? 'Stop recording' :'Start recording' }</RecorderButton>
            </CircleContainer>
            <a ref={anchorRef} style={{display:'none'}}></a>
        </Container>
    );
};

export default Recorder;