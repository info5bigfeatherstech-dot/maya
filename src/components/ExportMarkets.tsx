"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, MapPin, Building2, Factory, Palette, Leaf, ArrowRight } from "lucide-react";
import Interactive3DGlobe, { PresenceCategory, COUNTRY_NAMES } from "./Interactive3DGlobe";

export default function ExportMarkets() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Counter refs
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const stat4Ref = useRef<HTMLSpanElement>(null);

  // Categories matching the user's reference screenshot
  const [categories, setCategories] = useState<PresenceCategory[]>([
    {
      id: "offices",
      name: "Offices",
      color: "#FF334B", // Vibrant red/coral matching screenshot
      active: true, // Active by default as in screenshot
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
      description:
        "14 International commercial offices & buyer desks across London, New York, Madrid, Istanbul, Cairo, Dubai, and Shanghai providing 24/7 dedicated enterprise account servicing.",
      stats: "14 Global Desks · 350+ Multilingual Staff",
    },
    {
      id: "manufacturing",
      name: "Sourcing & Manufacturing",
      color: "#313D48", // Dark charcoal matching screenshot
      active: false,
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
      description:
        "Vertically integrated smart manufacturing centers, certified dye facilities, and yarn spinning mills engineered for high-volume enterprise garment production.",
      stats: "18 Owned & Partner Mills · 2.4M Pcs/Mo",
    },
    {
      id: "designers",
      name: "Designers",
      color: "#7F90EB", // Soft periwinkle / lavender blue matching screenshot
      active: false,
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
      description:
        "In-house fashion design studios & 3D digital sampling ateliers in London, Paris, Milan, and Seoul developing over 1,200 commercial silhouettes every season.",
      stats: "4 Design Hubs · 1,200+ Seasonal Styles",
    },
    {
      id: "esg",
      name: "ESG Team",
      color: "#A3CE85", // Soft sage green matching screenshot
      active: false,
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
      description:
        "On-site compliance officers conducting continuous ZDHC wastewater monitoring, Higg Index verification, and ethical labour audits at every production facility.",
      stats: "100% ZDHC Compliant · Higg FEM Verified",
    },
  ]);

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Toggle category on/off
  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, active: !cat.active } : cat))
    );
  };

  // Find currently active categories
  const activeCount = categories.filter((c) => c.active).length;
  const primaryActiveCat =
    categories.find((c) => c.id === hoveredCategory) ||
    categories.find((c) => c.active) ||
    categories[0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stats = [
        { ref: stat1Ref, target: 45, prefix: "", suffix: "+" },
        { ref: stat2Ref, target: 165, prefix: "$", suffix: "M" },
        { ref: stat3Ref, target: 99.2, prefix: "", suffix: "%", isDecimal: true },
        { ref: stat4Ref, target: 26, prefix: "", suffix: " Yrs" },
      ];

      stats.forEach((item) => {
        if (!item.ref.current) return;
        const targetVal = item.target;
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: targetVal,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item.ref.current,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            if (item.ref.current) {
              if (item.isDecimal) {
                item.ref.current.innerText =
                  item.prefix + proxy.val.toFixed(1) + item.suffix;
              } else {
                item.ref.current.innerText =
                  item.prefix + Math.floor(proxy.val).toString() + item.suffix;
              }
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="export-markets"
      ref={sectionRef}
      className="bg-white text-slate-900 py-16 sm:py-24 relative overflow-hidden border-t border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left Controls, Right 3D Globe matching user's reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Title & Checkboxes */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            {/* Title matching "PDS Around the World" */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-slate-900 font-display leading-[1.15] mb-6">
              Maya Around the <br />
              World
            </h2>

            {/* Checklist with exact styled square checkboxes matching screenshot */}
            <div className="space-y-3.5 mb-6">
              {categories.map((cat) => {
                const isActive = cat.active;
                return (
                  <div
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    onMouseEnter={() => setHoveredCategory(cat.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className="flex items-center gap-3 cursor-pointer group select-none py-0.5"
                  >
                    {/* Custom colored square checkbox */}
                    <div
                      className="w-4.5 h-4.5 rounded-[4px] flex items-center justify-center transition-all duration-150 shadow-xs shrink-0"
                      style={{
                        backgroundColor: isActive ? cat.color : `${cat.color}33`,
                        border: `2px solid ${cat.color}`,
                      }}
                    >
                      {isActive && (
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`text-sm font-medium transition-colors ${
                        isActive
                          ? "text-slate-900 font-semibold"
                          : "text-slate-600 group-hover:text-slate-900"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Active Category Details Card */}
            {primaryActiveCat && (
              <div className="p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200/80 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: primaryActiveCat.color }}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {primaryActiveCat.name}
                  </span>
                  {primaryActiveCat.stats && (
                    <span className="text-[11px] font-mono font-medium text-slate-500 ml-auto">
                      {primaryActiveCat.stats}
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-slate-600 mb-3">
                  {primaryActiveCat.description}
                </p>

                {/* Country tags */}
                <div className="flex flex-wrap gap-1.5">
                  {primaryActiveCat.countryIds.slice(0, 8).map((cId) => (
                    <span
                      key={cId}
                      className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-white border border-slate-200 text-slate-700"
                    >
                      {COUNTRY_NAMES[cId] || cId}
                    </span>
                  ))}
                  {primaryActiveCat.countryIds.length > 8 && (
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-200/60 text-slate-600">
                      +{primaryActiveCat.countryIds.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: 3D Interactive Globe */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <Interactive3DGlobe
              categories={categories}
              onToggleCategory={toggleCategory}
              hoveredCategory={hoveredCategory}
            />
          </div>
        </div>

        {/* Bottom Stats Strip */}
        <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center lg:text-left">
          <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200/70">
            <span
              ref={stat1Ref}
              className="block text-xl sm:text-2xl font-bold text-slate-900 font-display leading-tight"
            >
              45+
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Countries Served</span>
          </div>

          <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200/70">
            <span
              ref={stat2Ref}
              className="block text-xl sm:text-2xl font-bold text-slate-900 font-display leading-tight"
            >
              $165M
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Annual Export Volume</span>
          </div>

          <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200/70">
            <span
              ref={stat3Ref}
              className="block text-xl sm:text-2xl font-bold text-slate-900 font-display leading-tight"
            >
              99.2%
            </span>
            <span className="text-[11px] text-slate-500 font-medium">On-Time Vessel Departure</span>
          </div>

          <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200/70">
            <span
              ref={stat4Ref}
              className="block text-xl sm:text-2xl font-bold text-slate-900 font-display leading-tight"
            >
              26 Yrs
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Direct International Export</span>
          </div>
        </div>
      </div>
    </section>
  );
}
