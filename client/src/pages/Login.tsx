import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import Form from "../components/Form";
import FlexBetween from "../components/styledComponents/FlexBetween";
import useColors from "../hooks/util/useColors";

const Login = () => {
  const { backAlt } = useColors();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div style={{ position: "sticky", top: "0", left: "0", zIndex: "99" }}>
        <FlexBetween
          style={{
            padding: "1rem 6%",
            backgroundColor: backAlt,
            gap: "1.5rem",
          }}
        >
          <FlexBetween style={{ gap: "15px" }}>
            <img
              src="/logo.png"
              alt="logo"
              style={{ width: "55px", cursor: "pointer" }}
            />
            <Typography
              fontWeight="bold"
              fontSize="clamp(1.5rem, 2rem, 2.5rem)"
              color="primary"
              noWrap={true}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Social Media
            </Typography>
          </FlexBetween>
        </FlexBetween>
      </div>

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
    </>
  );
};

export default Login;
