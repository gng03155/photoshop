import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  /* @font-face {
    font-family: "Noto Serif";
    font-style: normal;
    src : url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');
    unicode-range:U+0041-005A, U+0061-007A, U+0030-0039;
  } */

  html {
    width : 100%;
    height : 99.99%;
    overflow : hidden;
  }
  body {
    -webkit-overflow-scrolling: touch;
    max-width: 100%;
    height : 100%;
    min-height: 100vh;
    overflow-x: hidden ;
    overflow-y: auto;
    font-family: "Noto Serif",'Noto Sans KR', sans-serif;
    background-color: #fff;
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
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      
  }

  h2{
    padding : 20px 0 40px;
    text-align: center;
    color : #D1B6E1;
  }

`;