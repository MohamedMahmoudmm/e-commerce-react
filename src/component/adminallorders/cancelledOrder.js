import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import OrderCard from "./orderCard";
import { useSelector } from "react-redux";

export default function CanceledOrder() {

 const orders=[];
 

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
