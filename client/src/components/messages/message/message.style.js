import styled from '@emotion/styled';

export const Container = styled.div`
    font-size: 2.5vmin;
    background-color:#dedede;
    width: 30vmin;
    padding:0.2vmin 2vmin;
    display: flex;
    flex-direction:column;
    word-break: break-word;
    color:#5f5f5f;
    border-radius: 0.5rem;
    
    
`;

export const DetailsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:black;

    p:nth-of-type(1){
        font-weight: 600;
        font-size: 2vmin;
    }
    p:nth-of-type(2){
        font-size: 1.5vmin;
    }
`;