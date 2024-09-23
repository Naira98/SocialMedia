import { Box, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import BigButton from "./BigButton";
import { useLogin } from "../hooks/auth/useLogin";
import { loginFormValues } from "../types/Forms";
import { useAuth } from "../contexts/useAuth";
import useColors from "../hooks/util/useColors";

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
  const { setUserId } = useAuth();
  const { login, isPending } = useLogin(setUserId);
  const { palette } = useColors();

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
            <BigButton disabled={isPending}>LOGIN</BigButton>
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
