import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Button,
  Collapse,
  IconButton,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { ExpandMore, ExpandLess, CheckCircle, Pending, Cancel as CancelIcon, Close, ShoppingCart, Person, LocationOn } from "@mui/icons-material";
import { axiosInstance } from "../../Axios/AxiosInstance";
import { getSocket } from "../../redux/reducers/socket";
import { useDispatch } from "react-redux";
import { fetchAllOrders } from "../../redux/reducers/allOrderReducer";

function OrderCard({ order }) {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const dispatch = useDispatch();

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const AcceptOrder = (orderId, userId) => {
    if (!userId) {
      console.warn("User ID not found for order:", orderId);
      return;
    }
    axiosInstance.put(`orders/${orderId}`, { status: "processing" }).then((res) => {
      dispatch(fetchAllOrders());
      getSocket().emit("order-accepted", {
        userId: userId, 
        message: "Your order has been accepted",
      });
    }).catch((err) => {
      console.error("Error accepting order:", err);
    });
  };


  const CancelOrder = (orderId, userId) => {
    if (!userId) {
      console.warn("User ID not found for order:", orderId);
      return;
    }
    axiosInstance.put(`orders/${orderId}`, { status: "cancelled" }).then((res) => {
      dispatch(fetchAllOrders());
      getSocket().emit("order-cancelled", { 
        userId: userId,
        message: "Your order has been cancelled",
      });
    }).catch((err) => {
      console.error("Error cancelling order:", err);
    });
  };

  const DeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) { 
      axiosInstance.delete(`orders/${orderId}`).then((res) => {
        dispatch(fetchAllOrders()); 
        console.log("Order deleted successfully");
      }).catch((err) => {
        console.error("Error deleting order:", err);
      });
    }
  };

  const statusIcons = {
    processing: <CheckCircle color="success" />,
    cancelled: <CancelIcon color="error" />,
    pending: <Pending color="warning" />,
  };

  const statusColors = {
    processing: "success",
    cancelled: "error",
    pending: "warning",
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={order._id}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
          },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative", 
        }}
      >
        <IconButton
          onClick={() => DeleteOrder(order._id)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            color: "error.main",
            "&:hover": {
              backgroundColor: "error.light",
            },
          }}
        >
          <Close />
        </IconButton>

        <CardContent sx={{ flexGrow: 1 }}>
          {/* Order Header */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
              <Grid item xs={8}>
                <Typography variant="h6" color="primary" gutterBottom>
                  <ShoppingCart fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                  Order #{order._id.substring(0, 8)}...
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <Person fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
                  {order.userId?.name || "Unknown User"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <LocationOn fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
                  {order.shippingAddress || "No Address"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={4} container justifyContent="flex-end">
                <Chip
                  icon={statusIcons[order.status]}
                  label={order.status.toUpperCase()}
                  color={statusColors[order.status]}
                  size="small"
                  sx={{
                    fontWeight: "bold",
                    borderRadius: 2,
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={10}>
                <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
                  Total: ${order.totalPrice?.toFixed(2) || "0.00"}
                </Typography>
              </Grid>
              <Grid item xs={2} container justifyContent="flex-end">
                <IconButton
                  onClick={() => toggleExpand(order._id)}
                  sx={{ color: "primary.main" }}
                >
                  {expandedOrder === order._id ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ mb: 2, display: "flex", gap: 1, justifyContent: "flex-start", flexWrap: "wrap" }}> 
            {order.status === "pending" && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  startIcon={<CheckCircle />}
                  onClick={() => AcceptOrder(order._id, order.userId?._id)}
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Accept Order
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<CancelIcon />}
                  onClick={() => CancelOrder(order._id, order.userId?._id)}
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Cancel Order
                </Button>
              </>
            )}
          </Box>

          {/* Product List (collapsible) */}
          <Collapse in={expandedOrder === order._id} timeout="auto" unmountOnExit>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
              Order Items
            </Typography>
            <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {order.items?.map((product, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      transition: "box-shadow 0.2s",
                      "&:hover": { boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
                    }}
                    elevation={1}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <img
                          src={product.productId?.images?.[0] || "/placeholder-image.jpg"} // Add fallback image if needed
                          alt={product.productId?.name || "Product"}
                          width={60}
                          height={60}
                          style={{ borderRadius: 8, objectFit: "cover" }}
                        />
                      </Grid>
                      <Grid item xs>
                        <Typography fontWeight="bold" variant="body1">
                          {product.productId?.name || "Unknown Product"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {product.quantity || 0} | Price: ${((product.quantity || 0) * (product.productId?.price || 0)).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                )) || <Typography color="text.secondary">No items in this order</Typography>}
              </Box>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default OrderCard;