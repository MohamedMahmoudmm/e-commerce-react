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
} from "@mui/material";
import { useState } from "react";
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
    axiosInstance.put(`orders/${orderId}`, { status: "processing" }).then((res) => {
      dispatch(fetchAllOrders());
      getSocket().emit("order-accepted", {
        userId: userId, // the target user
        message: "Your order has been accepted",
      });

    })
  }
  const statusColors = {
    processing: "success",
    cancelled: "error",
    pending: "warning",
  };
  return (
    <Grid item xs={12} key={order._id}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          {/* Order Header */}
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            spacing={2}
          >
            <Grid item xs={12} md={3}>
              <Typography>
                Order ID:{" "}
                <Typography
                  component="span"
                  fontWeight="bold"
                  color="primary"
                >
                  #{order._id}
                </Typography>
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography variant="body2">
                Order Date: {order.createdAt}
              </Typography>
            </Grid>

            <Grid item xs={12} md={2}>
              <Chip
                label={order.status}
                color={statusColors[order.status]}
                size="small"
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography fontWeight="bold">
                Total: ${order.totalPrice}
              </Typography>
            </Grid>

            {order.status === "pending" && <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={() => AcceptOrder(order._id, order.userId._id)}
              >
                accepte order
              </Button>
            </Grid>}
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => toggleExpand(order._id)}
            >
              {expandedOrder === order._id ? "Hide Details" : "View Details"}
            </Button>
          </Grid>
          <Divider />

          {/* Product List (collapsible) */}
          <Collapse in={expandedOrder === order._id}>
            <Box mt={2}>
              {order.items.map((product, index) => (
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
                    <img
                      src={product.productId.images[0]}
                      alt={product.productId.name}
                      width={70}
                      style={{ borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography fontWeight="bold">
                      {product.productId.name}
                    </Typography>
                    <Typography variant="body2">
                      Qty: {product.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default OrderCard