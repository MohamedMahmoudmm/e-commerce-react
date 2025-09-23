import logo from './logo.svg';
import './App.css';
import NavBar from './component/navbar/navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductDetailsPage from './component/productDetails/details';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './component/homePage';
import Dashboard from './component/adminDashboard/dashBoard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
       <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
      
      
      </BrowserRouter>
    
   
    {/* <ProductDetailsPage/> */}
   
    </div>
  );
}

export default App;
