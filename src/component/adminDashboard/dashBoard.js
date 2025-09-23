import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ p: 4, bgcolor: "#f6f8fb", minHeight: "100vh" }}>
      {/* Title */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
        Manage Your Shop
      </Typography>

      {/* Top Summary Cards */}
      <Grid container spacing={3} alignItems="stretch" justifyContent={"center"} sx={{ mb: 5 }}>
  {[
    { label: "All Products", value: "19", color: "#f44336" },
    { label: "All Orders", value: "7", color: "#fb8c00" },
    { label: "All Users", value: "6 user", color: "#26a69a" },
    { label: "Add Product", value: "", color: "#1e3a8a" },
  ].map((item, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Card
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
        <Button variant="outlined" size="small">
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
        <Button variant="outlined" size="small" color="success">
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
        <Button variant="outlined" size="small" color="error">
          View All
        </Button>
      </Card>
    </Box>
  );
};

export default Dashboard;
