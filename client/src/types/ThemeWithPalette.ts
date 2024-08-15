import { Theme } from "@emotion/react";

export interface ThemeWithPalette extends Theme {
  palette: {
    mode: "string";
    primary: { [key: string]: string };
    neutral: { [key: string]: string };
    background: { [key: string]: string };
  };
}
export interface palette {
  mode: "string";
  primary: { [key: string]: string };
  neutral: { [key: string]: string };
  background: { [key: string]: string };
}
