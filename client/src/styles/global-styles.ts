import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html , body{
    width : 100vw;
  }
  * { margin : 0 ; padding : 0; box-sizing : border-box;}
  a { text-decoration : none; color : #333; }
  ul,li{list-style : none;}
`;