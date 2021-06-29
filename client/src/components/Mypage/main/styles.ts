import styled from "styled-components"


export const Wrap = styled.div`
    width: 100%;
    h2{
        text-align: center;
        margin: 50px 0;
    }
`

export const Maileage = styled.div`
    display: flex;
    justify-content: space-around;
    border: 2px solid #555;
    border-left: 0;
    border-right: 0;
    ul{
        width : 35%;
        padding: 30px 0;
    }

    li{
        margin-bottom: 10px ;
    }
    li:last-child{
        margin: 0;
    }
    span{
        display: inline-block;
    }
    span:first-child{
        width: 30%;
    }
    span:last-child{
        width: 70%;
        text-align: right;
    }
`

export const Delivery = styled.div`
    ul{
        width: 100%;
        height : 100px;
        display: flex;
        justify-content: space-around;
        border: 2px solid #555;
        border-left: 0;
        border-right: 0;
        text-align: center;
    }

    li{
        width: 25%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100px;
    }
    li.item {
        p{
            margin-bottom: 5px;
        }
        strong{
        
        }
    }
    li.item::after {
        content: "";
        position: absolute;
        width: 1px;
        height : 70px;
        background: #333;
        top: 15px;
        right: 0;
    }   

    li.list {
        p{
            position: relative;
        }
        p::before{
            position: absolute;
            content: "";
            width: 2px;
            height : 2px;
            background: #333;
            top: 6px;
            left: -6px;
        }
    }

    ${props => props.theme.media.mobile}{
        li{
            p{
                font-size: 10px;
            }
        }
    }
`

export const Menu = styled.div`
    ul{

        display: flex;
        flex-wrap: wrap;
        margin : 40px 0px 20px;
        li{
            display: flex;
            flex-direction: column;
            align-items: center;
            width : 24%;
            margin-bottom : 20px;
            margin-right: 1.33333%;
            border: 1px solid #ececec;
            cursor: pointer;
        }
        li:nth-child(4n){
            margin-right: 0;
        }
        div{
            background : url("/img/shop_main_icon.png") no-repeat;
            margin-top : 20px;
            width : 65px;
            height : 60px;
        }

        li:nth-child(1){
            div{background-position: 12px 0;}
        }
        li:nth-child(2){
            div{background-position: -90px 8px;}
        }
        li:nth-child(3){
            div{background-position: -188px 0;}
        }
        li:nth-child(4){
            div{background-position: 12px -200px;}
        }

        strong{
            display: block;
            margin-bottom: 5px;
            font-size:20px
        }

        p{
            margin-bottom: 20px;
            font-size:16px
        }

        span{
            display: inline-block;
            width: 200px;
            margin-bottom: 40px;
            text-align: center;
        }

    }

    ${props => props.theme.media.desktop}{
        ul{
            span{
                width :150px;
            }
        }
    }

    ${props => props.theme.media.tablet}{
        ul{
            justify-content: space-around;
            li{
                width:49%;
                margin-right: 0;
            }
        }
    }

    ${props => props.theme.media.mobile}{
        ul{
            span{
                width : 100px;
            }
        }
    }
`

