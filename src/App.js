import './App.css';
import NavBar from './component/navbar/navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './component/homePage';
import Dashboard from './component/adminDashboard/dashBoard';
import OrdersList from './component/adminallorders/allorders';
import AcceptOrder from './component/adminallorders/acceptedOrder';
import CanceledOrder from './component/adminallorders/cancelledOrder';
import PendingOrder from './component/adminallorders/pendingOrder';
import AdminAllProduct from './component/adminDashboard/AdminAllProduct';
import IlanaGrocery from './component/shop/shop';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import WishlistPage from './component/WishList/WishList';
import ShoppingCart from './component/cart/cart';
import { useEffect, useState } from 'react';
import { initSocket } from './redux/reducers/socket';
import ConfirmEmail from './component/Register/confirmMail.jsx';
import ResetPassword from './component/resetPass/resetPassword.jsx';
import ForgotPassword from './component/resetPass/forgetPassword.jsx';
import { Alert, Snackbar } from '@mui/material';
import ProtectedRoute from './component/ProtectedRoute.js';
import ViewDetails from './component/productDetails/details';
import NotFound from './component/notfound/NotFound.jsx';
import AboutUs from './component/about/AboutUs.jsx';
import ContactUs from './component/contact/ContactUs';
import AddProduct from './component/adminDashboard/addProduct.js';

function App() {
  const myId = localStorage.getItem("userId") ?? "";
  const myRole = localStorage.getItem("role") ?? "";

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const newSocket = initSocket(myId, myRole);
    newSocket.emit("user-online", { userId: myId, role: myRole });

    newSocket.on("notify-admin", (data) => {
      console.log("Admin received new order:", data);
      setSnackbar({
        open: true,
        message: `New order received: ${data.orderId || ""}`,
        severity: "info",
      });
    });

    newSocket.on("notify-user", (data) => {
      setSnackbar({
        open: true,
        message: `Your order was accepted: ${data.orderId || ""}`,
        severity: "success",
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [myId, myRole]);

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signup/confirm" element={<ConfirmEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* User Routes */}
          <Route path="/" element={<ProtectedRoute allowedRoles={["user"]}><HomePage /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute allowedRoles={["user"]}><HomePage /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute allowedRoles={["user"]}><IlanaGrocery /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute allowedRoles={["user"]}><WishlistPage /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute allowedRoles={["user"]}><ContactUs /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute allowedRoles={["user"]}><AboutUs /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute allowedRoles={["user"]}><ShoppingCart /></ProtectedRoute>} />
          <Route path="/viewdetails/:id" element={<ProtectedRoute allowedRoles={["user"]}><ViewDetails /></ProtectedRoute>} />
          {/* Admin Routes */}
          <Route path="/dash" element={<ProtectedRoute allowedRoles={["admin"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/adminAllProduct" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAllProduct /></ProtectedRoute>} />
          <Route path="/addproduct" element={<ProtectedRoute allowedRoles={["admin"]}><AddProduct /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute allowedRoles={["admin"]}><OrdersList /></ProtectedRoute>} />
          <Route path="/acceptedOrders" element={<ProtectedRoute allowedRoles={["admin"]}><AcceptOrder /></ProtectedRoute>} />
          <Route path="/pendingOrders" element={<ProtectedRoute allowedRoles={["admin"]}><PendingOrder /></ProtectedRoute>} />
          <Route path="/canceledOrders" element={<ProtectedRoute allowedRoles={["admin"]}><CanceledOrder /></ProtectedRoute>} />
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </BrowserRouter>
    </div>
  );
}

export default App;