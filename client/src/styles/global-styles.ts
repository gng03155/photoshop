import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  html {
    
  }
  body {
    position: relative;
    max-width : 100%;
    min-height: 100vh;
    overflow-x: hidden ;
    font-family: 'Noto Sans KR', sans-serif;
  }
  * { margin : 0 ; padding : 0; -webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;}
  a { text-decoration : none; color : #333; cursor : pointer;}
  ul,li{list-style : none;}
  button {
    border: 1px solid #ececec;
    user-select: none;
    outline: none;
    cursor: pointer;
    background: none;
  }
  input,select{
    outline: none;
    border : 1px solid #ececec;
  }
`;