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
  Snackbar,
  Alert,
} from "@mui/material";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../Axios/AxiosInstance";
import { useNavigate } from "react-router-dom"; // ✅ استيراد useNavigate

export default function ProductCard({ item }) {
  const favorites = useSelector((state) => state.favorite.items);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ إنشاء useNavigate

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  function AddToCart(id, e) {
    e.stopPropagation(); // ✅ منع propagation عشان ما يفتحش تفاصيل
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

  // ✅ دالة التنقل لصفحة التفاصيل
  function goToDetails() {
    navigate(`/viewdetails/${item._id}`);
  }

  return (
    <Grid 
  item 
  xs={12} sm={6} md={4} lg={3} xl={2} 
  display="flex" 
  justifyContent="center"
>
   <Card
    elevation={3}
    sx={{
      width: 240,          // ✅ عرض ثابت
      height: 350,         // ✅ طول ثابت
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      cursor: "pointer",
      transition: "all 0.3s",
      "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
    }}
    onClick={goToDetails}
  >
    {/* الصورة */}
    <Box 
      position="relative" 
      sx={{ height: 200, bgcolor: "#f9f9f9" }}
    >
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleFavorite(item));
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "white",
          "&:hover": { bgcolor: "grey.100" },
          zIndex: 2,
        }}
      >
        <Favorite
          sx={{
            color: favorites.some((fav) => fav._id === item._id) ? "red" : "gray",
          }}
        />
      </IconButton>

      <Box
        component="img"
        src={item.images?.[0] || ""}
        alt={item.name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",  // ✅ الصورة كلها تبان بدون قص
          display: "block",
        }}
      />
    </Box>

    {/* المحتوى */}
    <CardContent sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
        {item.category?.cat_name}
      </Typography>

      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {item.name}
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          ${item.price}
        </Typography>

        <IconButton
          onClick={(e) => AddToCart(item._id, e)}
          sx={{
            bgcolor: "#051a3dff",
            color: "white",
            "&:hover": { bgcolor: "#032259" },
          }}
          size="small"
        >
          <ShoppingCart fontSize="small" />
        </IconButton>
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
  );
}
