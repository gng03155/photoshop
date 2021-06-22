import styled from "styled-components"

export const Wrap = styled.div`
    width : 100%;
`

export const ThumbNail = styled.div`
    width : 100%;
    height : 300px;
    img{
        width: 100%;
        height: 100%;
    }
`

export const Description = styled.div`
    span{
        display: block;
        margin-top: 22px;
        font-size: 12px;
        color: #555555;
    }
    p{
        margin-top: 6px;
        font-size: 12px;
        color : #888888;
    }
    strong{
        display: block;
        margin-top: 6px;
        color : #232323;
        font-weight: bold;
    }
`
export const IconWrap = styled.div`
    height:50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`

export const Like = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    a{
        display: inline-block;
        width: 20px;
        height: 20px;
        background : url("/img/icon_like.png") no-repeat;
        /* background-position: -150px -10px; */
        margin-right: 4px;
    }
    span{
        color : red;
        margin : 0;
        font-size : 14px;
        font-weight: bold;
    }
`

export const Color = styled.div<{ color: string }>`
    display: inline-block;
    width: 22px;
    height: 7px;
    margin-right: 10px;
    background-color: ${(props) => props.color};
`

export const Promotion = styled.div`
    margin: 2px 0;
    img{
        display: inline-block;
        width: 25px;
        height: 14px;
        margin-right: 10px;
    }
`
