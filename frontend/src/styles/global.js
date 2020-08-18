import { createGlobalStyle } from 'styled-components';



const globalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    }

  button {
    color: black;
  }
  html, body, #root {
    min-height: 100%;
  }
  body {
    -webkit-font-smoothing: antialised !important;
  }

  body, input, button {
    font-size: 14px;
    font-family: Arial,
  }

  button {
    cursor: pointer;

  }
`;

export default globalStyle;

