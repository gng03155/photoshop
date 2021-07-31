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

export const RightBox = styled.div`
    width : 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

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

    ${props => props.theme.media.tablet}{
        width : 100%;
    }
`

export const SubWrap = styled.div`
    span{
        color : #999;
    }
    span:last-child{
        margin-left: 10px;
    }
    ${props => props.theme.media.mobile}{
        font-size: 8px;
    }
`

