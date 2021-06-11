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
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    ul{
        display: flex;
    }
    li{
        margin-right: 15px;
        cursor: pointer;
    }
    a{

    }
`
