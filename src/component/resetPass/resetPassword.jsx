// ResetPassword.js
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, Container, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/reducers/authReducer";
import { useNavigate, useParams } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: "auto",
  marginTop: theme.spacing(4),
  borderRadius: "10px",
}));

const ResetSchema = Yup.object().shape({
  password: Yup.string().min(6, "Too short").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams(); // ناخد التوكن من URL
  const { loading, error } = useSelector((state) => state.auth);

  const [success, setSuccess] = React.useState("");

  return (
    <Container maxWidth="xs">
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Reset Your Password
        </Typography>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={ResetSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(resetPassword({ token, newPassword: values.password }))
              .unwrap()
              .then((res) => {
                setSuccess(res.message);
                setTimeout(() => navigate("/login"), 2000);
              })
              .catch(() => setSuccess(""))
              .finally(() => setSubmitting(false));
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="New Password"
                name="password"
                type="password"
                margin="normal"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <Field
                as={TextField}
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                margin="normal"
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />

              {error && <Typography color="error">{error}</Typography>}
              {success && <Typography color="primary">{success}</Typography>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting || loading}
                sx={{ mt: 2 }}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </StyledPaper>
    </Container>
  );
};

export default ResetPassword;
