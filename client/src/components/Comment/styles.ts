import styled from "styled-components"

export const CommentWrap = styled.div`
    width : 100%;
    h3{
        padding: 20px 0 20px 20px ;
        background-color: #f1f1f1;
        border : 1px solid #ccc;
        border-bottom : 0;
    }
    margin : 0px 0 100px 0;

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
        border: 1px solid #dfdfdf;
    }
    button{
        width : 8%;
        height :50px;
        margin-left: 1.99999%;
    }

    ${props => props.theme.media.mobile}{
        textarea{
            width : 80%;
        }
        button{
            width : 16%;
        }
    }
`

export const CommentList = styled.div`
    border-top : 1px solid #dfdfdf;
`

export const CommentInfo = styled.div`
    background-color: #fafafa;
    border-bottom : 2px solid #dfdfdf;
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
    border-bottom : 1px solid #dfdfdf;
    strong{
        width: 100px;
        color : #337ab7;
    }
    span{
        display: inline-block;
        color : #999;
    }
    a{
        display: inline-block;
        padding: 5px 10px;
        margin-left: auto;
        background-color: #fff;
        border : 1px solid #dfdfdf;
        text-align: center;
    }

    ${props => props.theme.media.mobile}{
       strong{
           width : 60px;
       }
    }

`
export const CommentForm = styled.div`
    padding: 10px 20px;
`


export const IsLogin = styled.div`
    border-top : 1px solid #3b4890;
    border-bottom : 1px solid #3b4890;
    h3{
        background-color: #dfdfdf;
    }
`