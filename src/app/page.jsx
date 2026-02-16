"use client";

import ContactPopup from "@/components/ContactPopup";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useEffect, useState } from "react";

// Dynamically import components with `ssr: false` to disable server-side rendering
const NavBar = dynamic(() => import("@/components/NavBar"), { ssr: false });
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const Partners = dynamic(() => import("@/components/Partners"), { ssr: false });
const ProblemStatement = dynamic(() => import("@/components/ProblemStatement"), { ssr: false });
const IndustryDemos = dynamic(() => import("@/components/IndustryDemos"), { ssr: false });
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { ssr: false });
const IndustryTabs = dynamic(() => import("@/components/IndustryTabs"), { ssr: false });
const SocialProof = dynamic(() => import("@/components/SocialProof"), { ssr: false });
const FinalCTA = dynamic(() => import("@/components/FinalCTA"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const Home = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Handle hash anchor scroll after dynamic components mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const check = () => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };
      // Retry until the element exists (dynamic imports)
      if (!check()) {
        const interval = setInterval(() => {
          if (check()) clearInterval(interval);
        }, 200);
        // Stop trying after 5s
        setTimeout(() => clearInterval(interval), 5000);
      }
    }
  }, []);

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
      <ProblemStatement />
      <IndustryDemos />
      <HowItWorks />
      <IndustryTabs />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Home;
