import "styled-components";
import { Color } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    color: Color;
  }
}
