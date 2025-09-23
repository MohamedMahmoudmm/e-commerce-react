import logo from './logo.svg';
import './App.css';
import NavBar from './component/navbar/navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BestSeller from './component/bestSeller/bestseller';
import ExperienceSection from './component/section-exp/secionExp';
import ExploreByCategory from './component/categorySection/cat-section';
import ProductCard from './component/shop/shop';

function App() {
  return (
    <div className="App">
    
    {/* <NavBar/>
    <HeroSection/>
    <BestSeller/>
    <ExperienceSection/> */}
    {/*<ExploreByCategory/> */}
    <ProductCard/>
    </div>
  );
}

export default App;
