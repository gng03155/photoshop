import styled from 'styled-components';

export const Wrap = styled.div`
    margin : 100px 0;
    h2{
        margin-bottom : 50px;
        text-align: center;
    }
`;

export const WishWrap = styled.div`
    ul{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border : 2px solid #ececec;
        padding: 5px 10px 10px;
    }
    li{
        width : 23.333333%;
        margin-top : 5px;
        background-color: #fff;
        flex-shrink: 0;
    }
    li.sel{
        background-color: rgba(0, 0, 0, 0.5);
    }
    ${props => props.theme.media.desktop}{
        ul{
            li{
                width : 32%;
            }
            li:first-child , li:nth-child(3n+1){
                margin-left: 2%;
            } 
        }
    }
    ${props => props.theme.media.tablet}{
        ul{
            li{
                & > div{
                    flex-direction: column;
                    div{
                        margin : 0 auto;
                    }
                    nav{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        button{
                            font-size : 10px;
                            padding : 6px 6px;
                        }
                    }
                }
            }
        }
    }
    ${props => props.theme.media.mobile}{
        ul{
            padding-left: 0;
            padding-right: 0;
        }
    }
`

export const Button = styled.div`
    position: relative;
    margin-top: 30px;
    button{
        display: inline-block;
        width : 80px;
        padding: 5px 0;
        font-size: 14px;
        margin-right: 5px;
    }
    div{
        display: none;
        position: absolute;
        top: 0;
        left: 0;
    }
`

export const None = styled.div`
    h3{
        text-align: center;
        font-size: 18px;
        color : coral;
    }
`