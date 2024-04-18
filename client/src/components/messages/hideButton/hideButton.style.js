import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap:3px;
    position: absolute;
    right: 5px;
    top:10px;
    cursor: pointer;
    
    .line{
        width:20px;
        height:2px;
        background: #e60000;

    };

    .line1{
        transition: transform 0.5s linear;
        transform: ${({isClicked}) =>isClicked ? 'rotateZ(765deg) translate(4px,2.5px)' : 'rotateZ(0deg) translate(0,0)'};
        
    }
    .line2{
        transition: transform 0.5s linear;
        transform: ${({isClicked}) =>isClicked ? 'rotateZ(-765deg)' : 'rotateZ(0deg)'};
        /* transform: rotateZ(45deg); */
    }

`;