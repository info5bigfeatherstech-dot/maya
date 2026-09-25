"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers,
  Scissors,
  Cpu,
  Droplets,
  ShieldCheck,
  Truck,
  ArrowRight,
} from "lucide-react";

export default function ProductionProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      number: "01",
      phase: "Phase 01",
      category: "Material Qualification",
      icon: Layers,
      title: "Fiber Qualification & Testing",
      subtitle:
        "GOTS & BCI certified yarn intake with rigorous 4-point raw fabric inspection, color fastness lab testing, and shrinkage stabilization.",
      lead: "Day 01 – 05",
      highlights: ["4-Point System Fabric Inspection", "Color Fastness & Tensile Lab Tests"],
    },
    {
      number: "02",
      phase: "Phase 02",
      category: "Precision CAD",
      icon: Scissors,
      title: "CAD & Automated Cutting",
      subtitle:
        "Computerized nesting layouts utilizing high-speed Gerber CNC cutters calibrated to ±0.2mm precision for maximum fabric utilization.",
      lead: "Day 06 – 10",
      highlights: ["Gerber CNC High-Speed Cutters", "±0.2mm Tolerance & Zero Distortion"],
    },
    {
      number: "03",
      phase: "Phase 03",
      category: "Modular Assembly",
      icon: Cpu,
      title: "Precision Modular Sewing",
      subtitle:
        "Smart overhead hanger conveyor routing feeding specialized direct-drive digital stitching pods with automated tension and thread monitoring.",
      lead: "Day 11 – 28",
      highlights: ["Overhead Hanger Conveyor Pods", "In-Line Stitch Precision Monitoring"],
    },
    {
      number: "04",
      phase: "Phase 04",
      category: "Eco Washing",
      icon: Droplets,
      title: "Eco-Washing & Finishing",
      subtitle:
        "G2 ozone decoloring technology, enzyme bio-softening wash cycles, and continuous wrinkle-free thermo-pressing tunnels.",
      lead: "Day 29 – 35",
      highlights: ["95% Recycled Water Closed Loop", "Ozone Decoloring & Bio-Enzymes"],
    },
    {
      number: "05",
      phase: "Phase 05",
      category: "Audit & Compliance",
      icon: ShieldCheck,
      title: "Quality Assurance & Audit",
      subtitle:
        "100% dual-gate metal and needle detection, dimensional garment tolerance verification, and strict AQL 1.0/1.5 random buyer audits.",
      lead: "Day 36 – 39",
      highlights: ["AQL 1.0 / 1.5 Quality Standard", "100% Dual Metal Detector Gates"],
    },
    {
      number: "06",
      phase: "Phase 06",
      category: "Global Dispatch",
      icon: Truck,
      title: "Direct Port Logistics",
      subtitle:
        "Customs-bonded pallet packaging, automated EDI export documentation, and priority container dispatch with direct vessel boarding at port.",
      lead: "Day 40 – 42",
      highlights: ["Automated EDI Export Clearance", "Real-Time GPS & Vessel Tracking"],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered reveal of step items
      stepItemsRef.current.forEach((step, idx) => {
        if (!step) return;
        gsap.from(step, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          delay: idx * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-offwhite text-deep-blue py-16 sm:py-20 lg:py-28 relative overflow-hidden border-t border-pearl-gray"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-pearl-gray">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-[11px] font-bold uppercase tracking-wider text-brand-blue mb-3">
              Standardized Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-deep-blue font-display">
              End-to-End Production Process.
            </h2>
          </div>
          <p className="text-slate-body max-w-lg text-sm sm:text-base leading-relaxed">
            Every production batch follows a rigorous, synchronized 42-day critical path. Real-time ERP tracking provides international buyers with complete milestone visibility and end-to-end barcode traceability.
          </p>
        </div>

        {/* Steps Grid - Spacious 3 Columns × 2 Rows Layout */}
        <div ref={stepsContainerRef} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  ref={(el) => {
                    stepItemsRef.current[idx] = el;
                  }}
                  className="group relative bg-white border border-pearl-gray rounded-xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-brand-blue/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Top Accent on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Top Row: Icon + Lead Tag + Step Index */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-deep-blue text-brand-blue flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-brand-blue group-hover:text-white group-hover:scale-105 transition-all duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded-md">
                            {step.lead}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-mono font-bold text-slate-muted">
                        {step.number} / 06
                      </span>
                    </div>

                    {/* Category Label */}
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-muted mb-1.5">
                      {step.category}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-deep-blue mb-2.5 font-display group-hover:text-brand-blue transition-colors">
                      {step.title}
                    </h3>

                    {/* Step Description with generous line-height */}
                    <p className="text-sm text-slate-body leading-relaxed mb-5">
                      {step.subtitle}
                    </p>

                    {/* Key QA / Process Highlights */}
                    <div className="space-y-1.5 mb-6 pt-4 border-t border-pearl-gray/80">
                      {step.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-deep-blue">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-pearl-gray flex items-center justify-between text-xs font-semibold text-slate-muted group-hover:text-deep-blue transition-colors">
                    <span className="font-mono text-brand-blue font-bold">{step.phase}</span>
                    <span className="inline-flex items-center gap-1.5 text-deep-blue group-hover:text-brand-blue font-semibold">
                      Milestone Verified
                      <ArrowRight className="w-3.5 h-3.5 text-brand-blue group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
