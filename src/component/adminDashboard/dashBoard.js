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
import { fetchAllProducts } from "../../redux/reducers/allProductReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../redux/reducers/allOrderReducer";
import {
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const Dashboard = () => {

  const allorders = useSelector((state) => state.allOrders.All_Orders);
  const allProduct = useSelector((state) => state.allProduct.All_Product);
  const [acceptedorders, setAcceptedOrders] = useState([]);
  const [pendingdorders, setPendingOrders] = useState([]);
  const [cancelledorders, setCancelledOrders] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
    dispatch(fetchAllOrders())

  }, []);

  useEffect(() => {
    const processingOrders = allorders.filter(order => order.status === "processing");
    const pendingOrders = allorders.filter(order => order.status === "pending");
    const cancelledOrders = allorders.filter(order => order.status === "cancelled");
    setAcceptedOrders(processingOrders);
    setPendingOrders(pendingOrders);
    setCancelledOrders(cancelledOrders);
  }, [allorders]);

  return (
    <>
      {/* Banner */}
      <Box
        sx={{
          bgcolor: "#042968ff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: "150px", md: "200px" },
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "20px",
          filter: "brightness(50%)",
          width: "100%",
          mx: 0,
          px: 0
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="#ffffffff"
          sx={{ 
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            letterSpacing: "1px"
          }}
        >
          Manage Your Shop
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: "#ffffff", minHeight: "calc(100vh - 200px)" }}>
        {/* Top Summary Cards */}
        <Grid container spacing={{ xs: 2, sm: 3 }} alignItems="stretch" justifyContent="center" sx={{ mb: { xs: 4, md: 6 } }}>
          {[
            { 
              label: "All Products", 
              value: allProduct.length, 
              color: "#ef4444", 
              gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              icon: <InventoryIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 } }} />,
              route: "/adminAllProduct" 
            },
            { 
              label: "All Orders", 
              value: allorders.length, 
              color: "#f59e0b", 
              gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              icon: <ShoppingCartIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 } }} />,
              route: "/orders" 
            },
            { 
              label: "All Users", 
              value: "6 users", 
              color: "#10b981", 
              gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              icon: <PeopleIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 } }} />,
              route: "" 
            },
            { 
              label: "Add Product", 
              value: "", 
              color: "#1d4ed8", 
              gradient: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
              icon: <AddIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 } }} />,
              route: "" 
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Card 
                component={Link} 
                to={item.route ?? ""}
                sx={{
                  bgcolor: "transparent",
                  background: item.gradient,
                  color: "white",
                  borderRadius: { xs: "16px", md: "24px" },
                  width: { xs: "100%", sm: "280px", md: "300px" },
                  height: { xs: "240px", sm: "280px", md: "320px" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 15px 50px rgba(0,0,0,0.2)",
                  },
                  position: "relative",
                  overflow: "hidden",
                  mx: "auto",
                  "::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: { xs: "16px", md: "24px" },
                    zIndex: 0,
                  }
                }}
              >
                <CardContent sx={{ width: "100%", position: "relative", zIndex: 1, p: { xs: 2, md: 4 } }}>
                  <Box sx={{ mb: { xs: 1.5, md: 3 } }}>{item.icon}</Box>
                  <Typography
                    variant={index === 3 ? "h5" : "h6"}
                    fontWeight="bold"
                    sx={{ 
                      mb: { xs: 1, md: 2 }, 
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                      letterSpacing: "0.5px",
                      lineHeight: 1.2
                    }}
                  >
                    {item.label}
                  </Typography>
                  {item.value && (
                    <Typography 
                      variant="h2" 
                      fontWeight="bold"
                      sx={{ 
                        fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3.2rem" },
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                        lineHeight: 1
                      }}
                    >
                      {item.value}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Orders Section */}
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          sx={{ 
            mb: { xs: 3, md: 4 }, 
            color: "#1e40af",
            textAlign: "center",
            letterSpacing: "1px",
            fontSize: { xs: "1.3rem", md: "2rem" }
          }}
        >
          All Orders
        </Typography>

        {/* Pending Orders */}
        <Card sx={{ 
          mb: 3, 
          borderRadius: { xs: "12px", md: "20px" }, 
          p: { xs: 2, md: 3 },
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "translateY(-2px)" },
          border: "1px solid #e5e7eb",
          bgcolor: "#f9fafb"
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1, sm: 0 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTimeIcon sx={{ color: "#f59e0b", fontSize: { xs: 24, md: 28 } }} />
              <Typography variant="h6" fontWeight="bold" color="#111827">
                Pending Orders
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="bold" color="#f59e0b">
              {pendingdorders.length} pending
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={allorders.length > 0 ? (pendingdorders.length / allorders.length * 100) : 0}
            sx={{ 
              height: 8, 
              borderRadius: 4, 
              mb: 3,
              backgroundColor: "#f3f4f6",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                bgcolor: "#f59e0b",
              },
            }}
          />
          <Button 
            variant="contained" 
            size="medium" 
            sx={{ 
              borderRadius: { xs: "16px", md: 20 },
              textTransform: "none",
              fontWeight: "bold",
              px: { xs: 2, md: 3 },
              bgcolor: "#f59e0b",
              "&:hover": { bgcolor: "#d97706" }
            }}
            component={Link}
            to="/pendingOrders"
          >
            View All
          </Button>
        </Card>

        {/* Accepted Orders */}
        <Card sx={{ 
          mb: 3, 
          borderRadius: { xs: "12px", md: "20px" }, 
          p: { xs: 2, md: 3 },
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "translateY(-2px)" },
          border: "1px solid #e5e7eb",
          bgcolor: "#f9fafb"
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1, sm: 0 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleIcon sx={{ color: "#10b981", fontSize: { xs: 24, md: 28 } }} />
              <Typography variant="h6" fontWeight="bold" color="#111827">
                Accepted Orders
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="bold" color="#10b981">
              {acceptedorders.length} accepted
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={allorders.length > 0 ? (acceptedorders.length / allorders.length * 100) : 0}
            sx={{ 
              height: 8, 
              borderRadius: 4, 
              mb: 3,
              backgroundColor: "#f3f4f6",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                bgcolor: "#10b981",
              },
            }}
          />
          <Button 
            variant="contained" 
            size="medium" 
            sx={{ 
              borderRadius: { xs: "16px", md: 20 },
              textTransform: "none",
              fontWeight: "bold",
              px: { xs: 2, md: 3 },
              bgcolor: "#10b981",
              "&:hover": { bgcolor: "#059669" }
            }}
            component={Link}
            to="/acceptedOrders"
          >
            View All
          </Button>
        </Card>

        {/* Canceled Orders */}
        <Card sx={{ 
          mb: 3, 
          borderRadius: { xs: "12px", md: "20px" }, 
          p: { xs: 2, md: 3 },
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "translateY(-2px)" },
          border: "1px solid #e5e7eb",
          bgcolor: "#f9fafb"
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1, sm: 0 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 24, md: 28 } }} />
              <Typography variant="h6" fontWeight="bold" color="#111827">
                Canceled Orders
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="bold" color="#ef4444">
              {cancelledorders.length} canceled
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={allorders.length > 0 ? (cancelledorders.length / allorders.length * 100) : 0}
            sx={{ 
              height: 8, 
              borderRadius: 4, 
              mb: 3,
              backgroundColor: "#f3f4f6",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                bgcolor: "#ef4444",
              },
            }}
          />
          <Button 
            variant="contained" 
            size="medium" 
            sx={{ 
              borderRadius: { xs: "16px", md: 20 },
              textTransform: "none",
              fontWeight: "bold",
              px: { xs: 2, md: 3 },
              bgcolor: "#ef4444",
              "&:hover": { bgcolor: "#dc2626" }
            }}
            component={Link}
            to="/canceledOrders"
          >
            View All
          </Button>
        </Card>
      </Box>
    </>
  );
};

export default Dashboard;