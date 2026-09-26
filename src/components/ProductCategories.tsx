"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shirt,
  Home,
  Layers,
  Headphones,
  Globe,
  ShieldCheck,
  Users,
  Handshake,
  ArrowRight,
} from "lucide-react";

interface ProductCategoriesProps {
  onSelectCategory?: (category: string) => void;
}

// Sneaker outline icon matching reference design
function ShoeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 15c0-1.5.5-2.5 2-3l3-1 3-3.5A2 2 0 0 1 12.5 6h2a2 2 0 0 1 2 2v2.5l2.5 1.5a3 3 0 0 1 1.5 2.6V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2z" />
      <path d="M7 11l5-1" />
      <path d="M3 17h18" />
    </svg>
  );
}

// Woven roll fabric icon matching reference design
function FabricRollIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19a3 3 0 0 1-3-3V7a3 3 0 0 1 6 0v9a3 3 0 0 1-3 3z" />
      <path d="M4 19h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H4" />
      <path d="M10 4v15" />
      <path d="M16 4v15" />
    </svg>
  );
}

export default function ProductCategories({
  onSelectCategory,
}: ProductCategoriesProps) {
  const topCategories = [
    {
      id: "garments",
      title: "Garments",
      subtitle:
        "Woven apparel, formal suits, knitwear, casual denim, outerwear & athleisure.",
      moq: "800 PCS / STYLE",
      leadTime: "40-50 DAYS",
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85",
      link: "/products/mens-jackets",
      icon: Shirt,
    },
    {
      id: "footwear",
      title: "Footwear",
      subtitle:
        "Handcrafted leather shoes, performance athletic sneakers, casual loafers & boots.",
      moq: "500 PAIRS / STYLE",
      leadTime: "45-60 DAYS",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=85",
      link: "/products/mens-sports-and-casual",
      icon: ShoeIcon,
    },
    {
      id: "home-textiles",
      title: "Home Textiles",
      subtitle:
        "400-1000TC, luxury sateen bedding, hotel-grade toweling, curtains & upholstery.",
      moq: "1,000 SETS / SPEC",
      leadTime: "35-45 DAYS",
      image:
        "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=85",
      link: "/products/home-textiles",
      icon: Home,
    },
  ];

  const bottomCategories = [
    {
      id: "fabrics",
      title: "Fabrics",
      subtitle:
        "Cotton, linen, polyester, blended fabrics for fashion & home.",
      moq: "1,500 METERS",
      leadTime: "25-35 DAYS",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
      link: "/products/fabrics",
      icon: FabricRollIcon,
    },
    {
      id: "electronics",
      title: "Electronics & Appliances",
      subtitle:
        "Consumer electronics, audio devices, smart accessories and more.",
      moq: "1,000 UNITS",
      leadTime: "30-45 DAYS",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
      link: "/products/electronics-and-appliances",
      icon: Headphones,
    },
  ];

  return (
    <section
      id="products"
      className="bg-white py-16 sm:py-20 lg:py-24 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HEADER SECTION (Matching Reference: Clean Typography + Right Side Global Quality Card) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-4">
          {/* Left: Headline & Description */}
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold uppercase tracking-wider">
              OUR CATEGORIES
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-medium tracking-tight text-slate-900 leading-[1.15]">
              Explore Our <br />
              <span className="text-[#2563EB]">Product Categories</span>
            </h2>

            <p className="text-slate-500 text-sm  leading-relaxed capitalize">
              We export high-quality garments, fabrics, and lifestyle products to global
              markets, serving brands, wholesalers and retailers worldwide.
            </p>
          </div>

          {/* Right: Global Quality Card */}
          <div className="lg:max-w-sm w-full p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-4 group hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Global Quality. Worldwide Reach.
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Premium products. Reliable supply. Long-term partnerships.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
          </div>
        </div>

        {/* VISUAL CARDS GRID */}
        <div className="space-y-6">
          {/* Row 1: 3 Column Cards (Garments, Footwear, Home Textiles) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={cat.link}
                  className="group relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-500 cursor-pointer"
                >
                  {/* Background Image with Hover Zoom (1.05x) */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    {/* Dark gradient overlay matching reference design */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20 opacity-90 group-hover:opacity-85 transition-opacity" />
                  </div>

                  {/* Card Content Overlay */}
                  <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                    {/* Top Category Icon */}
                    <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    {/* Middle: Title, Description & Circular CTA Arrow */}
                    <div className="space-y-4">
                      <div className="flex items-end justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            {cat.title}
                          </h3>
                          <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed line-clamp-2">
                            {cat.subtitle}
                          </p>
                        </div>

                        {/* Circular CTA Button (Arrow Slides Right on hover) */}
                        <div className="w-10 h-10 rounded-full border border-white/30 bg-black/40 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-slate-950 group-hover:border-white transition-all duration-300">
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>

                      {/* Bottom Metadata Bar: MOQ & Lead Time */}
                      <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
                        <span>MOQ: {cat.moq}</span>
                        <span className="text-slate-400">LEAD: {cat.leadTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Row 2: 2 Column Wider Cards (Fabrics, Electronics & Appliances) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bottomCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={cat.link}
                  className="group relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-500 cursor-pointer"
                >
                  {/* Background Image with Hover Zoom (1.05x) */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    {/* Dark gradient overlay matching reference design */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20 opacity-90 group-hover:opacity-85 transition-opacity" />
                  </div>

                  {/* Card Content Overlay */}
                  <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                    {/* Top Category Icon */}
                    <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    {/* Middle: Title, Description & Circular CTA Arrow */}
                    <div className="space-y-4">
                      <div className="flex items-end justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            {cat.title}
                          </h3>
                          <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed line-clamp-2">
                            {cat.subtitle}
                          </p>
                        </div>

                        {/* Circular CTA Button (Arrow Slides Right on hover) */}
                        <div className="w-10 h-10 rounded-full border border-white/30 bg-black/40 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-slate-950 group-hover:border-white transition-all duration-300">
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>

                      {/* Bottom Metadata Bar: MOQ & Lead Time */}
                      <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
                        <span>MOQ: {cat.moq}</span>
                        <span className="text-slate-400">LEAD: {cat.leadTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* TRUST INDICATORS SECTION (Matching Reference: 4 Stat Cards in clean horizontal strip) */}
        <div className="rounded-2xl p-6 sm:p-8 bg-slate-50/80 border border-slate-200/80 shadow-2xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
            {/* Stat 1: 100+ Products Categories */}
            <div className="flex items-center gap-4 pt-4 lg:pt-0">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  100+
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Products Categories
                </div>
              </div>
            </div>

            {/* Stat 2: 50+ Countries We Export To */}
            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:pl-8">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Globe className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  50+
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Countries We Export To
                </div>
              </div>
            </div>

            {/* Stat 3: 10+ Years of Experience */}
            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:pl-8">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Users className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  10+
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Years of Experience
                </div>
              </div>
            </div>

            {/* Stat 4: Trusted by Global Brands */}
            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:pl-8">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Handshake className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Trusted by
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900">
                  Global Brands
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom subtle divider label */}
        <div className="flex items-center justify-center gap-4 text-slate-400 text-xs tracking-widest uppercase font-medium pt-2">
          <span className="w-12 h-px bg-slate-200" />
          <span>YOUR GLOBAL SOURCING PARTNER</span>
          <span className="w-12 h-px bg-slate-200" />
        </div>
      </div>
    </section>
  );
}
