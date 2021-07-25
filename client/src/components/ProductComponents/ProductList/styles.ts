import styled from "styled-components"

export const Wrap = styled.div`

`

export const Filter = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    text-transform: uppercase;
    text-align: center;
    margin-top: 50px;
    border-top : 1px solid #ececec;
    border-bottom : 1px solid #ececec;
    padding: 10px 0;
    h3{
        font-size: 16px;
    }
    
`

export const Option = styled.div`
    p{
        margin: 20px 0;
        font-weight: 400;
        font-size: 14px;
    }
    a.all{
        display: inline-block;
        padding: 5px 10px;
        font-weight: bold;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }   
    li{
        display: flex;
        align-items: center;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    ${props => props.theme.media.mobile}{
        a.all{
            padding: 2px 0;
            font-size: 10px;
        }
    }
`

export const CategoryWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    label{
        margin-right: 3px;
    }
    input{
    }
    input:last-child{
    }
    a{
    }
    ${props => props.theme.media.mobile}{
        input{
            margin-right: 10px;
        }
        input:last-child{
            margin-right: 0;
        }
        label{
            font-size: 10px;
        }
    }
`

export const ColorWrap = styled.div`
    ul{

    }
    li{
        display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    }
`

export const Color = styled.a<{ color?}>`
    
    display: inline-block;
    width: 21px;
    height :21px;
    margin-right: 10px;
    background-color: ${props => props.color ? props.color : "white"} ;

    &:last-child{
        margin-right: 0;
    }

    &:hover{
        border : 1px solid #fff;
    }

    &.active{
        outline : 2px solid #000;
    }

    ${props => props.theme.media.mobile}{
        width : 16px;
        height : 16px;
        margin-right: 10px;
    }
`

export const FilterButton = styled.div`
    display: flex;
    justify-content: center;
    button{
        padding: 5px 20px;
    }
    button:first-child {
        margin-right: 20px;
    }
`


export const ListMenu = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin : 10px 0;
    p{
        font-size: 12px;
        margin-left: 15px;
        span{
            margin : 0 5px;
            color : lightcoral;
        }
    }
    ul{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    li{
        position: relative;
    }
    li:after{
        position: absolute;
        top: 6px;
        right: 0;
        content: "";
        width: 1px;
        height: 15px;
        background-color: #ccc;
        
    }
    li:last-child:after{
        width: 0;
        height: 0;
    }
    a{
        display: inline-block;
        padding: 5px 15px;
    }
    a.active{
        font-weight: 500;
    }
    a:hover{
        font-weight: 500;
    }

    ${props => props.theme.media.tablet}{
        justify-content: flex-start;
        p{
            width : 100%;
            margin-bottom: 5px;
        }
    }

    ${props => props.theme.media.mobile}{
        p{
            margin-left: 10px;
        }
        a{
            font-size: 10px;
            padding : 5px 10px;
        }

    }
`

export const ListWrap = styled.div`

`

export const List = styled.div`
    ul{
        display: flex;
        flex-wrap: wrap;
    }
    li{
        width: 22%;
        margin: 10px 0;
        margin-right: 3.99999%;
    }
    li:nth-child(4n){
        margin-right: 0;
    }

    ${props => props.theme.media.tablet}{
        && li{
            width : 32%;
            margin-right: 2%;
        }
        li:nth-child(3n){
            margin-right: 0;
        }

    }
    ${props => props.theme.media.mobile}{
        && li{
            width : 49%;
            margin-right: 1%;
        }
        && li:nth-child(2n){
            margin-right: 0;
        }

    }
`

export const PageNation = styled.div`
    margin-bottom : 50px;
    ul{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
    }
    li{
        cursor: pointer;
        width : 32px;
        height : 32px;
        line-height: 32px;
        text-align: center;
    }
    li.page_number{
        border: 1px solid #d7d5d5;
    }
    a{
        font-weight: 400;
        display: inline-block;
        width : 100%;
        height: 100%;
    }
    a.active{
        font-weight: bold;
    }
    img{
        width: 100%;
        height : 100%
    }
`
