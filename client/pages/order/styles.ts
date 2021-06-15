import styled from "styled-components"

export const OrderArea = styled.div`
    & > div:first-child{
        display: flex;
        height : 55px;
        justify-content: space-between;
        align-items: center;
        padding : 10px 15px;
        border-top: 1px solid #ececec ;
        border-bottom: 1px solid #ececec ;
        cursor: pointer;
        h2{

        }
        a{
            display: inline-block;
            width: 19px;
            height: 11px;
            transition: all 1s linear;
        }
        img{
            width: 100%;
            height: 100%;
        }
        a.active {
            transform: rotateX(180deg);
        }
    }
    & > div:last-child{
        overflow-y: hidden;
        max-height : 0px;
        transition: max-height 0.7s linear;
    }
`


export const ShippingInfo = styled.div`
    & > div:first-child{
        padding : 0 10px;
        ul{
            display: flex;
            height : 60px;
            align-items: center;
        }
        li{
            display: flex;
            align-items: center;
            margin-right: 10px;
        }
        label{
            font-size: 14px;
            color : #ccc;
            margin-right: 5px;
        }
        input{
            width: 25px;
            height: 25px;
            
        }
    }
    table{
        width: 100%;
        padding : 10px;
        padding-top: 0;
        tr{
            height : 50px;
        }
        th{
            width : 150px;
            text-align: left;
            font-size: 16px;
            color : #666;
        }
        td{
            width : auto;
        }
        input {
            width: 100%;
            height : 40px;
            padding: 5px;
            border: 1px solid #ececec;

        }
        select{
            border: 1px solid #ececec;
        }
    }
    & > div:last-child{
        padding : 10px 15px;
        border-top : 1px solid #ececec;
        select{
        width: 100%;
        height : 40px;
        border : 1px solid #ececec;
        }
        span.wrap {
            position: relative;
            display: inline-block;
            width: 100%;
            height : 40px;
            input{
                display: none;
                position: absolute;
                width : 85% !important;
                height : 40px;
                top: 0;
                left: 0;
                padding: 5px;
                border : 1px solid #ececec;
                border-right: 0;
            }   
        }
    }
`

export const AddressBox = styled.tr`
    th{
        vertical-align: top;
        padding-top: 10px;
    }
    ul{

    }
    input{
        width : 100%;
        height : 35px;
    }
    li{
        line-height: 45px;
    }
    li:first-child {
        input{
            width: 100px;
        }
        button{
            position : relative;
            margin-left: 20px;
            width : 100px;
            height: 35px;
        }
    }
`

export const PhoneBox = styled.tr`
    select , input{
        width : 20% !important;
        height : 40px;
    }
`

export const EmailBox = styled.tr`
    input{
        width : 25% !important;
        height : 40px;
    }
    select{
        width: 100%;
        height : 40px;
    }
    span.wrap {
        position: relative;
        display: inline-block;
        width: 25%;
        height : 40px;
        input{
            display: none;
            position: absolute;
            width : 85% !important;
            top: 0;
            left: 0;
            border-right: 0;
        }   
    }
    
`


export const OrderInfo = styled.div`
    overflow-y: auto !important;
    ul{
        padding : 20px 20px;
    }
    li{
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    a{
        display: inline-block;
        position: absolute;
        top: 10px;
        right: 0;
        width: 24px;
        height : 24px;
        line-height: 24px;
        border : 1px solid #ccc;
        text-align: center;
    }
`

export const ThumbNail = styled.div`
    width :88px;
    height : 90px;
    margin-right: 20px;
    border : 1px solid #ececec;

    img{
        width :100%;
        height : 100%;
    }
`

export const Description = styled.div`
    color: #666;
    h3{
        color: #333;
        margin-bottom: 5px;
    }
    p{
        margin-bottom: 5px;
        font-size: 14px;
    }
    strong{
        display: block;
        margin-bottom: 5px;
    }
`
export const PaymentArea = styled.div`
    ul{
        padding : 14px;
    }
    li{
        display: flex;
        justify-content: space-between;
        padding : 12px;
        font-size: 17px;
    }
    li:last-child{
        border-top : 1px solid #ececec;
    }

    p{
        color : #666
    }
    strong{
        font-weight: 600;
        color : #000;
    }
`
export const OrderEnd = styled.div`
    border-top : 1px solid #ececec;
    padding : 14px;
    button{
        width: 100%;
        height : 50px;
        margin-bottom: 20px;
        border-radius: 5px;
        background-color: #333;
        text-align: center;
        color : #fff;
    }
    p{
        position: relative;
        color : #999;
        margin-bottom: 10px;
        padding-left: 10px;
    }
    p:before{
        position: absolute;
        left: 0;
        top : 7px;
        content: "";
        width: 6px;
        height : 1px;
        background-color: #999;
    }
`
