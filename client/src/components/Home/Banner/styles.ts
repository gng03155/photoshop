import styled from "styled-components"

export const ImgSlide = styled.div`
    
    position: absolute;
    top: 0;
    left: 0;
    width : 100%;
    min-height : 100vh;
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