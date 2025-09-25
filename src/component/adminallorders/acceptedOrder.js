import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import OrderCard from "./orderCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../Axios/AxiosInstance";
import { useSelector } from "react-redux";

export default function AcceptOrder() {
const orders=useSelector((state) => state.acceptedOrder.acceptOrder);

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
