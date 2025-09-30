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
          cursor: "pointer", // ✅ يوضح إنه قابل للنقر
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-4px)",
          },
        }}
        onClick={goToDetails} // ✅ إضافة التنقل عند الضغط على الكارد
      >
        <Box position="relative">
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); // ✅ يمنع التنقل عند الضغط على Favorite
              dispatch(toggleFavorite(item));
            }}
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
  image={item.images[0] || ""}
  alt={item.name}
  sx={{
    width: "100%",        // الصورة تملأ عرض الكارد
    height: "220px",      // نفس الارتفاع لكل الصور
    objectFit: "cover", // الصورة كلها تظهر بدون قص
    backgroundColor: "#f9f9f9", // لون خلفية خفيف للفراغات
    display: "block",
    mx: "auto",
  }}
/>

        </Box>

        <CardContent sx={{ p: { xs: 3, sm: 2 } }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
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
                onClick={(e) => AddToCart(item._id, e)} // ✅ إضافة event parameter
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
  );
}
