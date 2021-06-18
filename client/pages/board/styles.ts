import styled from "styled-components"

export const Wrap = styled.div`
    width : 100%;
    height : 1000px;
`

export const BoardWrap = styled.div`
    width : 100%;
    height : 400px;
    margin: 0 auto;
    h2{
        font-size : 20px;
        text-align: center;
    }
`

export const Title = styled.div`
    display : flex;
    align-items: center;
    width : 100%;
    padding : 5px 10px;
    height : 40px;
    margin : 40px 0 20px;
    border-top : 1px solid #ececec;
    border-bottom : 1px solid #ececec;
    label{
        display: inline-block;
        width : 80px;
    }
    input{
        flex-grow: 1;
        height : 100%;
        padding : 5px;
        border : 1px solid #ececec;
    }
`
export const SubContent = styled.div`
    border-top : 1px solid #ececec;
    border-bottom : 1px solid #ececec;
    margin: 30px 0;
    ul{

    }
    li{
        width : 100%;
        height : 45px;
        border-bottom : 1px solid #ececec;
    }
    li > div{
        display: flex;
        align-items: center;
        height: 100%;
    }
    li:last-child{
        border-bottom : 0;
        margin-bottom: 0;
    }
    label {
        display: inline-block;
        width : 80px;
        font-weight: bold;
    }
    input[type = "password"]{
        border : 1px solid #ececec;
    }
`
export const File = styled.div`

    input{
        width : 30%;
        height : 24px;
    }
`

export const PassWord = styled.div`
    

    input{
        width : 30%;
        height : 30px;
    }
    input[type = "radio"]{
        width : 18px;
        height : 18px;
    }
    label.set{
        width : auto;
        margin : 0 10px 0 5px;
    }
`

export const Button = styled.div`
    display: flex;
    justify-content: space-between;
    button{
        width : 49%;
        height : 50px;
    }
`





