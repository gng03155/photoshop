import styled from "styled-components"

export const Button = styled.div`

    display: flex;
    justify-content: space-between;
    margin : 40px 0;
    button{
        text-align: center;
        background-color : black;
        color : #fff;
        width : 30%;
        height : 45px;
    }
    button:hover{
        color : #333;
        background-color: #fff;
        border-color: #000;
    }

    ${props => props.theme.media.mobile}{
       button{
        font-size: 10px;
       } 
    }
`