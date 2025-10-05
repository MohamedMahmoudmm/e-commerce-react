import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import OrderCard from "./orderCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../redux/reducers/allOrderReducer";

export default function OrdersList() {
  const { translations } = useSelector((state) => state.language);
  const allorders = useSelector((state) => state.allOrders.All_Orders);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  // Get unique users for filter
  const uniqueUsers = [...new Set(allorders.map(order => order.userId?.name).filter(Boolean))];

  // Filter orders
  const filteredOrders = allorders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.userId?.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || order.createdAt.startsWith(selectedDate);
    const matchesUser = !selectedUser || order.userId?.name === selectedUser;
    const matchesStatus = !selectedStatus || order.status === selectedStatus;
    return matchesSearch && matchesDate && matchesUser && matchesStatus;
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedDate("");
    setSelectedUser("");
    setSelectedStatus("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "#051a3dff",
          padding: 4,
          borderRadius: "0px 0px 25px 25px",
          mb: 4,
          pt: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography
          variant="h3"
          color="white"
          textAlign="center"
          sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
        >
          {translations?.Orders || "Orders"}
        </Typography>
      </Box>

      {/* Filters Section */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
          bgcolor: "#fff",
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Search by Order ID or User"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Filter by Date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
              <InputLabel>User</InputLabel>
              <Select
                value={selectedUser}
                label="User"
                onChange={(e) => setSelectedUser(e.target.value)}
                disableScrollLock={true}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">
                  <em>All Users</em>
                </MenuItem>
                {uniqueUsers.map((user) => (
                  <MenuItem key={user} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
                disableScrollLock={true}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">
                  <em>All Status</em>
                </MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem> 
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              fullWidth
              size="small"
              sx={{ borderRadius: "8px", mt: 1 }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Box sx={{ p: 3, flex: 1 }}>
        <Grid container spacing={3} justifyContent="center">
          {filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}