import styled from "styled-components"

export const InfoWrap = styled.div`
    width: 100%;
    display: flex;

    ${props => props.theme.media.tablet}{
        flex-direction: column;
        align-items: center;
    }
`

export const Img = styled.div`
    width : 50%;
    margin-right: 50px;
    img{
        width: 100%;
        max-height: 600px;
    }

    ${props => props.theme.media.tablet}{
        width : 100%;
        margin : 0;
    }
`

export const Info = styled.div`
    width : 40%;
    table{
        border-spacing: 0px;
    }
    tr{
        height : 40px;
        line-height: 2;
    }
    th{
        width: 150px;
        text-align: left;
    }
    td{

    }
    span{
        
    }

    ${props => props.theme.media.tablet}{
        width : 100%;
    }
    ${props => props.theme.media.mobile}{
        tr{
            height : 30px;
        }
        th{
            width : 100px;
        }
    }
`
export const Form = styled.form`
    padding-top : 10px;
`
export const ProductAdd = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #ccc;
    padding-top: 20px;
    margin : 20px 0;
    div{
        width :35%;
        label{
            display: block;
        }
    }
    ul{
        display: flex;
        justify-content: space-between;
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
        li:nth-child(4) {
            margin-left: 15px;
        }
       li:nth-child(4) a{
            background: url("/img/btn_price_delete.gif") no-repeat;
            width: 11px;
            height: 11px;
       }   

    }
    input{
        width : 25px;
        height : 25px;
        text-align : center;
    }
    span{
        width: 35%;
        font-size: 20px;
        text-align: right;
    }

    ${props => props.theme.media.mobile}{
        label{
            font-size: 10px;
        }
        span{
            width:auto;
            font-size: 10px;
        }
    }
`

export const OptionAdd = styled.div`
    padding-top: 10px;
    margin-bottom : 20px;
    display: flex;
    border-top : 1px solid #ececec;
    label{
        width : 150px;
        font-weight:bold;
        padding-top : 5px;
    }
    div{

    }
    ul{
        display: flex;
        li{
            margin-right: 4px;
        }
        a{
            display: inline-block;
            padding: 10px 6px;
            font-size: 12px;
            text-transform: uppercase;
            border : 1px solid #ececec;
        }
        a.active{
            border : 2px solid black;
        }
    }
    p{
        margin-top: 10px;
    }
`

export const Color = styled.a<{ color }>`
    width : 24px;
    height : 24px;
    border : 1px solid ${props => props.color} ;
    border-radius: 100%;
    background-color: ${props => props.color};
    margin-right: 3px;

`

export const ProductButton = styled.div`
    nav{
        display: flex;
        justify-content: flex-end;
        align-items: baseline;
        margin: 40px 0;
        strong{
            font-size: 20px;
        }
        span{
            vertical-align: bottom;
        }
    }
    & > div{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        ul{
            width: 100%;
            display: flex;
        }
        li{
            height : 60px;
            border : 1px solid #ececec;
            cursor: pointer;
        }
        li:nth-child(1){
            width: 70%;
        }
        li:nth-child(2) , li:nth-child(3){
            width: 15%;
        }
        button {
            width: 100%;
            height: 100%;
            text-align: center;
            border : 0;
        }
    }

    ${props => props.theme.media.tablet}{
        nav{
            margin :  20px 0;
        }
        & > div{
            li:nth-child(1){
                width: 60%;
            }
            li:nth-child(2) , li:nth-child(3){
                width: 20%;
            }
        }
    }
`
export const LikeBtn = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.active {
        background-color: #f00;
        color : #fff;
    }
    a{
        display: block;
        width: 30px;
        height : 30px;
        background : url("/img/icon.png") no-repeat;
        background-position: -181px -12px;
    }
    span{
        font-size : 12px;
    }
`

export const CartBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    a{
        display: block;
        width: 30px;
        height : 30px;
        background : url("/img/icon.png") no-repeat;
        background-position: -240px -11px;
    }
`



export const DetailWrap = styled.div`
    margin-top: 150px;
    ${props => props.theme.media.tablet}{
        margin-top : 100px;
        & > div{
            margin-bottom: 100px;
        }
    }
    ${props => props.theme.media.mobile}{
        margin-top : 50px;
        & > div{
            margin-bottom: 50px;
        }
    }
`

export const NaviBar = styled.nav`
    margin-bottom: 50px;
    ul{
        display: flex;
        border-bottom : 1px solid #ececec;
    }
    li{
        width: 25%;
        height : 46px;
        line-height: 46px;
        text-align: center;
        cursor: pointer;
    }
    a{
        color : #aaa;
        font-size: 16px;
    }
    li.active a{
        color : #000;
    }
    li:hover a{
        color : #333;
    }

    ${props => props.theme.media.tablet}{
        a{
            font-size : 14px;
        }
    }

    ${props => props.theme.media.mobile}{
        a{
            font-size : 10px;
        }
    }
`

export const DetailInfo = styled.div`
    margin-bottom: 150px;
    div{
        width : 100%;
        img{
            display: block;
            width: 100%;
            height : calc(50% + 0px);
            margin-bottom: 50px;
        }
    }
`

export const BuyInfo = styled.div`
    margin-bottom: 150px;
    div{
        margin-bottom: 70px  ;
        h3{
            margin-bottom: 20px;
            font-size : 20px;
        }
        p{
            font-size: 14px;
        }   
    }

    ${props => props.theme.media.mobile}{
        div{
            margin-bottom : 30px;
            h3{
                font-size: 16px;
            }
            p{
                font-size: 12px;
            }
        }
    }
`

export const Review = styled.div`
    margin-bottom: 150px;
    h2{
        font-size: 30px;
        text-align: center;
        margin-bottom: 50px;
    }
`

export const QnA = styled.div`
    margin-bottom: 150px;
    h2{
        font-size: 30px;
        text-align: center;
        margin-bottom: 50px;
    }
`