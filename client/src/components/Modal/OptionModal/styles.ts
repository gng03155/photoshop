import styled from "styled-components"

export const Modal = styled.div<{ x, y }>`
    /* display: none; */
    position: absolute;
    top : ${props => props.y}px;
    left : ${props => props.x}px;
    width : 450px;
    padding: 10px;
    background-color: #fff;
    border : 1px solid #ccc;
    z-index: 500;
    h3{
        margin-bottom: 20px;
    }
    p{
        margin-bottom: 10px;
    }
    ul{
        margin-bottom: 20px;
    }
    li{
        margin-bottom: 5px;
        height : 30px;
        line-height: 30px;
    }
    span{
        font-weight: 500;
    }
    label{
        display: inline-block;
        width : 20%;
    }
    select{
        width : 80%;
        height : 100%;
        border : 1px solid #ececec;
    }
    div{
        display: flex;
        justify-content: center;
        button{
            padding: 5px 5px;
            font-size: 14px;
            margin-right: 4px;
        }

    }


    div.bar{
        width : 100%;
        height: 1px;
        background-color: #ccc;
    }
`