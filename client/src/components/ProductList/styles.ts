import styled from "styled-components"

export const Wrap = styled.div`

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
        justify-content: space-between;
        flex-wrap: wrap;
    }
    li{
        width: 23.3333%;
        margin: 10px 0;
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
        margin-right: 10px;
        cursor: pointer;
    }
    a{
        font-weight: 400;
    }
    a.active{
        font-weight: bold;
    }
    img{
        width: 32px;
        height : 32px
    }
`
