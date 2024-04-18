import styled from '@emotion/styled';

export const Container = styled.div`

`;

export const CircleContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    gap:0.2vmin;
    margin-right:1vmin;
    cursor:pointer;
    position:relative;
    transform: translateX(1.5rem);
`;

export const Circle = styled.div`
    width:0.8vmin;
    height: 0.8vmin;
    border-radius: 50%;
    background-color:rgb(112,112,112);
`;

export const RecorderButton = styled.div`
    position:absolute;
    background: #303740;
    width: fit-content;
    padding:0.5vmin 1vmin;
    border-radius: 0.6rem;
    right:-6vmin;
    font-size: 2.7vmin;
    text-align: center;
    color:#a5313c;
    user-select: none;
    visibility: ${({showRecord}) => showRecord ? 'visible' : 'hidden'};
    top:${({showRecord}) => showRecord ? '-12vmin' : '-6vmin'};
    transform:${({showRecord}) => showRecord ? 'scale(1)' : 'scale(0)'};
    transition:all 0.3s linear;
`;  
