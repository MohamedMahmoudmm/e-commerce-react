import './App.css';
import NavBar from './component/navbar/navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductDetailsPage from './component/productDetails/details';
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
import WishlistPage from './component/wishlist/WishList.jsx';
import ShoppingCart from './component/cart/cart';
import { useEffect, useState } from 'react';
import { initSocket } from './redux/reducers/socket';
import ConfirmEmail from './component/register/confirmMail.jsx';
import ResetPassword from './component/resetPass/resetPassword.jsx';
import ForgotPassword from './component/resetPass/forgetPassword.jsx';
import { Alert, Snackbar } from '@mui/material';
import ProtectedRoute from './component/ProtectedRoute.js';

function App() {
  const myId = "USER_ID"; 
  const myRole = "user";   

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const newSocket = initSocket("USER_ID", "user");
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signup/confirm" element={<ConfirmEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><IlanaGrocery /></ProtectedRoute>} />
          <Route path="/dash" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/adminAllProduct" element={<ProtectedRoute><AdminAllProduct /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrdersList /></ProtectedRoute>} />
          <Route path="/acceptedOrders" element={<ProtectedRoute><AcceptOrder /></ProtectedRoute>} />
          <Route path="/pendingOrders" element={<ProtectedRoute><PendingOrder /></ProtectedRoute>} />
          <Route path="/canceledOrders" element={<ProtectedRoute><CanceledOrder /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><ShoppingCart /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductDetailsPage /></ProtectedRoute>} />
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
