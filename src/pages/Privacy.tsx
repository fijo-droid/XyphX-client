import React from "react";
import Navbar from "@/components/landing/Navbar";
import Background from "@/components/landing/Background";
import Footer from "@/components/landing/Footer";
import Reveal from "@/components/motion/Reveal";
import SeoHead from "@/components/SeoHead";

export default function Privacy() {
  return (
    <>
      <SeoHead
        title="Privacy Statement | XyphX"
        description="XyphX Privacy Statement and data processing agreements."
        canonicalPath="/privacy"
      />
      <div className="relative min-h-screen bg-background text-foreground overflow-x-clip font-sans">
        <Background />
        <Navbar />

        <main className="relative z-10 pt-32 pb-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#5E1EE5]">Statement</span>
              </h1>
              
              <div className="prose max-w-none text-carbon">
                <p className="text-lg mb-6">Last updated: July 2026</p>
                
                <h2 className="text-2xl font-semibold text-black mt-8 mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  When you use XyphX, we collect information you provide directly to us, such as when you create an account, authenticate via OAuth (Google, Microsoft, Yahoo), or use our APIs.
                </p>

                <h2 className="text-2xl font-semibold text-black mt-8 mb-4">2. How We Use Your Data</h2>
                <p className="mb-4">
                  We use the information we collect to provide, maintain, and improve our services. We do not sell your personal data to third parties.
                </p>

                <h2 className="text-2xl font-semibold text-black mt-8 mb-4">3. Data Security</h2>
                <p className="mb-4">
                  We implement industry-standard security measures to protect your data, but please remember that no method of transmission over the Internet is 100% secure.
                </p>
              </div>
            </Reveal>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
