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