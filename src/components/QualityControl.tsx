"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Microscope, Scan, FileText, Check } from "lucide-react";

export default function QualityControl() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

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
      className="bg-white text-deep-blue py-16 sm:py-20 lg:py-24 relative overflow-hidden border-t border-pearl-gray"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Description & Checkpoints */}
          <div ref={contentRef} className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-pearl-gray border border-pearl-gray text-[11px] font-semibold uppercase tracking-widest text-deep-blue mb-2.5">
                Zero-Defect Protocol
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep-blue font-display">
                Four-Tier Quality Governance Architecture.
              </h2>
              <p className="text-slate-body mt-3 text-xs sm:text-sm leading-relaxed">
                At Maya Exports, quality is not tested into apparel at the packing dock — it is
                engineered into every stitch tension, pattern seam margin, and wash formula.
              </p>
            </div>

            {/* Checkpoint Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {checkpoints.map((cp, idx) => {
                const Icon = cp.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-sm bg-offwhite border border-pearl-gray hover:border-brand-blue transition-colors shadow-xs"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 rounded-sm bg-white border border-pearl-gray text-brand-blue flex items-center justify-center shadow-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-deep-blue font-display">
                        {cp.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-body leading-relaxed">
                      {cp.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* In-House Testing Laboratory Stats */}
            <div className="p-5 rounded-sm bg-pearl-gray/60 border-l-4 border-brand-blue border-y border-r border-pearl-gray">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-brand-blue font-semibold block">
                    Accredited In-House Laboratory
                  </span>
                  <p className="text-xs text-slate-body mt-0.5">
                    Certified to conduct ISO, AATCC, ASTM, and DIN test regimes on-site within 6 hours.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-deep-blue px-3 py-1 bg-white rounded border border-pearl-gray shadow-xs">
                  AQL 1.0 Tolerances
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Inspection Photo with Clip-Path Wipe */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] rounded-sm overflow-hidden border border-pearl-gray shadow-xl bg-pearl-gray"
            >
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
                alt="Maya Exports quality control technician inspecting garment stitching tolerances"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-transparent to-transparent opacity-80" />

              {/* Overlay QC Tag */}
              <div className="absolute top-6 right-6 px-3 py-1.5 rounded-sm bg-brand-blue text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>100% QA Pass Guarantee</span>
              </div>

              {/* Lab Specification overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-sm bg-deep-blue/90 backdrop-blur-md border border-deep-blue-border text-xs text-slate-light">
                <p className="font-semibold text-white mb-1 font-display">
                  Spectrophotometer Color Deviation
                </p>
                <p className="text-[11px] text-slate-muted">
                  Maintained at Delta E &lt; 0.8 against standard Pantone & customer master swatches across all production dye lots.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
