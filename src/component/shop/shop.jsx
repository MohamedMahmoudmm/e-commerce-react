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
  InputBase,
  Rating,
} from "@mui/material";
import AddToCart from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
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
          backgroundColor: "#f9e7c3",
          padding: 4,
          textAlign: "center",
          justifyItems: "center",
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
            sx={{ ml: 3, flex: 1 ,color:"black"}}
            placeholder="Search"
            inputProps={{ "aria-label": "search furniture" }}
          />
          <IconButton type="submit" sx={{ p: "8px", bgcolor: "#ff7b00", color: "white", borderRadius: "50%" }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}><Sidebar />

      {/* Main Content */}
      <Box sx={{ p: { xs: 2, sm: 3 } }} justifyContent="center">
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center" >
          Best Selling Product </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ px: { xs: 0, sm: 4, md: 6 } }} >
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.10)", height: "100%", }} >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CardMedia component="img" image={product.image} alt={product.name}
                    sx={{ height: 200, objectFit: "contain", p: 2, bgcolor: "#F7F7F7", }} />
                </Box>
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography variant="body2" color="text.secondary"> {product.category}
                  </Typography> <Typography variant="subtitle1" fontWeight="bold"> {product.name}
                  </Typography>
                  <Rating value={product.rating} readOnly size="small" sx={{ mt: 1, mb: 1 }} />
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1, }} >
                    <Typography variant="h6" fontWeight="bold"> ${product.price}

                    </Typography>
                    <IconButton sx={{ bgcolor: "#001f54", color: "white", "&:hover": { bgcolor: "#003080" }, }} >
                      <AddToCart />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>))}
        </Grid>
      </Box>
        </Box>
      
    </Box>
  );
};

export default IlanaGrocery;
