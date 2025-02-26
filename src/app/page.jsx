"use client";

import ContactPopup from "@/Components/ContactPopup";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import components with `ssr: false` to disable server-side rendering
const NavBar = dynamic(() => import("@/Components/NavBar"), { ssr: false });
const Hero = dynamic(() => import("@/Components/Hero"), { ssr: false });
const Partners = dynamic(() => import("@/Components/Partners"), { ssr: false });
const Aides = dynamic(() => import("@/Components/Aides"), { ssr: false });
const AIFuture = dynamic(() => import("@/Components/AIFuture"), { ssr: false });
const IndustriesSection = dynamic(() => import("@/Components/Industries"), { ssr: false });
const IndustriesSectionMobile = dynamic(() => import("@/Components/IndustriesMobile"), { ssr: false });
const UnityAide = dynamic(() => import("@/Components/UnityAide"), { ssr: false });
const PerfectFit = dynamic(() => import("@/Components/PerfectFit"), { ssr: false });
const Footer = dynamic(() => import("@/Components/Footer"), { ssr: false });

const Home = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <main className="overflow-hidden">
      <ContactPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
      <NavBar onClickDemo={() => setPopupOpen(true)}/>
      <Hero onClickDemo={() => setPopupOpen(true)} />
      <Partners onClickDemo={() => setPopupOpen(true)}/>
      <Aides onClickDemo={() => setPopupOpen(true)}/>
      <div>
        <div className="md:hidden">
          <IndustriesSectionMobile onClickDemo={() => setPopupOpen(true)}/>
        </div>
        <div className="hidden md:block">
          <IndustriesSection onClickDemo={() => setPopupOpen(true)}/>
        </div>
      </div>
      <AIFuture onClickDemo={() => setPopupOpen(true)}/>
      <UnityAide onClickDemo={() => setPopupOpen(true)}/>
      <PerfectFit onClickDemo={() => setPopupOpen(true)}/>
      <Footer/>
    </main>
  );
};

export default Home;