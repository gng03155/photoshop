import styled from "styled-components"


export const Wrap = styled.div`
    /* width: 1440px; */
    height : 500px;
    margin : 0 auto;
`;

export const Titlearea = styled.div`
    width: 400px;
    margin : 50px auto;
    text-align: center;
    h2{
        font-size : 25px;
        font-weight: 400;
    }
`;

export const Form = styled.div`
    width: 400px;
    margin : 0 auto;
`;

export const Label = styled.label`
    display: block;
    width: 400px;
    height : 40px;
    margin-bottom : 5px;
    /* border : 1px solid #ccc; */
`;

export const Input = styled.input`
    width: 100%;
    height: 100%;
    padding: 2px 5px;
`;

export const Find = styled.div`
    width: 400px;
    margin : 15px auto;
    ul{
        display: flex;
        li{
            a{
                display: block;
                font-size: 16px;
                padding: 5px 20px;
            }
        }
    }
`

export const Button = styled.button`
    display: block;
    width: 400px;
    height : 60px;
    margin : 0 auto;
    color : #fff;
    background : #333;
    font-size : 20px;
`


