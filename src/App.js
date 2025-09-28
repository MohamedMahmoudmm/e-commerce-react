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
import Login from './component/login/Login';
import Register from './component/register/Register';
import WishlistPage from './component/wishlist/WishList.jsx'
import ShoppingCart from './component/cart/cart';
import { useEffect, useState } from 'react';
import { initSocket } from './redux/reducers/socket';
import ConfirmEmail from './component/Register/confirmMail.jsx';
import ResetPassword from './component/resetPass/resetPassword.jsx';
import ForgotPassword from './component/resetPass/forgetPassword.jsx';
import { Alert, Snackbar } from '@mui/material';



function App() {
  const myId = "USER_ID";   // from auth state
  const myRole = "user";    // or "admin"
const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  useEffect(() => {
 const newSocket = initSocket("USER_ID", "user");
    // Register user/admin with server
    newSocket.emit("user-online", { userId: myId, role: myRole });

    // Global listeners
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
  }, [ myId, myRole]);
const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <div className="App">
      <BrowserRouter>
      
       <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/shop" element={<IlanaGrocery />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/adminAllProduct" element={<AdminAllProduct />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/acceptedOrders" element={<AcceptOrder />} />
        <Route path="/pendingOrders" element={<PendingOrder/>} />
        <Route path="/canceledOrders" element={<CanceledOrder />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signup/confirm" element={<ConfirmEmail/>} />
        
        <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<ShoppingCart/>} />
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
