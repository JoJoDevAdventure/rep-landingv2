"use client";

import dynamic from "next/dynamic";
import Script from "next/script";
import { useState } from "react";
import ContactPopup from "../components/ContactPopup";

// Dynamically import components with `ssr: false` to disable server-side rendering
const NavBar = dynamic(() => import("../components/NavBar"), { ssr: false });
const Hero = dynamic(() => import("../components/Hero"), { ssr: false });
const Partners = dynamic(() => import("../components/Partners"), { ssr: false });
const Aides = dynamic(() => import("../components/Aides"), { ssr: false });
const AIFuture = dynamic(() => import("../components/AIFuture"), { ssr: false });
const IndustriesSection = dynamic(() => import("../components/Industries"), {
  ssr: false,
});
const IndustriesSectionMobile = dynamic(
  () => import("../components/IndustriesMobile"),
  { ssr: false }
);
const UnityAide = dynamic(() => import("../components/UnityAide"), {
  ssr: false,
});
const PerfectFit = dynamic(() => import("../components/PerfectFit"), {
  ssr: false,
});
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

const Home = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <main className="overflow-hidden">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Replicaide",
            url: "https://replicaide.com",
            logo: "https://replicaide.com/logo.png",
            sameAs: [
              "https://twitter.com/ReplicaideAI",
              "https://linkedin.com/company/replicaide",
              "https://facebook.com/Replicaide",
            ],
          }),
        }}
      />
      <ContactPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
      <NavBar onClickDemo={() => setPopupOpen(true)} />
      <Hero onClickDemo={() => setPopupOpen(true)} />
      <Partners onClickDemo={() => setPopupOpen(true)} />
      <Aides onClickDemo={() => setPopupOpen(true)} />
      <div>
        <div className="md:hidden">
          <IndustriesSectionMobile onClickDemo={() => setPopupOpen(true)} />
        </div>
        <div className="hidden md:block">
          <IndustriesSection onClickDemo={() => setPopupOpen(true)} />
        </div>
      </div>
      <AIFuture onClickDemo={() => setPopupOpen(true)} />
      <UnityAide onClickDemo={() => setPopupOpen(true)} />
      <PerfectFit onClickDemo={() => setPopupOpen(true)} />
      <Footer />
    </main>
  );
};

export default Home;
