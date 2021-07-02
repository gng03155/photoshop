import styled from "styled-components"

export const Wrap = styled.div`
    margin-bottom: 100px;
`

export const ReviewBoard = styled.div`
    width : 100%;
    ul{
        padding: 40px 20px;
        border: 1px solid #ececec;
    }
    li{
        border-bottom: 1px solid #ececec;
        padding : 10px 0;
    }
    h3{
        text-align: center;
    }
`

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

    ${props => props.theme.media.mobile}{
        font-size: 1.2vw;
    }
`

export const Lock = styled.span`
    display: inline-block;
    margin-left: 10px;
    width : 16px;
    height : 16px;
    background: url("/img/icon_lock.gif") no-repeat;
    background-size : cover;

    ${props => props.theme.media.mobile}{
        width : 8px;
        height : 8px;
        margin-left: 5px;
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

export const NoBoard = styled.div`
    h3{
        width : 100%;
        text-align: center;
        color : coral;
    }
`

export const WriteButton = styled.div`
    
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    button{
        padding: 8px 20px;
        font-size: 15px;
        color : #777;
    }

    ${props => props.theme.media.mobile}{
        button{
            padding: 6px 14px;
            font-size: 12px;
        }
    }
`