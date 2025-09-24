import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// Custom styled Paper
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white to see background
}));

// Custom styled Button
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  backgroundColor: '#ff7b00', // From previous code
  '&:hover': {
    backgroundColor: '#e06b00', // Darker shade
  },
}));

// Custom styled Link
const StyledLink = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: '#ff7b00', // Match button color
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
});

const Login = () => {
  return (
    <>
      {/* Title Section with Darkened Background Image */}
      <Box
        sx={{
         bgcolor: '#000000ff', // From previous code
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '200px', // Adjust height to show the background
          display: 'flex',
          alignItems: 'flex-end', // Title at the bottom
          justifyContent: 'center',
          paddingBottom: '20px',
          filter: 'brightness(50%)', // Darken the image
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="#ffffffff" // Black text
          sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} // Shadow for readability
        >
          Sign In
        </Typography>
      </Box>
      <Paper elevation={0} sx={{ minHeight: 'calc(100vh - 300px)', py: 4, backgroundColor: 'transparent' }}>
        <Container maxWidth="xs">
          <StyledPaper elevation={3}>
            <Typography variant="h6" color="#2c2c2c" gutterBottom>
              Login to your account
            </Typography>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log('Login values:', values);
                setSubmitting(false);
                // Add API call logic here
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Box sx={{ mt: 1 }}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Email Address"
                      name="email"
                      variant="outlined"
                      margin="normal"
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      variant="outlined"
                      margin="normal"
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                    <StyledButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting}
                    >
                      Sign In
                    </StyledButton>
                    <StyledLink to="/register">
                      Don't have an account? Sign Up
                    </StyledLink>
                  </Box>
                </Form>
              )}
            </Formik>
          </StyledPaper>
        </Container>
      </Paper>
    </>
  );
};

export default Login;