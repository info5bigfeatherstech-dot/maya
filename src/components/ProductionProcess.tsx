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
  const progressLineRef = useRef<HTMLDivElement>(null);
  const stepItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      number: "01",
      icon: Layers,
      title: "Fiber Qualification",
      subtitle: "GOTS & BCI certified yarns, rigorous 4-point raw fabric inspection.",
      lead: "Day 1-5",
    },
    {
      number: "02",
      icon: Scissors,
      title: "CAD & Auto Cutting",
      subtitle: "Computerized nesting layout with Gerber CNC cutters to ±0.2mm precision.",
      lead: "Day 6-10",
    },
    {
      number: "03",
      icon: Cpu,
      title: "Precision Modular Sewing",
      subtitle: "Hanger conveyor routing to specialized direct-drive digital stitching pods.",
      lead: "Day 11-28",
    },
    {
      number: "04",
      icon: Droplets,
      title: "Eco-Washing & Finish",
      subtitle: "G2 ozone decoloring, enzyme bio-softening & wrinkle-free thermo-press.",
      lead: "Day 29-35",
    },
    {
      number: "05",
      icon: ShieldCheck,
      title: "Quality Assurance",
      subtitle: "100% metal/needle scan, in-line check and strict AQL 1.0/1.5 random audit.",
      lead: "Day 36-39",
    },
    {
      number: "06",
      icon: Truck,
      title: "Direct Port Logistics",
      subtitle: "Customs bonded palletizing, EDI export docs and direct vessel boarding.",
      lead: "Day 40-42",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate progress line width
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { width: "0%" },
          {
            width: "100%",
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Staggered reveal of step items
      stepItemsRef.current.forEach((step, idx) => {
        if (!step) return;
        gsap.from(step, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          delay: idx * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: "top 80%",
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
      className="bg-offwhite text-deep-blue py-16 sm:py-20 lg:py-24 relative overflow-hidden border-t border-pearl-gray"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-pearl-gray">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-pearl-gray border border-pearl-gray text-[11px] font-semibold uppercase tracking-widest text-deep-blue mb-2.5">
              Standardized Workflow
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep-blue font-display">
              End-to-End Production Process.
            </h2>
          </div>
          <p className="text-slate-body max-w-md text-xs sm:text-sm leading-relaxed">
            Every production batch follows a rigorous critical path. Real-time ERP tracking provides
            international buyers with milestone visibility and end-to-end barcode traceability.
          </p>
        </div>

        {/* Process Flow Wrapper */}
        <div ref={stepsContainerRef} className="relative">
          {/* Animated Connecting Progress Line in Brand Blue */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-[2px] bg-pearl-gray z-0">
            <div
              ref={progressLineRef}
              className="h-full bg-gradient-to-r from-deep-blue via-brand-blue to-deep-blue origin-left"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  ref={(el) => {
                    stepItemsRef.current[idx] = el;
                  }}
                  className="group bg-white border border-pearl-gray p-6 rounded-sm shadow-sm hover:shadow-xl hover:border-brand-blue/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Step Number & Icon badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-sm bg-deep-blue text-brand-blue flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-brand-blue group-hover:text-white group-hover:scale-105 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-muted">
                        {step.number}
                      </span>
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-blue block mb-1">
                      {step.lead}
                    </span>

                    <h3 className="text-base font-bold text-deep-blue mb-2 font-display">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-body leading-relaxed font-normal">
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-pearl-gray flex items-center justify-between text-[11px] font-semibold text-slate-muted group-hover:text-deep-blue">
                    <span>Phase 0{idx + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-blue group-hover:translate-x-1 transition-transform" />
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
