"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import InfoModal from "@/components/InfoModal";
import { CatalogImage } from "@/components/CatalogImage";
import type { CatalogCategory, CatalogProduct } from "@/lib/catalog/types";
import { formatModelNo, splitProductCopy } from "@/lib/catalog/tree";
import { ChevronRight, ShieldCheck, ArrowRight } from "lucide-react";

interface ProductCatalogViewProps {
  category: CatalogCategory;
  siblings: CatalogCategory[];
  products: CatalogProduct[];
}

export default function ProductCatalogView({
  category,
  siblings,
  products,
}: ProductCatalogViewProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);
  const [prefilledCategory, setPrefilledCategory] = useState(category.name);
  const pathParts = category.path.split(" / ").filter(Boolean);

  const handleOpenGeneralQuote = (cat?: string) => {
    setPrefilledCategory(cat || category.name);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-blue selection:text-white">
      <Navbar
        solid={true}
        onOpenQuoteModal={handleOpenGeneralQuote}
        onOpenInfoModal={(type) => setInfoModalType(type)}
      />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-brand-blue transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/#products" className="text-slate-600 hover:text-brand-blue transition-colors">
              Products
            </Link>
            {pathParts.map((part, index) => (
              <React.Fragment key={`${part}-${index}`}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className={index === pathParts.length - 1 ? "text-slate-900 font-semibold" : "text-slate-600"}>
                  {part}
                </span>
              </React.Fragment>
            ))}
          </nav>

          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-3">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto capitalize">
              {category.description || `Explore ${category.name} from our live export catalog.`}
            </p>

            {siblings.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mt-6 pt-4 border-t border-slate-200">
                {siblings.map((tab) => {
                  const isActive = tab.slug === category.slug;
                  return (
                    <Link
                      key={tab.id}
                      href={`/products/${tab.slug}`}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isActive
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {tab.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {products.length === 0 ? (
            <div className="max-w-xl mx-auto text-center bg-white border border-slate-200 rounded-xl p-10 text-sm text-slate-500 capitalize">
              No products in {category.name} yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {products.map((item) => {
                const productUrl = `/products/${category.slug}/${item.id}`;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group"
                  >
                    <Link href={productUrl} className="block group">
                      <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-50 mb-4 border border-slate-100 flex items-center justify-center">
                        <CatalogImage
                          src={item.images[0]}
                          alt={item.title}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-2 group-hover:scale-103 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-center font-bold text-slate-900 text-sm sm:text-base mb-1 group-hover:text-brand-blue transition-colors">
                        {formatModelNo(item.productCode)}
                      </h3>
                      <p className="text-center text-xs text-slate-500 leading-relaxed mb-4 min-h-[32px]">
                        {splitProductCopy(item.description).paragraph}
                      </p>
                    </Link>
                    <Link
                      href={productUrl}
                      className="w-full py-2.5 px-4 rounded-md font-semibold text-xs text-white bg-brand-blue hover:bg-brand-blue-hover active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2 text-center"
                    >
                      <span>Explore More</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-90" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-14 max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Direct Mill & Factory Contract Manufacturing</h4>
                <p className="text-xs text-slate-600 mt-0.5 capitalize">
                  BSCI audited, ISO 9001 certified facilities. Custom tech packs, lab-dips, and branded packaging supported.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleOpenGeneralQuote(category.name)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </main>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialCategory={prefilledCategory}
      />
      <InfoModal
        isOpen={infoModalType !== null}
        onClose={() => setInfoModalType(null)}
        type={infoModalType || "event"}
      />
      <Footer />
    </div>
  );
}
