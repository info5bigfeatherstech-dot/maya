"use client";

import React, { useState } from "react";
import {
  MapPin,
  Factory,
  PenTool,
  Leaf,
  ChevronRight,
  Building2,
  Headphones,
  Globe,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Interactive3DGlobe, {
  PresenceCategory,
  GLOBAL_HUBS,
  GlobalHub,
} from "./Interactive3DGlobe";

export default function ExportMarkets() {
  // 4 Main Presence Categories matching user's reference mockup
  const categories: PresenceCategory[] = [
    {
      id: "offices",
      name: "Offices",
      countSubtitle: "14 global offices",
      color: "#2563EB", // Royal blue
      countryIds: [
        "840", // USA
        "124", // Canada
        "826", // UK
        "276", // Germany
        "724", // Spain
        "250", // France
        "380", // Italy
        "792", // Turkey
        "818", // Egypt
        "784", // UAE
        "156", // China
        "392", // Japan
        "036", // Australia
        "528", // Netherlands
      ],
      stats: "14 Global Desks · 350+ Multilingual Staff",
      description:
        "14 international commercial offices & buyer desks across London, New York, Madrid, Istanbul, Cairo, Dubai, and Shanghai providing 24/7 dedicated enterprise account servicing.",
      countries: [
        "United States",
        "Canada",
        "United Kingdom",
        "Germany",
        "Spain",
        "France",
        "Italy",
        "Turkey",
      ],
      moreCount: 6,
    },
    {
      id: "manufacturing",
      name: "Sourcing & Manufacturing",
      countSubtitle: "Over 50+ partner factories",
      color: "#334155", // Slate charcoal
      countryIds: [
        "156", // China
        "704", // Vietnam
        "050", // Bangladesh
        "356", // India
        "792", // Turkey
        "818", // Egypt
        "360", // Indonesia
        "586", // Pakistan
        "116", // Cambodia
      ],
      stats: "50+ Partner Mills · 4.8M Units/Month",
      description:
        "Vertically integrated smart manufacturing centers, certified dye facilities, and yarn spinning mills engineered for high-volume enterprise garment production.",
      countries: [
        "Bangladesh",
        "India",
        "Vietnam",
        "China",
        "Turkey",
        "Egypt",
        "Indonesia",
        "Pakistan",
      ],
      moreCount: 5,
    },
    {
      id: "designers",
      name: "Designers",
      countSubtitle: "100+ in-house designers",
      color: "#6366F1", // Indigo / periwinkle
      countryIds: [
        "826", // UK
        "250", // France
        "380", // Italy
        "724", // Spain
        "840", // USA
        "392", // Japan
        "410", // South Korea
        "752", // Sweden
        "276", // Germany
      ],
      stats: "4 Design Hubs · 1,200+ Seasonal Styles",
      description:
        "In-house fashion design studios & 3D digital sampling ateliers in London, Paris, Milan, and Seoul developing over 1,200 commercial silhouettes every season.",
      countries: [
        "United Kingdom",
        "France",
        "Italy",
        "Spain",
        "United States",
        "Japan",
        "South Korea",
        "Germany",
      ],
      moreCount: 4,
    },
    {
      id: "esg",
      name: "ESG Team",
      countSubtitle: "Sustainable future, together",
      color: "#10B981", // Emerald green
      countryIds: [
        "156", // China
        "704", // Vietnam
        "050", // Bangladesh
        "356", // India
        "276", // Germany
        "528", // Netherlands
        "826", // UK
        "578", // Norway
      ],
      stats: "100% ZDHC Compliant · Higg FEM Verified",
      description:
        "On-site compliance officers conducting continuous ZDHC wastewater monitoring, Higg Index verification, and ethical labour audits at every production facility.",
      countries: [
        "Germany",
        "Netherlands",
        "United Kingdom",
        "Norway",
        "Bangladesh",
        "India",
        "Vietnam",
        "Denmark",
      ],
      moreCount: 8,
    },
  ];

  const [activeCategoryId, setActiveCategoryId] = useState<string>("offices");
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
      prev === GLOBAL_HUBS.length - 1 ? 0 : prev + 1
    );
  };

  // Helper icon for category
  const getCategoryIcon = (id: string, className?: string) => {
    switch (id) {
      case "offices":
        return <MapPin className={className} />;
      case "manufacturing":
        return <Factory className={className} />;
      case "designers":
        return <PenTool className={className} />;
      case "esg":
        return <Leaf className={className} />;
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

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-3">
                Maya Around the <br />
                World
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                With a strong global network, Maya serves clients across continents,
                ensuring seamless sourcing, manufacturing and delivery.
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
                          className={`text-sm font-bold transition-colors ${
                            isActive
                              ? "text-slate-900 font-semibold"
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
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
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
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {currentHub.name}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{currentHub.office}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Headphones className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{currentHub.support}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
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
