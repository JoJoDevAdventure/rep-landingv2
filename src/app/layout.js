import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "ReplicAIDE - Your AI-Powered Agent",
  description: "Automate tasks and optimize workflows with ReplicAIDE's AI-powered agent. Perfect for real estate, automotive, and eCommerce.",
  keywords: "AI agent, ReplicAIDE, automation, real estate AI, eCommerce AI",
  openGraph: {
    title: "ReplicAIDE - AI-Powered Smart Agents",
    description: "Optimize sales, automate tasks, and enhance workflows with ReplicAIDE's AI agent.",
    url: "https://replicaide.com",
    type: "website",
    images: [{ url: "/" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ReplicaideAI",
    title: "ReplicAIDE - AI Agent",
    description: "AI-powered automation for your business.",
    image: "https://replicaide.com/twitter-image.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`antialiased`}
      >
        {children}
        <Analytics />
        <Script
          src="https://script.supademo.com/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
