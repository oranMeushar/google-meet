import styled from '@emotion/styled';

export const Container = styled.div`
    position:fixed;
    background-color:white;
    min-height:4.4vmin;
    right:0;
    transform-origin: right center;
    padding-top:0.8vmin;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    
    
    width:${({isClicked}) =>isClicked ? '50vmin' :'4.5vmin'};
    height:${({isClicked}) =>isClicked ? '89vh' :'0'};
    transition:width 0.5s linear, height 0.5s linear 0.5s;
`;
 
export const Image = styled.img`
    width:4.2vmin;
    height:4.2vmin;
    display:block;
    padding:0.5vmin;
    background-color: ${({isClicked}) => isClicked && 'rgba(77,166,255,0.2)'};
    border-radius: 50%;
    cursor: pointer;
`;

export const ImagesContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-around; 
  width:${({isClicked}) =>isClicked ? '80%' :'0'};
  opacity:${({isClicked}) =>isClicked ? '1' :'0'};
  transition:width 0.5s linear, opacity 0.3s linear;
  pointer-events: ${({isClicked}) =>!isClicked && 'none'};;
`;


export const MessageWrapper = styled.div`
  height:93%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: opacity 0.3s linear 0.5s;
  opacity:${({isClicked}) => isClicked ? 1 : 0};
  pointer-events: ${({isClicked}) => !isClicked && 'none'};
`;

export const MessagesContainer = styled.div`
    padding-bottom: 1vmin;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #f2f2f2;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap:2vmin;
    padding:0.8vmin;
    div.left{
        align-self: flex-start;
    }

    ::-webkit-scrollbar {
        width: 20px;
    }
    
    ::-webkit-scrollbar-thumb {
    background: #5f5b70;
    border-radius: 100px;
    background-clip: padding-box;
    border: 6px solid rgba(0, 0, 0, 0);
  }

  
`;
export const FooterContainer = styled.form`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #f2f2f2;
    padding:1vmin;
    gap:1vmin;
    input{
        width: 100%;
        border:none;
        outline: none;
        font-size: 2vmin;
        padding: 0.5vmin;
        letter-spacing: 0.15vmin;
        :disabled{
            background: rgba(223,151,151, 0.4);
        }
    }
`;

export const SendButton = styled.img`
    width:2vmin;
    height:2vmin;
    cursor: pointer;
`;

export const PeopleImgeContainer = styled.div`
    position:relative;

    ::after{
        content: attr(data-length);
        position:absolute;
        top:-0.5vmin;
        right:-2vmin;
        font-size:2vmin
    }

`;