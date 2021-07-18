import styled from "styled-components"

export const Table = styled.table`
    width : 100%;
    border-collapse: collapse;
    border-top : 1px solid #dfdfdf;
    margin-top : 10px;

    tr{
        height : 45px;
        line-height: 45px;
        border-bottom : 1px solid #dfdfdf;
        text-align: left;
    }
    th{
        padding-left: 20px;
        border-right: 1px solid #dfdfdf ;
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

    ${props => props.theme.media.mobile}{
        colgroup{
            col:first-child{
                width : 100px !important;
            }
        }
    }
`

export const Button = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height : 90px;
    div{
        button{
            margin-left: 10px;
        }
    }
    button
    {
            padding : 5px 12px;
    }
`