import styled from "styled-components"

export const Wrap = styled.div`
    width : 100%;
    border-bottom:1px solid #dfdfdf;
    h3{
        padding :  10px 0;
    }
`

export const FileWrap = styled.div`
    padding-bottom: 10px;
    a{
        display: inline-block;
        width : 120px;
        height : 120px;
        margin-right: 10px;
    }
    img{
        width : 100%;
        height : 100%;
    }

    ${props => props.theme.media.mobile}{
        a{
            width : 75px;
            height : 75px;
        }
    }
`

export const List = styled.div`
    display: flex;
    a{
        display: inline-block;
        width : 200px;
        height : 200px;
        margin-right: 10px;
    }
    img{
        width : 100%;
        height : 100%;
    }
`