"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import InfoModal from "@/components/InfoModal";
import SmoothScroll from "@/components/SmoothScroll";
import { eventsList, EventItem } from "@/data/eventsData";
import {
  Calendar,
  MapPin,
  Building2,
  Clock,
  CheckCircle2,
  Globe2,
  ArrowRight,
  Send,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Layers,
  ChevronRight,
  ExternalLink,
  Award,
  Users,
} from "lucide-react";

export default function EventsPage() {
  const [activeRegion, setActiveRegion] = useState<string>("All");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);
  const [selectedMeetingEvent, setSelectedMeetingEvent] = useState<string>("");

  const filteredEvents = useMemo(() => {
    if (activeRegion === "All") return eventsList;
    if (activeRegion === "USA") return eventsList.filter((e) => e.region === "USA");
    if (activeRegion === "China") return eventsList.filter((e) => e.region === "China");
    if (activeRegion === "Europe") return eventsList.filter((e) => e.region === "Europe");
    if (activeRegion === "Middle East") return eventsList.filter((e) => e.region === "Middle East");
    return eventsList;
  }, [activeRegion]);

  const featuredEvents = eventsList.filter((e) => e.featured);

  const handleBookMeeting = (eventTitle: string) => {
    setSelectedMeetingEvent(eventTitle);
    setIsQuoteModalOpen(true);
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-deep-blue text-slate-100 overflow-x-hidden selection:bg-brand-blue/30 selection:text-white">
        {/* Navigation Bar */}
        <Navbar
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onOpenInfoModal={(type) => setInfoModalType(type)}
        />

        {/* 1. Hero Header */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-deep-blue-border overflow-hidden">
          <div className="absolute inset-0 bg-grid-deep opacity-35 pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-deep-blue-card border border-deep-blue-border text-[11px] font-semibold uppercase tracking-widest text-gold mb-4">
                <Globe2 className="w-3.5 h-3.5 text-gold" />
                <span>Global Sourcing Summits & Trade Exhibitions 2026–2027</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-display mb-6">
                Worldwide Trade Shows & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-sky-300 to-gold">
                  International Buyer Summits
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-light leading-relaxed max-w-3xl mx-auto mb-10">
                From the historic exhibition halls of the Canton Fair in Guangzhou to MAGIC Las Vegas, Première Vision Paris, and Shanghai Intertextile — Maya Exports Limited regularly exhibits at the world’s most prestigious fashion and manufacturing summits. Meet our leadership team, inspect live production prototypes, and lock factory capacity face-to-face.
              </p>

              {/* Quick Key Metrics Counter */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-deep-blue-border/70 text-left">
                <div className="p-4 rounded-sm bg-deep-blue-card/60 border border-deep-blue-border">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-white mb-0.5">20+</div>
                  <div className="text-[11px] text-slate-muted uppercase font-semibold">Years Exhibiting Worldwide</div>
                </div>
                <div className="p-4 rounded-sm bg-deep-blue-card/60 border border-deep-blue-border">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-brand-blue mb-0.5">40+</div>
                  <div className="text-[11px] text-slate-muted uppercase font-semibold">Expos: USA, China, EU & UAE</div>
                </div>
                <div className="p-4 rounded-sm bg-deep-blue-card/60 border border-deep-blue-border">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-gold mb-0.5">1,200+</div>
                  <div className="text-[11px] text-slate-muted uppercase font-semibold">VIP Buyer Conferences</div>
                </div>
                <div className="p-4 rounded-sm bg-deep-blue-card/60 border border-deep-blue-border">
                  <div className="text-2xl sm:text-3xl font-bold font-display text-[#5ecba1] mb-0.5">100%</div>
                  <div className="text-[11px] text-slate-muted uppercase font-semibold">Direct Mill Ownership</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Flagship Mega Showcases (USA, China, Europe) */}
        <section className="py-16 sm:py-24 bg-deep-blue border-b border-deep-blue-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-widest text-gold block mb-2">
                  Premier International Pavilions
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display">
                  Flagship Global Trade Delegations
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-muted max-w-md">
                Our bespoke multi-zone exhibition stands feature live apparel runway racks, footwear sole engineering showcases, and private VIP conference rooms.
              </p>
            </div>

            <div className="space-y-12">
              {featuredEvents.map((event, idx) => {
                const isEven = idx % 2 === 1;
                const contactUrl = `/contact?product=${encodeURIComponent(`VIP Meeting · ${event.title}`)}&category=Garments`;

                return (
                  <div
                    key={event.id}
                    className="p-6 sm:p-8 lg:p-10 rounded-sm bg-deep-blue-card border border-deep-blue-border hover:border-brand-blue/60 transition-all duration-300 shadow-2xl"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Event Image */}
                      <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : ""}`}>
                        <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-deep-blue border border-deep-blue-border group shadow-lg">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded border border-white/10 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gold" />
                            <span>{event.city}, {event.country}</span>
                          </div>
                          <div className="absolute bottom-3 right-3 bg-brand-blue/90 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                            {event.booth}
                          </div>
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className={`lg:col-span-6 space-y-5 ${isEven ? "lg:order-1" : ""}`}>
                        <div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/30">
                              {event.regionLabel}
                            </span>
                            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">
                              {event.series}
                            </span>
                            <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                              {event.status}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-display mb-2">
                            {event.title}
                          </h3>

                          <div className="flex items-center gap-4 text-xs text-slate-light mb-3 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-brand-blue" />
                              <strong className="text-white">{event.dates}</strong>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Building2 className="w-4 h-4 text-gold" />
                              <span>{event.venue}</span>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-light leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                        {/* Bullet Highlights */}
                        <div className="space-y-2 border-t border-deep-blue-border/70 pt-4">
                          <h4 className="text-[11px] uppercase font-bold tracking-widest text-slate-muted">
                            Pavilion Highlights & Buyer Services:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-light">
                            {event.highlights.map((h, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#5ecba1] shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                          <Link
                            href={contactUrl}
                            className="w-full sm:w-auto py-2.5 px-5 rounded-sm font-semibold text-xs uppercase tracking-wider text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm text-center"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Reserve VIP Meeting at Booth</span>
                          </Link>

                          <a
                            href="https://wa.me/8613506082198?text=Hello%20Maya%20Exports,%20we%20would%20like%20to%20schedule%20a%20VIP%20booth%20meeting%20at%20your%20upcoming%20trade%20expo."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto py-2.5 px-5 rounded-sm font-semibold text-xs uppercase tracking-wider text-white bg-deep-blue hover:bg-deep-blue-dark border border-deep-blue-border hover:border-brand-blue transition-all flex items-center justify-center gap-2 text-center"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-[#5ecba1]" />
                            <span>WhatsApp Coordinator</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Filterable Complete Global Calendar */}
        <section className="py-16 sm:py-24 bg-offwhite text-deep-blue border-b border-pearl-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="text-[11px] uppercase font-bold tracking-widest text-brand-blue block mb-1">
                Global Tour Schedule
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-deep-blue font-display">
                Browse All International Trade Shows
              </h2>
              <p className="text-xs sm:text-sm text-slate-body mt-2 leading-relaxed">
                Filter by continent and geographic trade corridors. Schedule in-person sample reviews, view technical laboratory fabric displays, and negotiate annual supply contracts.
              </p>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {[
                { label: "All Trade Expos", key: "All" },
                { label: "United States (USA)", key: "USA" },
                { label: "China & Hong Kong", key: "China" },
                { label: "Europe & Global", key: "Europe" },
                { label: "Middle East & GCC", key: "Middle East" },
              ].map((tab) => {
                const isSelected = activeRegion === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveRegion(tab.key)}
                    className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-deep-blue text-white shadow-md"
                        : "bg-white text-slate-600 hover:text-deep-blue border border-pearl-gray hover:bg-slate-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((item) => {
                const contactUrl = `/contact?product=${encodeURIComponent(`Trade Show Visit · ${item.title}`)}&category=Garments`;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-sm border border-pearl-gray shadow-xs hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full rounded-xs overflow-hidden bg-slate-100 mb-4 border border-pearl-gray/80">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-103 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-deep-blue/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                          {item.city}, {item.country}
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-deep-blue text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs">
                          {item.dates}
                        </div>
                      </div>

                      {/* Header */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue">
                            {item.regionLabel}
                          </span>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {item.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-deep-blue font-display group-hover:text-brand-blue transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                      </div>

                      {/* Venue & Booth */}
                      <div className="space-y-1 text-xs text-slate-muted mb-3 font-mono border-t border-pearl-gray/60 pt-2.5">
                        <div className="flex items-center gap-1.5 truncate">
                          <Building2 className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span className="truncate">{item.venue}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-deep-blue font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                          <span>{item.booth}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-body leading-relaxed line-clamp-3 mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-3 border-t border-pearl-gray flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold text-slate-muted">
                        Executive Suite
                      </span>
                      <Link
                        href={contactUrl}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-brand-blue-hover transition-colors group/btn"
                      >
                        <span>Schedule Meeting</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Trade Show VIP Buyer Experience Protocol */}
        <section className="py-16 sm:py-20 bg-deep-blue border-b border-deep-blue-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[11px] uppercase font-bold tracking-widest text-gold block mb-2">
                Executive Buyer Services
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display">
                What to Expect at a Maya Exports Booth
              </h2>
              <p className="text-xs sm:text-sm text-slate-light mt-2 leading-relaxed">
                We design our exhibition presence to function as a full-service commercial satellite office for international fashion buyers, sourcing directors, and retail brands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-3">
                <div className="w-10 h-10 rounded-sm bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center text-brand-blue">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  Live Prototype Library
                </h3>
                <p className="text-xs text-slate-light leading-relaxed">
                  Touch and inspect 400+ seasonal silhouettes, seam-sealed softshells, authentic leather jackets, and vulcanized sneakers right off the hanger.
                </p>
              </div>

              <div className="p-6 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-3">
                <div className="w-10 h-10 rounded-sm bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  Direct Executive Desk
                </h3>
                <p className="text-xs text-slate-light leading-relaxed">
                  Sit down with Managing Director Mr. Mike (Sonu) and Key Accounts Director Ms. Jenny to negotiate annual production volume commitments.
                </p>
              </div>

              <div className="p-6 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-3">
                <div className="w-10 h-10 rounded-sm bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  Instant NDA & Tech Pack Review
                </h3>
                <p className="text-xs text-slate-light leading-relaxed">
                  Mutual enterprise non-disclosure agreements executed on the spot. Bring your CAD designs or tech packs for real-time quotation modeling.
                </p>
              </div>

              <div className="p-6 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-3">
                <div className="w-10 h-10 rounded-sm bg-[#5ecba1]/15 border border-[#5ecba1]/30 flex items-center justify-center text-[#5ecba1]">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  VIP Factory Delegations
                </h3>
                <p className="text-xs text-slate-light leading-relaxed">
                  Attending Canton Fair or Jinjiang Expo? Enjoy complimentary private chauffeur transport to tour our Shishi manufacturing lines and laboratories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Pre-Book VIP Meeting Call to Action Banner */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-deep-blue-dark via-deep-blue to-deep-blue-card border-b border-deep-blue-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#5ecba1] block">
              Direct Executive Booking
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display">
              Visiting Our Next Trade Show? Let&apos;s Reserve Your Private Suite.
            </h2>

            <p className="text-xs sm:text-sm text-slate-light max-w-2xl mx-auto leading-relaxed">
              Ensure dedicated 1-on-1 time with our directors, receive a personalized seasonal swatch kit ahead of the show, or request guest VIP exhibitor access passes.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?product=VIP%20Trade%20Show%20Meeting%20Request&category=Garments"
                className="w-full sm:w-auto py-3.5 px-8 rounded-sm font-semibold text-xs uppercase tracking-wider text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Request VIP Trade Show Invitation</span>
              </Link>

              <a
                href="https://wa.me/8613506082198?text=Hello%20Mr.%20Mike,%20we%20want%20to%20schedule%20a%20private%20meeting%20at%20your%20next%20trade%20expo."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-8 rounded-sm font-semibold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all shadow-md flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare className="w-4 h-4 text-[#5ecba1]" />
                <span>Direct WhatsApp: +86-13506082198</span>
              </a>
            </div>
          </div>
        </section>

        {/* Global Solid Footer */}
        <Footer />

        {/* Global RFQ Quote Modal */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          initialCategory={selectedMeetingEvent ? `Trade Show VIP: ${selectedMeetingEvent}` : "Trade Expo Delegation"}
        />

        {/* Global Info Modal */}
        <InfoModal
          isOpen={infoModalType !== null}
          onClose={() => setInfoModalType(null)}
          type={infoModalType || "event"}
        />
      </main>
    </SmoothScroll>
  );
}
