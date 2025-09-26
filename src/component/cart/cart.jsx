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
  Link,
  Avatar,
  Divider,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Remove,
  Add,
  Close,
  Home
} from '@mui/icons-material';
import {io} from "socket.io-client";

const ShoppingCart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
const myId="68b55492d5d84e2d00569838"
const myRole="user"
   const [socket, setSocket] = useState(null);
useEffect(() => {
  const newSocket = io("http://127.0.0.1:3000");
  setSocket(newSocket);

  // Example: myId = user._id, role = "user" or "admin"
  newSocket.emit("user-online", { userId: myId, role: myRole });

  return () => {
    newSocket.disconnect();
  };
}, [myId, myRole]);
///////////////////////////////////////
useEffect(() => {
  if (!socket) return;

  socket.on("notify-admin", (data) => {
    console.log("Admin received new order:", data);
    //showNotification(`📦 New order from User ${data.from}: ${data.message}`);
  });

  socket.on("notify-user", (data) => {
    console.log("User got order accepted:", data);
    //showNotification(`✅ Your order was accepted: ${data.message}`);
  });

  return () => {
    socket.off("notify-admin");
    socket.off("notify-user");
  };
}, [socket]);
//////////////////////////////
function placeOrder() {
//   socket.emit("order-placed", {
//   userId: myId,
//   orderId: "123",
//   message: "I placed a new order",
// });
}

  const cartItems = [
    {
      id: 1,
      name: 'Wooden Sofa Chair',
      color: 'Grey',
      price: 80.00,
      quantity: 4,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop&crop=center',
      subtotal: 320.00
    },
    {
      id: 2,
      name: 'Red Gaming Chair',
      color: 'Black',
      price: 90.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=80&h=80&fit=crop&crop=center',
      subtotal: 180.00
    },
    {
      id: 3,
      name: 'Swivel Chair',
      color: 'Light Brown',
      price: 60.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=80&h=80&fit=crop&crop=center',
      subtotal: 60.00
    },
    {
      id: 4,
      name: 'Circular Sofa Chair',
      color: 'Brown',
      price: 90.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=80&h=80&fit=crop&crop=center',
      subtotal: 180.00
    }
  ];

  // Static values - no calculations
  const totalItems = 9;
  const subTotal = 740.00;
  const shipping = 0.00;
  const taxes = 0.00;
  const couponDiscount = -100.00;
  const total = 640.00;

  const OrderSummary = () => (
    <Card sx={{ height: 'fit-content', boxShadow: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Order Summary
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: '14px' }}>Items</Typography>
            <Typography sx={{ fontWeight: 500 }}>{totalItems}</Typography>
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
                  <Card key={item.id} sx={{ p: 3, boxShadow: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <IconButton 
                        size="small" 
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        <Close />
                      </IconButton>
                      <Avatar 
                        src={item.image} 
                        sx={{ width: 60, height: 60 }}
                        variant="rounded"
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Color: {item.color}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
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
                        ${item.subtotal.toFixed(2)}
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
                      <TableRow key={item.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                        <TableCell sx={{ py: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar 
                              src={item.image} 
                              sx={{ width: 60, height: 60 }}
                              variant="rounded"
                            />
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Color: {item.color}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            ${item.price.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton 
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
                            ${item.subtotal.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton sx={{ '&:hover': { color: 'error.main' } }}>
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
    </Box>
  );
};

export default ShoppingCart;