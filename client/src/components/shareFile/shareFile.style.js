import styled from '@emotion/styled';

export const Container = styled.form`
    position: fixed;
    top:50%;
    left:28%;
    transform:translateY(-55%);
    height:70vh;
    width: 30vw;
    background-color:white;
    padding:2vmin;
    border-radius: 0.6rem;
    display: flex;;
    flex-direction: column;
    align-items: center;
    gap:10vmin;
`;

export const Header = styled.div`
    font-size: 4vmin;
    text-align: center;
`;

export const FileInput = styled.input`
    display: none;
`;
export const ImagePreview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:5vmin;
    button{
        background: none;
        outline:none;
        border:1px solid black;
        padding:0.5vmin 1vmin;
        border-radius: 0.6rem;
        cursor:pointer;
        font-size: 2.3vmin;
        
    }


`;
export const ImageContainer = styled.div`
    border:1px solid black;
    width:25vmin;
    height:25vmin;
`;
export const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

export const SendFileButton = styled.button`
    background: ${({isValidInput}) =>isValidInput ? 'green' : 'red'};
    outline:none;
    border:1px solid black;
    padding:0.5vmin 1vmin;
    border-radius: 0.6rem;
    cursor:pointer;
    font-size: 2.3vmin; 
    :disabled{
        background-color:red;
        cursor:not-allowed
    }
`;

