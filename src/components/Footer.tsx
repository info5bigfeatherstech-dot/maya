"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe2,
  ShieldCheck,
  Users2,
  Building2,
  MapPin,
  Phone,
  Printer,
  Mail,
  ArrowRight,
  Check,
} from "lucide-react";
import MayaLogo from "./MayaLogo";
import CursorGrid from "./CursorGrid";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-[#061423] text-slate-300 text-xs overflow-hidden border-t border-slate-800/80">
      {/* Interactive Cursor Grid Background from React Bits */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <CursorGrid
          cellSize={64}
          color="#00B4D8"
          radius={160}
          falloff="smooth"
          holdTime={350}
          fadeDuration={700}
          lineWidth={1.0}
          maxOpacity={0.45}
          fillOpacity={0.06}
          gridOpacity={0.035}
          cellRadius={2}
          clickPulse={true}
          pulseSpeed={550}
        />
      </div>

      {/* Subtle Dynamic Ambient Curves (matching reference aesthetic) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        {/* Left flowing concentric arc curves */}
        <svg
          className="absolute -bottom-24 -left-24 w-[520px] h-[520px] text-cyan-500/25"
          viewBox="0 0 520 520"
          fill="none"
        >
          <circle cx="0" cy="520" r="260" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="520" r="360" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="0" cy="520" r="460" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="0" cy="520" r="500" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>

        {/* Right flowing concentric arc curves */}
        <svg
          className="absolute -top-32 -right-24 w-[600px] h-[600px] text-cyan-400/20"
          viewBox="0 0 600 600"
          fill="none"
        >
          <circle cx="600" cy="0" r="300" stroke="currentColor" strokeWidth="1" />
          <circle cx="600" cy="0" r="420" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="600" cy="0" r="540" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <circle cx="600" cy="0" r="580" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-16 pb-10">
        {/* 1. Main Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 pb-14 border-b border-slate-800/80">
          {/* Col 1: Corporate Overview & Trust Badges (Span 3) */}
          <div className="lg:col-span-3 space-y-5 pr-0 lg:pr-2">
            <Link href="/" className="inline-block">
              <MayaLogo size="md" variant="dark" />
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Maya Exports Ltd — Fashion is a premier vertical OEM/ODM apparel and textile exporter.
              Engineering bespoke garments for international fashion houses and enterprise retail
              groups across the UK, Europe, North America, the Middle East, and Australia.
            </p>

            {/* 3 Trust Badges Row */}
            <div className="flex items-center gap-4 sm:gap-6 pt-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-[11px] font-medium text-slate-300 leading-tight">
                  Global<br />Presence
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-[11px] font-medium text-slate-300 leading-tight">
                  Trusted<br />Quality
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Users2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-[11px] font-medium text-slate-300 leading-tight">
                  Strategic<br />Partnerships
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: ENTERPRISE (Span 2) */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-2 space-y-3">
            <div>
              <h4 className="text-xs uppercase font-bold text-white tracking-widest font-display mb-1.5">
                ENTERPRISE
              </h4>
              <div className="w-7 h-[2.5px] bg-[#E5A93C] mb-4" />
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Maya Exports (Since 2003)
                </Link>
              </li>
              <li>
                <a href="/#manufacturing" className="hover:text-white transition-colors">
                  Manufacturing Hub
                </a>
              </li>
              <li>
                <a href="/#qc" className="hover:text-white transition-colors">
                  Quality Assurance (AQL 1.0)
                </a>
              </li>
              <li>
                <a href="/#export-markets" className="hover:text-white transition-colors">
                  Global Trade Corridors
                </a>
              </li>
              <li>
                <a href="/#sustainability" className="hover:text-white transition-colors">
                  ESG &amp; CSDDD Readiness
                </a>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors block"
                >
                  Trade Shows &amp; Global Expos
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers &amp; Talent Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: EXPORT DIVISIONS (Span 2) */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-2 space-y-3">
            <div>
              <h4 className="text-xs uppercase font-bold text-white tracking-widest font-display mb-1.5">
                EXPORT DIVISIONS
              </h4>
              <div className="w-7 h-[2.5px] bg-[#E5A93C] mb-4" />
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="/#products" className="hover:text-white transition-colors">
                  Garments
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-white transition-colors">
                  Footwear
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-white transition-colors">
                  Home Textiles
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-white transition-colors">
                  Fabrics
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-white transition-colors">
                  Electronics &amp; Appliances
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: RESOURCES (Span 2) */}
          <div className="col-span-6 sm:col-span-4 lg:col-span-2 space-y-3">
            <div>
              <h4 className="text-xs uppercase font-bold text-white tracking-widest font-display mb-1.5">
                RESOURCES
              </h4>
              <div className="w-7 h-[2.5px] bg-[#E5A93C] mb-4" />
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <a href="/#news" className="hover:text-white transition-colors">
                  News &amp; Updates
                </a>
              </li>
              <li>
                <a href="/#brochures" className="hover:text-white transition-colors">
                  Brochures &amp; Catalogs
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="/#terms" className="hover:text-white transition-colors">
                  Privacy &amp; NDA Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: STAY CONNECTED / Newsletter (Span 3) */}
          <div className="col-span-12 sm:col-span-8 lg:col-span-3 space-y-3.5 pl-0 lg:pl-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              STAY CONNECTED
            </span>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-display leading-tight">
              Global Opportunities Straight to{" "}
              <span className="text-cyan-400">Your Inbox.</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Get the latest updates on trade shows, new collections and business opportunities.
            </p>

            {/* Newsletter Input Box */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-3 pt-1">
              <div className="relative flex items-center bg-[#071d31] border border-slate-700/80 rounded-md p-1 focus-within:border-cyan-500 transition-colors shadow-inner">
                <Mail className="w-4 h-4 text-slate-400 ml-2.5 mr-2 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none py-1.5 pr-2"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded bg-[#E5A93C] hover:bg-[#d89c30] text-slate-950 font-bold flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Subscribe"
                >
                  {subscribed ? (
                    <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  )}
                </button>
              </div>

              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-medium">
                  Thank you! You are now subscribed to Maya Exports updates.
                </p>
              )}

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer select-none group pt-0.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-slate-600 bg-slate-900/60 text-cyan-500 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                />
                <span className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors leading-tight">
                  I agree to receive updates from Maya Exports Ltd.
                </span>
              </label>
            </form>
          </div>
        </div>

        {/* 2. Middle Section: GLOBAL OFFICES */}
        <div className="pt-10 pb-12">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-white font-display">
                GLOBAL OFFICES
              </span>
              <span className="w-8 h-[2.5px] bg-[#E5A93C] inline-block" />
            </div>

            <Link
              href="/contact"
              className="text-cyan-400 hover:text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors group"
            >
              <span>VIEW ALL OFFICES</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 2 Office Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1: China Head Office (Fujian) */}
            <div className="rounded-xl bg-[#091b2e]/70 border border-slate-700/60 p-5 sm:p-6 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-slate-600 transition-all">
              <div className="flex items-start gap-4">
                {/* Round Building Icon Badge */}
                <div className="w-12 h-12 rounded-full bg-[#0d2744] border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 shadow-inner">
                  <Building2 className="w-5 h-5" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                    CHINA
                  </span>
                  <h4 className="text-base font-bold text-white font-display">
                    Head Office (Fujian)
                  </h4>
                  <div className="flex items-start gap-2 pt-1 text-slate-300 text-xs leading-relaxed">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      Room 2nd FLR, C# BLDG NO.17#, Yinchang Area, Beihuan Liangshi Road, Shishi City, Fujian P.R. China. P.C: 362700
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Details Divider */}
              <div className="mt-5 pt-4 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a href="tel:+86059588568700" className="hover:text-white transition-colors">
                    +86-0595-88568700 / 88613700
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Printer className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>+86-0595-88569700</span>
                </div>
              </div>
            </div>

            {/* Card 2: Hong Kong Office */}
            <div className="rounded-xl bg-[#091b2e]/70 border border-slate-700/60 p-5 sm:p-6 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-slate-600 transition-all">
              <div className="flex items-start gap-4">
                {/* Round Building Icon Badge */}
                <div className="w-12 h-12 rounded-full bg-[#0d2744] border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 shadow-inner">
                  <Building2 className="w-5 h-5" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                    HONG KONG
                  </span>
                  <h4 className="text-base font-bold text-white font-display">
                    Hong Kong Office
                  </h4>
                  <div className="flex items-start gap-2 pt-1 text-slate-300 text-xs leading-relaxed">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      Kensington Plaza, 98 Parkes Street, Jordan, Kowloon, Hong Kong.
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Details Divider */}
              <div className="mt-5 pt-4 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a href="mailto:sonu@mayaexportsltd.com" className="hover:text-white transition-colors">
                    sonu@mayaexportsltd.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a href="tel:+85268580690" className="hover:text-white transition-colors">
                    +852-68580690
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar: Copyright & Compliance */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          {/* Compliance & Copyright */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-center sm:text-left">
            <span>© 2026 Maya Exports Ltd — Fashion. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>PRC Direct Export License #3302910842</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>Customs AEO Advanced Certified Enterprise</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
