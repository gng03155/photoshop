import styled from "styled-components"


export const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width : 100%;
    margin: 150px 0 200px;
    text-align: center;
`;

export const Titlearea = styled.div`
    h2{
        font-size : 25px;
        font-weight: 400;
        margin-bottom: 50px;
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
    ${props => props.theme.media.mobile}{
        height : 40px;
        font-size: 16px;
    }
`


