import styled from "styled-components"

export const Wrap = styled.div`

`

export const Filter = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    text-align: center;
    margin-top: 200px;
    border-top : 1px solid #ececec;
    border-bottom : 1px solid #ececec;
    padding: 10px 0;
    h3{
       margin-bottom: 10px;
    }
    
`

export const Option = styled.div`
    p{
        margin: 20px 0;
    }
    a.all{
        display: inline-block;
        width: auto;
        height: auto;
        padding: 5px 10px;
        margin-right: 20px;
        border : 1px solid #999;
    }
`

export const CategoryWrap = styled.div`
    display: flex;
    height : 40px;
    justify-content: center;
    align-items: center;
    label{
        margin-right: 5px;
    }
    input{
        margin-right: 20px;
    }
    input:last-child{
        margin-right: 0;
    }
    a{
        margin-right: 20px;
    }
`

export const ColorWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height : 40px;
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
    justify-content: space-between;
    align-items: center;
    p{
        font-size: 12px;
        span{
            margin : 0 5px;
            color : lightcoral;
        }
    }
    ul{
        display: flex;
        justify-content: space-space-around;
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
`

export const ListWrap = styled.div`

`

export const List = styled.div`
    margin : 20px 0;
    ul{
        display: flex;
        flex-wrap: wrap;
    }
    li{
        width: 22%;
        margin: 10px 0;
        margin-right: 3%;
    }
    li:nth-child(4n){
        margin-right: 0;
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
