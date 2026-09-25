"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Globe2, Clock } from "lucide-react";
import MayaLogo from "./MayaLogo";

export default function Footer() {
  const [shanghaiTime, setShanghaiTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Shanghai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setShanghaiTime(new Intl.DateTimeFormat([], options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    /* Deep Blue background with thin gold top border line as strictly specified */
    <footer className="bg-deep-blue text-slate-light text-xs border-t border-gold/40 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-deep-blue-border">
          {/* Col 1: Corporate Overview & Identity */}
          <div className="lg:col-span-2 space-y-4">
            {/* Logo at full color */}
            <MayaLogo size="lg" variant="dark" />

            <p className="text-slate-light text-xs leading-relaxed max-w-sm">
              Maya Exports Ltd — Fashion is a premier vertical OEM/ODM apparel and textile exporter.
              Engineering bespoke garments for international fashion houses and enterprise retail
              groups across the UK, Europe, North America, the Middle East, and Australia.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="px-2.5 py-1 rounded bg-deep-blue-card border border-deep-blue-border text-[11px] font-mono text-slate-light flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-blue" />
                <span>Shanghai HQ Time: {shanghaiTime || "14:35:00"} (GMT+8)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold text-white tracking-widest font-display">
              Enterprise
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-brand-blue transition-colors">
                  About Maya Exports (Since 2003)
                </Link>
              </li>
              <li>
                <a href="#manufacturing" className="hover:text-brand-blue transition-colors">
                  Manufacturing Hub
                </a>
              </li>
              <li>
                <a href="#qc" className="hover:text-brand-blue transition-colors">
                  Quality Assurance (AQL 1.0)
                </a>
              </li>
              <li>
                <a href="#export-markets" className="hover:text-brand-blue transition-colors">
                  Global Trade Corridors
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-brand-blue transition-colors">
                  ESG & CSDDD Readiness
                </a>
              </li>
              <li>
                <Link href="/events" className="hover:text-brand-blue transition-colors text-gold">
                  Trade Shows & Global Expos
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-brand-blue transition-colors text-[#5ecba1]">
                  Careers & Talent Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold text-white tracking-widest font-display">
              Export Divisions
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/#products" className="hover:text-brand-blue transition-colors">
                  Garments
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-brand-blue transition-colors">
                  Footwear
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-brand-blue transition-colors">
                  Home Textiles
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-brand-blue transition-colors">
                  Fabrics
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-brand-blue transition-colors">
                  Electronics & Appliances
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: China Head Office & Hong Kong Office */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-semibold text-white tracking-widest font-display">
              Global Offices & Direct Contacts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] leading-relaxed">
              {/* China Head Office */}
              <div className="p-3 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-1.5">
                <span className="text-brand-blue font-semibold block uppercase tracking-wider text-[10px]">
                  China Head Office (Fujian)
                </span>
                <p className="text-slate-light leading-normal">
                  ROOM 2nd FLR, C# BLDG NO.17#, YINCHANG AREA, BEIHUAN LIANGSHI ROAD, SHISHI CITY, FUJIAN P.R. CHINA. P.C: 362700
                </p>
                <div className="pt-1 border-t border-deep-blue-border/70 text-slate-muted space-y-0.5">
                  <p><span className="text-white">Tel:</span> +86-0595-88568700 / 88613700</p>
                  <p><span className="text-white">Fax:</span> +86-0595-88569700</p>
                </div>
              </div>

              {/* Hong Kong Office */}
              <div className="p-3 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-1.5">
                <span className="text-gold font-semibold block uppercase tracking-wider text-[10px]">
                  Hong Kong Office
                </span>
                <p className="text-slate-light leading-normal">
                  KENSINGTON PLAZA, 98 PARKES STREET, JORDAN, KOWLOON, HONG KONG.
                </p>
                <div className="pt-1 border-t border-deep-blue-border/70 text-slate-muted space-y-0.5">
                  <p><span className="text-white">Email:</span> sonu@mayaexportsltd.com</p>
                  <p><span className="text-white">Mr. Mike:</span> +852-68580690</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp & Call Strip */}
            <div className="pt-2 flex flex-wrap gap-2 text-[10px]">
              <a
                href="https://wa.me/8613506082198"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-deep-blue-card border border-deep-blue-border hover:border-brand-blue text-slate-light hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="text-brand-blue font-semibold">Mr. Mike (Sonu):</span>
                <span>+86-13506082198</span>
              </a>
              <a
                href="https://wa.me/8613506082700"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-deep-blue-card border border-deep-blue-border hover:border-brand-blue text-slate-light hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="text-brand-blue font-semibold">Ms. Jenny (Roshni):</span>
                <span>+86-13506082700</span>
              </a>
              <a
                href="https://wa.me/8613859781105"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-deep-blue-card border border-deep-blue-border hover:border-brand-blue text-slate-light hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="text-brand-blue font-semibold">Ms. Sophie:</span>
                <span>+86-13859781105</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-muted">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Maya Exports Ltd — Fashion. All rights reserved.</span>
            <span>PRC Direct Export License #3302910842</span>
            <span>Customs AEO Advanced Certified Enterprise</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-light">
              <Globe2 className="w-3.5 h-3.5 text-brand-blue" />
              <span>International Edition (English)</span>
            </div>
            <a href="#about" className="hover:text-slate-light transition-colors">
              Privacy & NDA Terms
            </a>
            {/* Social link / Back to top with gold hover state as specified */}
            <a href="#contact" className="text-brand-blue hover:text-gold transition-colors font-medium">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
