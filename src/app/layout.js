import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Replicaide - Your AI-Powered Agent",
  description: "Automate tasks and optimize workflows with Replicaide’s AI-powered agent. Perfect for real estate, automotive, and eCommerce.",
  keywords: "AI agent, Replicaide, automation, real estate AI, eCommerce AI",
  openGraph: {
    title: "Replicaide - AI-Powered Smart Agents",
    description: "Optimize sales, automate tasks, and enhance workflows with Replicaide’s AI agent.",
    url: "https://replicaide.com",
    type: "website",
    images: [{ url: "/" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ReplicaideAI",
    title: "Replicaide - AI Agent",
    description: "AI-powered automation for your business.",
    image: "https://replicaide.com/twitter-image.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
