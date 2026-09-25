"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle2, Factory } from "lucide-react";
import gsap from "gsap";

interface HeroProps {
  onOpenQuoteModal?: () => void;
}

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const statsBriefRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 35,
            duration: 1.1,
          },
          "-=0.5"
        )
        .from(
          subheadRef.current,
          {
            opacity: 0,
            y: 25,
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          ctaGroupRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.5"
        );

      if (statsBriefRef.current) {
        tl.from(
          statsBriefRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.5"
        );
      }

      if (scrollCueRef.current) {
        tl.from(
          scrollCueRef.current,
          {
            opacity: 0,
            duration: 1,
          },
          "-=0.3"
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-blue pt-20"
    >
      {/* Background Video / Cinematic Fallback with Ken Burns zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=85"
          className="w-full h-full object-cover scale-105 animate-[kenburns_28s_ease-in-out_infinite_alternate]"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-working-on-a-garment-41584-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Brand Deep Blue gradient overlay (not flat black) for brand cohesion */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/95 via-deep-blue/80 to-deep-blue/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-transparent to-deep-blue/70" />
        <div className="absolute inset-0 bg-grid-deep opacity-30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col justify-center min-h-[calc(100vh-5rem)]">
        <div className="max-w-3xl space-y-7">
          {/* Badge */}
          {/* <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-sm border border-brand-blue/40 bg-deep-blue-card/80 backdrop-blur-sm text-xs font-semibold uppercase tracking-widest text-brand-blue"
          >
            <Factory className="w-3.5 h-3.5 text-brand-blue" />
            <span>Maya Exports Ltd — Fashion · Vertical OEM/ODM Manufacturer</span>
          </div> */}

          {/* Editorial Headline */}
          <h1
            ref={headlineRef}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight font-display max-w-2xl"
          >
            Precision Garment Manufacturing for the World&apos;s Leading Fashion Brands.
          </h1>

          {/* Subheadline in Pearl/Slate light */}
          <p
            ref={subheadRef}
            className="text-sm sm:text-base text-slate-light/90 leading-relaxed font-normal max-w-xl"
          >
            Vertically integrated apparel engineering across 160,000 m² of smart industrial
            infrastructure. Supplying tier-one enterprise retailers and fashion conglomerates across the
            UK, Europe, North America, the Middle East, and Australia.
          </p>

          {/* Primary CTA + Secondary CTA */}
          <div
            ref={ctaGroupRef}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
          >
            <button
              onClick={onOpenQuoteModal}
              className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold px-6 py-3 rounded-sm text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-brand-blue/30 hover:-translate-y-0.5"
            >
              <span>Reserve Production Capacity</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </button>

            <a
              href="#manufacturing"
              className="group border border-gold hover:bg-gold/10 text-gold px-5 py-3 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Facilities & Accreditations</span>
              <span className="text-gold group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>

          {/* Inline Trust Badges */}
          {/* <div
            ref={statsBriefRef}
            className="pt-6 border-t border-deep-blue-border flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-slate-light font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
              <span>BSCI Grade-A & ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-blue" />
              <span>3.8M Monthly Unit Capacity</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              <span>AQL 1.0 / 1.5 Strict Inspection</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Scroll Cue Indicator */}
      {/* <div
        ref={scrollCueRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-slate-light pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-slate-light">
          Scroll to Explore
        </span>
        <div className="w-5 h-8 rounded-full border border-slate-muted flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-brand-blue animate-bounce" />
        </div>
      </div> */}

      {/* Bottom gradient blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-offwhite to-transparent pointer-events-none opacity-10" />
    </section>
  );
}
