import styled from 'styled-components';

export const Content = styled.div`
    position: relative;
    z-index: 100;
    display : flex;
    width: 100%;
    height: 100px;
    padding: 10px 0;
    margin: 0 auto;
    justify-content: flex-start;
    align-items : center;
    text-align: center;

    & > div:first-child {
        width: 40%;
    }

    & > div:nth-child(3) {
        width: 40%;
    }

`;

export const MainMenu = styled.div`
    & > ul {        
        display: flex;
        flex-wrap: wrap;
        & > li{
            padding : 10px 0;
            a {
                display: block;
                font-size : 13px;
                padding: 0 10px;
            }
        }
        li.board{
            position: relative;
            height: auto;
        }
        li.board:hover nav{
            display: block;
        }
    }

    & > ul.left {
        justify-content: flex-start;
    }

    & > ul.right {
        justify-content: flex-end;
    }
`;

export const SearchWrap = styled.div`
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width : 100vw;
    height : 200px;
    margin-left: calc(-50vw + 50%);
    background-color : rgba(255,255,255,0.4);
    flex: none;
    & > div{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    span{
        display: inline-block;
        height : 70px;
        line-height: 70px;
        font-size: 30px;
        margin-left: 50%;
        cursor : pointer;
    }
`

export const SearchInput = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 2px solid #ccc;
    input{
        width : 700px;
        height : 40px;
        font-size: 24px;
        background: none;
        border : none;
    }
    a{
        display: inline-block;
        width: 32px;
        height : 32px;
        background: url("/img/search_icon.png") no-repeat;
        background-size: cover;
        margin-left: 10px;
    }
`

export const Logo = styled.div`
    &  {
        width: 19.99999%;
    }
    a {
        display: inline-block;
        img{
            width : 100%;
        }
    }
`;

export const BoardCategory = styled.nav`
    display: none;
    position: absolute;
    width : 130%;
    left: -15%;
    top : 100%;
    background-color : #fff;
    box-shadow : 0px 0px 15px 0px rgb(4 0 0 / 7%);
    text-transform: uppercase;
    ul{
        
    }
    li{
    
    }
    li:hover {
        background-color : #ccc;
    }
    && li:hover a{
        color : #fff;
    }
    && a{
        font-size: 16px;
        padding: 0px 10px;
        color : #555;
    }   
    
`