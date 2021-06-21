import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html , body{
    width : 100vw;
    min-height: 100vh;
  }
  body {
    overflow-x: hidden ;
  }
  * { margin : 0 ; padding : 0; box-sizing : border-box;}
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