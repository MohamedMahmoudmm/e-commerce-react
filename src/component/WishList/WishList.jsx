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
import { ShoppingCart, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {toggleFavorite} from "../../redux/reducers/favReducer";
import ProductCard from "../productCard/productCard";




const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.favorite.items);
    const dispatch = useDispatch();
  const handleRemove = (item) => {
    dispatch(toggleFavorite(item));
  };
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
           <ProductCard key={item._id} item={item} />
          ))}
        </Grid>

  
      </Container>
    </Paper>
    </>
  );
};
export default WishlistPage;
