"use client";
import dynamic from "next/dynamic";
import Script from "next/script";
import Footer from "../../components/Footer";
import AsrData from "./AsrData";
import MarketComparison from "./MarketComparaison";
import WordErrorRateChart from "./WordErrorChart";

// Dynamically import components with `ssr: false` to disable server-side rendering
const LiveTranscription = dynamic(() => import("./LiveTranscription"), {
  ssr: false,
});
const ComparisonChart = dynamic(() => import("./Comparison"), { ssr: false });
const NavBar = dynamic(() => import("../../components/NavBar"), { ssr: false });

const page = () => {
  return (
    <main>
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
      <NavBar />
      <LiveTranscription />
      <ComparisonChart />
      <MarketComparison />
      <WordErrorRateChart />
      <AsrData/>
      
      <Footer />
    </main>
  );
};

export default page;
