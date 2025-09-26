import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import OrderCard from "./orderCard";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function PendingOrder() {

  const allorders = useSelector((state) => state.allOrders.All_Orders);
  const [pendingdorders, setPendingOrders] = useState([]);
  
  useEffect(() => {
      const pendingOrders = allorders.filter(order => order.status === "pending");
      setPendingOrders(pendingOrders);
  }, [allorders]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Orders
      </Typography>

      <Grid container spacing={3} justifyContent={"center"}>
        {pendingdorders.map((order) => (
         <OrderCard key={order.id} order={order} />
        ))}
      </Grid>
    </Box>
  );
}
