import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html , body{
    width : 100vw;
  }
  body {
    overflow-x: hidden ;
  }
  * { margin : 0 ; padding : 0; box-sizing : border-box;}
  a { text-decoration : none; color : #333; }
  ul,li{list-style : none;}
  button {
    border: none;
    user-select: none;
    outline: none;
    cursor: pointer;
  }
`;