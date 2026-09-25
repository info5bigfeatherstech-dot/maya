"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Layers, ArrowUpRight } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Counter refs
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const stat4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image clip-path reveal on scroll
      if (imageRevealRef.current) {
        gsap.fromTo(
          imageRevealRef.current,
          {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            scale: 1.05,
          },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            scale: 1,
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: imageRevealRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Content fade up
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 35,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // ==========================================
      // PLACEHOLDER DATA: Maya Exports Ltd historical KPIs
      // ==========================================
      const stats = [
        { ref: stat1Ref, target: 26, suffix: " Yrs" },
        { ref: stat2Ref, target: 160, suffix: "k m²" },
        { ref: stat3Ref, target: 3400, suffix: "+" },
        { ref: stat4Ref, target: 3.8, suffix: "M Pcs", isDecimal: true },
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
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            if (item.ref.current) {
              if (item.isDecimal) {
                item.ref.current.innerText = proxy.val.toFixed(1) + item.suffix;
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
      id="about"
      ref={sectionRef}
      className="bg-offwhite text-deep-blue py-24 sm:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Factory Showcase with Clip-Path Wipe */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Pearl Gray decorative backplate with subtle gold accent */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-pearl-gray/70 border border-gold/30 rounded-sm pointer-events-none hidden sm:block" />

              <div
                ref={imageRevealRef}
                className="relative overflow-hidden rounded-sm shadow-2xl bg-deep-blue-dark aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85"
                  alt="Maya Exports Ltd — Fashion vertical manufacturing floor and inspection line"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/85 via-transparent to-transparent" />

                {/* Floating facility certification badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-deep-blue/90 backdrop-blur-md border border-deep-blue-border rounded-sm text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-deep-blue-card border border-brand-blue flex items-center justify-center text-brand-blue">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                        Smart Manufacturing & Ethical Export Accredited
                      </h4>
                      <p className="text-[11px] text-slate-light">
                        CNAS Certified In-house Testing Laboratory #L6104
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & History */}
          <div ref={contentRef} className="lg:col-span-6 space-y-6">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-pearl-gray border border-pearl-gray text-xs font-semibold uppercase tracking-widest text-deep-blue">
              <Layers className="w-3.5 h-3.5 text-brand-blue" />
              <span>Maya Exports Ltd — Fashion · Corporate Heritage</span>
            </div> */}

            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-deep-blue leading-snug font-display">
              Engineered Precision in Vertical Apparel Export.
            </h2>

            <div className="space-y-3.5 text-slate-body text-xs sm:text-sm leading-relaxed">
              <p>
                Established with a vision for uncompromising garment craftsmanship, Maya Exports Ltd —
                Fashion has grown into an international manufacturing partner trusted by tier-one retail
                groups across the United Kingdom, Europe, North America, the Middle East, and Australasia.
              </p>
              <p>
                From fiber selection, automated computerized CAD grading, and laser fabric cutting to
                lean modular sewing lines and direct bonded warehouse logistics, we eliminate the
                fragmentation of conventional sourcing.
              </p>
              <p className="border-l-2 border-brand-blue pl-3.5 italic text-slate-body text-xs sm:text-sm">
                &ldquo;At Maya Exports, our global brand partners rely on us for guaranteed supply chain
                insulation, verified ESG compliance, and stitch-level perfection season after season.&rdquo;
              </p>
            </div>

            {/* Stat Counters Grid: Brand Blue on light sections as specified */}
            <div className="pt-5 border-t border-pearl-gray grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Stat 1 */}
              <div className="p-3 bg-pearl-card rounded-sm border border-pearl-gray">
                <span
                  ref={stat1Ref}
                  className="block text-xl sm:text-2xl font-bold text-brand-blue font-display leading-tight"
                >
                  0
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-muted font-semibold mt-1 block">
                  Export Heritage
                </span>
              </div>

              {/* Stat 2 */}
              <div className="p-3 bg-pearl-card rounded-sm border border-pearl-gray">
                <span
                  ref={stat2Ref}
                  className="block text-xl sm:text-2xl font-bold text-brand-blue font-display leading-tight"
                >
                  0
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-muted font-semibold mt-1 block">
                  Facility Area
                </span>
              </div>

              {/* Stat 3 */}
              <div className="p-3 bg-pearl-card rounded-sm border border-pearl-gray">
                <span
                  ref={stat3Ref}
                  className="block text-xl sm:text-2xl font-bold text-brand-blue font-display leading-tight"
                >
                  0
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-muted font-semibold mt-1 block">
                  Craftsmen & Tech
                </span>
              </div>

              {/* Stat 4 */}
              <div className="p-3 bg-pearl-card rounded-sm border border-pearl-gray">
                <span
                  ref={stat4Ref}
                  className="block text-xl sm:text-2xl font-bold text-gold font-display leading-tight"
                >
                  0
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-muted font-semibold mt-1 block">
                  Monthly Output
                </span>
              </div>
            </div>

            {/* Link to Dedicated About Us Page */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-blue hover:text-deep-blue transition-colors group"
              >
                <span>Read Our Full Story Since 2003 & Retail Design Services</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
