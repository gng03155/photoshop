import styled from "styled-components"

export const Head = styled.div`
    display: table-cell;
    width: 100%;
    height : 100px;
    text-align: center;
    vertical-align: middle;
    border : 1px solid #ececec;

    p{
        font-size : 16px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    span{
        font-size : 18px;
        margin-right: 2px;
    }
    strong{
        font-size : 18px;
        margin: 0 4px;
    }
`

export const Section = styled.table`
    width : 100%;
    margin : 7px 0;
    border-top : 1px solid #ececec;
    border-bottom : 1px solid #ececec;
    border-collapse: collapse;
    tr{
        width: 100%;
        height: 32px;
        margin : 10px 0;
    }
    th{
        margin-right: 10px;
    }
    td{
        
    }
`

export const Button = styled.button`
    width : 100%;
    height : 40px;
    background : black;
    text-align : center;
    color : #fff;
    margin-bottom: 40px;
`