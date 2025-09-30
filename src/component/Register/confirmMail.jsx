import React from 'react';
import { Box, Typography, Container, Paper, styled } from '@mui/material';

// Styled Paper
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(10),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  borderRadius: '10px',
  backgroundColor: 'rgba(255,255,255,0.9)',
}));

const ConfirmEmail = () => {
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
          sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
        >
          Confirm Your Email
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ minHeight: 'calc(100vh - 300px)', py: 4, backgroundColor: 'transparent' }}>
        <Container maxWidth="xs">
          <StyledPaper>
            <Typography variant="h6" color="#2c2c2c" gutterBottom align="center">
              Thank you for registering! <br />
              Please check your email and click the verification link to complete your registration.
            </Typography>
          </StyledPaper>
        </Container>
      </Paper>
    </>
  );
};

export default ConfirmEmail;
