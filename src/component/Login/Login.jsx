import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/reducers/authReducer';

// Styles
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
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  backgroundColor: '#ff7b00',
  '&:hover': {
    backgroundColor: '#e06b00',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: '#ff7b00',
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
}));
const StyledLink2 = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: '#5e4dfaff',
  textDecoration: 'underline',
  '&:hover': { color: '#ff0000ff' },
}));
// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  return (
    <>
      <Box sx={{
        bgcolor: '#042968ff',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '20px',
        filter: 'brightness(50%)',
      }}>
        <Typography variant="h3" fontWeight="bold" color="#ffffffff" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Login
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
                dispatch(loginUser(values))
                  .unwrap()
                  .then((res) => {
                    // Redirect based on role
                    if (res.user?.role === 'admin') navigate('/dash');
                    else navigate('/home');
                  })
                  .catch((err) => console.log('Login failed:', err))
                  .finally(() => setSubmitting(false));
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
                    <StyledLink2 to="/forgot-password">Reset password </StyledLink2>

                    {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}

                    <StyledButton type="submit" fullWidth variant="contained" disabled={isSubmitting || loading}>
                      {loading ? 'Logging in...' : 'Sign In'}
                    </StyledButton>

                    <StyledLink to="/signup">Don't have an account? Sign Up</StyledLink>
                    
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
