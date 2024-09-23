import { useTheme } from "@emotion/react";
import { Palette } from "../../types/ThemeWithPalette";

export default function useColors() {
    const { palette } = useTheme() as { palette: Palette };

    return {
        palette,
        primaryDark: palette.primary.dark,
        primaryMain: palette.primary.main,
        primaryLight: palette.primary.light,
        neutralDark: palette.neutral.dark,
        neutralMain: palette.neutral.main,
        neutralMedMain: palette.neutral.mediumMain,
        neutralMed: palette.neutral.medium,
        neutralLight: palette.neutral.light,
        backDef: palette.background.default,
        backAlt: palette.background.alt,
    }
}