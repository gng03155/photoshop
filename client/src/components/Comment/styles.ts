import styled from "styled-components"

export const CommentWrap = styled.div`
    width : 100%;
    h3{margin-bottom: 20px;}
    margin : 0 0 100px 0;

`

export const CommentWrite = styled.div`
    background-color: #fafafa;
    padding: 10px 5px;
    border-top : 1px solid #3b4890;
    border-bottom : 1px solid #3b4890;
    li{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    label{
        margin-right: 5px;
    }
    input{
        padding: 5px;
    }
    textarea{
        resize: none;
        outline: none;
        padding: 5px;
        width : 90%;
        height :50px;    
        appearance : none;
        border: 1px solid #ececec;
    }
    button{
        width : 8%;
        height :50px;
        margin-left: 1.99999%;
    }
`

export const CommentList = styled.div`
    border-top : 1px solid #ececec;
    /* border-left : 1px solid #ececec;
    border-right : 1px solid #ececec; */
`

export const CommentInfo = styled.div`
    background-color: #fafafa;
    border-bottom : 2px solid #ececec;
    &:last-child{
        border : 0;
    }
`

export const CommentTop = styled.div`
    display: flex;
    width : 100%;
    height: 40px;
    align-items: center;
    padding: 10px 20px;
    border-bottom : 1px solid #ececec;
    strong{
        width: 100px;
        color : #337ab7;
    }
    span{
        display: inline-block;
        width: 150px;
    }
    a{
        display: inline-block;
        padding: 5px 10px;
        margin-left: auto;
        background-color: #fff;
        border : 1px solid #ececec;
        text-align: center;
    }

`
export const CommentForm = styled.div`
    padding: 10px 20px;
`


