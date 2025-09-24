import './App.css';
import NavBar from './component/navbar/navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductDetailsPage from './component/productDetails/details';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './component/homePage';
import Dashboard from './component/adminDashboard/dashBoard';
import WishListPage from './component/WishList/WishList';
import OrdersList from './component/adminallorders/allorders';
import AcceptOrder from './component/adminallorders/acceptedOrder';
import CanceledOrder from './component/adminallorders/cancelledOrder';
import PendingOrder from './component/adminallorders/pendingOrder';
import AdminAllProduct from './component/adminDashboard/AdminAllProduct';
import IlanaGrocery from './component/shop/shop';
import Login from './component/Login/Login';
import Register from './component/Register/Register';



function App() {
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
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      
      
      </BrowserRouter>

    </div>
  );
}

export default App;
