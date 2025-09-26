import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import OrderCard from "./orderCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AcceptOrder() {
  const allorders = useSelector((state) => state.allOrders.All_Orders);
  const [orders, setPendingOrders] = useState([]);

  useEffect(() => {
    const pendingOrders = allorders.filter(order => order.status === "processing");
    setPendingOrders(pendingOrders);
  }, [allorders]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Orders
      </Typography>

      <Grid container spacing={3} justifyContent={"center"}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </Grid>
    </Box>
  );
}
