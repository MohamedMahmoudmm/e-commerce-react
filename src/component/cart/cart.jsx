import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Breadcrumbs,
  Avatar,
  Divider,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Remove,
  Add,
  Close,
} from '@mui/icons-material';
import { getSocket } from "../../redux/reducers/socket";
import { axiosInstance } from '../../Axios/AxiosInstance';

import { useDispatch, useSelector } from 'react-redux';
import {getCart} from '../../redux/reducers/allProductReducer';


const ShoppingCart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [cartItems, setCartItems] = useState([]);
const [subTotal, setSubTotal] = useState(0);
 const [total,setTotal] =useState(0);
 const [qty, setQty] = useState(1);
 const [cartId, setCartId] = useState("");
  
  
 const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "error" | "warning" | "info" | "success"
  });
 const { translations, lang } = useSelector((state) => state.language);
   const dispatch = useDispatch();
  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
useEffect(() => {
 
 getCart().then((res) => {
    console.log(res.data);
    setCartItems(res.data.data.items);
    setCartId(res.data.data._id);
    console.log(cartId);
    
  })
},[])

useEffect(() => {

    const TotalPrice = cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
    setSubTotal(TotalPrice);
    setTotal(TotalPrice-100);
},[cartItems])

function handleQuantityChange(productId, quantity) {
  if (quantity < 1) {
    return;
  }
  console.log(productId, quantity);
  

  axiosInstance.put(`cart/${cartId}`, { productId: productId, quantity: quantity }).then((res) => {
      const updatedCartItems = cartItems.map((item) => {
    if (item.productId._id === productId) {
      return {
        ...item,
        quantity,
      };
    }
    return item;
  });
  setCartItems(updatedCartItems);
  }).catch((err) => {
   if (err.response) {
          setSnackbar({
            open: true,
            message: err.response.data.message || "Something went wrong",
            severity: "error",
          });
        } else if (err.request) {
          setSnackbar({
            open: true,
            message: "Network error. Please check your connection.",
            severity: "error",
          });
        } else {
          setSnackbar({
            open: true,
            message: "Unexpected error: " + err.message,
            severity: "error",
          });
        }
      });
}

function removeItem(productId) {
  axiosInstance.delete(`cart/${productId}`).then((res) => {
    const updatedCartItems = cartItems.filter((item) => item.productId._id !== productId);
    setCartItems(updatedCartItems);
  }).catch((err) => {
   if (err.response) {
          setSnackbar({
            open: true,
            message: err.response.data.message || "Something went wrong",
            severity: "error",
          });
        } else if (err.request) {
          setSnackbar({
            open: true,
            message: "Network error. Please check your connection.",
            severity: "error",
          });
        } else {
          setSnackbar({
            open: true,
            message: "Unexpected error: " + err.message,
            severity: "error",
          });
        }
      });
}

//////////////////////////////
function placeOrder() {
  
  axiosInstance.post("cart/order", { shippingAddress: "fayoum" }).then((res) => {
    setSnackbar({
            open: true,
            message: "Order placed successfully",
            severity: "success",
          });
          setCartItems([]);
      const myId= localStorage.getItem("userId");
  getSocket().emit("order-placed", {
  userId: myId,
  orderId: res.data.data._id,
  message: "I placed a new order",
});
  }).catch((err) => {
   if (err.response) {
          setSnackbar({
            open: true,
            message: err.response.data.message || "Something went wrong",
            severity: "error",
          });
        } else if (err.request) {
          setSnackbar({
            open: true,
            message: "Network error. Please check your connection.",
            severity: "error",
          });
        } else {
          setSnackbar({
            open: true,
            message: "Unexpected error: " + err.message,
            severity: "error",
          });
        }
  })


}



  // Static values - no calculations
  const shipping = 0.00;
  const taxes = 0.00;
  const couponDiscount = -100.00;
 

  const OrderSummary = () => {
  const { translations, lang } = useSelector((state) => state.language);
  const dispatch = useDispatch();
    return(
      <Card sx={{ height: 'fit-content', boxShadow: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
         {translations?.Order_Summary}
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: '14px' }}>{translations?.Items}</Typography>
            <Typography sx={{ fontWeight: 500 }}>{cartItems.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: '14px' }}>{translations?.Subtotal}</Typography>
            <Typography sx={{ fontWeight: 500 }}>${subTotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: '14px' }}>{translations?.Shipping}</Typography>
            <Typography sx={{ fontWeight: 500 }}>${shipping.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: '14px' }}>{translations?.Tax}</Typography>
            <Typography sx={{ fontWeight: 500 }}>${taxes.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography color="text.secondary" sx={{ fontSize: '14px' }}>{translations?.Coupon_Discount}</Typography>
            <Typography sx={{ fontWeight: 500, color: 'success.main' }}>
              ${couponDiscount.toFixed(2)}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>{translations?.Total}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>${total.toFixed(2)}</Typography>
        </Box>
        
        <Button 
        disabled={cartItems.length === 0}
          variant="contained" 
          fullWidth 
          sx={{ 
            backgroundColor: '#051a3dff',
            '&:hover': { backgroundColor: '#051a3dff' },
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 600
          }}
          onClick={placeOrder}
          >
          {translations?.Checkout}
        </Button>
      </CardContent>
    </Card>
  );
}








  return (
  <Box sx={{ minHeight: "100vh", bgcolor: "#f9f9f9" }}>
  {/* Header Section */}
  <Box
    sx={{
      background: "linear-gradient(135deg, #051a3d 0%, #0d2a5c 100%)",
      py: { xs: 4, md: 6 },
      mb: 4,
    }}
  >
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 700,
          color: "white",
          fontSize: { xs: "1.8rem", md: "2.5rem" },
        }}
      >
        {translations?.Shopping_Cart}
      </Typography>
    </Container>
  </Box>

  {/* Main Content */}
  <Container maxWidth="lg">
    <Grid container spacing={4}>
      {/* Cart Items */}
      <Grid item xs={12} lg={8}>
        {isMobile ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {cartItems.map((item) => (
              <Card
                key={item.productId._id}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                  bgcolor: "white",
                }}
              >
                {/* Top Row (Image + Title + Remove) */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Avatar
                    src={item.productId.images[0]}
                    variant="rounded"
                    sx={{ width: 70, height: 70 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {item.productId.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.85rem" }}
                    >
                      {item.productId.category.cat_name}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
                      ${item.productId.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => removeItem(item.productId._id)}
                    sx={{ color: "error.main" }}
                  >
                    <Close />
                  </IconButton>
                </Box>

                {/* Quantity + Subtotal */}
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(
                          item.productId._id,
                          item.quantity - 1
                        )
                      }
                      size="small"
                      sx={{ border: "1px solid #ddd" }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography sx={{ fontWeight: 600 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                      size="small"
                      sx={{ border: "1px solid #ddd" }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ boxShadow: 4, borderRadius: 3 }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#ff7b00" }}>
                  <TableCell sx={{ color: "white", fontWeight: 600 }}>
                    {translations?.Product}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    {translations?.Price}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    {translations?.Quantity}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    {translations?.Subtotal}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow
                    key={item.productId._id}
                    sx={{ "&:hover": { bgcolor: "#f9f9f9" } }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Avatar
                          src={item.productId.images[0]}
                          variant="rounded"
                          sx={{ width: 60, height: 60 }}
                        />
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            {item.productId.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "0.85rem" }}
                          >
                            {item.productId.category.cat_name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      ${item.productId.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        <IconButton
                          onClick={() =>
                            handleQuantityChange(
                              item.productId._id,
                              item.quantity - 1
                            )
                          }
                          size="small"
                          sx={{ border: "1px solid #ddd" }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          onClick={() =>
                            handleQuantityChange(
                              item.productId._id,
                              item.quantity + 1
                            )
                          }
                          size="small"
                          sx={{ border: "1px solid #ddd" }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      ${(item.productId.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => removeItem(item.productId._id)}
                        sx={{ color: "error.main" }}
                      >
                        <Close />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>

      {/* Order Summary */}
    <Grid
  item
  xs={12}
  lg={4}
  sx={{
    order: { xs: 2, lg: 2 },
  }}
>
  <Box
    sx={{
      p: 3,
      borderRadius: 3,
      boxShadow: 3,
      bgcolor: "white",
      width: { xs: "100%", sm: "100%", lg: "100%" },
      mt: { xs: 3, lg: 0 }, 
    }}
  >
        <OrderSummary />
          </Box>

      </Grid>
    </Grid>
  </Container>
</Box>

  );
};

export default ShoppingCart;