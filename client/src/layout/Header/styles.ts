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