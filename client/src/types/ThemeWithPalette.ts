import {
  Theme,
  Palette as MUIPalette,
  TypeBackground,
  PaletteColor,
} from "@mui/material";

export interface ThemeWithPalette extends Theme {
  palette: Palette;
}

export interface Palette extends MUIPalette {
  primary: Primary;
  neutral: {
    dark: string;
    main: string;
    medMain: string;
    medium: string;
    light: string;
  };
  background: Background;
}

interface Background extends TypeBackground {
  alt: string;
}

interface Primary extends PaletteColor {
  medMain: string;
}