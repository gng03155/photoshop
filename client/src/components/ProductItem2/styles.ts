import styled from 'styled-components';

export const Wrap = styled.div`
    display: flex;
    align-items: center;
    div{
        flex-shrink: 0;
        width : 100px;
        height : 100px;
        margin-right: 10px;
        img{
            width : 100%;
            height : 100%;
        }
    }
    nav{
        flex-shrink: 0;
        p{
            font-size: 14px;
            font-weight: bold;
        }
        strong{
            display: block;
            margin: 4px 0;
        }
        article{
            display: flex;
            align-items: center;
        }
        a{
            display: inline-block;
            width: 22px;
            height: 22px;
            background : url("/img/icon.png") no-repeat;
            background-position: -325px -200px;
            margin-right: 3px;
        }
        span{
            font-size: 12px;
            color : red;
        }
        button{
            padding : 5px 12px;
            color : #777;
            font-weight: 500;
        }
        button:hover{
            border : 1px solid #555;
        }
    }

    ${props => props.theme.media.mobile}{
        & > div{
            width : 80px;
            height : 80px;
        }

        nav {
            p{
                font-size: 12px;
            }
            button{

            }
        }
    }
`

