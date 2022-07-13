import styled from '@emotion/styled';

export const Container = styled.div`
    height:30vh;
    border-radius: 0.5rem;
    background-color:white;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 20px;
    };
    
    ::-webkit-scrollbar-thumb {
    background: #5f5b70;
    border-radius: 100px;
    background-clip: padding-box;
    border: 6px solid rgba(0, 0, 0, 0);
  }


    
    

    position:absolute;
    left:-40vmin;
    z-index: 50;
    width:40vmin;
    top:3vmin;
    transform-origin: right top;
    transition:transform 0.5s linear;
    transform:${({isClicked}) => isClicked ? 'scale(1)' : 'scale(0)'};
`;
export const UserContainer = styled.div`
    display: flex;;
    align-items: center;
    gap:5vmin;
    font-size: 3vmin;
    padding:1vmin;
    border-bottom:1px solid black;
    cursor:pointer;
    background-color:${({isSelected}) => isSelected && 'rgba(77,166,255,0.2)'};


`;
export const Image = styled.img`
    width: 5vmin;
    height: 5vmin;
    border-radius: 50%;
`;

export const EmptyMessage = styled.div`
    font-size: 2vmin;
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    text-align: center;
    
`;