import styled from "styled-components"

export const Table = styled.table`
    width : 100%;
    border-collapse: collapse;
    border-top : 1px solid #ececec;
    margin: 100px 0 40px 0;

    tr{
        height : 45px;
        line-height: 45px;
        border-bottom : 1px solid #ececec;
        text-align: left;
    }
    th{
        padding-left: 20px;
        border-right: 1px solid #ececec ;
    }
    td.title{
        padding-left: 20px;
    }
    div.some{
        padding-left: 20px;
        color : #999;
        span{
            margin-right: 20px;
            margin-left: 5px;
            font-size: 12px;
        }
    }
    div.desc{
        width  : 100%;
        padding : 50px;
        line-height: 1.5;
    }
`