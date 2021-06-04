import styled from "styled-components"

export const TitleArea = styled.div`
    width: 100%;
    height : 50px;
    line-height: 50px;
    padding: 0px 10px;
    background : #f1f1f1;
    h3{

    }
`

export const Form = styled.form`

`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    tr{
        width: 100%;
        height:45px;
        line-height: 45px;
        border-bottom: 1px solid #ececec;
    }
    th{
        padding: 0px 0 0 10px;
        text-align: left;
        
    }
    td{
    }

    input{
        padding: 5px;
        border: 1px solid #ececec;
        outline: none;
    }
`

export const IdBox = styled.tr`
    input{
        width : 120px;
        height :35px;
    }
`

export const TextBox = styled.tr`

    input{
        width : 100%;
        height : 35px;
    }
`

export const AddressBox = styled.tr`
    th{
        vertical-align: top;
    }
    ul{

    }
    input{
        width : 100%;
        height : 35px;
    }
    li{
        line-height: 45px;
    }
    li:first-child {
        input{
            width: 100px;
        }
        button{
            position : relative;
            margin-left: 20px;
            width : 100px;
            height: 35px;
        }
    }
`

export const PhoneBox = styled.tr`
    select , input{
        width : 20%;
        height : 35px;
        border: 1px solid #ececec;
    }
`

export const EmailBox = styled.tr`

    input{
        width : 300px;
        height : 35px;
    }
`
export const BirthBox = styled.tr`
    th{
        vertical-align: top;
    }
    ul{

    }
    li{
        line-height: 45px;
    }
    li:first-child input{
        width : 10px;
        height : 10px;
    }
    li:last-child input{
        width : 100px;
        height : 35px;
        text-align: right;
    }
    label{
        margin : 0 5px;
    }
`

export const Button = styled.button`
    width : 100%;
    height : 45px;
    margin : 40px 0;
    text-align: center;
    background : black;
    color : #fff;
    border : 1px solid #ececec;
    &:hover {
        background : white;
        color : #000;
    }

`