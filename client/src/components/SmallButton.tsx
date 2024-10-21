import { Button } from "@mui/material";
import useColors from "../hooks/util/useColors";

const SmallButton = ({
  disabled,
  children,
}: {
  disabled: boolean;
  children: string;
}) => {
  const { primaryMain, backAlt } = useColors();

  return (
    <Button
      disabled={disabled}
      type='submit'
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
