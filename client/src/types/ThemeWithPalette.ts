import { Theme, Palette as MUIPalette, TypeBackground } from "@mui/material";

export interface ThemeWithPalette extends Theme {
  palette: Palette
}

export interface Palette extends MUIPalette {
  neutral: {
    dark: string;
    main: string;
    mediumMain: string;
    medium: string;
    light: string;
  };
  background: Background
}

 interface Background extends TypeBackground {
  alt: string;
 }
