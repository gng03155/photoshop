import styled from 'styled-components';

export const Wrap = styled.div`
    width : 100%;
    h2{
        margin : 100px 0;
        text-align: center;
    }
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

export const InfoWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 200px;
`

export const Info = styled.div`
    width : 47%;
    h3{
        padding-bottom: 10px;
        border-bottom: 2px solid #555;
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
`