import styled from "styled-components"

export const Wrap = styled.div`
    width : 100%;
`

export const ThumbNail = styled.div`
    width : 100%;
    height : 200px;
    img{
        width: 100%;
        height : 100%;
    }
`

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`
export const Desc = styled.div`
    span{
        display: block;
        font-size: 12px;
        color: #555555;
    }
    p{
        font-size: 12px;
        color : #a0a0a0;
    }
    strong{
        display: block;
        color : #232323;
        font-weight: bold;
    }
`

export const IconWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Like = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    a{
        display: inline-block;
        width: 14px;
        height: 12px;
        background : url("/img/icon.png") no-repeat;
        background-position: -329px -205px;
        margin-right: 2px;
    }
    span{
        color : red;
        margin : 0;
        font-size : 14px;
        font-weight: bold;
    }
`

export const ColorWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2px 0;
`

export const Color = styled.div<{ color: string }>`
    display: inline-block;
    width: 10px;
    height:10px;
    border-radius: 100%;
    background-color: ${(props) => props.color};
    border : 1px solid #eee;
    margin: 0 2px;
`

export const Promotion = styled.div`
    margin: 2px 0;
    img{
        display: inline-block;
        width: 25px;
        height: 14px;
        margin-right: 10px;
    }
    img:last-child{
        margin-right: 0;
    }
`
