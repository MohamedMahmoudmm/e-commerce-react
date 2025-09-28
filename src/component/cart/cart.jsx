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

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
useEffect(() => {
 
  axiosInstance.get("cart").then((res) => {
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
      const myId="68b55492d5d84e2d00569838"
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
 

  const OrderSummary = () => (
    <Card sx={{ height: 'fit-content', boxShadow: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Order Summary
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: '14px' }}>Items</Typography>
            <Typography sx={{ fontWeight: 500 }}>{cartItems.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: '14px' }}>Sub Total</Typography>
            <Typography sx={{ fontWeight: 500 }}>${subTotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: '14px' }}>Shipping</Typography>
            <Typography sx={{ fontWeight: 500 }}>${shipping.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: '14px' }}>Taxes</Typography>
            <Typography sx={{ fontWeight: 500 }}>${taxes.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography color="text.secondary" sx={{ fontSize: '14px' }}>Coupon Discount</Typography>
            <Typography sx={{ fontWeight: 500, color: 'success.main' }}>
              ${couponDiscount.toFixed(2)}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
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
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Dark Header Section */}
      <Box sx={{ 
        backgroundColor: '#051a3dff', 
        py: 6,
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600, 
                mb: 3,
                color: 'white',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Shopping Cart
            </Typography>
            <Breadcrumbs 
              separator="/" 
              sx={{ 
                justifyContent: 'center', 
                display: 'flex',
                '& .MuiBreadcrumbs-separator': {
                  color: '#bdc3c7',
                  mx: 1
                }
              }}
            >
            </Breadcrumbs>
          </Box>
        </Container>
      </Box>

      {/* Main Content with Light Background */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 4 }}>
        <Container maxWidth="lg">

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} lg={8}>
            {isMobile ? (
              // Mobile View - Cards
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {cartItems.map((item) => (
                  <Card key={item.productId.id} sx={{ p: 3, boxShadow: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <IconButton 
                        onClick={() => removeItem(item.productId._id)}
                        size="small" 
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        <Close />
                      </IconButton>
                      <Avatar 
                        src={item.productId.images[0]} 
                        sx={{ width: 60, height: 60 }}
                        variant="rounded"
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
                          {item.productId.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Color: {item.productId.color}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          ${item.productId.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                          size="small" 
                          sx={{ 
                            border: '1px solid #ddd',
                            borderRadius: 1,
                            width: 32,
                            height: 32
                          }}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 3, minWidth: 20, textAlign: 'center', fontWeight: 500 }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                          size="small" 
                          sx={{ 
                            border: '1px solid #ddd',
                            borderRadius: 1,
                            width: 32,
                            height: 32
                          }}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        ${item.productId.price*item.quantity.toFixed(2)}
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            ) : (
              // Desktop View - Table
              <TableContainer 
                component={Paper} 
                sx={{ 
                  boxShadow: 3, 
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#ffa726' }}>
                      <TableCell 
                        sx={{ 
                          color: 'white', 
                          fontWeight: 600,
                          fontSize: '16px',
                          py: 2
                        }}
                      >
                        Product
                      </TableCell>
                      <TableCell 
                        align="center"
                        sx={{ 
                          color: 'white', 
                          fontWeight: 600,
                          fontSize: '16px',
                          py: 2
                        }}
                      >
                        Price
                      </TableCell>
                      <TableCell 
                        align="center"
                        sx={{ 
                          color: 'white', 
                          fontWeight: 600,
                          fontSize: '16px',
                          py: 2
                        }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell 
                        align="center"
                        sx={{ 
                          color: 'white', 
                          fontWeight: 600,
                          fontSize: '16px',
                          py: 2
                        }}
                      >
                        Subtotal
                      </TableCell>
                      <TableCell sx={{ width: 50 }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.productId.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                        <TableCell sx={{ py: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar 
                              src={item.productId.images[0]} 
                              sx={{ width: 60, height: 60 }}
                              variant="rounded"
                            />
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
                                {item.productId.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                category: {item.productId.category.cat_name}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            ${item.productId.price.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton 
                              onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                              size="small" 
                              sx={{ 
                                border: '1px solid #ddd',
                                borderRadius: 1,
                                width: 32,
                                height: 32,
                                mr: 1
                              }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography sx={{ mx: 2, minWidth: 20, textAlign: 'center', fontWeight: 500 }}>
                              {item.quantity}
                            </Typography>
                            <IconButton 
                              onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                              size="small" 
                              sx={{ 
                                border: '1px solid #ddd',
                                borderRadius: 1,
                                width: 32,
                                height: 32,
                                ml: 1
                              }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            ${item.productId.price*item.quantity.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton 
                          onClick={() => removeItem(item.productId._id)}
                          sx={{ '&:hover': { color: 'error.main' } }}>
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
          <Grid item xs={12} lg={4} >
            <OrderSummary />
          </Grid>
        </Grid>
        </Container>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShoppingCart;