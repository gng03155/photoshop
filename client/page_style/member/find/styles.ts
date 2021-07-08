import styled from 'styled-components';

export const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width : 100%;
    margin-bottom: 100px;
    text-align: center;
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

    ${props => props.theme.media.tablet}{
        width : 90%;
    }

    ${props => props.theme.media.mobile}{
        p{
            font-size: 12px;
        }
        p.lead{
            font-size: 14px;
        }
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