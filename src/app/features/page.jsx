"use client";

import Footer from "@/Components/Footer";
import dynamic from "next/dynamic";
import MarketComparison from "./MarketComparaison";
import WordErrorRateChart from "./WordErrorChart";

// Dynamically import components with `ssr: false` to disable server-side rendering
const LiveTranscription = dynamic(() => import("./LiveTranscription"), { ssr: false });
const ComparisonChart = dynamic(() => import("./Comparison"), { ssr: false });
const NavBar = dynamic(() => import("@/Components/NavBar"), { ssr: false });

const page = () => {
  return (
    <main>
        <NavBar/>
        <LiveTranscription/>
        <ComparisonChart/>
        <MarketComparison/>
        <WordErrorRateChart/>
        <Footer/>
    </main>
  )
}

export default page