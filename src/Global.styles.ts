import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "KBO-Dia-Gothic_medium", sans-serif;
    letter-spacing: -0.02em;
  }
  @font-face {
    font-family: "KBO-Dia-Gothic_bold";
    src: url("/fonts/KBO-Dia-Gothic_bold.woff") format("woff");
    font-weight: 400;
  }
  @font-face {
    font-family: "KBO-Dia-Gothic_light";
    src: url("/fonts/KBO-Dia-Gothic_light.woff") format("woff");
    font-weight: 400;
  }
  @font-face {
    font-family: "KBO-Dia-Gothic_medium";
    src: url("/fonts/KBO-Dia-Gothic_medium.woff") format("woff");
    font-weight: 400;
  }
`;
