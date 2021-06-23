import styled from 'styled-components';

export const Wrap = styled.div`
    width: 100%;
    display: flex;
    /* align-items: center; */
    padding: 5px 0;
`

export const ThumbWrap = styled.div`
    width : 90px;
    height : 70px;
    margin-right: 10px;
    img{
        display: inline-block;
        width : 100%;
        height : 100%;
    }
`

export const DescWrap = styled.div`
    width : 60%;
    h4{
        margin-bottom: 5px;
        color : #555;
    }
    p{
        width : 100%;
        margin-bottom: 5px;
        color : #555;
    }
    span{
        display: inline-block;
        color : #999
    }
`

export const SubWrap = styled.div`
    margin-left: auto;
    span{
        margin-left: 10px;
        color : #999
    }
`

