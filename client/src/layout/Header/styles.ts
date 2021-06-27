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

    & > div {
        width: 33.3333%;
    }

`;

export const MainMenu = styled.div`
    & > ul {        
        display: flex;
        justify-content: space-between;
        & > li{
            padding : 10px 0;
            a {
                display: block;
                font-size : 20px;
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
`;

export const SearchWrap = styled.div`
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width : 100vw !important;
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
    a {
        display: block;
        img{
            
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
    li:hover a{
        color : #fff !important;
    }
    a{
        font-size: 16px !important;
        padding: 0px 10px !important;
        color : #ccc !important;
    }   
    
`