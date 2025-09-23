import logo from './logo.svg';
import './App.css';
import NavBar from './component/navbar/navbar';
import HeroSection from './component/hero/hero';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BestSeller from './component/bestSeller/bestseller';
import ExperienceSection from './component/section-exp/secionExp';
import ExploreByCategory from './component/categorySection/cat-section';
import ProductDetailsPage from './component/productDetails/details';


function App() {
  return (
    <div className="App">
    
    <NavBar/>
    <ProductDetailsPage/>
    {/* <HeroSection/> */}
    {/* <BestSeller/> */}
    {/* <ExperienceSection/> */}
    {/*<ExploreByCategory/> */}
    </div>
  );
}

export default App;
