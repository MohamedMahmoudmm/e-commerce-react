import BestSeller from './bestSeller/bestseller';
import ExperienceSection from './section-exp/secionExp';
import ExploreByCategory from './categorySection/cat-section';
import HeroSection from './hero/hero';

function HomePage() {
    return (
        <>
            <HeroSection/>
     <BestSeller/> 
     <ExperienceSection/> 
   <ExploreByCategory/> 
        </>
    );
}

export default HomePage;