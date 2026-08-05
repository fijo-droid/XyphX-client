import React, { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Background from "@/components/landing/Background";
import Footer from "@/components/landing/Footer";
import Reveal from "@/components/motion/Reveal";
import SeoHead from "@/components/SeoHead";
import { privacySections } from "@/data/privacyContent";
import { motion } from "framer-motion";
import { scrollToId } from "@/lib/scroll";

export default function Privacy() {
  const [activeSection, setActiveSection] = useState(privacySections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = privacySections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(privacySections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SeoHead
        title="Privacy Policy | XyphX"
        description="XyphX Privacy Policy, data processing agreements, and security practices."
        canonicalPath="/privacy"
      />
      <div className="relative min-h-screen bg-background text-foreground overflow-x-clip font-sans">
        <Background />
        <Navbar />

        <main className="relative z-10 pt-32 pb-24 px-6 md:px-10">
          <div className="mx-auto max-w-[96rem]">
            <Reveal>
              <div className="mb-16 border-b border-line-soft pb-12">
                <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-carbon mb-6">
                  Privacy Policy
                </h1>
                <p className="text-lg text-carbon/60 max-w-3xl">
                  Effective Date: August 5, 2026. This Privacy Policy describes how XyphX collects, uses, and discloses information associated with our enterprise AI infrastructure, developer APIs, cloud storage, and SaaS products.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-12 items-start relative">
              {/* Sticky Sidebar Navigation */}
              <aside className="hidden lg:block w-80 shrink-0 sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pr-6 custom-scrollbar">
                <div className="text-[11px] font-semibold text-carbon/50 uppercase tracking-widest mb-6">Table of Contents</div>
                <nav className="flex flex-col gap-3">
                  {privacySections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToId(section.id)}
                      className={`text-left text-sm transition-all duration-300 ${
                        activeSection === section.id 
                          ? "text-ink font-semibold translate-x-2" 
                          : "text-carbon/60 hover:text-carbon hover:translate-x-1"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </aside>

              {/* Main Content */}
              <article className="flex-1 max-w-4xl bg-paper/50 backdrop-blur-sm border border-line-soft rounded-3xl p-8 md:p-12 shadow-sm">
                {privacySections.map((section) => (
                  <motion.section 
                    key={section.id} 
                    id={section.id} 
                    className="mb-16 scroll-mt-32"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-carbon mb-6">
                      {section.title}
                    </h2>
                    <div className="space-y-5 text-carbon/80 leading-relaxed text-[15px] md:text-base">
                      {section.content.map((paragraph, idx) => {
                        if (paragraph.startsWith("• ")) {
                          return (
                            <div key={idx} className="flex gap-3 pl-4">
                              <span className="text-ink mt-1 flex-shrink-0">•</span>
                              <span dangerouslySetInnerHTML={{ __html: paragraph.replace(/^• \*\*(.*?)\*\*/, '<strong>$1</strong>').replace(/^• /, '') }} />
                            </div>
                          );
                        } else if (paragraph.startsWith("**")) {
                          return (
                            <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph.replace(/^\*\*(.*?)\*\*/, '<strong>$1</strong>') }} />
                          );
                        } else {
                          return <p key={idx}>{paragraph}</p>;
                        }
                      })}
                    </div>
                  </motion.section>
                ))}
              </article>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
