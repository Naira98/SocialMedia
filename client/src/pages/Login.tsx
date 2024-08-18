import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Form from "../components/Form";
import { palette } from "../types/ThemeWithPalette";

const Login = () => {
  const { palette } = useTheme() as { palette: palette };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: `${palette.background.alt}`,
          p: "1rem 6%",
          textAlign: "center",
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          noWrap={true}
        >
          Social Media
        </Typography>
      </Box>

      <Box
        sx={{
          width: "50%",
          backgroundColor: `${palette.background.alt}`,
          p: "2rem",
          m: "2rem auto",
          borderRadius: "1.5rem",
          textAlign: "center",
        }}
      >
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
