"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactCTAProps {
  onOpenQuoteModal?: () => void;
}

export default function ContactCTA({ onOpenQuoteModal }: ContactCTAProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    category: "Tailored Woven Apparel",
    message: "",
  });

  const TARGET_EMAIL = "sophie_maya86@yahoo.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    const subject = encodeURIComponent(
      `B2B Enterprise Inquiry: ${formData.company ? `${formData.company} (${formData.name})` : formData.name} - Maya Exports Ltd`
    );
    const body = encodeURIComponent(
      `Dear Ms. Sophie & Maya Exports Merchandising Team,

Please review our B2B manufacturing inquiry:
• Full Name: ${formData.name}
• Company / Brand: ${formData.company}
• Contact Email: ${formData.email}
• Target Volume / Category: ${formData.category}

PROJECT SPECIFICATIONS:
${formData.message}

Sent via Maya Exports Ltd Portal (mayaexportsltd.com)
Direct Recipient: ${TARGET_EMAIL}`
    );

    try {
      window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
    } catch {}
  };

  return (
    <section
      id="contact"
      className="bg-white text-deep-blue py-16 sm:py-20 lg:py-24 relative overflow-hidden border-t border-pearl-gray"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-pearl-gray border border-pearl-gray text-[11px] font-semibold uppercase tracking-widest text-deep-blue mb-3">
            Maya Exports Ltd — Fashion Inquiries
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-deep-blue leading-tight font-display">
            Let&apos;s Build Your Next Global Collection.
          </h2>

          <p className="text-slate-body mt-3 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Direct access to dedicated export directors in London, New York, and Ningbo. Confidential
            non-disclosure agreements executed prior to tech pack review.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
            {/* Primary CTA = Brand Blue fill */}
            <button
              onClick={onOpenQuoteModal}
              className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold px-6 py-3 rounded-sm text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-brand-blue/30 hover:-translate-y-0.5"
            >
              <span>Launch Comprehensive RFQ</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </button>

            {/* Secondary CTA = Transparent with pearl border */}
            <a
              href="mailto:inquiry@mayaexports.com"
              className="px-5 py-3 rounded-sm border border-pearl-gray bg-white hover:bg-pearl-gray/50 text-deep-blue text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-xs"
            >
              <Mail className="w-3.5 h-3.5 text-brand-blue" />
              <span>inquiry@mayaexports.com</span>
            </a>
          </div>
        </div>

        {/* Quick Enterprise RFQ Card with shadcn Select */}
        <div className="max-w-3xl mx-auto bg-white border border-pearl-gray rounded-sm p-6 sm:p-10 shadow-xl">
          {formSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-brand-blue/10 border border-brand-blue text-brand-blue flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-deep-blue font-display">
                Inquiry Successfully Logged
              </h3>
              <p className="text-sm text-slate-body max-w-md mx-auto">
                Our Senior Export Director has received your specifications. A formal capacity
                allocation assessment and preliminary quotation will be dispatched within 24 business hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 text-xs uppercase tracking-wider text-brand-blue underline underline-offset-4"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-pearl-gray">
                <h3 className="text-lg font-bold text-deep-blue font-display">
                  Direct Factory Inquiry Form
                </h3>
                <span className="text-[11px] text-brand-blue uppercase font-semibold tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Guaranteed &lt; 24h Response</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-body mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-offwhite border border-pearl-gray rounded-sm px-3.5 py-2.5 text-sm text-deep-blue placeholder-slate-muted focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-body mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sourcing@brandretail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-offwhite border border-pearl-gray rounded-sm px-3.5 py-2.5 text-sm text-deep-blue placeholder-slate-muted focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-body mb-1.5">
                    Company / Retail Brand *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. European Retail Group"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-offwhite border border-pearl-gray rounded-sm px-3.5 py-2.5 text-sm text-deep-blue placeholder-slate-muted focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                  />
                </div>

                {/* shadcn Select for Product Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-body mb-1.5">
                    Target Product Category
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                  >
                    <SelectTrigger className="w-full bg-offwhite border-pearl-gray text-deep-blue">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tailored Woven Apparel">Tailored Woven Apparel</SelectItem>
                      <SelectItem value="Fine-Gauge & Luxury Knitwear">Fine-Gauge & Luxury Knitwear</SelectItem>
                      <SelectItem value="Technical Outerwear & Down">Technical Outerwear & Down</SelectItem>
                      <SelectItem value="Contemporary Denim & Washes">Contemporary Denim & Washes</SelectItem>
                      <SelectItem value="Performance & Athleisure">Performance & Athleisure</SelectItem>
                      <SelectItem value="Hospitality & Premium Linens">Hospitality & Premium Linens</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-body mb-1.5">
                  Target Production Volume & Specifications
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline your target volume, delivery timeline (e.g. Fall/Winter 2026), fabric blend preferences or tech pack details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-offwhite border border-pearl-gray rounded-sm p-3 text-sm text-deep-blue placeholder-slate-muted focus:outline-none focus:border-brand-blue focus:bg-white transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-body">
                  <ShieldCheck className="w-4 h-4 text-brand-blue" />
                  <span>Confidential NDA & Intellectual Property Protected</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold px-8 py-3 rounded-sm text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Global Trade Desks Contact Row */}
        <div className="mt-16 pt-8 border-t border-pearl-gray grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-slate-body">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-deep-blue uppercase tracking-wider font-display">
              Ningbo Manufacturing HQ
            </span>
            <span className="mt-1 text-slate-muted">+86 (574) 8790-2888 · GMT+8</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-semibold text-deep-blue uppercase tracking-wider font-display">
              London European Liaison Desk
            </span>
            <span className="mt-1 text-slate-muted">+44 20 7946 0912 · GMT+0</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-semibold text-deep-blue uppercase tracking-wider font-display">
              New York Americas Trade Office
            </span>
            <span className="mt-1 text-slate-muted">+1 (212) 555-0198 · EST</span>
          </div>
        </div>
      </div>
    </section>
  );
}
