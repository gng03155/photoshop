import styled from 'styled-components';

export const Wrap = styled.div`
    width : 100%;
    margin-bottom: 200px;
    h2{
        margin : 100px 0;
        text-align: center;
    }
`

export const Table = styled.table`
    width : 100%;
    border-collapse: collapse;
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

        }
        span{

        }

    }

`

export const MiniOrderWrap = styled.div`
    ul{
        border-top: 1px solid #ececec;
    }
    li{
        padding: 20px 0;
    }
`

export const MiniTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    strong{
        font-size: 16px;
    }
    a{
        font-size: 16px;
    }
`

export const MiniContent = styled.div`
    border: 1px solid #ececec;
    border-radius: 10px;
    padding: 0 10px;
    & > p{
        padding: 10px 0;
        font-size: 14px;
        border-bottom: 1px solid #ececec;
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
        font-size: 12px;
        margin-right: 5px;
    }
    
`