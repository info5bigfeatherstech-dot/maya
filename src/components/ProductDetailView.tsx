"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import InfoModal from "@/components/InfoModal";
import { CatalogImage } from "@/components/CatalogImage";
import type { CatalogCategory, CatalogProduct } from "@/lib/catalog/types";
import {
  compactInfoSections,
  infoSectionTitle,
  type ProductInfoSection,
  type ProductInfoSectionKey,
} from "@/lib/catalog/infoSections";
import { buildProductListing, formatModelNo, splitProductCopy } from "@/lib/catalog/tree";
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  Layers,
  CheckCircle2,
  Sparkles,
  FileText,
  Palette,
  Ruler,
  PackageCheck,
  Send,
} from "lucide-react";

interface ProductDetailViewProps {
  product: CatalogProduct;
  category: CatalogCategory;
  related: CatalogProduct[];
}

export default function ProductDetailView({ product, category, related }: ProductDetailViewProps) {
  const gallery = product.images.length > 0 ? product.images : [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);
  const infoTabs = compactInfoSections(product.infoSections);
  const [activeTab, setActiveTab] = useState<ProductInfoSectionKey>(infoTabs[0]?.key || "specs");
  const resolvedTab = infoTabs.some((tab) => tab.key === activeTab) ? activeTab : infoTabs[0]?.key;
  const modelNo = formatModelNo(product.productCode);
  const pathParts = (product.category.path || category.path || category.name).split(" / ").filter(Boolean);
  const division = pathParts[0] || category.name;
  const demographic = pathParts[1] || "";
  const { paragraph, specs, metrics, details } = buildProductListing(product);

  const contactUrl = `/contact?product=${encodeURIComponent(product.productCode)}&category=${encodeURIComponent(
    category.name
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-blue selection:text-white">
      <Navbar
        solid={true}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenInfoModal={(type) => setInfoModalType(type)}
      />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
              <Link href="/" className="hover:text-brand-blue transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/products" className="hover:text-brand-blue transition-colors">
                Products
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href={`/products/${category.slug}`} className="hover:text-brand-blue transition-colors">
                {category.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">{modelNo}</span>
            </nav>
            <Link
              href={`/products/${category.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to {category.name}</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-6 flex flex-col">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 mb-4 shadow-inner flex items-center justify-center">
                  <CatalogImage
                    src={gallery[selectedImageIndex]}
                    alt={`${product.title} - View ${selectedImageIndex + 1}`}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-4 transition-all duration-300"
                  />
                  {gallery.length > 0 ? (
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                      Angle {selectedImageIndex + 1} of {gallery.length}
                    </div>
                  ) : null}
                  <div className="absolute top-3 right-3 bg-brand-blue text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    OEM / ODM
                  </div>
                </div>

                {gallery.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {gallery.map((img, idx) => {
                      const isSelected = selectedImageIndex === idx;
                      return (
                        <button
                          key={`${img}-${idx}`}
                          type="button"
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`relative aspect-[4/3] w-20 sm:w-24 rounded-lg overflow-hidden bg-slate-50 border-2 transition-all shrink-0 cursor-pointer ${
                            isSelected
                              ? "border-brand-blue ring-2 ring-brand-blue/30"
                              : "border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <CatalogImage src={img} alt={`Thumbnail ${idx + 1}`} sizes="96px" className="object-contain p-1" />
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-brand-blue mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-800 block">BSCI Audited</span>
                    <span className="text-[9px] text-slate-500">Tier-1 Facility</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <Sparkles className="w-4 h-4 text-gold mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-800 block">OEKO-TEX 100</span>
                    <span className="text-[9px] text-slate-500">Eco Certified</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <PackageCheck className="w-4 h-4 text-[#5ecba1] mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-800 block">AQL 1.5/2.5</span>
                    <span className="text-[9px] text-slate-500">Pre-Shipment QA</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs uppercase font-bold tracking-widest text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded">
                      {division}
                      {demographic ? ` • ${demographic}` : ""}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      HS Code Supported
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mb-2">
                    {modelNo}
                  </h1>
                  <h2 className="text-lg font-semibold text-slate-800 mb-3">{product.title}</h2>
                  {paragraph ? (
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">{paragraph}</p>
                  ) : null}

                  {metrics.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                      {metrics.map((item) => (
                        <div key={item.label} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                            {item.label}
                          </span>
                          <span className="text-sm font-bold text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {details.length > 0 ? (
                    <div className="space-y-3 bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 mb-6 text-xs">
                      {details.map((item, index) => (
                        <div
                          key={`${item.label}-${index}`}
                          className={`flex items-start justify-between gap-3 ${
                            index < details.length - 1 ? "border-b border-slate-200/60 pb-2.5" : ""
                          }`}
                        >
                          <span className="text-slate-500 font-medium shrink-0">{item.label}:</span>
                          <span className="text-slate-900 font-semibold text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {specs.length > 0 ? (
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                        Manufacturing & Design Specifications:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        {specs.map((spec, sIdx) => (
                          <div key={`${spec}-${sIdx}`} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <Link
                    href={contactUrl}
                    className="w-full py-3.5 px-6 rounded-md font-semibold text-xs uppercase tracking-wider text-white bg-brand-blue hover:bg-brand-blue-hover active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 text-center"
                  >
                    <Send className="w-4 h-4" />
                    <span>Contact Us for This Product</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {infoTabs.length > 0 && resolvedTab ? (
            <ProductInfoTabs tabs={infoTabs} activeTab={resolvedTab} onChange={setActiveTab} />
          ) : null}

          {related.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-widest text-brand-blue">
                    Complete Collection
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    More Styles in {category.name}
                  </h3>
                </div>
                <Link
                  href={`/products/${category.slug}`}
                  className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-50 mb-3 border border-slate-100 flex items-center justify-center">
                        <CatalogImage
                          src={item.images[0]}
                          alt={item.title}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-center font-bold text-slate-900 text-sm mb-1">
                        {formatModelNo(item.productCode)}
                      </h4>
                      <p className="text-center text-xs text-slate-500 line-clamp-2 mb-3">
                        {splitProductCopy(item.description).paragraph}
                      </p>
                    </div>
                    <Link
                      href={`/products/${category.slug}/${item.id}`}
                      className="w-full py-2 px-3 rounded-md font-semibold text-xs text-white bg-brand-blue hover:bg-brand-blue-hover transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Explore More</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialCategory={`${category.name} - ${modelNo}`}
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

const SECTION_ICONS: Record<ProductInfoSectionKey, React.ElementType[]> = {
  specs: [Layers, Clock, ShieldCheck],
  oem: [Palette, FileText, Ruler],
  packing: [PackageCheck, Layers, Clock],
};

function ProductInfoTabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: ProductInfoSection[];
  activeTab: ProductInfoSectionKey;
  onChange: (key: ProductInfoSectionKey) => void;
}) {
  const current = tabs.find((tab) => tab.key === activeTab) || tabs[0];
  const icons = SECTION_ICONS[current.key] || SECTION_ICONS.specs;
  const iconColor = current.key === "oem" ? "text-gold" : "text-brand-blue";
  const columns =
    current.items.length >= 3 ? "md:grid-cols-3" : current.items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-1";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-14">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-3 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 -mb-[13px] whitespace-nowrap ${
              activeTab === tab.key
                ? "border-brand-blue text-brand-blue"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {infoSectionTitle(tab.key)}
          </button>
        ))}
      </div>

      <div className={`grid grid-cols-1 ${columns} gap-6 text-xs text-slate-600`}>
        {current.items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={`${current.key}-${item.heading}-${index}`} className="space-y-2">
              <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Icon className={`w-4 h-4 ${iconColor} shrink-0`} />
                <span>{item.heading}</span>
              </h5>
              <p className="leading-relaxed">{item.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
