"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import InfoModal from "@/components/InfoModal";
import { CategoryCatalog, ProductItem, productCatalogs } from "@/data/productCatalog";
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles, X, ShieldCheck, Clock, Layers } from "lucide-react";

interface ProductCatalogViewProps {
  catalog: CategoryCatalog;
}

export default function ProductCatalogView({ catalog }: ProductCatalogViewProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [prefilledCategory, setPrefilledCategory] = useState(catalog.title);

  const handleExplore = (item: ProductItem) => {
    setSelectedProduct(item);
  };

  const handleOpenQuoteFromItem = (item: ProductItem) => {
    setPrefilledCategory(`${catalog.title} - ${item.modelNo}`);
    setSelectedProduct(null);
    setIsQuoteModalOpen(true);
  };

  const handleOpenGeneralQuote = (cat?: string) => {
    setPrefilledCategory(cat || catalog.title);
    setIsQuoteModalOpen(true);
  };

  // Sister categories in Men's Garments or Footwear for quick browsing
  const siblingTabs =
    catalog.division === "Footwear"
      ? [
          { title: "Sports & Casual", slug: "mens-sports-and-casual" },
          { title: "Slippers & Sandals", slug: "mens-slippers-and-sandals" },
          { title: "Office Shoes", slug: "mens-office-shoes" },
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
            <span className="text-slate-600">{catalog.division}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600">{catalog.demographic}</span>
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
            {catalog.demographic === "Men" && (
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mt-6 pt-4 border-t border-slate-200">
                {siblingTabs.map((tab) => {
                  const isActive = tab.slug === catalog.slug;
                  return (
                    <Link
                      key={tab.slug}
                      href={`/products/${tab.slug}`}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
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

          {/* Product Cards Grid (Matching Image 2 layout with Model No, description, and green Explore More button) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {catalog.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group"
              >
                <div>
                  {/* Multi-angle Product Photo Container */}
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-50 mb-4 border border-slate-100 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>

                  {/* Centered Model Number & Subtitle (Exact layout from Image 2) */}
                  <h3 className="text-center font-bold text-slate-900 text-sm sm:text-base mb-1">
                    {item.modelNo}
                  </h3>
                  <p className="text-center text-xs text-slate-500 leading-relaxed mb-4 min-h-[32px]">
                    {item.description}
                  </p>
                </div>

                {/* Explore More Green Action Button (Exact green matching Image 2: #5ecba1) */}
                <button
                  type="button"
                  onClick={() => handleExplore(item)}
                  className="w-full py-2.5 px-4 rounded-md font-semibold text-xs text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <span>Explore More</span>
                </button>
              </div>
            ))}
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
              className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </main>

      {/* Product Detail Modal when clicking "Explore More" */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                  {catalog.demographic} &bull; {catalog.division}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{selectedProduct.modelNo}</h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close specification modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="relative aspect-[4/3] w-full bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">{selectedProduct.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedProduct.description}</p>
              </div>

              {/* Manufacturing Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                    <Layers className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Minimum Order (MOQ)</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{selectedProduct.moq || "500 pcs"}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                    <Clock className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Sample / Bulk Lead Time</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{selectedProduct.leadTime || "35-45 days"}</span>
                </div>
              </div>

              {/* Technical Specifications */}
              {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Factory & Fabric Specifications
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProduct.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5ecba1] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Back to Catalog
              </button>
              <button
                onClick={() => handleOpenQuoteFromItem(selectedProduct)}
                className="px-5 py-2.5 rounded-md font-semibold text-xs text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] active:scale-[0.98] transition-all shadow-xs flex items-center gap-2"
              >
                <span>Request Sample & Quote for {selectedProduct.modelNo}</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
