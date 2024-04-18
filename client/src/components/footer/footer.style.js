import styled from '@emotion/styled';

export const Container = styled.div`
    height:10vh;
    border-top:2px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 4vmin;
`;

export const Image = styled.img`
    width:2.5vmin;
    height:2.5vmin;
    cursor: pointer;
    display: block;
    user-select: none;
`;
export const MeetingDetails = styled.div`
    display: flex;
    align-items: center;
    gap:2vmin;
    font-size: 2vmin;
    cursor: pointer;
`;
export const AppArrow = styled.div`
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-135deg);
`;
export const DownArrow = styled.div`
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
`;
export const MediaButtons = styled.div`
    display: flex;
    align-items: center;
    gap:3vmin;
    >p{
        font-size: 3vmin;
        color:white;
        background-color: #D72727;
        padding:0.5vmin 1vmin;
        border-radius: 0.5rem;
        cursor:pointer;

    }
`;
export const ShareScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:0.5vmin;
    font-size: 2vmin;

    p{
        color:${({isScreenSharingActive}) => isScreenSharingActive ? '#00cc00' : 'black'}
    }
`;    
export const ImageContainer = styled.div`
    padding: 1vmin;
    border:1px solid grey;
    border-radius: 50%;
    cursor: pointer;
`;

