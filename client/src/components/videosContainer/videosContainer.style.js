import styled from '@emotion/styled';

export const Container = styled.div`
padding:1vmin;
height:90vh;
display:grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-column-gap: 2vmin;
grid-row-gap: 2vmin;
background-color:black;
overflow-y: auto;
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