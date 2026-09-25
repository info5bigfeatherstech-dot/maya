"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Compass, Layers, Sparkles, Anchor, ShieldCheck } from "lucide-react";

export default function TrustedBy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 25,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const partners = [
    {
      name: "Nordic Outerwear Consortium",
      market: "UK & Scandinavia",
      icon: Compass,
      code: "NORD-TEC",
    },
    {
      name: "Continental Retail Conglomerate",
      market: "Germany & Benelux",
      icon: Layers,
      code: "EU-VENTURE",
    },
    {
      name: "North American Fashion Brands",
      market: "USA & Canada",
      icon: Building2,
      code: "PACIFIC-US",
    },
    {
      name: "British Department Retail",
      market: "United Kingdom",
      icon: Anchor,
      code: "BRIT-TEX",
    },
    {
      name: "Australasia Lifestyle Group",
      market: "Australia & NZ",
      icon: Sparkles,
      code: "OCEANIA-MFG",
    },
    {
      name: "Gulf Premium Apparel Group",
      market: "Middle East",
      icon: ShieldCheck,
      code: "GULF-STYLE",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-offwhite border-y border-pearl-gray py-10 relative z-20 text-deep-blue"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-slate-muted">
            Trusted by Enterprise Fashion Retailers Across 45+ Countries
          </span>
          <div className="w-12 h-[1.5px] bg-brand-blue mt-2 opacity-80" />
        </div>

        {/* Partners Strip: Grayscale by default, Brand Blue duotone on hover */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center">
          {partners.map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center justify-center p-3 w-full transition-all duration-300 hover:scale-105 cursor-default"
              >
                <div className="flex items-center gap-2 text-slate-muted group-hover:text-brand-blue transition-colors">
                  <Icon className="w-5 h-5 text-slate-muted group-hover:text-brand-blue transition-colors" />
                  <span className="font-semibold text-xs tracking-wider uppercase font-display group-hover:text-deep-blue">
                    {partner.code}
                  </span>
                </div>
                <span className="text-[10px] text-slate-muted group-hover:text-slate-body mt-1 font-medium transition-colors text-center line-clamp-1">
                  {partner.market}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
