import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
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

const AboutUs = () => {
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
          About Us
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
              Who We Are
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              We are a passionate team dedicated to delivering the best grocery
              shopping experience. Our mission is to provide high-quality
              products, fast delivery, and excellent customer service.
            </Typography>
          </StyledPaper>
        </Container>
      </Paper>
    </>
  );
};

export default AboutUs;
