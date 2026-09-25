"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Recycle } from "lucide-react";

export default function Sustainability() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Counter refs
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const stat4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
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

      // ==========================================
      // PLACEHOLDER DATA: Maya Exports Sustainability KPIs
      // ==========================================
      const stats = [
        { ref: stat1Ref, target: 76, suffix: "%" },
        { ref: stat2Ref, target: 5.8, suffix: " MW", isDecimal: true },
        { ref: stat3Ref, target: 100, suffix: "%" },
        { ref: stat4Ref, target: 750, suffix: " T" },
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
                item.ref.current.innerText = proxy.val.toFixed(1) + item.suffix;
              } else {
                item.ref.current.innerText =
                  Math.floor(proxy.val).toString() + item.suffix;
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
      id="sustainability"
      ref={sectionRef}
      className="bg-deep-blue text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Factory Solar Rooftop & Eco-Fabric Visual */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] rounded-sm overflow-hidden border border-deep-blue-border shadow-2xl bg-deep-blue-dark"
            >
              <Image
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=85"
                alt="Clean energy solar roof installations and sustainable manufacturing facility"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-transparent to-transparent opacity-80" />

              {/* Floating Environmental Commitment Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-sm bg-deep-blue-card/95 backdrop-blur-md border border-deep-blue-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-deep-blue-dark border border-brand-blue flex items-center justify-center text-brand-blue">
                    <Leaf className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-white tracking-wider">
                      Zero Coal · Clean Energy Transition
                    </h4>
                    <p className="text-[11px] text-slate-light">
                      Rooftop photovoltaic array powers 42% of total daytime spinning & sewing demand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial ESG Copy & Stats */}
          <div ref={contentRef} className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-deep-blue-card border border-deep-blue-border text-[11px] font-semibold uppercase tracking-widest text-brand-blue">
              <Recycle className="w-3.5 h-3.5 text-brand-blue" />
              <span>Decarbonization & Circularity</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Transparent ESG Stewardship Across Every Thread.
            </h2>

            <div className="space-y-3 text-slate-light text-xs sm:text-sm leading-relaxed">
              <p>
                International enterprise retailers face heightened legislative and consumer mandates regarding
                supply chain transparency. Maya Exports Ltd — Fashion has invested systematically in
                closed-loop effluent treatment, renewable solar generation, and zero-hazardous chemical processing.
              </p>
              <p>
                We provide our European and North American retail partners with verified primary data
                dossiers for the EU Corporate Sustainability Due Diligence Directive (CSDDD) and Digital
                Product Passport (DPP) readiness.
              </p>
            </div>

            {/* Sustainability Metrics Grid: Soft gold & Brand Blue on dark sections */}
            <div className="pt-6 border-t border-deep-blue-border grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <span
                  ref={stat1Ref}
                  className="block text-3xl sm:text-4xl font-bold text-white font-display"
                >
                  0%
                </span>
                <span className="text-xs uppercase tracking-wider text-slate-light font-semibold mt-1 block">
                  Water Recycled
                </span>
                <span className="text-[11px] text-slate-muted mt-1 block">
                  Closed-loop biological MBR
                </span>
              </div>

              <div>
                <span
                  ref={stat2Ref}
                  className="block text-3xl sm:text-4xl font-bold text-brand-blue font-display"
                >
                  0 MW
                </span>
                <span className="text-xs uppercase tracking-wider text-slate-light font-semibold mt-1 block">
                  Solar Rooftop
                </span>
                <span className="text-[11px] text-slate-muted mt-1 block">
                  On-site clean generation
                </span>
              </div>

              <div>
                <span
                  ref={stat3Ref}
                  className="block text-3xl sm:text-4xl font-bold text-gold font-display"
                >
                  0%
                </span>
                <span className="text-xs uppercase tracking-wider text-slate-light font-semibold mt-1 block">
                  ZDHC Level 3
                </span>
                <span className="text-[11px] text-slate-muted mt-1 block">
                  Zero hazardous chemistry
                </span>
              </div>

              <div>
                <span
                  ref={stat4Ref}
                  className="block text-3xl sm:text-4xl font-bold text-white font-display"
                >
                  0 T
                </span>
                <span className="text-xs uppercase tracking-wider text-slate-light font-semibold mt-1 block">
                  Recycled Fibers
                </span>
                <span className="text-[11px] text-slate-muted mt-1 block">
                  Post-consumer diverted / yr
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
