import styled from "styled-components"


export const Wrap = styled.div`
    margin : 100px 0;
    border-left : 1px solid #ececec;
    border-right : 1px solid #ececec;
    border-bottom : 1px solid #ececec;
`

export const PostWrap = styled.div<{ x, y }>`
    position: absolute;
    width: 400px;
    height:400px;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    z-index: 100;
    a{
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width:20px;
        height:20px;
        z-index: 10;
    }
    img{
        vertical-align: top;
        width:100%;
        height:100%;
    }

    ${props => props.theme.media.mobile}{
        width : 90%;
        left: 0px;
    }
`

export const ContentArea = styled.div`
    width: 100%;
    height : 0;
    overflow: hidden;
    transition: height 0.5s linear;
`

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
        h3{

        }
        a{
            display: inline-block;
            width: 19px;
            height: 11px;
            transition: transform 0.5s linear;
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
        /* overflow-y: hidden;
        max-height : 0px;
        height : 0px;
        transition: height 0.7s linear; */
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

        table-layout: fixed;

        tr{
            height : 50px;
            line-height: 50px;
        }
        th{
            text-align: left;
            font-size: 16px;
            color : #666;
            ${props => props.theme.media.tablet}{
                font-size: 12px;
            }
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

        ${props => props.theme.media.tablet}{
            col:first-child{
                width:25% !important;
            }
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
            & > input{
                display: none;
                position: absolute;
                width : 85%;
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
    }
    ul{
    }
    li{
        margin-bottom: 5px;
    }
    li:first-child {
        input{
            width: 100px;
        }
        button{
            position : relative;
            height: 40px;
            margin-left: 20px;
            padding: 0 8px;
            
        }

        ${props => props.theme.media.tablet}{
            input{
                width : 60px;
            }
            button{
                margin-left: 10px;
            }
        }
    }
    li:last-child{
        margin-bottom: 0;
    }
`

export const PhoneBox = styled.tr`

    td{
        select{
            width : 20%;
            height : 40px;
        }
        input{
            width : 20%;
            height : 40px;
        }

        ${props => props.theme.media.tablet}{
            select{
                width : 30%;
            }
            input{
                width : 25%;
            }
        }
    }

`

export const EmailBox = styled.tr`
    && input{
        width : 25%;
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
            width : 85%;
            top: 0;
            left: 0;
            border-right: 0;
        }   
    }

    ${props => props.theme.media.tablet}{
            && input{
                width : 45%;
            }
            select{
            }
            span.wrap {
                width: 45%;
                input{
                    
                }   
            }
        }
    
`


export const OrderInfo = styled.div`
    &&& {overflow-y: auto;}
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

    ${props => props.theme.media.mobile}{
        ul{padding: 20px 10px;}
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

    ${props => props.theme.media.mobile}{
        h3{
            font-size: 12px;
        }   
        strong{
            font-size: 10px;
        }
        p{
            font-size: 10px;
        }
    }
`
export const PaymentArea = styled.div`
    ul{
        padding : 14px;
    }
    li{
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    div{
        position: relative;
        font-size: 12px;
        color : #777;
    }
    input{
        text-align: right;
        width : 100px;
        height : 40px;
        padding: 0 25px 0 10px;
        font-size: inherit;
        color : inherit;
    }
    span{
        position: absolute;
        top: 0;
        right: 10px;
        height : 40px;
        line-height: 40px;
        color : inherit;
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
