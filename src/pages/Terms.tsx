import React from "react";
import Navbar from "@/components/landing/Navbar";
import Background from "@/components/landing/Background";
import Footer from "@/components/landing/Footer";
import Reveal from "@/components/motion/Reveal";
import SeoHead from "@/components/SeoHead";

export default function Terms() {
  return (
    <>
      <SeoHead
        title="Terms of Service | XyphX"
        description="XyphX Terms of Service and legal agreements."
        canonicalPath="/terms"
      />
      <div className="relative min-h-screen bg-background text-foreground overflow-x-clip font-sans">
        <Background />
        <Navbar />

        <main className="relative z-10 pt-32 pb-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#5E1EE5]">Service</span>
              </h1>
              
              <div className="prose max-w-none text-carbon">
                <p className="text-lg mb-6">Last updated: July 2026</p>
                
                <h2 className="text-2xl font-semibold text-black mt-8 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing or using XyphX services, you agree to be bound by these Terms of Service. If you do not agree, you may not use our platform.
                </p>

                <h2 className="text-2xl font-semibold text-black mt-8 mb-4">2. Use of Services</h2>
                <p className="mb-4">
                  You agree to use our services only for lawful purposes. You must not use our API or agents for any illegal, malicious, or abusive activities.
                </p>

                <h2 className="text-2xl font-semibold text-black mt-8 mb-4">3. Account & Security</h2>
                <p className="mb-4">
                  You are responsible for maintaining the confidentiality of your account credentials (including API keys and OAuth logins).
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
