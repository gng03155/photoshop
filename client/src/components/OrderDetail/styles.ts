import styled from 'styled-components';

export const Wrap = styled.div`
    width : 100%;
    h2{
        margin : 100px 0;
        text-align: center;
    }
`

export const OrderWrap = styled.div`
`

export const OrderTitle = styled.div`
    display: flex;
    margin-bottom: 20px;
    div{
        margin-right: 20px;
    }
    span{
        margin-right: 5px;
    }
    strong{

    }
`

export const Table = styled.table`
    width : 100%;
    border-collapse: collapse;
    margin-bottom: 100px;
    thead{
        border-top : 1px solid #ccc;
        border-bottom : 1px solid #ccc;
    }
    tbody{
        tr{
            border-bottom : 1px solid #ececec;
        }
    }
    tr{
        text-align: center;

    }
    th{
        height : 40px;
    }
    td{
        padding: 10px 0;
        height : 80px;
    }



`

export const ProductInfo = styled.div`
    display: flex;
    height : 100%;
    padding-left: 20px;
    div.img{
        width : 80px;
        height : 96px;
        margin-right: 20px;
        img{
            width : 100%;
            height: 100%;
        }
    }
    div.desc{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p{
            text-align: left;
        }
        span{

        }

    }

`

export const MiniOrderWrap = styled.div`
    margin-bottom: 50px;
    ul{
        border: 1px solid #ececec;
        border-radius: 10px;
        padding: 10px 0;
    }
    li{
        padding: 20px 10px;
        border-bottom: 1px solid #ececec;
    }
    li:last-child{
        border : 0;
    }
`

export const MiniTitle = styled.div`
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    div{
        height:30px;
        line-height: 30px;
    }
    strong{
        font-size: 14px;
    }
    span{
        font-size: 12px;
        margin-left: 5px;
    }
`

export const MiniContent = styled.div`
    padding: 0 10px;
    & > p{
        padding: 10px 0;
        font-size: 14px;
    }
`

export const MiniThumb = styled.div`
    display: flex;
    padding: 10px 0;
    /* align-items: baseline; */

    div:first-child{
        width : 80px;
        height : 80px;
        margin-right: 10px;
        border-radius: 10px;
        overflow: hidden;
        img{
            width : 100%;
            height : 100%;
        }
    }

    p{
        font-size: 14px;
    }
    b{
        font-size: 14px;
    }
    span{
        display: block;
        font-size: 12px;
    }
    
`

export const MiniPrice = styled.div`
    width : 100%;
    div{
        display : flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }
    div:last-child{
        margin:0;
    }
`

export const InfoWrap = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 200px;
`

export const Info = styled.div`
    width : 47%;
    margin-bottom: 20px;
    h3{
        padding-bottom: 10px;
        border-bottom: 2px solid #555;
    }

    ${props => props.theme.media.desktop}{
        width :100%;
    }
`

export const InfoTable = styled.table`
    border-collapse : collapse;
    width : 100%;
    tr{
        height : 40px;
        line-height: 40px;
        border-bottom : 1px solid #ececec;
    }
    th{
        text-align: left;
    }
    td{

    }
    ${props => props.theme.media.tablet}{
        col:first-child{
            width: 100px !important;
        }
    }
`