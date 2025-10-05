import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import OrderCard from "./orderCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../redux/reducers/allOrderReducer";

export default function AcceptOrder() {
  const allorders = useSelector((state) => state.allOrders.All_Orders);
  const [acceptedOrders, setAcceptedOrders] = useState([]); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    const acceptedOrders = allorders.filter(order => order.status === "processing");
    setAcceptedOrders(acceptedOrders);
  }, [allorders]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Accepted Orders 
      </Typography>

      <Grid container spacing={3} justifyContent={"center"}>
        {acceptedOrders.map((order) => ( 
          <OrderCard key={order._id} order={order} />
        ))}
      </Grid>
    </Box>
  );
}