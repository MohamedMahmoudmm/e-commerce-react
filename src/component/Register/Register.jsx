import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/reducers/authReducer';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  borderRadius: '10px',
  backgroundColor: 'rgba(255,255,255,0.9)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  backgroundColor: '#ff7b00',
  '&:hover': { backgroundColor: '#e06b00' },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: '#ff7b00',
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
}));

// Validation schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Name too short').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth || {});

  return (
    <>
      <Box
        sx={{
          bgcolor: '#042968ff',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '20px',
          filter: 'brightness(50%)',
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="#ffffffff"
          sx={{ textShadow: '2px 2px 4px #051a3dff)' }}
        >
          Sign Up
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ minHeight: 'calc(100vh - 300px)', py: 4, backgroundColor: 'transparent' }}>
        <Container maxWidth="xs">
          <StyledPaper>
            <Typography variant="h6" color="#2c2c2c" gutterBottom>
              Create your account
            </Typography>

          <Formik
  initialValues={{ name: '', email: '', password: '', confirmPassword: '', age: '' }}
  validationSchema={Yup.object().shape({
    name: Yup.string().min(3, 'Name too short').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password too short').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    age: Yup.number().min(1, 'Age must be positive').nullable(), // Age optional
  })}
  onSubmit={(values, { setSubmitting }) => {
    const { confirmPassword, ...data } = values; // remove confirmPassword
    const payload = {
      ...data,
      role: 'user', // ثابت
      age: data.age ? Number(data.age) : undefined,
    };

    dispatch(registerUser(payload))
      .unwrap()
      .then(() => navigate('/signup/confirm'))
      .catch((err) => console.log('Register failed:', err))
      .finally(() => setSubmitting(false));
  }}
>
  {({ errors, touched, isSubmitting }) => (
    <Form>
      <Box sx={{ mt: 1 }}>
        <Field
          as={TextField}
          fullWidth
          label="Name"
          name="name"
          variant="outlined"
          margin="normal"
          error={touched.name && !!errors.name}
          helperText={touched.name && errors.name}
        />
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
        <Field
          as={TextField}
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          variant="outlined"
          margin="normal"
          error={touched.confirmPassword && !!errors.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
        />
        <Field
          as={TextField}
          fullWidth
          label="Age (optional)"
          name="age"
          type="number"
          variant="outlined"
          margin="normal"
          error={touched.age && !!errors.age}
          helperText={touched.age && errors.age}
        />

        {/* عرض أي خطأ من الباك */}
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {typeof error === 'string' ? error : JSON.stringify(error)}
          </Typography>
        )}

        <StyledButton type="submit" fullWidth variant="contained" disabled={isSubmitting || loading}>
          {loading ? 'Registering...' : 'Sign Up'}
        </StyledButton>

        <StyledLink to="/login">
          Already have an account? Sign In
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

export default Register;
