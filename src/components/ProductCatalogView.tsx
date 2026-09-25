"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import InfoModal from "@/components/InfoModal";
import { CategoryCatalog, ProductItem } from "@/data/productCatalog";
import { ChevronRight, ShieldCheck, ArrowRight } from "lucide-react";

interface ProductCatalogViewProps {
  catalog: CategoryCatalog;
}

export default function ProductCatalogView({ catalog }: ProductCatalogViewProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);
  const [prefilledCategory, setPrefilledCategory] = useState(catalog.title);

  const handleOpenGeneralQuote = (cat?: string) => {
    setPrefilledCategory(cat || catalog.title);
    setIsQuoteModalOpen(true);
  };

  const isOtherDivision =
    catalog.division === "Home Textiles" ||
    catalog.division === "Fabrics" ||
    catalog.division === "Electronics & Appliances";

  // Sister categories in Men's Garments, Footwear, or Direct Divisions
  const siblingTabs =
    catalog.division === "Footwear"
      ? [
          { title: "Sports & Casual", slug: "mens-sports-and-casual" },
          { title: "Slippers & Sandals", slug: "mens-slippers-and-sandals" },
          { title: "Office Shoes", slug: "mens-office-shoes" },
        ]
      : isOtherDivision
      ? [
          { title: "Home Textiles", slug: "home-textiles" },
          { title: "Fabrics", slug: "fabrics" },
          { title: "Electronics & Appliances", slug: "electronics-and-appliances" },
        ]
      : [
          { title: "Men's Jackets", slug: "mens-jackets" },
          { title: "Men's Sweat Top & Hoodies", slug: "mens-sweat-top-hoodies" },
          { title: "Men's Shirts", slug: "mens-shirts" },
          { title: "Men's T-shirts", slug: "mens-t-shirts" },
          { title: "Men's Shorts & Lowers", slug: "mens-shorts-lowers" },
          { title: "Men's Jeans & Pants", slug: "mens-jeans-pants" },
        ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-blue selection:text-white">
      {/* Global Navbar with solid dark deep-blue theme for light background page */}
      <Navbar
        solid={true}
        onOpenQuoteModal={handleOpenGeneralQuote}
        onOpenInfoModal={(type) => setInfoModalType(type)}
      />

      {/* Main Content with top padding for fixed navbar */}
      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-brand-blue transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/#products" className="text-slate-600 hover:text-brand-blue transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600">{catalog.division}</span>
            {catalog.demographic && catalog.demographic !== catalog.division && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-600">{catalog.demographic}</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">{catalog.title}</span>
          </nav>

          {/* Page Header (Matching Image 2 serif style) */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-3">
              {catalog.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {catalog.description}
            </p>

            {/* Quick Sibling Category Tabs */}
            {(catalog.demographic === "Men" || isOtherDivision) && (
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mt-6 pt-4 border-t border-slate-200">
                {siblingTabs.map((tab) => {
                  const isActive = tab.slug === catalog.slug;
                  return (
                    <Link
                      key={tab.slug}
                      href={`/products/${tab.slug}`}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isActive
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {tab.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {catalog.items.map((item) => {
              const productUrl = `/products/${catalog.slug}/${item.id}`;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group"
                >
                  <Link href={productUrl} className="block group">
                    {/* Multi-angle Product Photo Container */}
                    <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-50 mb-4 border border-slate-100 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-2 group-hover:scale-103 transition-transform duration-300"
                      />
                    </div>

                    {/* Centered Model Number & Subtitle */}
                    <h3 className="text-center font-bold text-slate-900 text-sm sm:text-base mb-1 group-hover:text-brand-blue transition-colors">
                      {item.modelNo}
                    </h3>
                    <p className="text-center text-xs text-slate-500 leading-relaxed mb-4 min-h-[32px]">
                      {item.description}
                    </p>
                  </Link>

                  {/* Explore More Green Action Button: Directly navigates to the dedicated Product Detail Page */}
                  <Link
                    href={productUrl}
                    className="w-full py-2.5 px-4 rounded-md font-semibold text-xs text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2 text-center"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Factory & OEM Sourcing Guarantee Banner */}
          <div className="mt-14 max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Direct Mill & Factory Contract Manufacturing</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  BSCI audited, ISO 9001 certified facilities. Custom tech packs, lab-dips, and branded packaging supported.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleOpenGeneralQuote(catalog.title)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </main>

      {/* Global RFQ Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialCategory={prefilledCategory}
      />

      {/* Global Info Modal */}
      <InfoModal
        isOpen={infoModalType !== null}
        onClose={() => setInfoModalType(null)}
        type={infoModalType || "event"}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
