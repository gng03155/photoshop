import styled from 'styled-components';

export const Wrap = styled.div`
    margin : 100px 0;
    text-align: center;

    & > h2{
        margin-bottom: 50px;
    }
    & > p{
        margin-bottom: 50px;
        font-size: 18px;
    }
`

export const InputWrap = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    input{
        width : 80%;
        height : 30px;
    }
    a{
        display: inline-block;
        width : 90px;
        height:30px;
        line-height: 30px;
        margin-left: 10px;
        border : 1px solid #ececec;
    }
`

export const Ment = styled.div`
    p{

    }
`
