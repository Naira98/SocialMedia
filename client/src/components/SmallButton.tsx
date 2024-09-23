import { Button } from "@mui/material";
import { MouseEvent } from "react";
import useColors from "../hooks/util/useColors";

const SmallButton = ({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  children: string;
}) => {
  const { primaryMain, backAlt } = useColors();

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      sx={{
        paddingX: "1rem",
        backgroundColor: primaryMain,
        color: backAlt,
        "&:hover": { color: primaryMain },
        borderRadius: "3rem",
      }}
    >
      {children}
    </Button>
  );
};

export default SmallButton;

// <ButtonMui
//   disabled={disabled}
//   style={
//     isMobileScreen
//       ? { width: "20%" }
//       : { width: "40%", marginTop: "0.5rem" }
//   }
//   onClick={onClick}
//   sx={{
//     color: backAlt,
//     backgroundColor: primatyMain,
//     borderRadius: "3rem",
//   }}
// >
//   {children}
// </ButtonMui>
