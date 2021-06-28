import styled from 'styled-components';

export const MainWrap = styled.div`
    width: 1260px;
    padding: 0 40px 0 20px;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* ${props => props.theme.media.desktop}{
        width : 100%;
        
    } */

    @media (max-width : 1259px){
        width  : calc(100vw - (100vw - 100%));
    }

`
