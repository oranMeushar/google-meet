import styled from '@emotion/styled';

export const Container = styled.div`
    border:${({isScreenSharingActive}) => isScreenSharingActive && '3px solid #00cc00'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:1.5vmin;
    background:#1e001e;
    p{
        color:white;
        font-size: 3.5vmin;
    }
`;

export const VideoEl = styled.video`
    width:40vmin;    
    height:40vmin;
    :hover{
        cursor: pointer;
    }
`;