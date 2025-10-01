import BestSeller from './bestSeller/bestseller';
import ExperienceSection from './section-exp/secionExp';
import HeroSection from './hero/hero';

function HomePage() {
    return (
        <>
            <HeroSection/>
     <BestSeller/> 
     <ExperienceSection/> 
   {/* <ExploreByCategory/>  */}
        </>
    );
}

export default HomePage;