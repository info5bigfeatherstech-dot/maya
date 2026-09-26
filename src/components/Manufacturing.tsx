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
  Sliders,
  X,
  ScanLine,
  Droplets,
  Boxes,
  Radio,
  FileCheck,
  CornerDownRight,
  Workflow,
  ExternalLink,
} from "lucide-react";

interface FacilityStation {
  id: string;
  step: string;
  category: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
  accentColor: string;
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
  const [selectedStation, setSelectedStation] = useState<FacilityStation | null>(null);
  const [hoveredStationId, setHoveredStationId] = useState<string | null>(null);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

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
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      accentColor: "#2E9FC4",
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
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      accentColor: "#D4A54A",
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
      image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=80",
      accentColor: "#10B981",
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
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      accentColor: "#6366F1",
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

  const handleImageError = (id: string) => {
    setImgErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  // Helper SVG blueprint schematic render when image fails or loads
  const renderFallbackSchematic = (fac: FacilityStation) => {
    if (fac.id === "cutting") {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2A3D] via-[#15354D] to-[#0A1C2A] flex items-center justify-center p-6 overflow-hidden">
          <svg className="w-full h-full opacity-25" viewBox="0 0 400 300" fill="none">
            <defs>
              <pattern id="grid-cutting" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2E9FC4" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-cutting)" />
            {/* CNC Cutting laser vector lines */}
            <path d="M 50 80 L 180 80 L 220 160 L 350 160" stroke="#2E9FC4" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="220" cy="160" r="16" stroke="#2E9FC4" strokeWidth="1.5" />
            <circle cx="220" cy="160" r="4" fill="#2E9FC4" />
            <line x1="200" y1="160" x2="240" y2="160" stroke="#2E9FC4" strokeWidth="1" />
            <line x1="220" y1="140" x2="220" y2="180" stroke="#2E9FC4" strokeWidth="1" />
            <text x="50" y="240" fill="#2E9FC4" fontSize="12" fontFamily="monospace">GERBER® CNC CUTTING BED ±0.2mm</text>
          </svg>
        </div>
      );
    }
    if (fac.id === "sewing") {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#162736] via-[#1B3A4B] to-[#0A1C2A] flex items-center justify-center p-6 overflow-hidden">
          <svg className="w-full h-full opacity-25" viewBox="0 0 400 300" fill="none">
            <defs>
              <pattern id="grid-sewing" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#D4A54A" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-sewing)" />
            <path d="M 40 150 Q 200 40 360 150 T 360 220" stroke="#D4A54A" strokeWidth="2" />
            <circle cx="120" cy="115" r="10" stroke="#D4A54A" strokeWidth="2" fill="#D4A54A" fillOpacity="0.2" />
            <circle cx="200" cy="95" r="10" stroke="#D4A54A" strokeWidth="2" fill="#D4A54A" fillOpacity="0.2" />
            <circle cx="280" cy="115" r="10" stroke="#D4A54A" strokeWidth="2" fill="#D4A54A" fillOpacity="0.2" />
            <text x="40" y="260" fill="#D4A54A" fontSize="12" fontFamily="monospace">INA® SUSPENSION OVERHEAD LINE</text>
          </svg>
        </div>
      );
    }
    if (fac.id === "washing") {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D2F35] via-[#13444B] to-[#081E22] flex items-center justify-center p-6 overflow-hidden">
          <svg className="w-full h-full opacity-25" viewBox="0 0 400 300" fill="none">
            <circle cx="200" cy="140" r="80" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle cx="200" cy="140" r="50" stroke="#10B981" strokeWidth="2" />
            <circle cx="200" cy="140" r="15" fill="#10B981" fillOpacity="0.3" />
            <text x="60" y="260" fill="#10B981" fontSize="12" fontFamily="monospace">G2 OZONE + CLOSED-LOOP FILTRATION</text>
          </svg>
        </div>
      );
    }
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E2238] via-[#2A3152] to-[#111322] flex items-center justify-center p-6 overflow-hidden">
        <svg className="w-full h-full opacity-25" viewBox="0 0 400 300" fill="none">
          <rect x="60" y="60" width="70" height="160" stroke="#6366F1" strokeWidth="1.5" />
          <rect x="165" y="60" width="70" height="160" stroke="#6366F1" strokeWidth="1.5" />
          <rect x="270" y="60" width="70" height="160" stroke="#6366F1" strokeWidth="1.5" />
          <line x1="40" y1="230" x2="360" y2="230" stroke="#6366F1" strokeWidth="2" />
          <text x="40" y="270" fill="#6366F1" fontSize="12" fontFamily="monospace">AS/RS ROBOTIC HIGH-BAY RACKS</text>
        </svg>
      </div>
    );
  };

  return (
    <section
      id="manufacturing"
      ref={sectionRef}
      className="bg-[#F8FAFC] text-deep-blue py-16 sm:py-20 lg:py-24 relative overflow-hidden border-t border-pearl-gray"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Maya Manufacturing Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-display leading-[1.15]">
              High-Capacity Automated <br />
              <span className="text-[#2563EB]">Production Architecture.</span>
            </h2>
            <p className="text-slate-600 mt-3.5 text-sm sm:text-base leading-relaxed">
              Engineered end-to-end to eliminate bottlenecks, minimize variance, and absorb multi-million unit
              seasonal demand spikes for premier global fashion brands.
            </p>
          </div>

          {/* Quick interactive pipeline indicator */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white border border-pearl-gray rounded-lg shadow-xs self-start lg:self-end">
            <span className="text-[11px] font-semibold text-slate-500 px-2 flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5 text-brand-blue" />
              <span>Continuous 4-Phase Matrix</span>
            </span>
          </div>
        </div>

        {/* Capability Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white border border-pearl-gray p-5 rounded-lg shadow-xs transition-all hover:border-brand-blue/40 hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <Cpu className="w-5 h-5 text-brand-blue" />
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue font-semibold">Active</span>
            </div>
            <span
              ref={stat1Ref}
              className="block text-2xl sm:text-3xl font-bold text-deep-blue font-display leading-tight"
            >
              0
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-700 font-semibold mt-1 block">
              Dedicated Assembly Lines
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Flexible modular quick-change configuration
            </span>
          </div>

          <div className="bg-white border border-pearl-gray p-5 rounded-lg shadow-xs transition-all hover:border-gold/40 hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <Gauge className="w-5 h-5 text-gold" />
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-gold/10 text-gold font-semibold">2-Shift</span>
            </div>
            <span
              ref={stat2Ref}
              className="block text-2xl sm:text-3xl font-bold text-gold font-display leading-tight"
            >
              0
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-700 font-semibold mt-1 block">
              Daily Output Velocity
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Continuous 2-shift high-efficiency run
            </span>
          </div>

          <div className="bg-white border border-pearl-gray p-5 rounded-lg shadow-xs transition-all hover:border-brand-blue/40 hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <Maximize2 className="w-5 h-5 text-brand-blue" />
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue font-semibold">Campus</span>
            </div>
            <span
              ref={stat3Ref}
              className="block text-2xl sm:text-3xl font-bold text-deep-blue font-display leading-tight"
            >
              0
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-700 font-semibold mt-1 block">
              Industrial Square Footage
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Across smart campus manufacturing hub
            </span>
          </div>

          <div className="bg-white border border-pearl-gray p-5 rounded-lg shadow-xs transition-all hover:border-gold/40 hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <Wrench className="w-5 h-5 text-gold" />
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-gold/10 text-gold font-semibold">Tier-1</span>
            </div>
            <span
              ref={stat4Ref}
              className="block text-2xl sm:text-3xl font-bold text-gold font-display leading-tight"
            >
              0
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-700 font-semibold mt-1 block">
              Automated CNC Units
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Japanese & German high-precision machinery
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE BENTO GRID: 4 INTEGRATED DEPARTMENTS */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
          {/* ------------------------------------------------------------ */}
          {/* BENTO CARD 1: CAD Pre-Production & Gerber CNC Cutting (7 cols) */}
          {/* ------------------------------------------------------------ */}
          <div
            onMouseEnter={() => setHoveredStationId("cutting")}
            onMouseLeave={() => setHoveredStationId(null)}
            className="lg:col-span-7 bg-white rounded-xl border border-pearl-gray overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
          >
            {/* Visual Header / Banner */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
              {renderFallbackSchematic(facilities[0])}
              {!imgErrorMap[facilities[0].id] && (
                <Image
                  src={facilities[0].image}
                  alt={facilities[0].title}
                  fill
                  unoptimized
                  onError={() => handleImageError(facilities[0].id)}
                  className="object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A3D] via-[#0F2A3D]/40 to-transparent" />

              {/* Status Chips */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  DEPT 01 &bull; {facilities[0].telemetry.status}
                </span>
                <span className="text-[11px] font-semibold text-white/90 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded border border-white/20">
                  ±0.2mm Precision
                </span>
              </div>

              {/* Machinery Overlay at Bottom of Visual */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono tracking-wider uppercase text-brand-blue block font-bold mb-1">
                  Primary Machinery
                </span>
                <h3 className="text-white text-lg sm:text-xl font-bold font-display leading-tight drop-shadow-sm">
                  {facilities[0].title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {facilities[0].description}
              </p>

              {/* KPI Strip */}
              <div className="grid grid-cols-3 gap-2.5 py-1">
                {facilities[0].kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-offwhite p-3 rounded-lg border border-pearl-gray">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block truncate">
                      {kpi.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-deep-blue font-display block mt-0.5">
                      {kpi.value}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                      {kpi.detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Features & Action Button */}
              <div className="pt-2 border-t border-pearl-gray flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-deep-blue">
                  <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="truncate">ISO 9001 &bull; Gerber GTxL Digital CNC Certified</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStation(facilities[0])}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-brand-blue hover:text-white bg-brand-blue/10 hover:bg-brand-blue px-3.5 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <span>Explore Technical Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* BENTO CARD 2: Smart Assembly & Modular Sewing (5 cols) */}
          {/* ------------------------------------------------------------ */}
          <div
            onMouseEnter={() => setHoveredStationId("sewing")}
            onMouseLeave={() => setHoveredStationId(null)}
            className="lg:col-span-5 bg-white rounded-xl border border-pearl-gray overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
          >
            {/* Visual Header */}
            <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-900">
              {renderFallbackSchematic(facilities[1])}
              {!imgErrorMap[facilities[1].id] && (
                <Image
                  src={facilities[1].image}
                  alt={facilities[1].title}
                  fill
                  unoptimized
                  onError={() => handleImageError(facilities[1].id)}
                  className="object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A3D] via-[#0F2A3D]/40 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  DEPT 02 &bull; RFID Pods
                </span>
                <span className="text-[11px] font-bold text-white bg-gold/80 px-2 py-0.5 rounded">
                  -48% Idle Time
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono tracking-wider uppercase text-gold block font-bold mb-1">
                  Computerized Suspension
                </span>
                <h3 className="text-white text-base sm:text-lg font-bold font-display leading-tight drop-shadow-sm">
                  {facilities[1].title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {facilities[1].description}
              </p>

              {/* KPI Strip */}
              <div className="grid grid-cols-3 gap-2 py-1">
                {facilities[1].kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-offwhite p-2.5 rounded-lg border border-pearl-gray text-center sm:text-left">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block truncate">
                      {kpi.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-deep-blue font-display block mt-0.5">
                      {kpi.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-pearl-gray flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Juki DDL-9000C Direct Drive</span>
                <button
                  type="button"
                  onClick={() => setSelectedStation(facilities[1])}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-white bg-gold/10 hover:bg-gold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Specs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* BENTO CARD 3: Eco-Finishing & Ozone Surface Treatment (5 cols) */}
          {/* ------------------------------------------------------------ */}
          <div
            onMouseEnter={() => setHoveredStationId("washing")}
            onMouseLeave={() => setHoveredStationId(null)}
            className="lg:col-span-5 bg-white rounded-xl border border-pearl-gray overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
          >
            {/* Visual Header */}
            <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-900">
              {renderFallbackSchematic(facilities[2])}
              {!imgErrorMap[facilities[2].id] && (
                <Image
                  src={facilities[2].image}
                  alt={facilities[2].title}
                  fill
                  unoptimized
                  onError={() => handleImageError(facilities[2].id)}
                  className="object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A3D] via-[#0F2A3D]/40 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  DEPT 03 &bull; Eco Finishing
                </span>
                <span className="text-[11px] font-bold text-white bg-emerald-600/90 px-2 py-0.5 rounded">
                  85% Water Saved
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 block font-bold mb-1">
                  Jeanologia Laser & Ozone
                </span>
                <h3 className="text-white text-base sm:text-lg font-bold font-display leading-tight drop-shadow-sm">
                  {facilities[2].title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {facilities[2].description}
              </p>

              {/* KPI Strip */}
              <div className="grid grid-cols-3 gap-2 py-1">
                {facilities[2].kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-offwhite p-2.5 rounded-lg border border-pearl-gray text-center sm:text-left">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block truncate">
                      {kpi.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-deep-blue font-display block mt-0.5">
                      {kpi.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-pearl-gray flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">OEKO-TEX 100 Level 3</span>
                <button
                  type="button"
                  onClick={() => setSelectedStation(facilities[2])}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-white bg-emerald-50 hover:bg-emerald-600 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Specs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* BENTO CARD 4: AS/RS Intelligent Warehousing & Bonded Shipping (7 cols) */}
          {/* ------------------------------------------------------------ */}
          <div
            onMouseEnter={() => setHoveredStationId("warehouse")}
            onMouseLeave={() => setHoveredStationId(null)}
            className="lg:col-span-7 bg-white rounded-xl border border-pearl-gray overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
          >
            {/* Visual Header */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
              {renderFallbackSchematic(facilities[3])}
              {!imgErrorMap[facilities[3].id] && (
                <Image
                  src={facilities[3].image}
                  alt={facilities[3].title}
                  fill
                  unoptimized
                  onError={() => handleImageError(facilities[3].id)}
                  className="object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A3D] via-[#0F2A3D]/40 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  DEPT 04 &bull; Bonded AS/RS
                </span>
                <span className="text-[11px] font-bold text-white bg-indigo-600/90 px-2 py-0.5 rounded">
                  1.2M Units Capacity
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono tracking-wider uppercase text-indigo-300 block font-bold mb-1">
                  Robotic Storage & Customs Direct
                </span>
                <h3 className="text-white text-lg sm:text-xl font-bold font-display leading-tight drop-shadow-sm">
                  {facilities[3].title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {facilities[3].description}
              </p>

              {/* KPI Strip */}
              <div className="grid grid-cols-3 gap-2.5 py-1">
                {facilities[3].kpis.map((kpi, idx) => (
                  <div key={idx} className="bg-offwhite p-3 rounded-lg border border-pearl-gray">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block truncate">
                      {kpi.label}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-deep-blue font-display block mt-0.5">
                      {kpi.value}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                      {kpi.detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Features & Action Button */}
              <div className="pt-2 border-t border-pearl-gray flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-deep-blue">
                  <Boxes className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="truncate">Direct China Customs Bonded Clearance &bull; Port Fast-Track</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStation(facilities[3])}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 px-3.5 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <span>Explore Technical Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE EXPANDED DOSSIER MODAL */}
        {/* ============================================================== */}
        {selectedStation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-blue/80 backdrop-blur-md animate-in fade-in duration-200">
            <div
              className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-pearl-gray"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Navigation */}
              <div className="p-4 sm:p-5 border-b border-pearl-gray bg-offwhite flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-brand-blue/10 text-brand-blue text-xs font-bold font-mono">
                    DEPT {selectedStation.step}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {selectedStation.category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Department Switcher Pills */}
                  <div className="hidden sm:flex items-center gap-1 bg-pearl-gray/60 p-1 rounded-lg">
                    {facilities.map((fac) => (
                      <button
                        key={fac.id}
                        type="button"
                        onClick={() => setSelectedStation(fac)}
                        className={`px-2.5 py-1 rounded text-xs font-bold font-mono transition-all cursor-pointer ${
                          selectedStation.id === fac.id
                            ? "bg-white text-deep-blue shadow-xs"
                            : "text-slate-500 hover:text-deep-blue"
                        }`}
                      >
                        {fac.step}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedStation(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-deep-blue hover:bg-pearl-gray/60 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-deep-blue font-display leading-tight mb-2">
                    {selectedStation.title}
                  </h3>
                  <p className="text-sm font-semibold text-brand-blue mb-4">
                    {selectedStation.subTitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedStation.description}
                  </p>
                </div>

                {/* Telemetry Dashboard Box */}
                <div className="bg-[#0F2A3D] text-white p-5 rounded-xl border border-[#1E4663] space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400">
                        Live Facility Telemetry
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-300">
                      CALIBRATED &bull; REAL-TIME FEED
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Primary System</span>
                      <span className="text-xs font-mono font-bold text-white block mt-0.5 truncate">{selectedStation.telemetry.system}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Efficiency</span>
                      <span className="text-xs font-mono font-bold text-emerald-400 block mt-0.5">{selectedStation.telemetry.efficiency}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Current Status</span>
                      <span className="text-xs font-mono font-bold text-brand-blue block mt-0.5">{selectedStation.telemetry.status}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Calibration</span>
                      <span className="text-xs font-mono font-bold text-gold block mt-0.5">{selectedStation.telemetry.calibration}</span>
                    </div>
                  </div>
                </div>

                {/* KPI Performance Specifications */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Key Performance Metrics
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedStation.kpis.map((kpi, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-offwhite border border-pearl-gray">
                        <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                          {kpi.label}
                        </span>
                        <span className="text-2xl font-bold text-deep-blue font-display block leading-none mb-1">
                          {kpi.value}
                        </span>
                        <span className="text-xs text-slate-600 block">
                          {kpi.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Precision Equipment & Quality Standards Checklist */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Equipment Fleet & Verification Criteria
                  </h4>
                  <div className="p-4 rounded-xl bg-offwhite border border-pearl-gray mb-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Installed Machinery Suite:
                    </span>
                    <span className="text-sm font-bold text-deep-blue">
                      {selectedStation.equipment}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedStation.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-pearl-gray">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-slate-700 leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 sm:p-5 border-t border-pearl-gray bg-offwhite flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const currIdx = facilities.findIndex((f) => f.id === selectedStation.id);
                    const prevIdx = currIdx === 0 ? facilities.length - 1 : currIdx - 1;
                    setSelectedStation(facilities[prevIdx]);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-deep-blue px-3 py-2 rounded-lg hover:bg-pearl-gray/60 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Department</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const currIdx = facilities.findIndex((f) => f.id === selectedStation.id);
                    const nextIdx = (currIdx + 1) % facilities.length;
                    setSelectedStation(facilities[nextIdx]);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  <span>Next Department</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
