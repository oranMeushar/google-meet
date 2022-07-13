import React from 'react';
import {Container} from './room.style';
import VideosContainer from '../../components/videosContainer/videosContainer';
import Footer from '../../components/footer/footer';

const Room = () => {
    return (
        <Container>
            <VideosContainer/>
            <Footer/>
        </Container>
    );
};

export default Room;