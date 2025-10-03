import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemAvatar,
  Avatar as MUIAvatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import VerifiedIcon from "@mui/icons-material/Verified";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../Axios/AxiosInstance"; // Import axiosInstance هنا

const UserProfilePage = () => {
  const { translations, lang } = useSelector((state) => state.language);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]); // حالة جديدة للطلبات
  const [loading, setLoading] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true); // تحميل الطلبات
  const [error, setError] = useState(null);
  const [errorOrders, setErrorOrders] = useState(null); // خطأ الطلبات
  const [selectedOrderId, setSelectedOrderId] = useState(null); // ID الطلب المحدد
  const [orderDetails, setOrderDetails] = useState(null); // تفاصيل الطلب الكاملة
  const [loadingDetails, setLoadingDetails] = useState(false); // تحميل تفاصيل الطلب

  // استخدم الـ token من Redux بدلاً من localStorage (أفضل للتوافق)
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setError("No token found. Please login first.");
        setLoading(false);
        return;
      }

      try {
        console.log("Token being sent:", token); // للـ debug
        // استخدم axiosInstance عشان الـ interceptor يضيف الـ header صح (token: ${token})
        const response = await axiosInstance.get("/user/profile");
        setUser(response.data.user);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Unauthorized. Token invalid or expired. Please login again.");
          // امسح التوكن لو غلط
          localStorage.removeItem("token");
        } else {
          setError("Failed to fetch user profile.");
        }
        console.error("Full error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  // useEffect جديد لجلب الطلبات
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!token) {
        setErrorOrders("No token found. Please login first.");
        setLoadingOrders(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/orders/user");
        if (response.data.status === "success") {
          setOrders(response.data.data || []);
        } else {
          setOrders([]);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setErrorOrders("Unauthorized. Token invalid or expired.");
          localStorage.removeItem("token");
        } else {
          setErrorOrders("Failed to fetch user orders.");
        }
        console.error("Orders error:", err.response?.data || err.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchUserOrders();
  }, [token]);

  // دالة لجلب تفاصيل الطلب عند الضغط عليه
  const fetchOrderDetails = async (orderId) => {
    if (!token || !orderId) return;

    setLoadingDetails(true);
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      let order = response.data.data; // بناءً على الـ API response

      // جلب تفاصيل المنتجات لكل item للحصول على الصور والاسم الكامل
      if (order.items && order.items.length > 0) {
        for (let item of order.items) {
          try {
            const prodResponse = await axiosInstance.get(`/products/${item.productId._id}`);
            // افترض أن الـ API يرجع product في data.product أو data، ويحتوي على images array
            // تحسين للتعامل مع هيكل الـ API المحتمل
            const fullProduct = prodResponse.data.data || prodResponse.data.product || prodResponse.data;
            console.log('Full product fetched:', fullProduct); // للـ debug
            item.productId = { ...item.productId, ...fullProduct }; // دمج التفاصيل الكاملة مع productId
            console.log('Updated item.productId:', item.productId); // للـ debug
          } catch (prodErr) {
            console.error(`Failed to fetch product ${item.productId._id}:`, prodErr);
            // إذا فشل، احتفظ بـ productId الأساسي
          }
        }
      }

      setOrderDetails(order);
    } catch (err) {
      console.error("Error fetching order details:", err.response?.data || err.message);
      setOrderDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
    fetchOrderDetails(orderId);
  };

  const handleCloseDialog = () => {
    setSelectedOrderId(null);
    setOrderDetails(null);
  };

  if (loading) {
    return (
      <Box textAlign="center" sx={{ py: 4 }}>
        <Typography>Loading profile...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.href = '/login'}
          sx={{ mt: 2 }}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box textAlign="center" sx={{ py: 4 }}>
        <Typography color="error">User not found.</Typography>
      </Box>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'warning';
      case 'shipped':
        return 'info';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'pending':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Box
        textAlign="center"
        sx={{
          backgroundColor: "#051a3dff",
          paddingTop: "80px",
          borderRadius: "0px 0px 25px 25px",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          color="white"
          sx={{ paddingBottom: "20px" }}
        >
          {translations?.Profile || "Profile"}
        </Typography>
      </Box>
      <Paper
        elevation={0}
        sx={{
          minHeight: "100vh",
          py: 4,
          pt: 10,
          background: "#ffffffff 100%",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} md={5}>
              <Box textAlign="left" mb={3}>
                <Typography variant="h6" color="#2c2c2cff">
                  {translations?.UserProfile || "User Profile"}
                </Typography>
              </Box>

              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: "15px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  maxHeight: 400, 
                  height: "100%",  
                }}
              >
                <Box textAlign="center" mb={3}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      bgcolor: "#051a3dff",
                      fontSize: 50,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 50 }} />
                  </Avatar>
                  {/* <Typography variant="h5" fontWeight="bold" mt={2}>
                    {user.name}
                  </Typography> */}
                </Box>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Name"
                      secondary={user.name}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <CakeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Age"
                      secondary={user.age}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={user.email}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedIcon
                        color={user.isConfirmed ? "success" : "error"}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Verified"
                      secondary={user.isConfirmed ? "Yes" : "No"}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box textAlign="left" mb={3}>
                <Typography variant="h6" color="#2c2c2cff">
                  {translations?.MyOrders || "My Orders"} ({orders.length})
                </Typography>
              </Box>

              {loadingOrders ? (
                <Box textAlign="center" sx={{ py: 4 }}>
                  <Typography>Loading orders...</Typography>
                </Box>
              ) : errorOrders ? (
                <Box textAlign="center" sx={{ py: 4 }}>
                  <Typography color="error">{errorOrders}</Typography>
                </Box>
              ) : orders.length === 0 ? (
                <Box textAlign="center" sx={{ py: 4 }}>
                  <Typography>No orders found.</Typography>
                  <ShoppingCartIcon sx={{ fontSize: 80, color: 'gray', mt: 2 }} />
                </Box>
              ) : (
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 4, 
                    borderRadius: "15px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    maxHeight: 400,
                    overflow: 'auto',
                  }}
                >
                  <List>
                    {orders.map((order) => (
                      <Box key={order._id} mb={2}>
                        <ListItem 
                          button 
                          onClick={() => handleOrderClick(order._id)}
                        >
                          <ListItemIcon>
                            <ShoppingCartIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={`Order #${order._id.substring(order._id.length - 6)}`} 
                            secondary={`Date: ${new Date(order.createdAt).toLocaleDateString()} | Total: $${order.totalPrice}`}
                          />
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                            variant="outlined"
                          />
                        </ListItem>
                        <Divider />
                      </Box>
                    ))}
                  </List>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>

        <Dialog 
          open={!!selectedOrderId} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Order Details #{selectedOrderId?.substring(selectedOrderId.length - 6)}
          </DialogTitle>
          <DialogContent dividers>
            {loadingDetails ? (
              <Box textAlign="center" sx={{ py: 4 }}>
                <Typography>Loading details...</Typography>
              </Box>
            ) : orderDetails ? (
              <Box>
                <Typography variant="h6" gutterBottom>
                  <strong>Status:</strong> 
                  <Chip
                    label={orderDetails.status}
                    color={getStatusColor(orderDetails.status)}
                    size="small"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Date:</strong> {new Date(orderDetails.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Total Price:</strong> ${orderDetails.totalPrice}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Payment Method:</strong> {orderDetails.paymentMethod}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Shipping Address:</strong> {orderDetails.shippingAddress}
                </Typography>
                {orderDetails.items && orderDetails.items.length > 0 && (
                  <Box mt={3}>
                    <Typography variant="h6" gutterBottom>Items:</Typography>
                    <Box mt={2}>
                      {orderDetails.items.map((item, index) => {
                        console.log('Rendering item productId:', item.productId);
                        return (
                          <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            key={index}
                            sx={{
                              mb: 2,
                              pb: 2,
                              borderBottom:
                                index !== orderDetails.items.length - 1
                                  ? "1px solid #eee"
                                  : "none",
                            }}
                          >
                            <Grid item>
                              {item.productId?.images && item.productId.images.length > 0 ? (
                                <img
                                  src={item.productId.images[0]}
                                  alt={item.productId.name}
                                  width={70}
                                  style={{ borderRadius: 8 }}
                                />
                              ) : (
                                <MUIAvatar sx={{ width: 70, height: 70 }}>
                                  <ShoppingCartIcon />
                                </MUIAvatar>
                              )}
                            </Grid>
                            <Grid item xs>
                              <Typography fontWeight="bold">
                                {item.productId?.name || `Item ${index + 1}`}
                              </Typography>
                              <Typography variant="body2">
                                Qty: {item.quantity}
                              </Typography>
                              <Typography variant="body2">
                                Price: ${item.price}
                              </Typography>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Box textAlign="center" sx={{ py: 4 }}>
                <Typography color="error">Failed to load order details.</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  );
};

export default UserProfilePage;