import logo from './logo.svg';
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
      </Routes>
      
      
      </BrowserRouter>

    </div>
  );
}

export default App;
