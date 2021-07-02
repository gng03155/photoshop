import styled from "styled-components"

export const Title = styled.div`

`

export const Progress = styled.div<{ state: string }>`
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    div{
        position: relative;
        width : 33.33333333%;
        height : 40px;
        line-height: 40px;
        background : #ebebeb;
        text-align: center;
    }
    div:nth-child(1){
        background : ${(props) => (props.state === "agree" ? ' #fafafa' : '#ebebeb')};
    }
    div:nth-child(2){
        background : ${(props) => (props.state === "join" ? ' #fafafa' : '#ebebeb')};
    }
    div:nth-child(3){
        background : ${(props) => (props.state === "complete" ? ' #fafafa' : '#ebebeb')};
    }

    div:nth-child(1)::after , div:nth-child(2)::after{
        position: absolute;
        top: 0; right: 0;
        content: "";
        width: 1px;
        height: 40px;
        background : #ccc;
        z-index: 10;
    }

    span{
        font-size: 16px;
    }

    span.active{
        font-weight: bold;
    }
`