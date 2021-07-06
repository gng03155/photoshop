import styled from 'styled-components';


export const Wrap = styled.div`
    position: relative;
    width : 100%;
    height : 100px;
    margin: 0 auto;
`

export const Content = styled.div`
    position: relative;
    display : flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items : center;
    text-align: center;
    z-index: 1000;

    & > div:first-child {
        position: absolute;
        height : 100%;
        left: 0;
        top: 0;
    }

    & > div:nth-child(3) {
        position: absolute;
        height : 100%;
        right: 0;
        top: 0;
    }

`;
export const MainMenu = styled.div`
    display: flex;
    align-items: center;
    ul {        
        display: flex;
        flex-wrap: wrap;
        li{
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

`;

export const BG = styled.div`
    position: absolute;
    width : 100vw;
    height : 100%;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    background-color : rgba(255,255,255,0.9);
    z-index: -1;
`

export const SearchWrap = styled.div`
    position: absolute;
    top: 100%;
    width : 100vw;
    height : 0px;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    background-color : rgba(255,255,255,0.4);
    flex: none;
    overflow-y: hidden;
    transition: all linear 0.3s;

    & > div{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    span{
        display: inline-block;
        align-self: flex-end;
        margin-right: 50px;
        height : 70px;
        line-height: 70px;
        font-size: 30px;
        cursor : pointer;
    }
`

export const SearchInput = styled.div`
    position: relative;
    width : 700px;
    border-bottom: 2px solid #ccc;
    input{
        width : 90%;
        height : 40px;
        font-size: 24px;
        background: none;
        border : none;
    }
    a{
        position: absolute;
        display: inline-block;
        bottom: 10px;
        right: 0;
        width: 32px;
        height : 32px;
        background: url("/img/search_icon.png") no-repeat;
        background-size: cover;
    }

    ${props => props.theme.media.desktop}{
        width : 70%;
        input{font-size: 18px;}
        a{
            width : 26px;
            height : 26px;
        }
    }
    ${props => props.theme.media.tablet}{
        width : 70%;
        input{font-size: 16px;}
        a{
            width : 22px;
            height : 22px;
        }
    }
`

export const Logo = styled.div`
    &  {
    }
    a {
        display: inline-block;
        img{
            width : 150px;
        }
    }

    ${props => props.theme.media.mobile}{
        a{
            img{
                width : 100px;
            }
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
        width : 100%;
    }
    li{
        width : 100%;
    }
    li:hover {
        background-color : #ccc;
    }
    && li:hover a{
        color : #fff;
    }
    && a{
        font-size: 14px;
        padding: 0px 10px;
        color : #555;
    }   
    
`

export const MenuIcon = styled.div`
    a{
        display: inline-block;
        width : 25px;
        height : 25px;
    }
    a.toggle{
        background : url("/img/menu.png") no-repeat;
        background-size: cover;
    }

    a.search{
        background : url("/img/search_icon.png") no-repeat;
        background-size: cover;
    }
`

export const SideMenu = styled.nav`
    visibility: hidden;
    opacity: 0;
    position: fixed;
    top: 0;
    left: -20px;
    width : 250px;
    height : 100vh;
    background-color : rgba(255,255,255);
    text-transform: uppercase;
    text-align: left;
    transition:visibility 0.3s linear,opacity 0.3s linear;

`

export const SideClose = styled.div`
    position: absolute;
    top: 0;
    right: -49px;
    width : 50px;
    height : 50px;
    background-color: inherit;
    img{
        width : 100%;
        height : 100%;
    }
`

export const Inner = styled.ul`
    padding: 40px;
    li{
        position: relative;
        a{
            font-size: 14px;
        }
    }
    & > li:first-child{
        margin-bottom: 20px;
    }
    li.page{
        margin-bottom: 5px;
        a{
            font-size: 20px;
            font-weight: bold;  
        }
    }
    span{
        margin : 0 4px;
    }
`

export const SubMenuWrap = styled.ul`
    
    position: absolute;
    height : 0;
    left: 0;
    overflow: hidden;
    transition: all linear 0.5s ;
    li{

    }
    a{

    }

    &.active{
        height : auto;
        padding: 10px 10px;
    }
`