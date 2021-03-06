import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  html {
    width : 100%;
  }
  body {
    max-width: 100%;
    width : 100%;
    min-height: 100vh;
    overflow-x: hidden;
    font-family: "Noto Serif",'Noto Sans KR', sans-serif;
    
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