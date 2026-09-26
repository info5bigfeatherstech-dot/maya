"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import InfoModal from "@/components/InfoModal";
import SmoothScroll from "@/components/SmoothScroll";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Printer,
  MessageSquare,
  ShieldCheck,
  Send,
  Building2,
  Globe2,
  CheckCircle2,
  ExternalLink,
  ArrowUpRight,
  PackageCheck,
  Tag,
  Users,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";

function ContactFormSection() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const categoryParam = searchParams.get("category");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    destination: "United Kingdom",
    productInterest: "Garments",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (productParam) {
      const isFootwear =
        categoryParam?.toLowerCase().includes("shoe") ||
        categoryParam?.toLowerCase().includes("footwear") ||
        categoryParam?.toLowerCase().includes("sandals") ||
        productParam.toLowerCase().includes("mf-");

      setFormData((prev) => ({
        ...prev,
        productInterest: isFootwear ? "Footwear" : "Garments",
        message: prev.message
          ? prev.message
          : `Inquiry regarding ${productParam} (${categoryParam || "Export Catalog"}) for OEM/ODM bulk manufacturing. Please provide FOB export quotations, sample PPS timelines, and MOQ details.`,
      }));
    }
  }, [productParam, categoryParam]);

  const [copied, setCopied] = useState(false);
  const TARGET_EMAIL = "sophie_maya86@yahoo.com";

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(
      `B2B Sourcing Inquiry: ${formData.company ? `${formData.company} (${formData.name})` : formData.name} - Maya Exports Ltd`
    );
    const body = encodeURIComponent(
      `Dear Ms. Sophie & Maya Exports Merchandising Team,

Please review our B2B manufacturing and production inquiry:

===========================================
CLIENT & SOURCING INFORMATION
===========================================
• Full Name: ${formData.name}
• Company / Brand: ${formData.company}
• Contact Email: ${formData.email}
• Telephone / WhatsApp: ${formData.phone || "Not specified"}
• Target Destination: ${formData.destination}
• Product Interest: ${formData.productInterest}
${productParam ? `• Specific Target Style/Product: ${productParam}${categoryParam ? ` (${categoryParam})` : ""}\n` : ""}
===========================================
INQUIRY SPECIFICATIONS & REQUIREMENTS
===========================================
${formData.message}

===========================================
Sent from Maya Exports Ltd Official Portal
Direct Recipient: ${TARGET_EMAIL}
===========================================`
    );
    return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const mailto = generateMailtoUrl();
    try {
      window.location.href = mailto;
    } catch {
      // In case browser policy suppresses automatic navigation
    }
  };

  return (
    <div className="lg:col-span-7 bg-white border border-pearl-gray rounded-sm p-6 sm:p-10 shadow-sm">
      <div className="mb-6 pb-4 border-b border-pearl-gray">
        <h3 className="text-xl font-bold text-deep-blue font-display">
          Send an Inquiry to Our Export Desks
        </h3>
        <p className="text-xs text-slate-body mt-1">
          Your inquiry is transmitted directly to Ms. Sophie (<a href={`mailto:${TARGET_EMAIL}`} className="text-brand-blue font-semibold hover:underline">{TARGET_EMAIL}</a>) at our Production Merchandising desk. NDA executed prior to tech pack review.
        </p>

        {productParam && (
          <div className="mt-4 p-3 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <PackageCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-semibold text-emerald-900">Inquiry Target: </span>
                <span className="font-mono font-bold text-emerald-800">{productParam}</span>
                {categoryParam && <span className="text-emerald-700"> &bull; {categoryParam}</span>}
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
              Attached to RFQ
            </span>
          </div>
        )}
      </div>

      {isSubmitted ? (
        <div className="py-6 space-y-5 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-xl font-bold text-deep-blue font-display">
              Inquiry Prepared for Direct Dispatch
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Your inquiry has been addressed directly to{" "}
              <a
                href={`mailto:${TARGET_EMAIL}`}
                className="font-bold text-brand-blue hover:underline"
              >
                {TARGET_EMAIL}
              </a>{" "}
              (Production Operations &amp; Client Sourcing Lead).
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={generateMailtoUrl()}
              className="w-full sm:w-auto px-6 py-3 rounded-sm bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Send via Email ({TARGET_EMAIL})</span>
            </a>

            <a
              href={`https://wa.me/8613859781105?text=${encodeURIComponent(
                `Hello Ms. Sophie, I have submitted an inquiry for ${formData.company || formData.name} regarding ${formData.productInterest}: "${formData.message.slice(0, 100)}..."`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Ms. Sophie (+86-13859781105)</span>
            </a>
          </div>

          {/* Form Summary Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left max-w-lg mx-auto text-xs space-y-2 mt-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Inquiry Summary
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Direct to {TARGET_EMAIL}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-slate-600 text-[11px]">
              <div><strong>Client:</strong> {formData.name}</div>
              <div><strong>Company:</strong> {formData.company}</div>
              <div><strong>Email:</strong> {formData.email}</div>
              <div><strong>Phone:</strong> {formData.phone || "—"}</div>
              <div><strong>Market:</strong> {formData.destination}</div>
              <div><strong>Category:</strong> {formData.productInterest}</div>
            </div>
            <div className="pt-2 border-t border-slate-200 text-slate-700">
              <strong className="block text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Details:</strong>
              <p className="line-clamp-3 text-slate-600 text-[11px] italic bg-white p-2 rounded border border-slate-100">
                &ldquo;{formData.message}&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(
                  `Inquiry from ${formData.name} (${formData.company})\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
                );
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              }}
              className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Details Copied!" : "Copy Details"}</span>
            </button>

            <span className="text-slate-300">&bull;</span>

            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  company: "",
                  email: "",
                  phone: "",
                  destination: "United Kingdom",
                  productInterest: "Garments",
                  message: "",
                });
              }}
              className="text-brand-blue hover:text-brand-blue-hover font-semibold transition-colors cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-deep-blue mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. David Harrison"
                className="w-full px-3 py-2.5 rounded-sm border border-pearl-gray bg-offwhite text-deep-blue focus:outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="block font-semibold text-deep-blue mb-1">
                Company / Brand *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Global Apparel Ltd"
                className="w-full px-3 py-2.5 rounded-sm border border-pearl-gray bg-offwhite text-deep-blue focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-deep-blue mb-1">
                Business Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="buyer@brand.com"
                className="w-full px-3 py-2.5 rounded-sm border border-pearl-gray bg-offwhite text-deep-blue focus:outline-none focus:border-brand-blue font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-deep-blue mb-1">
                WhatsApp / Telephone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 7911 123456"
                className="w-full px-3 py-2.5 rounded-sm border border-pearl-gray bg-offwhite text-deep-blue focus:outline-none focus:border-brand-blue font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-deep-blue mb-1">
                Target Export Destination
              </label>
              <select
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-3 py-2.5 rounded-sm border border-pearl-gray bg-offwhite text-deep-blue focus:outline-none focus:border-brand-blue"
              >
                <option value="United Kingdom">United Kingdom (Felixstowe / Southampton)</option>
                <option value="European Union">European Union (Rotterdam / Hamburg)</option>
                <option value="United States">United States (LA / NY / Savannah)</option>
                <option value="Canada">Canada (Vancouver / Montreal)</option>
                <option value="Middle East">Middle East & GCC (Jebel Ali)</option>
                <option value="Australia">Australia & NZ (Sydney / Melbourne)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-deep-blue mb-1">
                Primary Product Division
              </label>
              <select
                value={formData.productInterest}
                onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                className="w-full px-3 py-2.5 rounded-sm border border-pearl-gray bg-offwhite text-deep-blue focus:outline-none focus:border-brand-blue"
              >
                <option value="Garments">Garments</option>
                <option value="Footwear">Footwear</option>
                <option value="Home Textiles">Home Textiles</option>
                <option value="Fabrics">Fabrics</option>
                <option value="Electronics & Appliances">Electronics & Appliances</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-deep-blue mb-1">
              Inquiry Details / Project Specifications *
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Please include target quantities, fabrication requirements, delivery season, or store layout requirements..."
              className="w-full px-3 py-2.5 rounded-sm border border-pearl-gray bg-offwhite text-deep-blue focus:outline-none focus:border-brand-blue resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[11px] text-slate-muted">
              <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0" />
              <span>Confidential Enterprise NDA executed &bull; Direct to {TARGET_EMAIL}</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-sm bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-brand-blue/30 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Inquiry Direct</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Garments");

  const directContacts = [
    {
      name: "Mr. Mike (Sonu)",
      role: "Managing Director & Global Commercial Lead",
      email: "sonu@mayaexportsltd.com",
      whatsapp: "+86-13506082198",
      whatsappUrl: "https://wa.me/8613506082198",
      hkPhone: "+852-68580690",
      hkPhoneUrl: "tel:+85268580690",
      chinaPhone: "+86-13506082198",
      chinaPhoneUrl: "tel:+8613506082198",
      badge: "China & Hong Kong",
    },
    {
      name: "Ms. Jenny (Roshni)",
      role: "Key Accounts Director & Export Coordinator",
      email: "roshni@mayaexportsltd.com",
      whatsapp: "+86-13506082700",
      whatsappUrl: "https://wa.me/8613506082700",
      chinaPhone: "+86-13506082700",
      chinaPhoneUrl: "tel:+8613506082700",
      badge: "European & Americas Desk",
    },
    {
      name: "Ms. Sophie",
      role: "Production Operations & Client Sourcing Lead",
      email: "sophie_maya86@yahoo.com",
      whatsapp: "+86-13859781105",
      whatsappUrl: "https://wa.me/8613859781105",
      chinaPhone: "+86-13859781105",
      chinaPhoneUrl: "tel:+8613859781105",
      badge: "Production Merchandising",
    },
  ];

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-deep-blue text-slate-100 overflow-x-hidden selection:bg-brand-blue/30 selection:text-white">
        {/* Navigation */}
        <Navbar
          onOpenQuoteModal={(cat) => {
            if (cat) setSelectedCategory(cat);
            setIsQuoteModalOpen(true);
          }}
          onOpenInfoModal={(type) => setInfoModalType(type)}
        />

        {/* 1. Hero Header */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-[#061527] border-b border-deep-blue-border overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-grid-deep opacity-35 pointer-events-none" />

          {/* Glowing curved rings & subtle gradients matching mockup */}
          <div className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full border border-sky-500/15 pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-[500px] h-[500px] rounded-full border border-sky-400/20 pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              {/* Left Column: Heading & Subtitle */}
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight font-display mb-4">
                  Connect With <span className="text-[#00B4D8]">Maya Exports Limited.</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  Direct access to our senior leadership and production directors in Shishi City, Fujian and our Hong Kong commercial office. Contact our team directly via Email, Telephone, or WhatsApp.
                </p>
              </div>

              {/* Right Column: 3 Highlights (Direct Access, Global Offices, Quick Response) */}
              <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 shrink-0 lg:border-l lg:border-white/10 lg:pl-10">
                {/* 1. Direct Access */}
                <div className="flex flex-col items-start">
                  <div className="text-[#D4A54A] mb-2">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold text-xs sm:text-sm">Direct Access</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">
                    Senior leadership<br className="hidden sm:inline" /> &amp; production team
                  </p>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px h-10 bg-white/10" />

                {/* 2. Global Offices */}
                <div className="flex flex-col items-start">
                  <div className="text-[#D4A54A] mb-2">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold text-xs sm:text-sm">Global Offices</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">
                    China, Hong Kong<br className="hidden sm:inline" /> &amp; beyond
                  </p>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px h-10 bg-white/10" />

                {/* 3. Quick Response */}
                <div className="flex flex-col items-start">
                  <div className="text-[#D4A54A] mb-2">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold text-xs sm:text-sm">Quick Response</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">
                    Email, Telephone<br className="hidden sm:inline" /> or WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Direct Personnel Contact Cards */}
        <section className="py-14 sm:py-20 bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
          {/* Subtle Decorative Background Shapes & Dots */}
          <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 bg-sky-50 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-sky-100/60 rounded-full blur-xl pointer-events-none -z-0" />

          {/* Dot Matrix Decorative Patterns */}
          <div className="absolute bottom-10 left-6 pointer-events-none opacity-25 hidden sm:block -z-0">
            <svg width="90" height="90" fill="none" viewBox="0 0 90 90">
              <pattern id="dot-pattern-contact-bl" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="2" fill="#0284c7" />
              </pattern>
              <rect width="90" height="90" fill="url(#dot-pattern-contact-bl)" />
            </svg>
          </div>
          <div className="absolute top-10 right-12 pointer-events-none opacity-25 hidden sm:block -z-0">
            <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
              <pattern id="dot-pattern-contact-tr" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="1.5" r="1.5" fill="#0284c7" />
              </pattern>
              <rect width="80" height="80" fill="url(#dot-pattern-contact-tr)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            {/* Header with Title on Left and Description on Right */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-[#D4A54A]">
                    Direct Leadership Access
                  </span>
                  <span className="w-8 h-[2px] bg-[#D4A54A]" />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-display">
                  Key Executives &amp;{" "}
                  <span className="text-[#0088CC]">Direct Representatives</span>
                </h2>
              </div>

              <div className="lg:border-l lg:border-slate-200 lg:pl-8 max-w-md">
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Get in touch with our global team for business inquiries, partnerships, and export opportunities. Our team is here to assist you.
                </p>
              </div>
            </div>

            {/* 3 Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: Mr. Mike (Sonu) */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="inline-block bg-[#E0F2FE] text-[#0369A1] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                      China &amp; Hong Kong
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1">
                    Mr. Mike (Sonu)
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mb-6">
                    Managing Director &amp; Global Commercial Lead
                  </p>

                  <div className="space-y-3.5 text-xs">
                    {/* Email */}
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#0088CC] shrink-0" />
                      <a
                        href="mailto:sonu@mayaexportsltd.com"
                        className="text-slate-600 hover:text-blue-600 transition-colors truncate"
                      >
                        sonu@mayaexportsltd.com
                      </a>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      <a
                        href="https://wa.me/8613506082198"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-emerald-600 transition-colors"
                      >
                        WhatsApp: +86-13506082198
                      </a>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#D4A54A] shrink-0" />
                      <a
                        href="tel:+8613506082198"
                        className="text-slate-600 hover:text-amber-600 transition-colors"
                      >
                        Call: +86-13506082198
                      </a>
                    </div>

                    {/* HK Direct */}
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-[#0088CC] shrink-0" />
                      <a
                        href="tel:+85268580690"
                        className="text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        HK Direct: +852-68580690
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action Button - Solid Dark Blue */}
                <div className="mt-8">
                  <a
                    href="https://wa.me/8613506082198"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-lg bg-[#0B3B60] hover:bg-[#072a45] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: Ms. Jenny (Roshni) */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="inline-block bg-[#E0F2FE] text-[#0369A1] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                      European &amp; Americas Desk
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1">
                    Ms. Jenny (Roshni)
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mb-6">
                    Key Accounts Director &amp; Export Coordinator
                  </p>

                  <div className="space-y-3.5 text-xs">
                    {/* Email */}
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#0088CC] shrink-0" />
                      <a
                        href="mailto:roshni@mayaexportsltd.com"
                        className="text-slate-600 hover:text-blue-600 transition-colors truncate"
                      >
                        roshni@mayaexportsltd.com
                      </a>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      <a
                        href="https://wa.me/8613506082700"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-emerald-600 transition-colors"
                      >
                        WhatsApp: +86-13506082700
                      </a>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#D4A54A] shrink-0" />
                      <a
                        href="tel:+8613506082700"
                        className="text-slate-600 hover:text-amber-600 transition-colors"
                      >
                        Call: +86-13506082700
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action Button - Outline Blue */}
                <div className="mt-8">
                  <a
                    href="https://wa.me/8613506082700"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-lg border border-[#00B4D8] text-[#0284c7] hover:bg-sky-50 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#00B4D8]" />
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 3: Ms. Sophie */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="inline-block bg-[#E0F2FE] text-[#0369A1] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                      Production Merchandising
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1">
                    Ms. Sophie
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mb-6">
                    Production Operations &amp; Client Sourcing Lead
                  </p>

                  <div className="space-y-3.5 text-xs">
                    {/* Email */}
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#0088CC] shrink-0" />
                      <a
                        href="mailto:sophie_maya86@yahoo.com"
                        className="text-slate-600 hover:text-blue-600 transition-colors truncate"
                      >
                        sophie_maya86@yahoo.com
                      </a>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                      <a
                        href="https://wa.me/8613859781105"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-emerald-600 transition-colors"
                      >
                        WhatsApp: +86-13859781105
                      </a>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#D4A54A] shrink-0" />
                      <a
                        href="tel:+8613859781105"
                        className="text-slate-600 hover:text-amber-600 transition-colors"
                      >
                        Call: +86-13859781105
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action Button - Outline Blue */}
                <div className="mt-8">
                  <a
                    href="https://wa.me/8613859781105"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-lg border border-[#00B4D8] text-[#0284c7] hover:bg-sky-50 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#00B4D8]" />
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Office Locations & Inquiry Form Grid */}
        <section className="py-16 sm:py-20 bg-offwhite text-deep-blue border-b border-pearl-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Official Office Addresses */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-pearl-gray border border-pearl-gray text-[11px] font-semibold uppercase tracking-widest text-deep-blue mb-2.5">
                    <Building2 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Registered Facilities</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep-blue font-display">
                    Corporate & Regional Offices
                  </h2>
                  <p className="text-slate-body text-xs sm:text-sm mt-2 leading-relaxed">
                    Official coordinates for container inspections, client sampling visits, and courier shipments.
                  </p>
                </div>

                {/* China Head Office Card */}
                <div className="p-6 rounded-sm bg-white border border-pearl-gray shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-sm bg-pearl-gray flex items-center justify-center text-brand-blue">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-deep-blue font-display">
                        China Head Office & Operations (Fujian)
                      </h4>
                      <span className="text-[10px] text-slate-muted uppercase font-semibold">
                        Manufacturing & Logistics Hub
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-body leading-relaxed pl-10">
                    ROOM 2nd FLR, C# BLDG NO.17#, YINCHANG AREA, BEIHUAN LIANGSHI ROAD, SHISHI CITY, FUJIAN P.R. CHINA.
                  </p>

                  <div className="pl-10 pt-2 space-y-1 text-xs border-t border-pearl-gray text-slate-muted font-mono">
                    <p><strong className="text-deep-blue">Postal Code:</strong> 362700</p>
                    <p><strong className="text-deep-blue">Tel:</strong> +86-0595-88568700 / 88613700</p>
                    <p><strong className="text-deep-blue">Fax:</strong> +86-0595-88569700</p>
                  </div>
                </div>

                {/* Hong Kong Office Card */}
                <div className="p-6 rounded-sm bg-white border border-pearl-gray shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-sm bg-pearl-gray flex items-center justify-center text-gold">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-deep-blue font-display">
                        Hong Kong International Office
                      </h4>
                      <span className="text-[10px] text-slate-muted uppercase font-semibold">
                        Commercial Liaison & Finance
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-body leading-relaxed pl-10">
                    KENSINGTON PLAZA, 98 PARKES STREET, JORDAN, KOWLOON, HONG KONG.
                  </p>

                  <div className="pl-10 pt-2 space-y-1 text-xs border-t border-pearl-gray text-slate-muted font-mono">
                    <p><strong className="text-deep-blue">Representative:</strong> Mr. Mike (Sonu)</p>
                    <p><strong className="text-deep-blue">Email:</strong> sonu@mayaexportsltd.com</p>
                    <p><strong className="text-deep-blue">Direct Line:</strong> +852-68580690</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Direct Message / RFQ Form with Suspense for SearchParams */}
              <Suspense
                fallback={
                  <div className="lg:col-span-7 bg-white border border-pearl-gray rounded-sm p-10 flex items-center justify-center text-slate-400">
                    Loading inquiry desk...
                  </div>
                }
              >
                <ContactFormSection />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Modals */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          initialCategory={selectedCategory}
        />

        <InfoModal
          type={infoModalType}
          isOpen={infoModalType !== null}
          onClose={() => setInfoModalType(null)}
          onOpenQuote={() => setIsQuoteModalOpen(true)}
        />
      </main>
    </SmoothScroll>
  );
}
