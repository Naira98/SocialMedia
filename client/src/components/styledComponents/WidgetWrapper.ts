import { Box, styled } from "@mui/material";
import { palette } from "../../types/ThemeWithPalette";

const WidgetWrapper = styled(Box)(({ palette }: {palette: palette}) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: palette.background.alt,
  borderRadius: "0.75rem",
}));

export default WidgetWrapper;
