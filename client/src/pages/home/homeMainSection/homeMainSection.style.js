import styled from '@emotion/styled';

export const Container = styled.div`
  display: grid ;
  grid-template-columns: 1fr 1fr;
  padding:4vmin 3vmin 0 6vmin;
  grid-column-gap: 2vmin;

`;
export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 4vmin;

`;
export const MainText = styled.div`
    font-size: 6.5vmin;
    margin-bottom: 4vmin;
    width: 90%;

`;
export const SubText = styled.div`
    font-size: 3vmin;
    margin-bottom: 4vmin;
    width: 80%;


`;
export const Form = styled.form`
    display: flex;
    align-items: center;
    gap:2vmin;
    button{
        outline: none;
        border:1px solid black;
        background-color:white;
        padding:0.5vmin 1vmin;
        font-size: 2vmin;
        cursor:pointer;
    }
    input{
        outline:none;
        font-size: 2.55vmin;
    }
`;
export const RightContainer = styled.div`

`;
export const Image = styled.img`
    width:80;
    height:60vmin;
`;

