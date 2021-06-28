import styled from 'styled-components';

export const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width : 100%;
    margin : 150px 0 200px;
    text-align: center;
    h2{
        margin-bottom: 50px;
    }
`

export const Form = styled.form`
    width : 500px;
    padding: 20px;
    border: 1px solid #ccc;
    p{
        font-size: 16px;
        margin-bottom: 5px;
    }
    p.lead{
        font-size: 20px;
        margin-bottom: 20px;
    }
    input{
        width : 100%;
        height: 40px;
        padding: 0 10px;
        margin: 20px 0;
    }

`

export const Button = styled.div`
    width : 100%;
    display: flex;
    justify-content: center;
    button{
        margin-right: 10px;
        padding: 6px 12px;
    }
    a{
        display: inline-block;
        padding: 6px 12px;
        border: 1px solid #ececec;
    }
`