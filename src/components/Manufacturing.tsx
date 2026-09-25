"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cpu,
  Gauge,
  Maximize2,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Zap,
} from "lucide-react";

interface FacilityStation {
  id: string;
  step: string;
  category: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
  kpis: { label: string; value: string; detail: string }[];
  equipment: string;
  features: string[];
  telemetry: {
    system: string;
    efficiency: string;
    status: string;
    calibration: string;
  };
}

export default function Manufacturing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);

  // Counter refs
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const stat4Ref = useRef<HTMLSpanElement>(null);

  const facilities: FacilityStation[] = [
    {
      id: "cutting",
      step: "01",
      category: "CAD Pre-Production & Cutting",
      title: "Gerber CNC Spreading & Multi-Ply Cutting",
      subTitle: "High-Ply Laser Nesting & Tension-Free Fabric Handling",
      description:
        "High-ply automated fabric spreaders synchronized with Gerber computerized CNC cutting heads ensure cutting edge accuracy to within ±0.2mm, minimizing fabric waste while maximizing structural integrity.",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=85",
      kpis: [
        { label: "Cutting Tolerance", value: "±0.2mm", detail: "Computerized laser accuracy" },
        { label: "Fabric Yield", value: "> 89%", detail: "Automated algorithmic nesting" },
        { label: "Ply Capacity", value: "80-120 Plies", detail: "Synchronized tension-free spread" },
      ],
      equipment: "Gerber GTxL Multi-Ply Cutters & Automated Optical Spreading Tables",
      features: [
        "Gerber GTxL automated multi-ply CNC cutters",
        "Tension-free automated optical spreading tables",
        "Automated pattern nesting efficiency > 89%",
        "Direct CAD digital tech pack synchronization",
      ],
      telemetry: {
        system: "GERBER® GTxL DIGITAL CNC",
        efficiency: "99.4% NESTING ACCURACY",
        status: "ACTIVE FABRIC FEED",
        calibration: "±0.2MM LASER GUIDED",
      },
    },
    {
      id: "sewing",
      step: "02",
      category: "Smart Assembly & Automation",
      title: "Smart Modular Sewing & Overhead Suspension Lines",
      subTitle: "Computerized INA Suspension & RFID Workstation Routing",
      description:
        "Equipped with INA intelligent computer suspension conveyor systems that route each garment unit automatically to specialized operator pods, slashing work-in-progress idle time by 48%.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85",
      kpis: [
        { label: "WIP Idle Reduction", value: "-48%", detail: "Automated hanger pod delivery" },
        { label: "Workstations", value: "44 Lines", detail: "Juki direct-drive digital pods" },
        { label: "Real-time Tracking", value: "100% RFID", detail: "Millisecond operator efficiency" },
      ],
      equipment: "INA Computer Suspension Hanger Conveyors & Juki DDL-9000C Direct-Drive Pods",
      features: [
        "INA Intelligent Hanger Conveyor System with automated pod routing",
        "Juki DDL-9000C Direct-Drive Computerized Stitch Stations",
        "Real-time RFID production efficiency and piece-rate tracking",
        "Pneumatic thread trimming and digital tension adjustment",
      ],
      telemetry: {
        system: "INA® SMART SUSPENSION CONVEYOR",
        efficiency: "+48% THROUGHPUT VELOCITY",
        status: "44 LINES IN SYNCHRONY",
        calibration: "100% RFID COMPONENT AUDIT",
      },
    },
    {
      id: "washing",
      step: "03",
      category: "Eco-Finishing & Surface Treatment",
      title: "Eco-Washing & Ozone Finishing Technology",
      subTitle: "Jeanologia Twin Laser & Zero-Chemical G2 Ozone Systems",
      description:
        "Jeanologia laser finishing and G2 eco-ozone systems eliminate toxic potassium permanganate and stonewash slurry, drastically curtailing environmental impact while yielding luxury hand-feels.",
      image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1600&q=85",
      kpis: [
        { label: "Water Savings", value: "85%", detail: "Closed-loop micro-filtration" },
        { label: "Chemical Elimination", value: "100%", detail: "Zero potassium permanganate" },
        { label: "Laser Precision", value: "0.1mm", detail: "Jeanologia twin laser distressing" },
      ],
      equipment: "Jeanologia Twin Laser Marking & G2 Ozone Industrial Decontamination Drums",
      features: [
        "Jeanologia Twin Laser finishing systems for vintage distressing",
        "G2 high-capacity ozone decolorization and softening drums",
        "Zero-discharge biological wastewater reclamation and recycling",
        "OEKO-TEX 100 chemical certification compliant",
      ],
      telemetry: {
        system: "JEANOLOGIA® TWIN LASER + G2 OZONE",
        efficiency: "85% WATER RECLAMATION",
        status: "ZERO TOXIC SLURRY",
        calibration: "OEKO-TEX 100 LEVEL 3",
      },
    },
    {
      id: "warehouse",
      step: "04",
      category: "Intelligent Warehousing & Bonded Shipping",
      title: "Automated AS/RS Warehousing & Bonded Dispatch",
      subTitle: "High-Bay Robotics & Integrated China Customs Clearance",
      description:
        "Fully automated high-bay AS/RS warehouse with 1.2M garment capacity directly integrated with China Customs bonded clearance for streamlined container sealing and port loading.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85",
      kpis: [
        { label: "Storage Capacity", value: "1.2M Units", detail: "Automated multi-tier high bay" },
        { label: "Retrieval Speed", value: "< 90 Sec", detail: "Robotic pallet stacker cranes" },
        { label: "Customs Integration", value: "Direct Bonded", detail: "Fast-track sea container sealing" },
      ],
      equipment: "Robotic High-Bay AS/RS Stackers & EDI Ocean Freight Dispatch Matrix",
      features: [
        "Automated Storage & Retrieval (AS/RS) facility with 1.2M garment capacity",
        "Direct EDI barcode dispatch linked to major international shipping lines",
        "Dedicated container loading docks with automated humidity and temperature control",
        "China Customs bonded clearance on-site for immediate port drayage",
      ],
      telemetry: {
        system: "AS/RS ROBOTIC HIGH-BAY DOCK",
        efficiency: "1.2M GARMENT CUSTODY",
        status: "EDI PORT INTEGRATION",
        calibration: "CONTAINER SEALED DOCK",
      },
    },
  ];

  const currentStation = facilities[activeStationIndex];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background subtle parallax
      if (parallaxBgRef.current) {
        gsap.to(parallaxBgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Stats counters
      const stats = [
        { ref: stat1Ref, target: 44, suffix: " Lines" },
        { ref: stat2Ref, target: 125, suffix: "k / Day" },
        { ref: stat3Ref, target: 1.6, suffix: "M Sq.Ft", isDecimal: true },
        { ref: stat4Ref, target: 1150, suffix: "+" },
      ];

      stats.forEach((item) => {
        if (!item.ref.current) return;
        const targetValue = item.target;
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: targetValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item.ref.current,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            if (item.ref.current) {
              if (item.isDecimal) {
                item.ref.current.innerText = proxy.val.toFixed(2) + item.suffix;
              } else {
                item.ref.current.innerText =
                  Math.floor(proxy.val).toLocaleString() + item.suffix;
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
      id="manufacturing"
      ref={sectionRef}
      className="bg-offwhite text-deep-blue py-16 sm:py-20 lg:py-24 relative overflow-hidden border-t border-pearl-gray"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-pearl-gray border border-pearl-gray text-[11px] font-semibold uppercase tracking-widest text-deep-blue mb-2.5">
            <Activity className="w-3.5 h-3.5 text-brand-blue" />
            <span>Maya Manufacturing Infrastructure</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-deep-blue font-display">
            High-Capacity Automated Production Architecture.
          </h2>
          <p className="text-slate-body mt-3 text-xs sm:text-sm leading-relaxed">
            Engineered to eliminate bottlenecks, minimize variance, and absorb multi-million unit seasonal
            demand spikes for global fashion conglomerates.
          </p>
        </div>

        {/* Capability Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="bg-white border border-pearl-gray p-5 rounded-sm shadow-xs">
            <Cpu className="w-5 h-5 text-brand-blue mb-3" />
            <span
              ref={stat1Ref}
              className="block text-xl sm:text-2xl font-bold text-deep-blue font-display leading-tight"
            >
              0
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-700 font-semibold mt-1 block">
              Dedicated Assembly Lines
            </span>
            <span className="text-[10px] text-slate-muted mt-0.5 block">
              Flexible modular quick-change configuration
            </span>
          </div>

          <div className="bg-white border border-pearl-gray p-5 rounded-sm shadow-xs">
            <Gauge className="w-5 h-5 text-brand-blue mb-3" />
            <span
              ref={stat2Ref}
              className="block text-xl sm:text-2xl font-bold text-gold font-display leading-tight"
            >
              0
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-700 font-semibold mt-1 block">
              Daily Output Velocity
            </span>
            <span className="text-[10px] text-slate-muted mt-0.5 block">
              Continuous 2-shift high-efficiency run
            </span>
          </div>

          <div className="bg-white border border-pearl-gray p-5 rounded-sm shadow-xs">
            <Maximize2 className="w-5 h-5 text-brand-blue mb-3" />
            <span
              ref={stat3Ref}
              className="block text-xl sm:text-2xl font-bold text-deep-blue font-display leading-tight"
            >
              0
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-700 font-semibold mt-1 block">
              Industrial Square Footage
            </span>
            <span className="text-[10px] text-slate-muted mt-0.5 block">
              Across smart campus manufacturing hub
            </span>
          </div>

          <div className="bg-white border border-pearl-gray p-5 rounded-sm shadow-xs">
            <Wrench className="w-5 h-5 text-brand-blue mb-3" />
            <span
              ref={stat4Ref}
              className="block text-xl sm:text-2xl font-bold text-gold font-display leading-tight"
            >
              0
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-700 font-semibold mt-1 block">
              Automated CNC Units
            </span>
            <span className="text-[10px] text-slate-muted mt-0.5 block">
              Japanese & German high-precision machinery
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LUXURY EDITORIAL MANUFACTURING SHOWCASE */}
        {/* ============================================================== */}
        <div className="bg-white border border-pearl-gray rounded-sm overflow-hidden shadow-xl">
          {/* Department Navigation Tabs */}
          <div className="border-b border-pearl-gray bg-offwhite/50">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {facilities.map((fac, idx) => {
                const isActive = activeStationIndex === idx;
                return (
                  <button
                    key={fac.id}
                    type="button"
                    onClick={() => setActiveStationIndex(idx)}
                    className={`relative p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer border-b-2 sm:border-b-0 sm:border-r border-pearl-gray last:border-r-0 ${
                      isActive
                        ? "bg-white text-deep-blue"
                        : "text-slate-500 hover:text-deep-blue hover:bg-white/60"
                    }`}
                  >
                    {/* Active Top Highlight */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 transition-colors ${
                        isActive ? "bg-brand-blue" : "bg-transparent"
                      }`}
                    />

                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-bold tracking-wider uppercase font-mono ${
                          isActive ? "text-brand-blue" : "text-slate-400"
                        }`}
                      >
                        {fac.step}.
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold truncate">
                        {fac.category.split("&")[0]}
                      </span>
                    </div>

                    <div
                      className={`text-sm font-bold font-display truncate ${
                        isActive ? "text-deep-blue" : "text-slate-700"
                      }`}
                    >
                      {fac.id === "cutting" && "CAD & CNC Cutting"}
                      {fac.id === "sewing" && "Modular Smart Sewing"}
                      {fac.id === "washing" && "Eco-Ozone Finishing"}
                      {fac.id === "warehouse" && "Automated Logistics"}
                    </div>

                    <div className="text-[11px] text-slate-500 mt-1 truncate">
                      {fac.kpis[0].value} &bull; {fac.kpis[0].label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Department Content Display */}
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Department Editorial & Specifications */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-pearl-gray border border-pearl-gray text-[11px] font-semibold uppercase tracking-widest text-deep-blue mb-3">
                    <span>Department {currentStation.step} of 04</span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-brand-blue">{currentStation.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-deep-blue font-display leading-tight mb-2">
                    {currentStation.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-brand-blue mb-3">
                    {currentStation.subTitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-body leading-relaxed">
                    {currentStation.description}
                  </p>
                </div>

                {/* KPI Performance Chips */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {currentStation.kpis.map((kpi, kIdx) => (
                    <div
                      key={kIdx}
                      className="p-3.5 rounded-sm bg-offwhite border border-pearl-gray"
                    >
                      <span className="text-[10px] uppercase font-semibold text-slate-muted block truncate mb-1">
                        {kpi.label}
                      </span>
                      <span className="text-lg sm:text-xl font-bold text-deep-blue font-display block leading-none mb-1">
                        {kpi.value}
                      </span>
                      <span className="text-[10px] text-slate-body block truncate">
                        {kpi.detail}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Equipment & Capabilities Checklist */}
                <div className="space-y-2.5 border-t border-pearl-gray pt-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-deep-blue block">
                    Precision Equipment & Quality Verification:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentStation.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-body">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Department Step Switchers */}
                <div className="pt-4 flex items-center justify-between border-t border-pearl-gray">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStationIndex((prev) =>
                        prev === 0 ? facilities.length - 1 : prev - 1
                      )
                    }
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-deep-blue transition-colors cursor-pointer py-2 px-3 rounded hover:bg-pearl-gray/60"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Department</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveStationIndex((prev) =>
                        (prev + 1) % facilities.length
                      )
                    }
                    className="inline-flex items-center gap-2 text-xs font-semibold text-brand-blue hover:text-deep-blue transition-colors cursor-pointer py-2 px-4 rounded bg-pearl-gray/50 hover:bg-pearl-gray"
                  >
                    <span>Next Department</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: High-Resolution Facility Showcase Frame */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden border border-pearl-gray bg-slate-100 shadow-xl group">
                  <Image
                    src={currentStation.image}
                    alt={currentStation.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-deep-blue text-xs font-semibold px-3 py-1.5 rounded-sm shadow-md border border-pearl-gray flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-blue" />
                    <span>Audited Tier-1 Facility &bull; ISO 9001 Certified</span>
                  </div>

                  {/* Bottom Machinery Banner */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-sm shadow-md border border-pearl-gray flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Primary System
                      </span>
                      <span className="font-bold text-deep-blue font-display block truncate">
                        {currentStation.equipment}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-brand-blue shrink-0 ml-4">
                      {currentStation.kpis[1].value}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
