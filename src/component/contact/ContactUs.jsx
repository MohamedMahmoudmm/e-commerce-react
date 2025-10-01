import React from "react";
import { Box, Typography, Container, Paper, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  backgroundColor: "#ff7b00",
  "&:hover": {
    backgroundColor: "#e06b00",
  },
}));

const ContactUs = () => {
  return (
    <>
      {/* Banner */}
      <Box
        sx={{
          bgcolor: "#042968ff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "200px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "20px",
          filter: "brightness(50%)",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="#ffffffff"
          sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
        >
          Contact Us
        </Typography>
      </Box>

      {/* Content */}
      <Paper
        elevation={0}
        sx={{ minHeight: "calc(100vh - 300px)", py: 4, backgroundColor: "transparent" }}
      >
        <Container maxWidth="md">
          <StyledPaper elevation={3}>
            <Typography variant="h6" color="#2c2c2c" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2 }}>
              Have questions or feedback? Fill out the form below and our team will
              get back to you shortly.
            </Typography>

            <TextField fullWidth label="Your Name" margin="normal" />
            <TextField fullWidth label="Your Email" margin="normal" />
            <TextField
              fullWidth
              label="Your Message"
              margin="normal"
              multiline
              rows={4}
            />

            <StyledButton variant="contained" fullWidth>
              Send Message
            </StyledButton>
          </StyledPaper>
        </Container>
      </Paper>
    </>
  );
};

export default ContactUs;
