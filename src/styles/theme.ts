import { DefaultTheme, createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    box-sizing : border-box;
  }

  a {
    text-decoration : none;
    color:inherit;
  }
  
  body {}
`;

const color = {
  black: "#111",
  white: "#fff",
};

export type Color = typeof color;

export const theme: DefaultTheme = {
  color,
};
