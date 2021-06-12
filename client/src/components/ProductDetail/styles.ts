import styled from "styled-components"

export const InfoWrap = styled.div`
    width: 100%;
    display: flex;
`

export const Img = styled.div`
    width : 50%;
    height : 550px;
    margin-right: 50px;
    img{
        width: 100%;
        height: 100%;
    }
`

export const Info = styled.div`
    width : 40%;
    table{
        border-spacing: 0px;
    }
    tr{
        height : 50px;
        line-height: 2;
        margin: 20px 0;
    }
    th{
        width: 150px;
        text-align: left;
    }
    td{

    }
    span{
        
    }
`
export const Form = styled.form`
    border-top: 1px solid #ccc;
    padding-top : 20px;
`
export const ProductAdd = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #ccc;
    padding-top: 20px;
    margin : 20px 0;
    label{
        display: inline-block;
        width: 35%;
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
`

export const OptionAdd = styled.div`
    margin-bottom : 20px;
    display: flex;
    align-items: center;
    label{
        margin-right: 100px;
        font-weight:bold;
    }
    div{

    }
    button{
        width: 60px;
        height: 36px;
        margin-right: 10px;
        font-size: 12px;
        text-transform: uppercase;
    }
    p{
        margin-top: 10px;
    }
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
    div{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        button {
            height : 50px;
            margin-bottom : 10px;
            border-radius: 5px;
        }
        button:nth-child(1){
            width: 100%;
            background: #333;
            color : #fff;
        }
        button:nth-child(2) , button:nth-child(3){
            width: 49%;
            background: #fff;
            color : #333;
            border : 1px solid #ececec;
        }
    }
`



export const DetailWrap = styled.div`
    margin-top: 150px;
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