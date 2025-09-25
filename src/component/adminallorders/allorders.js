import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import OrderCard from "./orderCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../Axios/AxiosInstance";
import { useDispatch } from "react-redux";
import { getAcceptedOrders } from "../../redux/reducers/allProductReducer";




export default function OrdersList() {

const [allorders, setAllOrders] = useState([]);
useEffect(() => {
   axiosInstance.get("orders").then((res) => {
         console.log(res.data)
         setAllOrders(res.data.data)
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
