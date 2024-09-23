import { Button } from "@mui/material";
import useColors from "../hooks/util/useColors";

const BigButton = ({
  disabled,
  children,
}: {
  disabled: boolean;
  children: string;
}) => {
  const { primaryMain, backAlt } = useColors();

  return (
    <Button
      fullWidth
      type="submit"
      disabled={disabled}
      sx={{
        m: "2rem 0",
        p: "1rem",
        backgroundColor: primaryMain,
        color: backAlt,
        "&:hover": { color: primaryMain },
      }}
    >
      {children}
    </Button>
  );
};

export default BigButton;
