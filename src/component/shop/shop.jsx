import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  Rating,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  borderRadius: 8,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const ProductCard = ({ image, title, price, rating, brand }) => (
  <StyledCard
    sx={{
      width: { xs: "100%", sm: "45%", md: "200px" }, // full width on mobile, 2 in a row on tablets, fixed on desktop
      margin: { xs: "10px 0", sm: "10px" },
      position: "relative",
    }}
  >
    <CardMedia component="img" height="140" image={image} alt={title} />
    <CardContent>
      <Typography variant="body2" color="#ff7b00">
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Rating value={rating} readOnly size="small" />
        <Typography variant="caption" color="#ff7b00" sx={{ ml: 1 }}>
          By {brand}
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ mt: 1 }}>
        ${price}
      </Typography>
      <Button variant="contained" color="success" sx={{ mt: 1 }}>
        Add
      </Button>
    </CardContent>
  </StyledCard>
);

const Sidebar = () => (
  <Box
    sx={{
      width: { xs: "100%", md: "250px" }, // full width on small, sidebar on desktop
      padding: 2,
      backgroundColor: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      mb: { xs: 2, md: 0 }, // margin bottom only on mobile
    }}
  >
    <Typography variant="h6">Filters</Typography>
    <Box sx={{ mt: 2 }}>
      <Typography>Price Range</Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Typography>$0</Typography>
        <Box sx={{ flexGrow: 1, mx: 1 }}>
          <Box
            sx={{ width: "100%", height: "5px", backgroundColor: "#e0e0e0" }}
          />
        </Box>
        <Typography>$1,000</Typography>
      </Box>
    </Box>
    <Box sx={{ mt: 2 }}>
      <Typography>Color</Typography>
      <Box>
        <input type="checkbox" id="red" />
        <label htmlFor="red">Red</label>
      </Box>
      <Box>
        <input type="checkbox" id="green" />
        <label htmlFor="green">Green</label>
      </Box>
      <Box>
        <input type="checkbox" id="blue" />
        <label htmlFor="blue">Blue</label>
      </Box>
    </Box>
    <Box sx={{ mt: 2 }}>
      <Typography>Condition</Typography>
      <Box>
        <input type="checkbox" id="new" />
        <label htmlFor="new">New</label>
      </Box>
      <Box>
        <input type="checkbox" id="used" />
        <label htmlFor="used">Used</label>
      </Box>
    </Box>
    <Button variant="contained" color="primary" sx={{ mt: 2, width: "100%" }}>
      Apply Filters
    </Button>
  </Box>
);

const IlanaGrocery = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Newsletter Section */}
      <Box
        sx={{
          backgroundColor: "#f9e7c3",
          padding: 4,
          textAlign: "center",
          borderRadius: 8,
          mb: 4,
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Don't Miss Amazing Deals
        </Typography>
        <Typography variant="h6" color="#ff7b00" gutterBottom>
          Subscribe to Our Newsletter
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Your Email"
            sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 }, width: { xs: "100%", sm: "300px" } }}
          />
          <Button variant="contained" color="success">
            Subscribe
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexGrow: 1,
        }}
      >
        {/* Sidebar */}
        <Box sx={{ mr: { md: 2 }, mt: 2 }}>
          <Sidebar />
        </Box>

        {/* Products */}
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Popular Products
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              mt: 2,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <ProductCard
              image="https://via.placeholder.com/150"
              title="Organic Quinoa"
              price="28.85"
              rating={4.0}
              brand="NestFood"
            />
            <ProductCard
              image="https://via.placeholder.com/150"
              title="Italian Meatballs"
              price="52.85"
              rating={3.5}
              brand="Stouffer"
            />
            <ProductCard
              image="https://via.placeholder.com/150"
              title="Sweet & Salty Popcorn"
              price="48.85"
              rating={4.0}
              brand="StarKist"
            />
            <ProductCard
              image="https://via.placeholder.com/150"
              title="Crispy Chicken"
              price="17.85"
              rating={4.0}
              brand="NestFood"
            />
            <ProductCard
              image="https://via.placeholder.com/150"
              title="Almonds Lightly"
              price="23.85"
              rating={4.0}
              brand="NestFood"
            />
          </Box>
          <Typography variant="h5" color="primary" sx={{ mt: 4 }}>
            New Products
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default IlanaGrocery;
