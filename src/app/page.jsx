"use client";

import Aides from "@/Components/Aides";
import Hero from "@/Components/Hero";
import IndustriesSection from "@/Components/Industries";
import IndustriesSectionMobile from "@/Components/IndustriesMobile";
import NavBar from "@/Components/NavBar";
import Partners from "@/Components/Partners";


const Home = () => {
  return (
    <section>
      <NavBar/>
      <Hero/>
      <Partners/>
      <Aides/>
      <div>
        <div className="md:hidden">
          <IndustriesSectionMobile/>
        </div>
        <div className="hidden md:block">
          <IndustriesSection/>
        </div>
      </div>
    </section>
  );
};

export default Home;
