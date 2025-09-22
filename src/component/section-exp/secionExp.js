import React from "react";
import { Box, Card, CardMedia, Typography, Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function ExperienceSection() {
  return (
    <Box sx={{ py: 10, px: { xs: 2, md: 10 },display: "flex", alignItems: "center" }}>
        {/* Left Side - Image */}
          <Card
            sx={{
              borderRadius: "20px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
              overflow: "hidden",
              width:"50%"
            }}
          >
            
            <CardMedia
              component="img"
              image="./exp.png"
              alt="Experience"
              sx={{
                width: "100%",
                height: 350,
                objectFit: "cover",
              }}
            />
          </Card>

        {/* Right Side - Text */}
        <Box width={"50%"} px={4} >
            <Typography
            variant="overline"
            sx={{ color: "orange", letterSpacing: 1, fontWeight: "bold" }}
          >
            EXPERIENCES
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            We Provide You The Best Experience
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You don’t have to worry about the result because all of these
            interiors are made by people who are professionals in their fields
            with an elegant and luxurious style and with premium quality
            materials.
          </Typography>

          <Link
            href="#"
            underline="none"
            sx={{
              color: "orange",
              fontWeight: "bold",
              display: "inline-flex",
              alignItems: "center",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            More Info <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          </Link>
        </Box>
          
    </Box>
  );
}
