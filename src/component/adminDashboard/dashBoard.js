import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import { fetchAllProducts } from "../../redux/reducers/allProductReducer";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
//getAllProduct
//getAllOrders
const [allProduct, setAllProduct] = useState([]);
const [allorders, setAllOrders] = useState([]);
 const all_Product = useSelector((state) => state.allProduct.All_Product);

const dispatch=useDispatch()

  useEffect(() => {
      dispatch(fetchAllProducts())
      
  }, []);
   useEffect(() => {
        setAllProduct(all_Product);
      }, [all_Product]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/orders",{headers:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGFkNzQzMTM1YTM2Mzc1OTllNDIzYjkiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6Im1tMzc3MDY2OEBnbWFpbC5jb20iLCJpYXQiOjE3NTg2NTYwMTQsImV4cCI6MTc1ODc0MjQxNH0.A333zpTZjmroo-b3NBVWnEIpETyG14yzLrDfOuY8H0A"}}).then((res) => {
      console.log(res.data)
      setAllOrders(res.data.data)
    })
  }, []);




  return (
    <Box sx={{ p: 4, bgcolor: "#f6f8fb", minHeight: "100vh" }}>
      {/* Title */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
        Manage Your Shop
      </Typography>

      {/* Top Summary Cards */}
      <Grid container spacing={1} alignItems="stretch" justifyContent={"space-around"} sx={{ mb: 5 }}>
  {[
    { label: "All Products", value: allProduct.length, color: "#f44336",route:"/adminAllProduct" },
    { label: "All Orders", value: allorders.length, color: "#fb8c00",route:"/orders" },
    { label: "All Users", value: "6 user", color: "#26a69a" },
    { label: "Add Product", value: "", color: "#1e3a8a" },
  ].map((item, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}  >
      <Card component={Link} to={item.route??""}
        sx={{
          bgcolor: item.color,
          color: "white",
          borderRadius: "12px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          <Typography
            variant={index === 3 ? "h6" : "subtitle1"}
            fontWeight="bold"
          >
            {item.label}
          </Typography>
          {item.value && (
            <Typography variant="h4" fontWeight="bold">
              {item.value}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>


      {/* Orders Section */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
        All Orders
      </Typography>

      {/* Pending Orders */}
      <Card sx={{ mb: 2, borderRadius: "16px", p: 2 }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
        >
          <Typography>Pending Orders</Typography>
          <Typography variant="body2" color="text.secondary">
            0 pending
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={0}
          sx={{ height: 6, borderRadius: 3, mb: 2 }}
        />
        <Button variant="outlined" size="small" component={Link}
  to="/pendingOrders">
          View All
        </Button>
      </Card>

      {/* Accepted Orders */}
      <Card sx={{ mb: 2, borderRadius: "16px", p: 2 }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
        >
          <Typography>Accepted Orders</Typography>
          <Typography variant="body2" color="success.main">
            2 accepted
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={40}
          sx={{
            height: 6,
            borderRadius: 3,
            mb: 2,
            "& .MuiLinearProgress-bar": {
              bgcolor: "success.main",
            },
          }}
        />
        <Button variant="outlined" size="small" color="success" component={Link}
  to="/acceptedOrders">
          View All
        </Button>
      </Card>

      {/* Canceled Orders */}
      <Card sx={{ mb: 2, borderRadius: "16px", p: 2 }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
        >
          <Typography>Canceled Orders</Typography>
          <Typography variant="body2" color="error.main">
            5 canceled
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={70}
          sx={{
            height: 6,
            borderRadius: 3,
            mb: 2,
            "& .MuiLinearProgress-bar": {
              bgcolor: "error.main",
            },
          }}
        />
        <Button variant="outlined" size="small" color="error" component={Link}
  to="/canceledOrders">
          View All
        </Button>
      </Card>
    </Box>
  );
};

export default Dashboard;
