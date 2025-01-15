import React from "react";
import HeroSection from "../Components/hero_home";
import FeaturesSection from "../Components/feature";
import TestimonialsSection from "../Components/Opinions_home";
import Footer from "../Components/footer";
import Header from "../Components/Header";
import Infos from "../Components/infos_home";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Infos />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
