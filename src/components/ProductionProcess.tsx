"use client";

import React, { useState } from "react";
import {
  Layers,
  Scissors,
  ShieldCheck,
  Search,
  Truck,
  ArrowRight,
  Clock,
  Globe,
  Check,
  BarChart3,
  Users,
  HeartHandshake,
  Shield,
  ChevronRight,
} from "lucide-react";

// Bespoke SVG Icons matching reference design for precision
function SewingMachineIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 18h16" />
      <path d="M6 18V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11" />
      <path d="M14 9h2" />
      <path d="M9 9v5" />
      <path d="M8 14h2" />
      <circle cx="16" cy="11" r="1.5" />
    </svg>
  );
}

function WashingTubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16l-1.5 11a2 2 0 0 1-2 1.8H7.5A2 2 0 0 1 5.5 18L4 7z" />
      <path d="M4 12c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 2 .5 2.5 1" />
      <path d="M9 4l1 3" />
      <path d="M15 4l-1 3" />
    </svg>
  );
}

function CargoShipIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 17l2 4h16l2-4" />
      <path d="M3 17h18" />
      <path d="M6 17V8h4v9" />
      <path d="M14 17v-6h4v6" />
      <path d="M10 8h4" />
      <path d="M12 5v3" />
    </svg>
  );
}

interface ProcessStep {
  number: string;
  phase: string;
  lead: string;
  fraction: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlights: string[];
}

export default function ProductionProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: ProcessStep[] = [
    {
      number: "01",
      phase: "Phase 01",
      lead: "DAY 01 – 05",
      fraction: "01 / 08",
      icon: Layers,
      title: "Fiber Qualification & Testing",
      description:
        "GOTS & BCI certified yarn intake with rigorous 4-point raw fabric inspection, color fastness lab testing, and shrinkage stabilization.",
      highlights: [
        "4-Point System Fabric Inspection",
        "Color Fastness & Tensile Lab Tests",
      ],
    },
    {
      number: "02",
      phase: "Phase 02",
      lead: "DAY 06 – 10",
      fraction: "02 / 08",
      icon: Scissors,
      title: "CAD & Automated Cutting",
      description:
        "Computerized nesting layouts, utilizing high-speed Gerber CNC cutters calibrated to ±0.2mm precision for maximum fabric utilization.",
      highlights: [
        "Gerber CNC High-Speed Cutters",
        "±0.2mm Tolerance & Zero Distortion",
      ],
    },
    {
      number: "03",
      phase: "Phase 03",
      lead: "DAY 11 – 28",
      fraction: "03 / 08",
      icon: SewingMachineIcon,
      title: "Precision Modular Sewing",
      description:
        "Smart overhead hanger conveyor routing feeding specialized direct-drive digital stitching pods with automated tension and thread monitoring.",
      highlights: [
        "Overhead Hanger Conveyor Pods",
        "In-Line Stitch Precision Monitoring",
      ],
    },
    {
      number: "04",
      phase: "Phase 04",
      lead: "DAY 23 – 35",
      fraction: "04 / 08",
      icon: WashingTubIcon,
      title: "Eco-Washing & Finishing",
      description:
        "Ozone-decoloring technology, enzyme bio-softening wash cycles, and continuous wrinkle-free thermo-pressing tunnels.",
      highlights: [
        "95% Recycled Water Closed Loop",
        "Ozone Decoloring & Bio-Enzymes",
      ],
    },
    {
      number: "05",
      phase: "Phase 05",
      lead: "DAY 36 – 39",
      fraction: "05 / 08",
      icon: ShieldCheck,
      title: "Audit & Compliance",
      description:
        "100% dual-gate metal and needle detection, dimensional garment tolerance verification, and strict AQL 1.0/1.5 random buyer audits.",
      highlights: [
        "AQL 1.0/1.5 Quality Standard",
        "100% Dual Metal Detector Gates",
      ],
    },
    {
      number: "06",
      phase: "Phase 06",
      lead: "DAY 40 – 42",
      fraction: "06 / 08",
      icon: CargoShipIcon,
      title: "Global Logistics",
      description:
        "Customs-bonded pallet packaging, automated EDI export documentation, and priority container dispatch with direct vessel boarding at port.",
      highlights: [
        "Automated EDI Export Clearance",
        "Real-Time GPS & Vessel Tracking",
      ],
    },
    {
      number: "07",
      phase: "Phase 07",
      lead: "DAY 43 – 45",
      fraction: "07 / 08",
      icon: Search,
      title: "Final Quality Check",
      description:
        "Final random inspection, packing verification, labeling, and compliance with destination market standards.",
      highlights: [
        "AQL Final Inspection",
        "Barcode & RFID Tagging",
      ],
    },
    {
      number: "08",
      phase: "Phase 08",
      lead: "DAY 46 – 50",
      fraction: "08 / 08",
      icon: Truck,
      title: "Shipment & Delivery",
      description:
        "Secure loading, documentation, and real-time shipment tracking until delivery at your destination.",
      highlights: [
        "Container Loading & Seal",
        "Live Shipment Tracking",
      ],
    },
  ];

  return (
    <section
      id="process"
      className="bg-white py-16 sm:py-20 lg:py-24 relative border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HEADER SECTION (Matching Reference: Clean, Minimal Header with 3 Trust Pillars) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-4">
          {/* Left Column: Pill + Title + Description */}
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
              OUR PROCESS
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-medium tracking-tight text-slate-900 leading-[1.15]">
              End-to-End Production <br />
              <span className="text-[#2563EB]">Process.</span>
            </h2>

            {/* Subtle Divider Bar */}
            <div className="w-12 h-1 bg-[#2563EB] rounded-full my-3.5" />

            <p className="text-slate-500 text-sm  leading-relaxed capitalize">
              From raw materials to global delivery, we manage every step with precision, quality control and complete transparency.
            </p>
          </div>

          {/* Right Column: 3 Trust Value Propositions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 lg:gap-10 pt-2 lg:pt-0">
            {/* 1. Quality First */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Quality First
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                  Strict quality checks at <br className="hidden sm:inline" /> every stage.
                </p>
              </div>
            </div>

            {/* 2. On-Time Delivery */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  On-Time Delivery
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                  Reliable timelines, <br className="hidden sm:inline" /> global shipping.
                </p>
              </div>
            </div>

            {/* 3. Your Trusted Partner */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Your Trusted Partner
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                  Long-term relationships, <br className="hidden sm:inline" /> shared success.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 8 PROCESS CARDS GRID (4 cols x 2 rows matching reference design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`group relative bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "border-blue-500 ring-2 ring-blue-500/10 shadow-lg -translate-y-1"
                    : "border-slate-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {/* Floating Next-Arrow Pill for active step (as shown in reference Card 01) */}
                {isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveStep((prev) => (prev + 1) % steps.length);
                    }}
                    title="Next Step"
                    aria-label="Next production phase"
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-blue-200 shadow-md text-blue-600 flex items-center justify-center z-10 hover:bg-blue-600 hover:text-white transition-all hidden lg:flex"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                <div>
                  {/* Top Bar: Step Number Badge + Timeline Metadata */}
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center">
                      {step.number}
                    </span>
                    <div className="text-right">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {step.lead}
                      </span>
                      <span className="block text-[11px] font-medium text-slate-400">
                        {step.fraction}
                      </span>
                    </div>
                  </div>

                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 mt-4 mb-3.5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed mt-2 mb-4 line-clamp-3">
                    {step.description}
                  </p>

                  {/* Checklist Highlights with Check Icons */}
                  <div className="space-y-2 mb-5 pt-3.5 border-t border-slate-100">
                    {step.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center gap-2 text-[11px] font-medium text-slate-700"
                      >
                        <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        </span>
                        <span className="truncate">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Phase Label + Milestone Verified link */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                    {step.phase}
                  </span>
                  <span className="text-[11px] text-slate-400 group-hover:text-blue-600 font-medium flex items-center gap-1 transition-colors">
                    Milestone Verified
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM TRUST / KEY STATS STRIP (Matching Reference Design) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* 1. Trusted by Global Brands */}
            <div className="flex items-center gap-3.5 pt-4 md:pt-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Trusted by Global Brands
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Quality. Compliance. On-Time.
                </p>
              </div>
            </div>

            {/* 2. 100+ Product Categories */}
            <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-slate-900">
                  100+
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Products Categories
                </p>
              </div>
            </div>

            {/* 3. 50+ Countries We Export To */}
            <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-slate-900">
                  50+
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Countries We Export To
                </p>
              </div>
            </div>

            {/* 4. 10+ Years of Experience */}
            <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-slate-900">
                  10+
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Years of Experience
                </p>
              </div>
            </div>

            {/* 5. Your Global Sourcing Partner */}
            <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6 col-span-2 md:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Your Global Sourcing Partner
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Let&apos;s grow together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
