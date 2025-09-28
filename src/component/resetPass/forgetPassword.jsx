// ForgotPassword.js
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, Container, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/reducers/authReducer";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: "auto",
  marginTop: theme.spacing(4),
  borderRadius: "10px",
}));

const ForgotSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [success, setSuccess] = React.useState("");

  return (
    <Container maxWidth="xs">
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Forgot Password
        </Typography>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(forgotPassword(values.email))
              .unwrap()
              .then((res) => setSuccess(res.message))
              .catch(() => setSuccess(""))
              .finally(() => setSubmitting(false));
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Email Address"
                name="email"
                margin="normal"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
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
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </Form>
          )}
        </Formik>
      </StyledPaper>
    </Container>
  );
};

export default ForgotPassword;
