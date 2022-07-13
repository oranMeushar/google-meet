import React, {useState} from 'react';
import {Container} from './hideButton.style';
const HideButton = ({handleButtonClicked, isClicked}) => {

    return (
        <Container isClicked={isClicked} onClick={handleButtonClicked}>
            <div className='line line1'/>
            <div className='line line2'/>
        </Container>
    );
};

export default HideButton;