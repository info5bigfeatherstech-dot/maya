"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Gauge, Maximize2, Wrench, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Manufacturing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("sewing");

  // Counter refs
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const stat4Ref = useRef<HTMLSpanElement>(null);

  const facilities = [
    {
      id: "sewing",
      title: "Smart Modular Sewing & Overhead Suspension Lines",
      description:
        "Equipped with INA intelligent computer suspension conveyor systems that route each garment unit automatically to specialized operator pods, slashing work-in-progress idle time by 48%.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85",
      features: [
        "INA Intelligent Hanger Conveyors",
        "Juki DDL-9000C Direct-Drive Computerized Stations",
        "Real-time RFID production efficiency tracking",
      ],
    },
    {
      id: "cutting",
      title: "Gerber CNC Spreading & Multi-Ply Cutting",
      description:
        "High-ply automated fabric spreaders synchronized with Gerber computerized CNC cutting heads ensure cutting edge accuracy to within ±0.2mm, minimizing fabric waste while maximizing structural integrity.",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=85",
      features: [
        "Gerber GTxL automated multi-ply CNC cutters",
        "Tension-free automated optical spreading tables",
        "Automated pattern nesting efficiency > 89%",
      ],
    },
    {
      id: "washing",
      title: "Eco-Washing & Ozone Finishing Technology",
      description:
        "Jeanologia laser finishing and G2 eco-ozone systems eliminate toxic potassium permanganate and stonewash slurry, drastically curtailing environmental impact while yielding luxury hand-feels.",
      image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1600&q=85",
      features: [
        "Jeanologia Twin Laser finishing systems",
        "G2 high-capacity ozone decolorization drums",
        "Zero-discharge biological wastewater reclamation",
      ],
    },
    {
      id: "warehouse",
      title: "Automated AS/RS Warehousing & Bonded Dispatch",
      description:
        "Fully automated high-bay AS/RS warehouse with 1.2M garment capacity directly integrated with China Customs bonded clearance for streamlined container sealing and port loading.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85",
      features: [
        "Automated Storage & Retrieval (AS/RS) facility",
        "Direct EDI barcode dispatch linked to major shipping lines",
        "Dedicated container loading docks with humidity control",
      ],
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

      // ==========================================
      // PLACEHOLDER DATA: Maya Exports Ltd facility metrics
      // ==========================================
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
      className="bg-deep-blue text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background with subtle parallax */}
      <div
        ref={parallaxBgRef}
        className="absolute inset-0 z-0 opacity-15 pointer-events-none scale-110"
      >
        <Image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=85"
          alt="Factory background blueprint"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-deep-blue/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-deep-blue-card border border-deep-blue-border text-[11px] font-semibold uppercase tracking-widest text-brand-blue mb-2.5">
            Maya Manufacturing Infrastructure
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            High-Capacity Automated Production Architecture.
          </h2>
          <p className="text-slate-light mt-3 text-xs sm:text-sm leading-relaxed">
            Constructed to eliminate bottlenecks, minimize variance, and absorb multi-million unit seasonal
            demand spikes for global fashion conglomerates.
          </p>
        </div>

        {/* Capability Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="bg-deep-blue-card/70 border border-deep-blue-border p-5 rounded-sm backdrop-blur-sm">
            <Cpu className="w-5 h-5 text-brand-blue mb-3" />
            <span
              ref={stat1Ref}
              className="block text-xl sm:text-2xl font-bold text-white font-display leading-tight"
            >
              0
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium mt-1 block">
              Dedicated Assembly Lines
            </span>
            <span className="text-[10px] text-slate-muted mt-0.5 block">
              Flexible modular quick-change configuration
            </span>
          </div>

          <div className="bg-deep-blue-card/70 border border-deep-blue-border p-5 rounded-sm backdrop-blur-sm">
            <Gauge className="w-5 h-5 text-brand-blue mb-3" />
            <span
              ref={stat2Ref}
              className="block text-xl sm:text-2xl font-bold text-gold font-display leading-tight"
            >
              0
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium mt-1 block">
              Daily Output Velocity
            </span>
            <span className="text-[10px] text-slate-muted mt-0.5 block">
              Continuous 2-shift high-efficiency run
            </span>
          </div>

          <div className="bg-deep-blue-card/70 border border-deep-blue-border p-5 rounded-sm backdrop-blur-sm">
            <Maximize2 className="w-5 h-5 text-brand-blue mb-3" />
            <span
              ref={stat3Ref}
              className="block text-xl sm:text-2xl font-bold text-white font-display leading-tight"
            >
              0
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium mt-1 block">
              Industrial Square Footage
            </span>
            <span className="text-[10px] text-slate-muted mt-0.5 block">
              Across smart campus manufacturing hub
            </span>
          </div>

          <div className="bg-deep-blue-card/70 border border-deep-blue-border p-5 rounded-sm backdrop-blur-sm">
            <Wrench className="w-5 h-5 text-brand-blue mb-3" />
            <span
              ref={stat4Ref}
              className="block text-xl sm:text-2xl font-bold text-gold font-display leading-tight"
            >
              0
            </span>
            <span className="text-[11px] uppercase tracking-wider text-slate-light font-medium mt-1 block">
              Automated CNC Units
            </span>
            <span className="text-[10px] text-slate-muted mt-0.5 block">
              Japanese & German high-precision machinery
            </span>
          </div>
        </div>

        {/* Facility Showcase utilizing shadcn Tabs */}
        <div className="bg-deep-blue-card/90 border border-deep-blue-border rounded-sm overflow-hidden p-6 sm:p-10 shadow-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="pb-6 border-b border-deep-blue-border overflow-x-auto">
              <TabsList className="bg-deep-blue/80 border-deep-blue-border">
                <TabsTrigger value="sewing">Smart Sewing</TabsTrigger>
                <TabsTrigger value="cutting">Auto-Cutting</TabsTrigger>
                <TabsTrigger value="washing">Eco-Washing</TabsTrigger>
                <TabsTrigger value="warehouse">AS/RS Logistics</TabsTrigger>
              </TabsList>
            </div>

            {facilities.map((fac) => (
              <TabsContent key={fac.id} value={fac.id} className="mt-8 outline-none">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <h3 className="text-2xl font-bold text-white font-display">
                      {fac.title}
                    </h3>
                    <p className="text-slate-light text-sm leading-relaxed">
                      {fac.description}
                    </p>
                    <div className="space-y-2 pt-2">
                      {fac.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-light">
                          <Check className="w-4 h-4 text-brand-blue shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-6 relative aspect-[16/10] rounded-sm overflow-hidden border border-deep-blue-border bg-deep-blue-dark shadow-xl">
                    <Image
                      src={fac.image}
                      alt={fac.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
