import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import OrderCard from "./orderCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllOrders } from "../../redux/reducers/allOrderReducer";

export default function CanceledOrder() {
  const allorders = useSelector((state) => state.allOrders.All_Orders);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    const cancelledOrders = allorders.filter(order => order.status === "cancelled");
    setOrders(cancelledOrders);
  }, [allorders]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Cancelled Orders 
      </Typography>

      <Grid container spacing={3} justifyContent={"center"}>
        {orders.map((order) => (
         <OrderCard key={order._id} order={order} />
        ))}
      </Grid>
    </Box>
  );
}