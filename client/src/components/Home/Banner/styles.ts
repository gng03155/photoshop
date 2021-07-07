import styled from "styled-components"


export const Wrap = styled.div`
    position: relative;
`

export const ImgSlide = styled.div`
    
    position: absolute;
    top: -100px;
    left: 0;
    width : 100vw;
    height : 100vh;
    max-height : 100vh;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    z-index: -1;
    img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: 0.7s linear;

    }

    img.active{
        opacity: 1;
    }

`