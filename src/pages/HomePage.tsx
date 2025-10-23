import DivisionSection from "@/components/modules/homePage/DivisionSection";
import FeaturedTours from "@/components/modules/homePage/FeaturedTours";
import HeroSection from "@/components/modules/homePage/HeroSection";
import NewsLetterSection from "@/components/modules/homePage/NewsLetterSection";
import ReviewSection from "@/components/modules/homePage/ReviewSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedTours />
      <DivisionSection />
      <ReviewSection />
      <NewsLetterSection />
    </div>
  );
};

export default HomePage;
