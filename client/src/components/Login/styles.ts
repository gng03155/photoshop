import styled from "styled-components"


export const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width : 100%;
    text-align: center;
    margin-bottom: 100px;
`;

export const Titlearea = styled.div`
    p{
        font-size: 12px;
        color : #555;
    }
`;

export const Form = styled.form`
    width: 400px;

    ${props => props.theme.media.mobile}{
        width : 90%;
    }
`;

export const Label = styled.label`
    display: block;
    width: 100%;
`;

export const Input = styled.input`
    width: 100%;
    height : 40px;
    border : 1px solid #ececec;
    padding: 0 10px;
    margin-top: 5px;
`;

export const Find = styled.div`
    ul{
        width : 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin : 10px 0;
        li{
            a{
                display: block;
                font-size: 16px;
                padding: 5px 20px;
            }
            a:hover{
                opacity: 0.8;
            }
            span{
                margin: 0 5px;
                font-size: 14px;
            }
        }
    }
`

export const Button = styled.button`
    display: block;
    width: 100%;
    height : 60px;
    color : #fff;
    background : #333;
    font-size : 20px;
    transition: all .3s;
    ${props => props.theme.media.mobile}{
        height : 40px;
        font-size: 16px;
    }
    &:hover{
        background-color: #fff;
        color : #333;
        border-color: #333;
    }
`


