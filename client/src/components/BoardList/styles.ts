import styled from "styled-components"

export const Table = styled.table`
    width: 100%;
    border-spacing: 0px;
    border-collapse: collapse;
    thead {
        height : 40px;
        border-top : 1px solid #ececec;
        border-bottom : 1px solid #ececec;
    }
    tbody{
        tr{
            height : 60px;
            border-bottom : 1px solid #ececec;
        }
    }
    tr{
        
    }
    td{
        text-align: center;
    }
`

export const PageNation = styled.div`
    margin-bottom : 50px;
    ul{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
    }
    li{
        cursor: pointer;
        width : 32px;
        height : 32px;
        line-height: 32px;
        text-align: center;
    }
    li.page_number{
        border: 1px solid #d7d5d5;
    }
    a{
        font-weight: 400;
        display: inline-block;
        width : 100%;
        height: 100%;
    }
    a.active{
        font-weight: bold;
    }
    img{
        width: 100%;
        height : 100%
    }
`

