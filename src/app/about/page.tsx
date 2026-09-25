"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import InfoModal from "@/components/InfoModal";
import SmoothScroll from "@/components/SmoothScroll";
import {
  Sparkles,
  Building2,
  Globe2,
  Compass,
  Store,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Palette,
  LayoutGrid,
  Users,
  Award,
} from "lucide-react";

export default function AboutPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Garments");

  const handleOpenQuote = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setIsQuoteModalOpen(true);
  };

  const milestones = [
    {
      year: "2003",
      title: "Founding & Local Roots",
      desc: "Maya Exports was founded with a singular commitment: merging creative fashion design with meticulous manufacturing craftsmanship to serve discerning clients.",
    },
    {
      year: "2009",
      title: "European & UK Corridors",
      desc: "Expanded direct sea-lane exports to British department retailers and European fashion houses, establishing bonded shipping routes via Rotterdam and Felixstowe.",
    },
    {
      year: "2015",
      title: "Retail Spaces & Merchandising",
      desc: "Launched our specialized Retail Design & Visual Merchandising atelier, partnering with boutiques and flagship stores to craft immersive branded shopping spaces.",
    },
    {
      year: "2020",
      title: "Smart Infrastructure & ESG",
      desc: "Commissioned solar rooftop arrays, automated CAD grading, and closed-loop effluent treatment, securing international BSCI, GOTS, and OEKO-TEX certifications.",
    },
    {
      year: "Today",
      title: "Global Reach Across 45+ Nations",
      desc: "Bridging East and West across UK, Europe, North America, the Middle East, and Australasia with 3,400+ craftsmen and dedicated trade desks worldwide.",
    },
  ];

  const pillars = [
    {
      icon: Store,
      title: "Retail Space & Visual Merchandising",
      subtitle: "Where Style Meets Story",
      desc: "At Maya Exports Pvt Ltd., creativity meets craftsmanship. We specialize in creating stylish, functional spaces that bring fashion to life. Our team blends modern design with classic aesthetics to reflect your brand’s identity—whether you’re launching a boutique or refreshing a retail space.",
      highlights: [
        "Architectural Layout Planning & Customer Flow",
        "Visual Merchandising & Focal-Point Display",
        "Custom Fixture Engineering & Premium Joinery",
        "Atmospheric Lighting & Sensory Brand Experience",
      ],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    },
    {
      icon: Globe2,
      title: "Global Import & Export Logistics",
      subtitle: "Connecting Businesses Worldwide",
      desc: "From local roots to global reach, we bridge markets with excellence in imports and exports. Our story is built on trust, quality, and a passion for connecting businesses worldwide. We ensure seamless customs clearance, direct vessel allocations, and reliable supply chain execution.",
      highlights: [
        "Priority Sea & Air Freight Corridors (45+ Countries)",
        "Direct Bonded Warehousing & 3PL Consolidation",
        "FOB, CIF, DDP & LDP International Trade Terms",
        "Complete Tariff & Customs Regulatory Compliance",
      ],
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
    },
  ];

  const stats = [
    { value: "2003", label: "Founded Year", sub: "23+ Years of Heritage" },
    { value: "45+", label: "Global Markets", sub: "Direct Export Corridors" },
    { value: "160k m²", label: "Facility Area", sub: "Smart Industrial Hub" },
    { value: "3,400+", label: "Craftsmen & Tech", sub: "Master Artisans & Staff" },
  ];

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-deep-blue text-slate-100 overflow-x-hidden selection:bg-brand-blue/30 selection:text-white">
        {/* Navigation */}
        <Navbar
          onOpenQuoteModal={handleOpenQuote}
          onOpenInfoModal={(type) => setInfoModalType(type)}
        />

        {/* 1. Hero Section */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden border-b border-deep-blue-border">
          {/* Subtle background image & gradient */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
              alt="Fashion boutique craftsmanship"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/80 to-deep-blue/95" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-deep-blue-card border border-deep-blue-border text-[11px] font-semibold uppercase tracking-widest text-brand-blue mb-4">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                <span>Established 2003 · Over Two Decades of Excellence</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display mb-6">
                Where Creativity Meets Craftsmanship.
              </h1>

              {/* Quote / Subtitle */}
              <p className="text-base sm:text-lg text-slate-light leading-relaxed mb-6 font-normal">
                At <strong className="text-white font-semibold">Maya Exports Pvt Ltd.</strong>, creativity meets craftsmanship. We specialize in creating stylish, functional spaces that bring fashion to life. Our team blends modern design with classic aesthetics to reflect your brand’s identity—whether you’re launching a boutique or refreshing a retail space.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleOpenQuote()}
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold px-6 py-3 rounded-sm text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-brand-blue/30"
                >
                  <span>Connect With Our Team</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </button>
                <a
                  href="https://mayaexportsltd.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gold hover:bg-gold/10 text-gold px-5 py-3 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2"
                >
                  <span>mayaexportsltd.com/contact</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Key Stats Strip */}
        <section className="bg-deep-blue-dark py-8 border-b border-deep-blue-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-sm bg-deep-blue-card/60 border border-deep-blue-border"
                >
                  <span className="block text-xl sm:text-2xl font-bold text-brand-blue font-display leading-tight">
                    {item.value}
                  </span>
                  <span className="text-xs font-semibold text-white uppercase tracking-wider mt-1 block">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-slate-muted block mt-0.5">
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. The Core Story: Maya Exports Limited */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Image Collage */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-slate-200 shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200"
                    alt="Maya Exports Fashion Design & Quality Fabric Craftsmanship"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating Experience Badge */}
                <div className="absolute -bottom-6 -right-6 hidden sm:block p-5 bg-deep-blue text-white rounded-sm border border-brand-blue/30 shadow-2xl">
                  <span className="block text-2xl font-bold text-gold font-display">Since 2003</span>
                  <span className="text-xs uppercase tracking-wider text-slate-light font-medium">
                    23+ Years of Global Trust
                  </span>
                </div>
              </div>

              {/* Right Column: Editorial Story */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-slate-100 border border-slate-200 text-[11px] font-semibold uppercase tracking-widest text-brand-blue">
                  <Award className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Maya Exports Limited</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display leading-snug">
                  From Local Roots to Global Reach.
                </h2>

                <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  <p>
                    <strong className="text-slate-900 font-semibold">Maya Exports Limited</strong> started in 2003 with an ambitious yet humble foundation: to connect premier fashion manufacturing with global retail buyers through steadfast integrity, uncompromising craftsmanship, and reliable international logistics.
                  </p>
                  <p className="border-l-2 border-brand-blue pl-4 py-1 italic text-slate-800 text-sm sm:text-base font-medium">
                    &ldquo;From local roots to global reach, we bridge markets with excellence in imports and exports. Our story is built on trust, quality, and a passion for connecting businesses worldwide.&rdquo;
                  </p>
                  <p>
                    Over more than two decades of evolution, our operations expanded from regional fabric trading into a multi-continental supply chain powerhouse. Today, Maya Exports provides end-to-end import and export solutions, bespoke fashion private-label manufacturing, and architectural retail spatial transformations for clients in the United Kingdom, Europe, North America, the Middle East, and Australia.
                  </p>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2.5 p-3 rounded-sm bg-slate-50 border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Trust & Quality First</span>
                      <span className="text-slate-500">Rigorous inspection protocols at every milestone.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-sm bg-slate-50 border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Global Trade Connectivity</span>
                      <span className="text-slate-500">Export corridors connecting over 45+ nations.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Dual Pillars: Retail Spaces & Global Trade */}
        <section className="py-16 sm:py-20 lg:py-24 bg-deep-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-deep-blue-card border border-deep-blue-border text-[11px] font-semibold uppercase tracking-widest text-brand-blue mb-2.5">
                Core Competencies
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
                Two Pillars Driving Our Global Reputation.
              </h2>
              <p className="text-slate-light mt-3 text-xs sm:text-sm leading-relaxed">
                Whether creating an iconic clothing store destination or dispatching ocean containers across international waters, Maya Exports delivers perfection at every touchpoint.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-sm bg-deep-blue-card border border-deep-blue-border hover:border-brand-blue/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-sm bg-deep-blue-dark border border-deep-blue-border flex items-center justify-center text-brand-blue">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
                            {pillar.subtitle}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                            {pillar.title}
                          </h3>
                        </div>
                      </div>

                      {/* Image preview */}
                      <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-deep-blue-border mb-5">
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <p className="text-xs sm:text-sm text-slate-light leading-relaxed mb-5">
                        {pillar.desc}
                      </p>

                      <div className="space-y-2 border-t border-deep-blue-border/70 pt-4 mb-6">
                        {pillar.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenQuote(pillar.title)}
                      className="w-full py-2.5 rounded-sm border border-brand-blue/50 hover:bg-brand-blue text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Company Milestones Timeline (2003 - Today) */}
        <section className="py-16 sm:py-20 lg:py-24 bg-offwhite text-deep-blue border-t border-pearl-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-pearl-gray border border-pearl-gray text-[11px] font-semibold uppercase tracking-widest text-deep-blue mb-2.5">
                <Clock className="w-3.5 h-3.5 text-brand-blue" />
                <span>Our Evolution</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep-blue font-display">
                Building Excellence Since 2003.
              </h2>
              <p className="text-slate-body mt-3 text-xs sm:text-sm leading-relaxed">
                A chronological look at how Maya Exports evolved from local trading roots into an international design and export leader.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-sm bg-white border border-pearl-gray shadow-xs hover:shadow-md transition-shadow relative"
                >
                  <span className="block text-2xl font-extrabold text-brand-blue font-display mb-2">
                    {m.year}
                  </span>
                  <h4 className="text-sm font-bold text-deep-blue mb-2 font-display">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-body leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Call to Action */}
        <section className="py-16 sm:py-20 bg-deep-blue text-white border-t border-deep-blue-border relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-[11px] uppercase tracking-widest font-semibold text-brand-blue mb-3">
              Let&apos;s Create Something Extraordinary
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display leading-tight mb-4">
              Transform Your Clothing Store Into a Destination Where Style Meets Story.
            </h2>
            <p className="text-xs sm:text-sm text-slate-light max-w-xl mx-auto leading-relaxed mb-8">
              From layout planning to visual merchandising, we focus on every detail that enhances customer experience and maximizes product visibility.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleOpenQuote()}
                className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold px-7 py-3 rounded-sm text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-brand-blue/30"
              >
                <span>Request Project Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </button>
              <a
                href="https://mayaexportsltd.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gold hover:bg-gold/10 text-gold px-6 py-3 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2"
              >
                <span>Contact Us Direct</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Modals */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          initialCategory={selectedCategory}
        />

        <InfoModal
          type={infoModalType}
          isOpen={infoModalType !== null}
          onClose={() => setInfoModalType(null)}
          onOpenQuote={() => handleOpenQuote()}
        />
      </main>
    </SmoothScroll>
  );
}
