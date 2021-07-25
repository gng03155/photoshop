import styled from "styled-components"

export const Wrap = styled.div`
    position: relative;
    width : 100%;
`

export const ThumbNail = styled.div`
    position: relative;
    width : 100%;
    padding-top: 80%;
    a{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right : 0;
        width: 100%;
        height : 100%;
        background-size : 100% 100% ;
        
        /* box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px; */
        //합격라인~
        box-shadow: rgb(14 30 37 / 12%) 0px 2px 4px 0px, rgb(14 30 37 / 32%) 0px 2px 16px 0px
        /* box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px; */
        /* rgb(0 0 0 / 15%) 2.4px 2.4px 3.2px */
        /* box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset; */
    }
    img{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right : 0;
        width: 100%;
        height : 100%;
        z-index: -10;
    }
`

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top : 20px;
`
export const Desc = styled.div`
    margin : 10px 0;
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
        font-weight: 600;

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
    width: 8px;
    height:8px;
    border-radius: 100%;
    background-color: ${(props) => props.color};
    border : 1px solid #eee;
    margin: 0 2px;
    box-sizing: content-box;
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
