"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Microscope, Scan, FileText, Check } from "lucide-react";
import ScrollExpand from "./ScrollExpand";

export default function QualityControl() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Content reveal for checkpoints

      // Content reveal
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const checkpoints = [
    {
      title: "Raw Greige & Trim 4-Point Inspection",
      desc: "Every fabric lot tested for skewing, shrinkage, shade consistency, and tensile tear limits prior to spreading.",
      icon: Microscope,
    },
    {
      title: "In-Line Operational Roaming Audits",
      desc: "Dedicated QA engineers stationed every 8 workstations verifying SPI (stitches per inch), tension, and seam symmetry.",
      icon: Scan,
    },
    {
      title: "100% Dual-Head Metal Detection",
      desc: "Every single finished garment passes through Hashima high-sensitivity electromagnetic conveyor sensors.",
      icon: ShieldCheck,
    },
    {
      title: "Final Random Inspection (AQL 1.0 / 1.5)",
      desc: "Strict ANSI/ASQ Z1.4 sampling protocol with full digital barcode inspection dossiers delivered to the client.",
      icon: FileText,
    },
  ];

  return (
    <section
      id="qc"
      ref={sectionRef}
      className="bg-white text-deep-blue py-12 sm:py-16 lg:py-20 relative overflow-hidden border-t border-pearl-gray"
    >
      <div className="max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Main Stage with ScrollExpand: Starts framed and expands as user scrolls */}
        <div className="relative w-full h-[980px] sm:h-[900px] lg:h-[820px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950">
          <ScrollExpand
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=85"
            alt="Maya Exports quality control technician inspecting garment stitching tolerances"
            title="Four-Tier Quality Governance"
            scrollHint="Scroll to Inspect Architecture"
            useWindowScroll={true}
            startWidth={56}
            startHeight={62}
            startRadius={24}
            endRadius={0}
            mediaZoom={1.25}
            overlayScrim={0.72}
            className="w-full h-full"
          >
            {/* The entire section from the screenshot comes up inside the image! */}
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center space-y-6 sm:space-y-7 px-3 sm:px-6 py-4">
              {/* Header inside the image */}
              <div className="text-center space-y-2.5 max-w-3xl">
                <span className="inline-block px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-widest shadow-xs">
                  Zero-Defect Protocol
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display leading-tight drop-shadow-md">
                  Four-Tier Quality Governance Architecture.
                </h2>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
                  At Maya Exports, quality is not tested into apparel at the packing dock — it is
                  engineered into every stitch tension, pattern seam margin, and wash formula.
                </p>
              </div>

              {/* 4 Checkpoint Cards (Matching User's Screenshot Exactly) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                {checkpoints.map((cp, idx) => {
                  const Icon = cp.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-3.5 mb-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-brand-blue flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 font-display">
                          {cp.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-12.5">
                        {cp.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom QC Guarantee Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs text-slate-200 shadow-lg">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span className="font-semibold text-white">100% QA Pass Guarantee</span>
                <span className="text-slate-400">·</span>
                <span>Dual-Head Hashima Metal Detection &amp; AQL 1.0</span>
              </div>
            </div>
          </ScrollExpand>
        </div>
      </div>
    </section>
  );
}
