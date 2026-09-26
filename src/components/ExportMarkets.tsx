"use client";

import React, { useState } from "react";
import {
  MapPin,
  Ship,
  Warehouse,
  ShieldCheck,
  PackageCheck,
  ChevronRight,
  Building2,
  Globe2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Interactive3DGlobe, {
  PresenceCategory,
  GLOBAL_HUBS,
  GlobalHub,
} from "./Interactive3DGlobe";

export default function ExportMarkets() {
  // 4 Industry-Standard Global Import/Export & Supply Chain Pillars
  const categories: PresenceCategory[] = [
    {
      id: "freight",
      name: "Ocean & Air Freight Forwarding",
      countSubtitle: "FCL, LCL & Garments on Hanger (GOH)",
      color: "#2563EB", // Royal blue
      countryIds: [
        "840", // USA
        "124", // Canada
        "826", // UK
        "276", // Germany
        "724", // Spain
        "250", // France
        "380", // Italy
        "528", // Netherlands
        "784", // UAE
        "682", // Saudi Arabia
        "036", // Australia
        "392", // Japan
        "578", // Norway
        "752", // Sweden
        "208", // Denmark
        "702", // Singapore
      ],
      stats: "40+ Maritime Corridors · Global Port Coverage",
      description:
        "Scheduled containerized ocean freight (FCL/LCL) and expedited air cargo connecting Asian production hubs with destination ports worldwide, including specialized Garments on Hanger (GOH) equipment to prevent creasing.",
      countries: [
        "United States",
        "United Kingdom",
        "Germany",
        "Netherlands",
        "Spain",
        "France",
        "United Arab Emirates",
        "Australia",
      ],
      moreCount: 32,
    },
    {
      id: "warehousing",
      name: "Bonded Warehousing & Storage",
      countSubtitle: "500,000+ sq.ft cargo staging hubs",
      color: "#0284C7", // Sky blue
      countryIds: [
        "156", // China (Fujian, Shanghai, Ningbo)
        "704", // Vietnam
        "050", // Bangladesh
        "356", // India
        "784", // UAE
        "276", // Germany
        "840", // USA
        "702", // Singapore
      ],
      stats: "4 Strategic Depots · WMS Barcode Tracking",
      description:
        "Secure bonded warehousing, cargo consolidation, and cross-docking at Fujian HQ, Shanghai, Ningbo, and Hong Kong providing bulk palletizing, carton sorting, barcode labeling, and container stuffing.",
      countries: [
        "Fujian Central Depot",
        "Hong Kong Hub",
        "Shanghai Facility",
        "Ningbo Terminal",
        "Vietnam Staging",
        "Bangladesh Hub",
      ],
      moreCount: 4,
    },
    {
      id: "customs",
      name: "Customs Brokerage & Compliance",
      countSubtitle: "AEO certified & HS code filing",
      color: "#38BDF8", // Light Brand Blue / Sky Cyan
      countryIds: [
        "156", // China
        "840", // USA
        "826", // UK
        "276", // Germany
        "250", // France
        "724", // Spain
        "528", // Netherlands
        "036", // Australia
        "784", // UAE
        "392", // Japan
      ],
      stats: "PRC Export #3302910842 · AEO Advanced Certified",
      description:
        "Complete export and import customs administration, electronic single-window declarations, tariff HS code classification, and Certificates of Origin (Form A, E, RCEP) to eliminate port clearance delays.",
      countries: [
        "China (PRC AEO)",
        "United States (CBP)",
        "European Union (TARIC)",
        "United Kingdom (HMRC)",
        "Australia (ChAFTA)",
        "UAE (GCC Trade)",
      ],
      moreCount: 18,
    },
    {
      id: "inspection",
      name: "Pre-Shipment Inspection & QA",
      countSubtitle: "100% pre-export AQL 2.5 verification",
      color: "#D97706", // Amber gold
      countryIds: [
        "156", // China
        "704", // Vietnam
        "050", // Bangladesh
        "356", // India
        "116", // Cambodia
        "792", // Turkey
      ],
      stats: "AQL 2.5 / 4.0 Standards · Needle & Carton Audits",
      description:
        "Rigorous pre-shipment quality control including full needle detection, carton drop testing, moisture control, barcode scannability checks, and container seal integrity prior to vessel departure.",
      countries: [
        "Fujian Origin Labs",
        "Vietnam QA Centers",
        "Bangladesh Pods",
        "India Inspection",
        "Cambodia QA",
        "Turkey Fabric Audits",
      ],
      moreCount: 8,
    },
  ];

  const [activeCategoryId, setActiveCategoryId] = useState<string>("freight");
  const [activeHubIndex, setActiveHubIndex] = useState<number>(0);

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) || categories[0];
  const currentHub: GlobalHub = GLOBAL_HUBS[activeHubIndex] || GLOBAL_HUBS[0];

  const handlePrevHub = () => {
    setActiveHubIndex((prev) =>
      prev === 0 ? GLOBAL_HUBS.length - 1 : prev - 1
    );
  };

  const handleNextHub = () => {
    setActiveHubIndex((prev) =>
      prev === 0 ? GLOBAL_HUBS.length - 1 : prev + 1
    );
  };

  // Helper icon for category
  const getCategoryIcon = (id: string, className?: string) => {
    switch (id) {
      case "freight":
        return <Ship className={className} />;
      case "warehousing":
        return <Warehouse className={className} />;
      case "customs":
        return <ShieldCheck className={className} />;
      case "inspection":
        return <PackageCheck className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  return (
    <section
      id="export-markets"
      className="bg-white text-slate-900 py-16 sm:py-20 lg:py-24 relative overflow-hidden border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ================= LEFT COLUMN: Categories & Detail Card ================= */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            {/* 1. Header & Value Proposition */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3.5">
                GLOBAL PRESENCE
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-medium tracking-tight text-slate-900 leading-[1.15] mb-3">
                Maya Around the <br />
                World
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Direct export supply chain connecting our central warehousing, audited manufacturing mills, and containerized maritime freight to global destination markets.
              </p>
            </div>

            {/* 2. Selectable Categories List */}
            <div className="space-y-2.5 mb-6">
              {categories.map((cat) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-50/80 border-blue-200 shadow-2xs"
                        : "bg-white border-transparent hover:border-slate-200 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? "bg-blue-100/70 text-blue-600"
                            : "bg-slate-100 text-slate-500 group-hover:text-slate-700"
                        }`}
                      >
                        {getCategoryIcon(cat.id, "w-4.5 h-4.5")}
                      </div>
                      <div>
                        <h4
                          className={`text-sm font-medium transition-colors ${
                            isActive
                              ? "text-slate-900"
                              : "text-slate-700 group-hover:text-slate-900"
                          }`}
                        >
                          {cat.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {cat.countSubtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                        isActive ? "text-blue-600" : "text-slate-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* 3. Bottom Detail Box for Active Category */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/30 p-5 transition-all duration-300">
              {/* Category meta header */}
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                    {getCategoryIcon(activeCategory.id, "w-4 h-4")}
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-900">
                    {activeCategory.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-medium text-slate-500">
                  {activeCategory.stats}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed text-slate-600 mb-3.5">
                {activeCategory.description}
              </p>

              {/* Country pill badges */}
              <div className="flex flex-wrap gap-1.5">
                {activeCategory.countries.map((cName) => (
                  <span
                    key={cName}
                    className="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium bg-white border border-slate-200/80 text-slate-700 shadow-2xs"
                  >
                    {cName}
                  </span>
                ))}
                {activeCategory.moreCount && (
                  <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 border border-blue-200 text-blue-600 shadow-2xs">
                    +{activeCategory.moreCount} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Interactive Globe & Floating Hub Card ================= */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center">
            {/* Playful Handwritten Annotation with curved arrow pointing to globe */}
            <div className="absolute top-2 left-2 sm:left-6 z-20 pointer-events-none hidden sm:flex flex-col items-start select-none">
              <span className="text-xs font-medium text-blue-500 italic leading-snug">
                Click on a region <br />
                to explore our presence
              </span>
              <svg
                className="w-10 h-8 text-blue-400 mt-1 ml-3"
                viewBox="0 0 50 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 6 C 18 20, 26 26, 38 24" />
                <path d="M31 18 L 38 24 L 32 30" />
              </svg>
            </div>

            {/* Floating Selected Hub Card (Top Right of Globe) */}
            <div className="absolute top-2 right-2 sm:right-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-lg w-56 sm:w-60 transition-all duration-300">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-900 truncate">
                    {currentHub.name}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Warehouse className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{currentHub.office}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Ship className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{currentHub.support}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Globe2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{currentHub.desk}</span>
                </div>
              </div>
            </div>

            {/* 3D WebGL Globe Component */}
            <Interactive3DGlobe
              activeCategory={activeCategory}
              activeHubIndex={activeHubIndex}
              onSelectHub={setActiveHubIndex}
            />

            {/* Carousel Controls (Below Globe) */}
            <div className="flex items-center justify-center gap-4 mt-2 z-10">
              <button
                onClick={handlePrevHub}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all cursor-pointer"
                aria-label="Previous region"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5">
                {GLOBAL_HUBS.map((hub, idx) => (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHubIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeHubIndex === idx
                        ? "w-6 bg-blue-600"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to ${hub.name}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextHub}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all cursor-pointer"
                aria-label="Next region"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
