import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Button,
  Rating,
  Paper,
} from "@mui/material";
import { ShoppingCart, RemoveRedEye, Close } from "@mui/icons-material";

const WishlistPage = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Salaries Armchair",
      price: 392,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 2,
      name: "Baltzar Chair",
      price: 299,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 3,
      name: "Anjay Chair",
      price: 519,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 4,
      name: "Nyantuy Chair",
      price: 921,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 1,
      name: "Salaries Armchair",
      price: 392,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 2,
      name: "Baltzar Chair",
      price: 299,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 3,
      name: "Anjay Chair",
      price: 519,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 4,
      name: "Nyantuy Chair",
      price: 921,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 1,
      name: "Salaries Armchair",
      price: 392,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 2,
      name: "Baltzar Chair",
      price: 299,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 3,
      name: "Anjay Chair",
      price: 519,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 4,
      name: "Nyantuy Chair",
      price: 921,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 1,
      name: "Salaries Armchair",
      price: 392,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 2,
      name: "Baltzar Chair",
      price: 299,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 3,
      name: "Anjay Chair",
      price: 519,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 4,
      name: "Nyantuy Chair",
      price: 921,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 1,
      name: "Salaries Armchair",
      price: 392,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 2,
      name: "Baltzar Chair",
      price: 299,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 3,
      name: "Anjay Chair",
      price: 519,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=300&h=300&fit=crop",
      category: "Chair",
    },
    {
      id: 4,
      name: "Nyantuy Chair",
      price: 921,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300&h=300&fit=crop",
      category: "Chair",
    },
  ];

  return (
    <>
<Box 
  textAlign="center" 
  sx={{ 
      backgroundColor:"#051a3dff",
      paddingTop: '80px',
      borderRadius: "0px 0px 25px 25px",
  }}
>
  <Typography 
    variant="h3" 
    fontWeight="bold" 
    gutterBottom 
    color="white" // Text color
    sx={{ paddingBottom: '20px' }}
  >
    My Wishlist
  </Typography>
</Box>
    <Paper elevation={0} sx={{ minHeight: "100vh", py: 4,pt:10,   background: ", #ffffffff 100%)" }}>
      <Container maxWidth="xl">
        {/* Header */}
           <Box textAlign="center" mb={3}>
          <Typography variant="h6" color='#2c2c2cff'>
            Your favorite items all in one place
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {wishlistItems.map((item) => (
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
                    <Close />
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
    </>
  );
};
export default WishlistPage;
