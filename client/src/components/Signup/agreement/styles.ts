import styled from "styled-components"

export const Contnent = styled.form`
    width: 100%;

`;

export const AgreeArea = styled.div`
    width: 100%;
    margin-bottom : 15px;
`;

export const CheckBox = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 40px;
    padding: 5px 10px;
    border: 1px solid #ececec;

`

export const Label = styled.label`
        font-weight: 400;
        margin-left: 25px;
        input{
            position: absolute;
            top : 50%;
            left : 10px;
            transform: translateY(-50%);
            width: 18px;
            height: 18px;
        }
`

export const TextBox = styled.div`

    width: 100%;
    height: 150px;
    overflow:auto;
    padding: 5px 10px;
    border: 1px solid #ececec;
    border-top: 0;
    p {
        font-size: 12px;
        font-weight: bold;
    }

`
export const ButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin : 30px 0;
    button{
        width: 49%;
        height : 40px;
        border : 1px solid #ececec;
    }
    button:first-child{
        background : black;
        color : #fff;
    }
    button:last-child{
        background : white;
        color : #000;
    }
`
