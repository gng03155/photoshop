import styled from 'styled-components';

export const Wrap = styled.div`
    width : 100%;
    h2{
        text-align: center;
        margin-bottom: 50px;
    }
`

export const Table = styled.table`
    width : 100%;
    table-layout: fixed;
    border-collapse: collapse;

    tr{
        text-align: center;
    }
    th{
        border-top: 1px solid #ececec ;
        border-bottom: 1px solid #ececec ;
        height: 40px;
        font-size: 12px;
    }
    td{
        height : 30px;
        font-size: 12px;
    }

    ${props => props.theme.media.tablet}{
        th{
            font-size: 10px;
        }
        td{
            font-size: 10px;
        }
    }

`

export const MiniMileage = styled.div`
    ul{
        margin-bottom: 100px;
    }   
    li{
        border: 1px solid #ececec;
        margin-bottom: 10px;
        padding : 0 10px;
    }
    li:last-child{
        margin-bottom: 0;
    }

    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3px;
    }
    div:last-child{
        /* margin : 0; */
    }

    strong{
        display: inline-block;
        border: 1px solid #ccc;
        padding: 5px;
        margin: 5px 0 ;
    }
    h4{
        text-align: center;
    }

`