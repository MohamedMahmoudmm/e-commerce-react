import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import OrderCard from "./orderCard";

const orders = [
  {
    id: "9eg76AiKmWTZgOxJPEbC",
    date: "August 6, 2025",
    status: "canceled",
    total: 112.99,
    products: [
      {
        name: "DANVOY Womens",
        qty: 1,
      image: "./chair.png",
      },
      {
        name: "Casual Denim Jeans",
        qty: 2,
      image: "./chair.png",
      },
    ],
  },
  {
    id: "CzOKTWuR4hCUnX9UXxji",
    date: "August 5, 2025",
    status: "canceled",
    total: 999.99,
    products: [
      {
        name: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
        qty: 1,
      image: "./chair.png",
      },
      {
        name: "Wireless Mechanical Keyboard",
        qty: 1,
      image: "./chair.png",
      },
    ],
  },
];



export default function CanceledOrder() {

 

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
