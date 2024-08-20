import { useTheme } from "@emotion/react";
import { Button as ButtonMui } from "@mui/material";
import { palette } from "../types/ThemeWithPalette";

const Button = ({
  onClick,
  disabled,
  isMobileScreen,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  isMobileScreen: boolean;
  children: string;
}) => {
  const { palette } = useTheme() as { palette: palette };
  const primatyMain = palette.primary.main;
  const backAlt = palette.background.alt;

  return (
    <ButtonMui
      disabled={disabled}
      style={
        isMobileScreen
          ? { width: "20%" }
          : { width: "40%", marginTop: "0.5rem" }
      }
      onClick={onClick}
      sx={{
        color: backAlt,
        backgroundColor: primatyMain,
        borderRadius: "3rem",
      }}
    >
      {children}
    </ButtonMui>
  );
};

export default Button;
