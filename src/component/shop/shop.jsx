import React from "react";
import {
  IconButton, Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  Paper,
  Container,
  InputBase,
  Rating,
} from "@mui/material";
import AddToCart from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCart, Favorite } from "@mui/icons-material";

import { styled } from "@mui/material/styles";

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
  const products = [
    { id: 1, name: "Sakarias Armchair", category: "Chair", price: 392, rating: 4, image: "./chair.png", }
    , { id: 2, name: "Baltsar Chair", category: "Chair", price: 299, rating: 5, image: "./chair2.png", }
    , { id: 3, name: "Anjay Chair", category: "Chair", price: 519, rating: 4, image: "./chair.png", }
    , { id: 4, name: "Nyantuy Chair", category: "Chair", price: 921, rating: 5, image: "./chair2.png", }
    , { id: 5, name: "Another Chair", category: "Chair", price: 650, rating: 4, image: "./chair.png", }
    , { id:6, name: "Another Chair", category: "Chair", price: 650, rating: 4, image: "./chair.png", }
    ,];
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
          // backgroundImage: "url('./search.jpg')",
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
          //backgroundPosition: "center",
          backgroundColor:"#051a3dff",
          padding: 4,
          textAlign: "center",
          justifyItems: "center",
          borderRadius: "0px 0px 25px 25px",
          mb: 4,
          pt: 10,
        }}
      >
      
      <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
              borderRadius: "30px",
              bgcolor: "rgba(255,255,255,0.2)", // semi-transparent white
              border: "1px solid rgba(255,255,255,0.3)",
              transition: "transform 0.3s ease", // smooth animation
              "&:hover": {
                  transform: "scale(1.05)",       // enlarge by 5% on hover
                  boxShadow: 4,                   // add some elevation on hover
              },
          }}
        >
          <InputBase
            sx={{ ml: 3, flex: 1 ,color:"white"}}
            placeholder="Search"
            inputProps={{ "aria-label": "search furniture" }}
          />
          <IconButton type="submit" sx={{ p: "8px", bgcolor: "#ff7b00", color: "white", borderRadius: "50%" }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Sidebar />

      {/* Main Content */}
      <Paper elevation={0} sx={{ minHeight: "100vh", py: 4,pt:5,   background: ", #ffffffff 100%)" }}>
      <Container maxWidth="xl">
        {/* Header */}
           <Box textAlign="center" mb={3}>
          <Typography variant="h3" color='#2c2c2cff'>
            find your best product
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {products.map((item) => (
            <Grid
              item
              xs={12} 
              sm={6} 
              md={3} 
              lg={2.4} 
              xl={2} 
              key={item.id}
              display="flex"
              justifyContent="center"
            >
              <Card
                elevation={3}
                sx={{
                  width: "100%",
                  maxWidth: {
                    xs: "100%",
                    sm: 300,
                    md: 260,
                    lg: 240,
                    xl: 220,
                  },
                  transition: "all 0.3s",
                  borderRadius: 3,
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box position="relative">
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "white",
                      "&:hover": { bgcolor: "grey.100" },
                    }}
                  >
                    <Favorite />
                  </IconButton>

                  <CardMedia
                    component="img"
                    height="220"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      objectFit: "contain",
                      display: "block",
                      mx: "auto",
                    }}
                  />
                </Box>

                <CardContent sx={{ p: { xs: 3, sm: 2 } }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {item.category}
                  </Typography>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    fontSize={{ xs: 16, sm: 15 }}
                  >
                    {item.name}
                  </Typography>

                  <Box display="flex" alignItems="center" mb={2}>
                    <Rating value={item.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" ml={1}>
                      ({item.rating}.0)
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="text.primary"
                      fontSize={{ xs: 18, sm: 16 }}
                    >
                      ${item.price}
                    </Typography>

                    <Box>
                      <IconButton
                        sx={{
                          bgcolor: "#051a3dff",
                          color: "white",
                          "&:hover": { bgcolor: "primary.dark" },
                        }}
                        size="small"
                      >
                        <ShoppingCart />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={6}>
          <Button
            variant="outlined"
            size="large"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            View All Products
          </Button>
        </Box>
      </Container>
    </Paper>
        </Box>
      
    </Box>
  );
};

export default IlanaGrocery;
