import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="primary">
        404
      </Typography>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Page Not Found
      </Typography>

      <Typography variant="body1" sx={{ mb: 3, maxWidth: 500 }}>
        Sorry, the page you are looking for does not exist. It might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ borderRadius: 3, px: 4, py: 1.5 }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
}
