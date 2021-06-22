import styled from 'styled-components';

export const Wrap = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    z-index: 500;
`

export const LoaderWrap = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
    top: 40vh;
    left: 50%;
    transform: translate(-50%,-50%);
    h2{
        margin-top: 50px;
        font-size : 20px;
        color : lightcyan;
    }
`