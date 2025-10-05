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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar as MUIAvatar,
} from "@mui/material";
import { useState } from "react";
import { ExpandMore, ExpandLess, CheckCircle, Pending, Cancel as CancelIcon, Close, ShoppingCart, Person, LocationOn } from "@mui/icons-material";
import { axiosInstance } from "../../Axios/AxiosInstance";
import { getSocket } from "../../redux/reducers/socket";
import { useDispatch } from "react-redux";
import { fetchAllOrders } from "../../redux/reducers/allOrderReducer";

function OrderCard({ order }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const dispatch = useDispatch();

  const toggleExpand = () => {
    setOpenDialog(true);
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
    axiosInstance.delete(`orders/${orderId}`).then((res) => {
      dispatch(fetchAllOrders()); 
      console.log("Order deleted successfully");
      setOpenDeleteConfirm(false);
      setOrderToDelete(null);
    }).catch((err) => {
      console.error("Error deleting order:", err);
    });
  };

  const handleDeleteClick = (orderId) => {
    setOrderToDelete(orderId);
    setOpenDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (orderToDelete) {
      DeleteOrder(orderToDelete);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteConfirm(false);
    setOrderToDelete(null);
  };

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

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
          onClick={() => handleDeleteClick(order._id)}
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
                <Button
                  onClick={toggleExpand}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    color: "primary.main", 
                    borderColor: "primary.main",
                    minWidth: 'auto',
                    textTransform: 'none',
                    fontSize: '0.75rem',
                    "&:hover": {
                      borderColor: "primary.dark",
                      bgcolor: "primary.light"
                    }
                  }}
                >
                  More Details
                </Button>
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
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Order Details #{order._id.substring(order._id.length - 6)}
        </DialogTitle>
        <DialogContent dividers>
          <Box>
            <Typography variant="h6" gutterBottom>
              <strong>Status:</strong> 
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                size="small"
                variant="outlined"
                sx={{ ml: 1 }}
              />
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Total Price:</strong> ${order.totalPrice?.toFixed(2) || "0.00"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Shipping Address:</strong> {order.shippingAddress || "No Address"}
            </Typography>
            {order.items && order.items.length > 0 && (
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>Items:</Typography>
                <Box mt={2}>
                  {order.items.map((item, index) => (
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      key={index}
                      sx={{
                        mb: 2,
                        pb: 2,
                        borderBottom:
                          index !== order.items.length - 1
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
                            <ShoppingCart />
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
                          Price: ${((item.quantity || 0) * (item.productId?.price || 0)).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={openDeleteConfirm} 
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this order? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default OrderCard;