import { Box, Typography } from "@mui/material";
import Form from "../components/Form";
import useColors from "../hooks/util/useColors";

const Login = () => {
  const { backAlt } = useColors();

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: `${backAlt}`,
          p: "1rem 6%",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: "60px", cursor: "pointer" }}
        />
        <Typography
          fontWeight="bold"
          fontSize="38px"
          color="primary"
          noWrap={true}
        >
          Social Media
        </Typography>
      </Box>

      <Box
        sx={{
          width: "50%",
          backgroundColor: `${backAlt}`,
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
