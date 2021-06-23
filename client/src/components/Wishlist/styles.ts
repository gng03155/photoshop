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
        /* justify-content: space-between; */
        align-items: center;
        flex-wrap: wrap;
        border : 2px solid #ececec;
        padding: 5px 10px 10px;
    }
    li{
        width : 23.333333%;
        margin-top : 5px;
        background-color: #fff;
    }
    li.sel{
        background-color: rgba(0, 0, 0, 0.05);
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