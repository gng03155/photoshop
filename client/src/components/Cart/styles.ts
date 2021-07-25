import styled from "styled-components"

export const Wrap = styled.div`
    margin-bottom : 100px;
    button:hover{
        border-color : #333;
    }
`
export const BasketWrap = styled.div`
    width : 100%;
    margin-bottom: 100px;
    table{
        width: 100%;
        margin-bottom: 20px;
        border-collapse: collapse;
        table-layout: fixed;
    }
    thead {
        border : 1px solid #ececec;
        border-left: 0;
        border-right: 0;
    }
    tbody tr{
        text-align: center;
        height : 130px;
        border-bottom: 1px solid #ececec;
    }
    th{
        height : 50px;
    }
    td{

    }
    td.state{
        a{
            display: inline-block;
            padding: 5px 10px;
            border : 1px solid #ececec;
        }
    }

    & > div:last-child{
        button{
            padding : 5px 10px;
            margin-right: 5px;
        }
    }
`

export const ProductInfo = styled.div`
    display: flex;
    align-items: center;
    & > div:first-child{
        margin-right: 10px;
        width : 80px;
        height: 80px;
        img{
            width : 100%;
            height: 100%;
        }
    }
    & > ul{
        text-align: left;
        height: auto;
        & > li{
            margin-bottom: 5px;
            & > p{
                color : #000;
            }
            & > p.option{
                color : #999;
            }
            & > a{
                display: inline-block;
                padding: 5px 10px;
                border : 1px solid #ececec;
                color : #777
            }
        }
        li:last-child{
            position: relative;
            margin-bottom: 0;
        }
    }
`

export const Quantity = styled.div`
    ul{
        display: flex;
        justify-content: center;
        align-items: center;
       li{
        background: #eee;
       } 
       a{
        display: block;
       }
       li:nth-child(1) a{
            background: url("/img/btn_opt_minus.png") no-repeat;
            width : 26px;
            height: 26px;
         }
       li:nth-child(3) a{
            background: url("/img/btn_opt_plus.png") no-repeat;
            width : 26px;
            height: 26px;
        }
        input{
        width : 25px;
        height : 25px;
        text-align : center;
        }

    }
`

export const OrderPrice = styled.div`
    width: 100%;
    margin-bottom: 20px;
    table{
        width: 100%;
        border-collapse: collapse;
        border-top : 2px solid #333;
        border-bottom : 2px solid #333;
        font-size: 24px;
    }
    tbody tr{
        height : 120px;
        text-align: center;
        border-top : 1px solid #ececec;
    }
    th{
        height  : 80px;
    }
    td{
        border-right : 1px solid #ececec;
    }
    td:last-child{
        border : 0;
    }

    ${props => props.theme.media.tablet}{
        table{
            font-size: 16px;
        }
    }

    ${props => props.theme.media.mobile}{
        table{
            font-size: 10px;
        }
    }
`
export const OrderButton = styled.div`
    display: flex;
    justify-content: center;
    button{
        display: inline-block;
        width : 138px;
        height : 42px;
        font-size: 15px;
        margin-right: 5px;
    }
`

export const MiniBasket = styled.div`
    width : 100%;
    margin-bottom: 100px;
    & > ul{
        border-top : 1px solid #DCDCDC;
        border-bottom : 1px solid 	#DCDCDC;

        & > li{
            margin: 0;
            border-bottom : 1px solid 	#DCDCDC;
        }

        & > li:last-child{
            border: 0;
        }
    }

`

export const MiniBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    div{
        display: flex;
    justify-content: space-between;
    align-items: center;
    }
    input{
        width : 20px;
        height : 20px;
        margin-right: 10px;
    }
    label{

    }
    a{
        padding: 6px 8px;
    }
`

export const MiniHead = styled.div`
    display: flex;
    padding: 10px 0;
    label{

    }
    input{
        width : 20px;
        height : 20px;
        margin-right: 10px;
    }
    a{
        margin-left: auto;
        font-size: 18px;
    }
`

export const MiniContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0px 0 10px;
    ul{
        li:last-child{
            ul{
                justify-content: flex-start;
            }
            li{
                margin: 0;
            }
        }
    }
    && > li{
    }


`

export const SideContent = styled.div`
    height : 100%;
    text-align: right;
`

export const MiniSide = styled.div`
    padding: 10px 0;
    div{
        display: flex;
        justify-content: space-between;
    }
    div:first-child{
        margin-bottom: 10px;
    }
    strong{

    }
    span{

    }
`



export const Modal = styled.div<{ x, y }>`
    /* display: none; */
    position: absolute;
    top : ${props => props.y}px;
    left : ${props => props.x}px;
    width : 450px;
    padding: 10px;
    background-color: #fff;
    border : 1px solid #ccc;
    z-index: 500;
    h3{
        margin-bottom: 20px;
    }
    p{
        margin-bottom: 10px;
    }
    ul{
        margin-bottom: 20px;
    }
    li{
        margin-bottom: 5px;
        height : 30px;
        line-height: 30px;
    }
    span{
        font-weight: 500;
    }
    label{
        display: inline-block;
        width : 20%;
    }
    select{
        width : 80%;
        height : 100%;
        border : 1px solid #ececec;
        font-size: 12;
    }
    div{
        display: flex;
        justify-content: center;
        button{
            padding: 5px 5px;
            font-size: 14px;
            margin-right: 4px;
        }

    }


    div.bar{
        width : 100%;
        height: 1px;
        background-color: #ccc;
    }

    ${props => props.theme.media.tablet}{
        width : 70%;
        select{

        }
    }

    ${props => props.theme.media.mobile}{
        left : ${props => props.x - 50}px;
        h3{
            margin-bottom: 10px;
        }
        p{
            margin-bottom: 5px;
        }
        ul{
            margin-bottom: 10px;
        }
        li{
            margin-bottom: 5px;
        }
        select{
            font-size: 10px;
        }
    }
`

