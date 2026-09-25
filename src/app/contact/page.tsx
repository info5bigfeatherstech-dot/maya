"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";

export default function ContactPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Garments");

  // Form State
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

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
        <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 border-b border-deep-blue-border overflow-hidden">
          <div className="absolute inset-0 bg-grid-deep opacity-30 pointer-events-none" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-deep-blue-card border border-deep-blue-border text-[11px] font-semibold uppercase tracking-widest text-brand-blue mb-3.5">
                <Globe2 className="w-3.5 h-3.5 text-brand-blue" />
                <span>International Trade Desks · 24/7 Enterprise Response</span>
              </div> */}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight font-display mb-4">
                Connect With Maya Exports Limited.
              </h1>

              <p className="text-[12px] sm:text-sm text-slate-light leading-relaxed max-w-2xl">
                Direct access to our senior leadership and production directors in Shishi City, Fujian and our Hong Kong commercial office. Contact our team directly via Email, Telephone, or WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Direct Personnel Contact Cards */}
        <section className="py-12 sm:py-16 bg-deep-blue border-b border-deep-blue-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <span className="text-[11px] uppercase font-bold tracking-widest text-gold block mb-1">
                Direct Leadership Access
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Key Executives & Direct Representatives
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {directContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-sm bg-deep-blue-card border border-deep-blue-border hover:border-brand-blue/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/30">
                        {contact.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display mb-1">
                      {contact.name}
                    </h3>
                    <p className="text-[11px] text-slate-muted font-medium mb-5">
                      {contact.role}
                    </p>

                    <div className="space-y-3 border-t border-deep-blue-border/70 pt-4 text-xs">
                      {/* Email */}
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-slate-light hover:text-white transition-colors truncate font-mono text-[11px]"
                        >
                          {contact.email}
                        </a>
                      </div>

                      {/* WhatsApp */}
                      <div className="flex items-center gap-2.5">
                        <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                        <a
                          href={contact.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-300 hover:text-emerald-200 transition-colors font-mono text-[11px] font-medium"
                        >
                          WhatsApp: {contact.whatsapp}
                        </a>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-gold shrink-0" />
                        <a
                          href={contact.chinaPhoneUrl}
                          className="text-slate-light hover:text-white transition-colors font-mono text-[11px]"
                        >
                          Call: {contact.chinaPhone}
                        </a>
                      </div>

                      {/* Optional HK phone */}
                      {contact.hkPhone && (
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-4 h-4 text-brand-blue shrink-0" />
                          <a
                            href={contact.hkPhoneUrl}
                            className="text-slate-light hover:text-white transition-colors font-mono text-[11px]"
                          >
                            HK Direct: {contact.hkPhone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <div className="pt-6 mt-4 border-t border-deep-blue-border/50">
                    <a
                      href={contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-sm bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
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

                {/* Official Web Link */}
                {/* <div className="p-4 rounded-sm bg-pearl-card border border-pearl-gray flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-deep-blue block">Official Portal Contact</span>
                    <span className="text-[10px] text-slate-muted">Direct online inquiry platform</span>
                  </div>
                  <a
                    href="https://mayaexportsltd.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-hover transition-colors"
                  >
                    <span>mayaexportsltd.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div> */}
              </div>

              {/* Right Column: Direct Message / RFQ Form */}
              <div className="lg:col-span-7 bg-white border border-pearl-gray rounded-sm p-6 sm:p-10 shadow-sm">
                <div className="mb-6 pb-4 border-b border-pearl-gray">
                  <h3 className="text-xl font-bold text-deep-blue font-display">
                    Send an Inquiry to Our Export Desks
                  </h3>
                  <p className="text-xs text-slate-body mt-1">
                    Your inquiry is routed directly to the designated regional director. NDA executed prior to tech pack review.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-deep-blue font-display">
                      Inquiry Dispatched Successfully
                    </h4>
                    <p className="text-xs text-slate-body max-w-md mx-auto">
                      Thank you. Your message has been routed to Mr. Mike and Ms. Jenny. You will receive an email confirmation and direct response within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-brand-blue border border-brand-blue rounded-sm hover:bg-brand-blue hover:text-white transition-colors"
                    >
                      Send Another Message
                    </button>
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
                        <span>Confidential Enterprise NDA executed prior to sample review</span>
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
