import React, { useEffect, useState } from "react";
import { toggleFavorite } from "../../redux/reducers/favReducer";
import {
  IconButton,
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Container,
  InputBase,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../Axios/AxiosInstance";
export default function  ProductCard({item}){
  const favorites = useSelector((state) => state.favorite.items);

  const dispatch = useDispatch();
const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
    function AddToCart(id) {
        axiosInstance.post("/cart", { productId: id, quantity: 1 }).then((res) => {
            console.log(res);
              setSnackbar({
        open: true,
        message: `Product added to cart successfully`,
        severity: "info",
      });
        });
    }

    const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
   

    return(
        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={3}
                          lg={2.4}
                          xl={2}
                          key={item._id}
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
                                onClick={() => dispatch(toggleFavorite(item))}
                                sx={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  bgcolor: "white",
                                  "&:hover": { bgcolor: "grey.100" },
                                }}
                              >
                                <Favorite
                                  sx={{
                                    color: favorites.some((fav) => fav._id === item._id)
                                      ? "red"
                                      : "gray",
                                  }}
                                />
                              </IconButton>
        
                              <CardMedia
                                component="img"
                                height="220"
                                image={item.images[0] || ""}
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
                                {item.category?.cat_name}
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
                                <Rating
                                  value={item.rating || 0}
                                  readOnly
                                  size="small"
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  ml={1}
                                >
                                  ({item.rating || 0}.0)
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
                                  onClick={() => AddToCart(item._id)}
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
                          <Snackbar
                                              open={snackbar.open}
                                              autoHideDuration={4000}
                                              onClose={handleClose}
                                              anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                            >
                                              <Alert
                                                onClose={handleClose}
                                                severity={snackbar.severity}
                                                sx={{ width: "100%" }}
                                              >
                                                {snackbar.message}
                                              </Alert>
                                            </Snackbar>
                        </Grid>
    )
}