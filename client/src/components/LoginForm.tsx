import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Formik } from "formik";
import * as yup from "yup";

import { Palette } from "../types/ThemeWithPalette";
import { useLogin } from "../hooks/auth/useLogin";
import { loginFormValues } from "../types/form";

const initialValuesLogin = {
  email: "",
  password: "",
};
const loginSchema = yup.object().shape({
  email: yup.string().email().required("required"),
  password: yup.string().required("required"),
});
const LoginForm = ({
  setIsLogin,
}: {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { login, isPending } = useLogin();
  const { palette } = useTheme() as { palette: Palette };

  const handleFormSubmit = async (values: loginFormValues) => {
    login({ values });
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit"
              disabled={isPending}
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              LOGIN
            </Button>
            <Typography
              onClick={() => {
                setIsLogin((isLogin: boolean) => !isLogin);
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              Don't have an account? Sign Up here.
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
