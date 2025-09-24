import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import OrderCard from "./orderCard";
import { useEffect, useState } from "react";
import axios from "axios";




export default function OrdersList() {

const [allorders, setAllOrders] = useState([]);

useEffect(() => {
    axios.get("http://127.0.0.1:3000/orders",{headers:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGFkNzQzMTM1YTM2Mzc1OTllNDIzYjkiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1tMzc3MDY2OEBnbWFpbC5jb20iLCJpYXQiOjE3NTg2NTYwMTQsImV4cCI6MTc1ODc0MjQxNH0.A333zpTZjmroo-b3NBVWnEIpETyG14yzLrDfOuY8H0A"}}).then((res) => {
      console.log(res.data)
       setAllOrders(res.data.data)
      // console.log(allorders);
      
    })
  }, []);
 

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Orders
      </Typography>

      <Grid container spacing={3} justifyContent={"center"}>
        {allorders.map((order) => (
         <OrderCard key={order._id} order={order} />
        ))}
      </Grid>
    </Box>
  );
}
