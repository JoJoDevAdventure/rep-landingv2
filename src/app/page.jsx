"use client";

import Aides from "@/Components/Aides";
import Hero from "@/Components/Hero";
import NavBar from "@/Components/NavBar";
import Partners from "@/Components/Partners";


const Home = () => {
  return (
    <section>
      <NavBar/>
      <Hero/>
      <Partners/>
      <Aides/>
    </section>
  );
};

export default Home;
