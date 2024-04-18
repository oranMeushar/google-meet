import styled from '@emotion/styled';

export const Container = styled.div`
    height:100vh;
`;
export const VideoContainer = styled.div`

`;

export const Video = styled.video`
    width: 100%;
`;


export const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap:3vmin;
    position: relative;
    background-color: #2EB475;
    padding: 1vmin;

    /* img:last-child{
        position:absolute;
        right:1vmin;
        bottom:50%;
        transform: translateY(50%);
    } */
`;

export const Image = styled.img`
    width:2.5vmin;
    height:2.5vmin;
    cursor: pointer;
    user-select: none;
`;
