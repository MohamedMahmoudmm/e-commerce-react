import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import OrderCard from "./orderCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../redux/reducers/allOrderReducer";




export default function OrdersList() {

const allorders = useSelector((state) => state.allOrders.All_Orders);
const dispatch=useDispatch()

useEffect(() => {
      dispatch(fetchAllOrders())
      
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
