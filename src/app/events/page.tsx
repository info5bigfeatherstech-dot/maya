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
import * as d3 from "d3-geo";
import * as topojson from "topojson-client";
import worldData from "world-atlas/countries-110m.json";
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
  ChevronDown,
  ExternalLink,
  Award,
  Users,
  Search,
  Globe,
} from "lucide-react";

export default function EventsPage() {
  const [activeRegion, setActiveRegion] = useState<string>("All");

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);
  const [selectedMeetingEvent, setSelectedMeetingEvent] = useState<string>("");

  // Memoized SVG path for World Map in Hero section
  const worldSvgPath = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const atlas = worldData as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countries = topojson.feature(atlas, atlas.objects.countries) as any;
    const projection = d3.geoEquirectangular().scale(116).translate([385, 185]);
    const pathGen = d3.geoPath(projection);
    return pathGen(countries) || "";
  }, []);

  // Filtered Events based on selected region
  const filteredEvents = useMemo(() => {
    if (activeRegion === "All") return eventsList;
    if (activeRegion === "USA") return eventsList.filter((e) => e.region === "USA");
    if (activeRegion === "China") return eventsList.filter((e) => e.region === "China");
    if (activeRegion === "Europe") return eventsList.filter((e) => e.region === "Europe");
    if (activeRegion === "Middle East") return eventsList.filter((e) => e.region === "Middle East");
    return eventsList;
  }, [activeRegion]);

  const featuredEvents = eventsList.filter((e) => e.featured);

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-blue-600/20 selection:text-blue-900">
        {/* Navigation Bar */}
        <Navbar
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onOpenInfoModal={(type) => setInfoModalType(type)}
        />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Matching User's Reference Mockup)                       */}
        {/* ========================================================================= */}
        <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 bg-white border-b border-slate-100 overflow-hidden">
          {/* Subtle Ambient Radial Glow on Map Side */}
          <div className="absolute top-1/4 right-0 w-[600px] h-[450px] bg-blue-50/70 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Category tag, Headline, Subtitle & 3 Metrics */}
              <div className="lg:col-span-5 space-y-6 z-10">
                <div>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-widest block mb-3.5">
                    EVENTS &amp; TRADE SHOWS
                  </span>

                  <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.08] font-display">
                    Meet us at upcoming <br />
                    trade shows
                  </h1>

                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-4 max-w-lg">
                    Explore our global presence at the world&apos;s leading trade shows,
                    exhibitions and industry events. Connect with our team, discover
                    new opportunities and experience our latest innovations.
                  </p>
                </div>

                {/* 3 Metrics (Events, Countries, Cities) */}
                <div className="flex items-center gap-6 sm:gap-10 pt-2 border-t border-slate-100">
                  {/* 1. 24+ Events */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight font-display">
                        24+
                      </div>
                      <div className="text-xs text-slate-500 font-medium">Events</div>
                    </div>
                  </div>

                  {/* 2. 12 Countries */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight font-display">
                        12
                      </div>
                      <div className="text-xs text-slate-500 font-medium">Countries</div>
                    </div>
                  </div>

                  {/* 3. 8 Cities */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight font-display">
                        8
                      </div>
                      <div className="text-xs text-slate-500 font-medium">Cities</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: World Map with Arcs & Hub Badges */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[340px] sm:min-h-[400px]">
                <div className="relative w-full aspect-[16/9] max-w-[640px] flex items-center justify-center select-none">
                  {/* Crisp Vector World Map SVG */}
                  <svg
                    viewBox="0 0 780 370"
                    className="w-full h-full drop-shadow-xs"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Continents Outline */}
                    <path
                      d={worldSvgPath}
                      fill="#E2E8F0"
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                    />

                    {/* Dotted Flight Arcs Connecting Trade Summits */}
                    {/* USA -> Europe */}
                    <path
                      d="M 195 108 Q 305 35 420 85"
                      fill="none"
                      stroke="#93C5FD"
                      strokeWidth="1.6"
                      strokeDasharray="4 4"
                    />
                    {/* Europe -> Middle East */}
                    <path
                      d="M 420 85 Q 460 98 480 134"
                      fill="none"
                      stroke="#93C5FD"
                      strokeWidth="1.6"
                      strokeDasharray="4 4"
                    />
                    {/* Middle East -> Asia */}
                    <path
                      d="M 480 134 Q 550 110 620 124"
                      fill="none"
                      stroke="#93C5FD"
                      strokeWidth="1.6"
                      strokeDasharray="4 4"
                    />
                    {/* Europe -> Africa node */}
                    <path
                      d="M 420 85 Q 430 150 435 185"
                      fill="none"
                      stroke="#93C5FD"
                      strokeWidth="1.6"
                      strokeDasharray="4 4"
                    />
                    {/* USA -> South America node */}
                    <path
                      d="M 195 108 Q 230 165 270 215"
                      fill="none"
                      stroke="#93C5FD"
                      strokeWidth="1.6"
                      strokeDasharray="4 4"
                    />
                    {/* Asia -> Southeast Asia node */}
                    <path
                      d="M 620 124 Q 610 160 595 190"
                      fill="none"
                      stroke="#93C5FD"
                      strokeWidth="1.6"
                      strokeDasharray="4 4"
                    />

                    {/* Connecting Nodes (Pulsing circles & dots) */}
                    {/* 1. USA Node */}
                    <circle cx="195" cy="108" r="8" fill="#3B82F6" opacity="0.25" />
                    <circle cx="195" cy="108" r="4.5" fill="#2563EB" />
                    {/* USA Pill Label */}
                    <g transform="translate(195, 84)">
                      <rect
                        x="-22"
                        y="-10"
                        width="44"
                        height="20"
                        rx="10"
                        fill="white"
                        stroke="#E2E8F0"
                        strokeWidth="1"
                        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.06))"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill="#0F172A"
                        fontFamily="sans-serif"
                      >
                        USA
                      </text>
                    </g>

                    {/* 2. Europe Node */}
                    <circle cx="420" cy="85" r="8" fill="#3B82F6" opacity="0.25" />
                    <circle cx="420" cy="85" r="4.5" fill="#2563EB" />
                    {/* Europe Pill Label */}
                    <g transform="translate(420, 61)">
                      <rect
                        x="-26"
                        y="-10"
                        width="52"
                        height="20"
                        rx="10"
                        fill="white"
                        stroke="#E2E8F0"
                        strokeWidth="1"
                        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.06))"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill="#0F172A"
                        fontFamily="sans-serif"
                      >
                        Europe
                      </text>
                    </g>

                    {/* 3. Middle East Node */}
                    <circle cx="480" cy="134" r="8" fill="#3B82F6" opacity="0.25" />
                    <circle cx="480" cy="134" r="4.5" fill="#2563EB" />
                    {/* Middle East Pill Label */}
                    <g transform="translate(500, 110)">
                      <rect
                        x="-36"
                        y="-10"
                        width="72"
                        height="20"
                        rx="10"
                        fill="white"
                        stroke="#E2E8F0"
                        strokeWidth="1"
                        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.06))"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill="#0F172A"
                        fontFamily="sans-serif"
                      >
                        Middle East
                      </text>
                    </g>

                    {/* 4. Asia Node */}
                    <circle cx="620" cy="124" r="8" fill="#3B82F6" opacity="0.25" />
                    <circle cx="620" cy="124" r="4.5" fill="#2563EB" />
                    {/* Asia Pill Label */}
                    <g transform="translate(620, 100)">
                      <rect
                        x="-22"
                        y="-10"
                        width="44"
                        height="20"
                        rx="10"
                        fill="white"
                        stroke="#E2E8F0"
                        strokeWidth="1"
                        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.06))"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill="#0F172A"
                        fontFamily="sans-serif"
                      >
                        Asia
                      </text>
                    </g>

                    {/* Minor secondary nodes */}
                    <circle cx="435" cy="185" r="3.5" fill="#2563EB" />
                    <circle cx="270" cy="215" r="3.5" fill="#2563EB" />
                    <circle cx="595" cy="190" r="3.5" fill="#2563EB" />
                  </svg>

                  {/* Floating Global Presence Card (Bottom-Right) */}
                  <div className="absolute -bottom-2 right-2 sm:right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-lg flex items-center gap-3 max-w-[260px] z-10">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                        Global Presence
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        Building stronger partnerships across the world
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FLAGSHIP SHOWCASES (USA, China, Europe)                                */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-blue-600 block mb-2">
                  Premier International Pavilions
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-display">
                  Flagship Global Trade Delegations
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md capitalize">
                Our bespoke multi-zone exhibition stands feature live apparel runway
                racks, footwear sole engineering showcases, and private VIP
                conference rooms.
              </p>
            </div>

            <div className="space-y-10">
              {featuredEvents.map((event, idx) => {
                const isEven = idx % 2 === 1;
                const contactUrl = `/contact?product=${encodeURIComponent(
                  `VIP Meeting · ${event.title}`
                )}&category=Garments`;

                return (
                  <div
                    key={event.id}
                    className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-400/60 hover:shadow-xl transition-all duration-300 shadow-2xs"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Event Image */}
                      <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : ""}`}>
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 group shadow-xs">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-blue-400" />
                            <span>
                              {event.city}, {event.country}
                            </span>
                          </div>
                          <div className="absolute bottom-3 right-3 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                            {event.booth}
                          </div>
                        </div>
                      </div>

                      {/* Event Content */}
                      <div
                        className={`lg:col-span-6 space-y-4 ${
                          isEven ? "lg:order-1" : ""
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                              {event.regionLabel}
                            </span>
                            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                              {event.series}
                            </span>
                            <span className="text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              {event.status}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-2">
                            {event.title}
                          </h3>

                          <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <strong className="text-slate-800">
                                {event.dates}
                              </strong>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Building2 className="w-4 h-4 text-slate-400" />
                              <span>{event.venue}</span>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                        {/* Bullet Highlights */}
                        <div className="space-y-1.5 border-t border-slate-100 pt-3">
                          <h4 className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                            Pavilion Highlights &amp; Buyer Services:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                            {event.highlights.map((h, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                <span className="text-[11px] font-medium">{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                          <Link
                            href={contactUrl}
                            className="w-full sm:w-auto py-2.5 px-5 rounded-xl font-semibold text-xs tracking-wider text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs text-center"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Reserve VIP Meeting at Booth</span>
                          </Link>

                          <a
                            href="https://wa.me/8613506082198?text=Hello%20Maya%20Exports,%20we%20would%20like%20to%20schedule%20a%20VIP%20booth%20meeting%20at%20your%20upcoming%20trade%20expo."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto py-2.5 px-5 rounded-xl font-semibold text-xs tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center justify-center gap-2 text-center"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
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

        {/* ========================================================================= */}
        {/* 3. FILTERABLE EVENTS GRID (Filtered by Search and Dropdowns)               */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 block mb-1">
                Global Tour Schedule
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                Browse All International Trade Shows
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                Filter by continent and geographic trade corridors. Schedule in-person
                sample reviews and lock factory capacity.
              </p>
            </div>

            {/* Region Filter Tabs */}
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
                    className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100"
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
                const contactUrl = `/contact?product=${encodeURIComponent(
                  `Trade Show Visit · ${item.title}`
                )}&category=Garments`;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-blue-400/60 transition-all duration-300 p-5 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 mb-4 border border-slate-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-103 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          {item.city}, {item.country}
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-slate-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs">
                          {item.dates}
                        </div>
                      </div>

                      {/* Header */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                            {item.regionLabel}
                          </span>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {item.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-blue-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                      </div>

                      {/* Venue & Booth */}
                      <div className="space-y-1 text-xs text-slate-500 mb-3 font-mono border-t border-slate-100 pt-2.5">
                        <div className="flex items-center gap-1.5 truncate">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{item.venue}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{item.booth}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Executive Suite
                      </span>
                      <Link
                        href={contactUrl}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors group/btn"
                      >
                        <span>Schedule Meeting</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-sm text-slate-500">
                  No trade shows found for this region.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Global Footer */}
        <Footer />

        {/* Global RFQ Quote Modal */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          initialCategory={
            selectedMeetingEvent
              ? `Trade Show VIP: ${selectedMeetingEvent}`
              : "Trade Expo Delegation"
          }
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
