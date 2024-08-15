import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { ThemeWithPalette } from "../types/ThemeWithPalette";
import Form from "../components/Form";

const Login = () => {
  const theme: ThemeWithPalette = useTheme();

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Social Media
        </Typography>
      </Box>

      <Box
        width="50%"
        backgroundColor={theme.palette.background.alt}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        textAlign="center"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Social Media
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
