"use client";

import dynamic from "next/dynamic";

// Dynamically import components with `ssr: false` to disable server-side rendering
const LiveTranscription = dynamic(() => import("./LiveTranscription"), { ssr: false });
const ComparisonChart = dynamic(() => import("./Comparison"), { ssr: false });
const NavBar = dynamic(() => import("./NavBar"), { ssr: false });

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