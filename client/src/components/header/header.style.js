import styled from '@emotion/styled';

export const Container = styled.div`
    border-bottom:1px solid black;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 1.8vmin;
`;

export const Image = styled.img`
    width:8vmin;
    height:6vmin;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    
    gap:2vmin;


    button{
        outline:none;
        font-size: 2vmin;
        padding:1vmin 0.5vmin;
        border-radius: 0.6rem;
        cursor: pointer;
    }

    .start-meeting{
        background-color:lightblue;
    }

    .join-meeting{
        background-color:white;
    }
`;


export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 3vmin;
    gap:2vmin;
`;


