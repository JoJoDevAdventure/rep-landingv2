"use client";

import dynamic from "next/dynamic";

// Dynamically import components with `ssr: false` to disable server-side rendering
const LiveTranscription = dynamic(() => import("@/Components/LiveTranscription"), { ssr: false });
const ComparisonChart = dynamic(() => import("@/Components/Comparison"), { ssr: false });
const NavBar = dynamic(() => import("@/Components/NavBar"), { ssr: false });

const page = () => {
  return (
    <main>
        <NavBar/>
        <LiveTranscription/>
        <ComparisonChart/>
    </main>
  )
}

export default page