"use client";

import dynamic from "next/dynamic";

// Dynamically import components with `ssr: false` to disable server-side rendering
const NavBar = dynamic(() => import("@/Components/NavBar"), { ssr: false });
const Hero = dynamic(() => import("@/Components/Hero"), { ssr: false });
const Partners = dynamic(() => import("@/Components/Partners"), { ssr: false });
const Aides = dynamic(() => import("@/Components/Aides"), { ssr: false });
const AIFuture = dynamic(() => import("@/Components/AIFuture"), { ssr: false });
const IndustriesSection = dynamic(() => import("@/Components/Industries"), { ssr: false });
const IndustriesSectionMobile = dynamic(() => import("@/Components/IndustriesMobile"), { ssr: false });

const Home = () => {
  return (
    <section className="overflow-hidden">
      <NavBar />
      <Hero />
      <Partners />
      <Aides />
      <div>
        <div className="md:hidden">
          <IndustriesSectionMobile />
        </div>
        <div className="hidden md:block">
          <IndustriesSection />
        </div>
      </div>
      <AIFuture />
    </section>
  );
};

export default Home;