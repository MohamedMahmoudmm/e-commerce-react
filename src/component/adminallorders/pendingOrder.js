import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import OrderCard from "./orderCard";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllOrders } from "../../redux/reducers/allOrderReducer";
export default function PendingOrder() {

  const allorders = useSelector((state) => state.allOrders.All_Orders);
  const [pendingdorders, setPendingOrders] = useState([]);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

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
         <OrderCard key={order._id} order={order} />
        ))}
      </Grid>
    </Box>
  );
}