import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkipLinks from "@/components/SkipLinks";
import { WebVitalsReporter } from "./web-vitals-reporter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "QHack - Quantum Risk Engine | Team QHackers",
  description: "Revolutionizing Counterparty Credit Risk through Quantum Monte Carlo and Amplitude Estimation. Built for GenQ Hackathon 2025.",
  keywords: ["quantum computing", "finance", "risk management", "monte carlo", "qiskit", "hackathon"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SkipLinks />
        <WebVitalsReporter />
        <Navbar />
        <main id="main-content" className="pt-20" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
