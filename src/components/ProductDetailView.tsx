"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import InfoModal from "@/components/InfoModal";
import { CategoryCatalog, ProductItem } from "@/data/productCatalog";
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  Layers,
  CheckCircle2,
  Phone,
  MessageSquare,
  Sparkles,
  FileText,
  Palette,
  Ruler,
  PackageCheck,
  Send,
} from "lucide-react";

interface ProductDetailViewProps {
  product: ProductItem;
  catalog: CategoryCatalog;
}

export default function ProductDetailView({ product, catalog }: ProductDetailViewProps) {
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);
  const [activeTab, setActiveTab] = useState<"specs" | "oem" | "packing">("specs");

  const otherProducts = catalog.items.filter((item) => item.id !== product.id);

  const contactUrl = `/contact?product=${encodeURIComponent(product.modelNo)}&category=${encodeURIComponent(
    catalog.title
  )}`;

  const whatsappMessage = encodeURIComponent(
    `Hello Maya Exports, I am inquiring about ${product.modelNo} (${product.title}) under ${catalog.title}. Please share MOQ, tech pack, and sample quotation.`
  );
  const whatsappUrl = `https://wa.me/8613506082198?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-blue selection:text-white">
      {/* Global Solid Navbar */}
      <Navbar
        solid={true}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenInfoModal={(type) => setInfoModalType(type)}
      />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Back Navigation */}
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
              <Link href={`/products/${catalog.slug}`} className="hover:text-brand-blue transition-colors">
                {catalog.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">{product.modelNo}</span>
            </nav>

            <Link
              href={`/products/${catalog.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-brand-blue transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to {catalog.title}</span>
            </Link>
          </div>

          {/* Product Showcase Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column: Multi-Angle Image Gallery (5 cols on lg) */}
              <div className="lg:col-span-6 flex flex-col">
                {/* Main Large Image Display */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 mb-4 shadow-inner flex items-center justify-center">
                  <Image
                    src={gallery[selectedImageIndex] || product.image}
                    alt={`${product.title} - View ${selectedImageIndex + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-4 transition-all duration-300"
                  />
                  {/* Angle badge indicator */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                    Angle {selectedImageIndex + 1} of {gallery.length}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#5ecba1]/90 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    OEM / ODM
                  </div>
                </div>

                {/* Thumbnail Strip (Different angles: front, back, profile, detail) */}
                {gallery.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {gallery.map((img, idx) => {
                      const isSelected = selectedImageIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`relative aspect-[4/3] w-20 sm:w-24 rounded-lg overflow-hidden bg-slate-50 border-2 transition-all shrink-0 cursor-pointer ${
                            isSelected
                              ? "border-[#5ecba1] ring-2 ring-[#5ecba1]/30"
                              : "border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            sizes="96px"
                            className="object-contain p-1"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Sourcing badges under image */}
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

              {/* Right Column: Product Specs & Direct Inquiry Actions (6 cols on lg) */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase font-bold tracking-widest text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded">
                      {catalog.division} &bull; {catalog.demographic}
                    </span>
                    <span className="text-xs text-slate-400">|</span>
                    <span className="text-xs font-mono font-medium text-slate-500">
                      HS Code Supported
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mb-2">
                    {product.modelNo}
                  </h1>
                  <h2 className="text-lg font-semibold text-slate-800 mb-3">{product.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{product.description}</p>

                  {/* Core Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Minimum Order (MOQ)
                      </span>
                      <span className="text-sm font-bold text-slate-900">{product.moq || "500 pcs"}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Production Time
                      </span>
                      <span className="text-sm font-bold text-slate-900">{product.leadTime || "35-45 days"}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Sample Turnaround
                      </span>
                      <span className="text-sm font-bold text-slate-900">7-10 Days</span>
                    </div>
                  </div>

                  {/* Specification Breakdown Box */}
                  <div className="space-y-3 bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 mb-6 text-xs">
                    {product.fabricComposition && (
                      <div className="flex items-start justify-between gap-3 border-b border-slate-200/60 pb-2.5">
                        <span className="text-slate-500 font-medium shrink-0">Fabric / Material:</span>
                        <span className="text-slate-900 font-semibold text-right">{product.fabricComposition}</span>
                      </div>
                    )}
                    {product.sizing && (
                      <div className="flex items-start justify-between gap-3 border-b border-slate-200/60 pb-2.5">
                        <span className="text-slate-500 font-medium shrink-0">Available Sizing:</span>
                        <span className="text-slate-900 font-semibold text-right">{product.sizing}</span>
                      </div>
                    )}
                    {product.colorways && product.colorways.length > 0 && (
                      <div className="flex items-start justify-between gap-3 border-b border-slate-200/60 pb-2.5">
                        <span className="text-slate-500 font-medium shrink-0">Stock / Lab-Dips:</span>
                        <span className="text-slate-900 font-semibold text-right">
                          {product.colorways.join(", ")}
                        </span>
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-slate-500 font-medium shrink-0">FOB Shipping Ports:</span>
                      <span className="text-slate-900 font-semibold text-right">Xiamen / Shenzhen / Hong Kong</span>
                    </div>
                  </div>

                  {/* Specification Highlights List */}
                  {product.specs && product.specs.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                        Manufacturing & Design Specifications:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        {product.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#5ecba1] shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary CTA Deck: Contact Us */}
                <div className="pt-4 border-t border-slate-200">
                  <Link
                    href={contactUrl}
                    className="w-full py-3.5 px-6 rounded-md font-semibold text-xs uppercase tracking-wider text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 text-center"
                  >
                    <Send className="w-4 h-4" />
                    <span>Contact Us for This Product</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Deep-Dive Production & Factory Standards Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-14">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-3 mb-6 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 -mb-[13px] ${
                  activeTab === "specs"
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                Production Capabilities
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("oem")}
                className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 -mb-[13px] ${
                  activeTab === "oem"
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                Custom OEM / ODM Branding
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("packing")}
                className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 -mb-[13px] ${
                  activeTab === "packing"
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                Packaging & Sea/Air Logistics
              </button>
            </div>

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-brand-blue" />
                    <span>Precision Pattern Grading</span>
                  </h5>
                  <p className="leading-relaxed">
                    Automated CAD pattern digitization supporting US, UK, European, and Asian size grading specs with millimeter seam tolerances.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-blue" />
                    <span>High-Speed Production Lines</span>
                  </h5>
                  <p className="leading-relaxed">
                    Integrated flatlock, overlock, and automatic pocket-welding lines capable of delivering 15,000+ units per month with fast PPS turnarounds.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-blue" />
                    <span>Strict In-House Lab Testing</span>
                  </h5>
                  <p className="leading-relaxed">
                    Colorfastness to wash & light (Grade 4+), tensile pull tests on buttons/zippers, and 100% pre-packaging metal/needle detection.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "oem" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-gold" />
                    <span>Embroidery & Custom Printing</span>
                  </h5>
                  <p className="leading-relaxed">
                    Chenille patches, 3D puff embroidery, high-density silicone prints, discharge silkscreen, and DTG digital photo printing.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-gold" />
                    <span>Custom Brand Hardware</span>
                  </h5>
                  <p className="leading-relaxed">
                    Engraved brass snap buttons, customized zipper pullers, molded rubber chest crests, and debossed genuine leather patches.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-gold" />
                    <span>Retail Hangtags & Labels</span>
                  </h5>
                  <p className="leading-relaxed">
                    Woven damask main labels, satin care labels with multilingual compliance, FSC-certified kraft hangtags, and barcode stickers.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "packing" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <PackageCheck className="w-4 h-4 text-[#5ecba1]" />
                    <span>Export-Grade Polybagging</span>
                  </h5>
                  <p className="leading-relaxed">
                    Individual recyclable polybags with warning prints, branded zipper bags, silica gel moisture packets, and barcode stickers.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#5ecba1]" />
                    <span>5-Ply Corrugated Master Cartons</span>
                  </h5>
                  <p className="leading-relaxed">
                    Reinforced export shipping cartons, plastic strapping, waterproof tape sealing, and customer shipping mark printing.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#5ecba1]" />
                    <span>Global Port Coordination</span>
                  </h5>
                  <p className="leading-relaxed">
                    Direct customs clearance and bonded container dispatch from Xiamen port, Shenzhen port, or Hong Kong international hub.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Related Models from this Category */}
          {otherProducts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-widest text-brand-blue">
                    Complete Collection
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    More Styles in {catalog.title}
                  </h3>
                </div>
                <Link
                  href={`/products/${catalog.slug}`}
                  className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProducts.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-50 mb-3 border border-slate-100 flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-center font-bold text-slate-900 text-sm mb-1">
                        {item.modelNo}
                      </h4>
                      <p className="text-center text-xs text-slate-500 line-clamp-2 mb-3">
                        {item.description}
                      </p>
                    </div>

                    <Link
                      href={`/products/${catalog.slug}/${item.id}`}
                      className="w-full py-2 px-3 rounded-md font-semibold text-xs text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] transition-all flex items-center justify-center gap-1 cursor-pointer"
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

      {/* Global RFQ Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialCategory={`${catalog.title} - ${product.modelNo}`}
      />

      {/* Global Info Modal */}
      <InfoModal
        isOpen={infoModalType !== null}
        onClose={() => setInfoModalType(null)}
        type={infoModalType || "event"}
      />

      {/* Global Solid Footer */}
      <Footer />
    </div>
  );
}
