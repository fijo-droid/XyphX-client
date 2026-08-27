import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { supabase } from "@/lib/supabase.ts";

interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
}

/* Fallback sponsors if Supabase is empty or fetching fails */
const DEFAULT_SPONSORS: Sponsor[] = [
  {
    id: "1",
    name: "Sponsor One",
    logoUrl: "https://via.placeholder.com/150x60?text=Sponsor+1",
    websiteUrl: "https://example.com",
  },
  {
    id: "2",
    name: "Sponsor Two",
    logoUrl: "https://via.placeholder.com/150x60?text=Sponsor+2",
    websiteUrl: "https://example.com",
  },
  {
    id: "3",
    name: "Sponsor Three",
    logoUrl: "https://via.placeholder.com/150x60?text=Sponsor+3",
    websiteUrl: "https://example.com",
  },
];

/**
 * Sponsor ticker — a tilted strip of type running across the field,
 * like tape across a drawing board. Pauses on hover.
 */
const Sponsors: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>(DEFAULT_SPONSORS);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        // Query Supabase table 'sponsors' directly
        const { data, error } = await supabase.from("sponsors").select("*");

        if (error) {
          console.warn("Supabase sponsors fetch warning (using defaults):", error.message);
          return;
        }

        if (data && data.length > 0) {
          const formattedSponsors: Sponsor[] = data.map((item: any, index: number) => ({
            id: String(item.id || index + 1),
            name: item.name || `Sponsor ${index + 1}`,
            logoUrl: item.logoUrl || item.logo_url || "",
            websiteUrl: item.websiteUrl || item.website_url || "#",
          }));
          setSponsors(formattedSponsors);
        }
      } catch (error) {
        console.error("Failed to fetch sponsors from Supabase:", error);
      }
    };

    fetchSponsors();
  }, []);

  if (sponsors.length === 0) return null;

  // Duplicate the sponsors multiple times to ensure continuous marquee scrolling
  const duplicated = Array.from({ length: 40 }).flatMap(() => sponsors);

  return (
    <section className="relative z-10 py-24 overflow-hidden">
      <Reveal amount={0.5} blur={false}>
        <p className="label-mono mb-10 px-6 md:px-10 text-carbon/40">
          Backed by — <span className="text-ink">our sponsors</span>
        </p>
      </Reveal>

      <Reveal amount={0.4} blur={false} delay={0.1}>
        <div className="-rotate-[1.5deg]" style={{ width: '120vw', marginLeft: '-10vw' }}>
          <div className="pause-on-hover border-y border-line bg-paper py-8 overflow-hidden">
            <motion.div 
              className="flex w-max items-center whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {duplicated.map((s, i) => (
                <span key={`${s.id}-${i}`} className="group mx-2 flex items-center">
                  {s.websiteUrl ? (
                    <a href={s.websiteUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                      <img
                        src={s.logoUrl}
                        alt={s.name}
                        className="h-24 md:h-32 w-auto object-contain opacity-90 transition-all duration-300 group-hover:opacity-100"
                      />
                    </a>
                  ) : (
                    <img
                      src={s.logoUrl}
                      alt={s.name}
                      className="h-24 md:h-32 w-auto object-contain opacity-90 transition-all duration-300 group-hover:opacity-100"
                    />
                  )}
                  <span className="mx-12 font-mono text-ink/30" aria-hidden>
                    +
                  </span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Sponsors;