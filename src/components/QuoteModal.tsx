"use client";

import React, { useState } from "react";
import { Send, ShieldCheck, CheckCircle2 } from "lucide-react";
import MayaLogo from "./MayaLogo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export default function QuoteModal({
  isOpen,
  onClose,
  initialCategory = "Garments",
}: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "United Kingdom",
    category: initialCategory,
    quantity: "10,000 - 25,000 pcs",
    targetPort: "Port of Southampton / London Gateway",
    timeline: "Q3 2026",
    notes: "",
  });

  const TARGET_EMAIL = "sophie_maya86@yahoo.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(
      `B2B RFQ Specification Dossier: ${formData.company ? `${formData.company} (${formData.name})` : formData.name} - ${formData.category}`
    );
    const body = encodeURIComponent(
      `Dear Ms. Sophie & Maya Exports Merchandising Team,

Please review our official RFQ capacity and quotation request:
• Client Name: ${formData.name}
• Company / Brand: ${formData.company}
• Contact Email: ${formData.email}
• Destination Country: ${formData.country}
• Product Category: ${formData.category}
• Target Quantity: ${formData.quantity}
• Target Port of Discharge: ${formData.targetPort}
• Required Delivery Timeline: ${formData.timeline}

SPECIFICATIONS & TECH PACK NOTES:
${formData.notes || "Standard OEM/ODM export specifications apply."}

Sent via Maya Exports Ltd RFQ Desk (mayaexportsltd.com)
Direct Recipient: ${TARGET_EMAIL}`
    );

    try {
      window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
    } catch {}
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-deep-blue border-deep-blue-border p-0 overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Top Accent Strip with Brand Blue & Gold */}
        <div className="h-1.5 bg-gradient-to-r from-deep-blue via-brand-blue to-gold" />

        {/* Modal Header using shadcn DialogHeader */}
        <DialogHeader className="p-6 sm:p-8 border-b border-deep-blue-border">
          <div className="flex items-center gap-2 mb-2">
            <MayaLogo size="sm" variant="dark" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white font-display">
            Request Production Capacity & Quotation
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-light">
            Direct factory communication. Strict mutual non-disclosure agreement applied.
          </DialogDescription>
        </DialogHeader>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-blue/20 border border-brand-blue text-brand-blue flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white font-display">
                Specification Dossier Received
              </h4>
              <p className="text-sm text-slate-light max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Maya Exports Ltd export desk has logged your request for{" "}
                <span className="text-brand-blue font-semibold">{formData.category}</span>.
                A formal OEM/ODM feasibility review, capacity slot proposal, and quotation will be
                returned to <span className="text-white underline">{formData.email}</span> within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-light mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thomas Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-deep-blue-card border border-deep-blue-border rounded-sm px-3 py-2 text-sm text-white placeholder-slate-muted focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-light mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sourcing@retailer.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-deep-blue-card border border-deep-blue-border rounded-sm px-3 py-2 text-sm text-white placeholder-slate-muted focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-light mb-1">
                    Company / Brand *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. British Highland Apparel"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-deep-blue-card border border-deep-blue-border rounded-sm px-3 py-2 text-sm text-white placeholder-slate-muted focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-light mb-1">
                    Buyer Country / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. United Kingdom, Germany, USA, Australia"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-deep-blue-card border border-deep-blue-border rounded-sm px-3 py-2 text-sm text-white placeholder-slate-muted focus:outline-none focus:border-brand-blue"
                  />
                </div>

                {/* shadcn Select for Product Category */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-light mb-1">
                    Product Category
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => setFormData({ ...formData, category: val })}
                  >
                    <SelectTrigger className="w-full bg-deep-blue-card border-deep-blue-border">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Garments">Garments</SelectItem>
                      <SelectItem value="Footwear">Footwear</SelectItem>
                      <SelectItem value="Home Textiles">Home Textiles</SelectItem>
                      <SelectItem value="Fabrics">Fabrics</SelectItem>
                      <SelectItem value="Electronics & Appliances">Electronics & Appliances</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* shadcn Select for Target Volume */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-light mb-1">
                    Target Volume
                  </label>
                  <Select
                    value={formData.quantity}
                    onValueChange={(val) => setFormData({ ...formData, quantity: val })}
                  >
                    <SelectTrigger className="w-full bg-deep-blue-card border-deep-blue-border">
                      <SelectValue placeholder="Select Volume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1,000 - 5,000 pcs">1,000 - 5,000 pcs (Capsule Order)</SelectItem>
                      <SelectItem value="5,000 - 15,000 pcs">5,000 - 15,000 pcs (Standard)</SelectItem>
                      <SelectItem value="15,000 - 50,000 pcs">15,000 - 50,000 pcs (Seasonal)</SelectItem>
                      <SelectItem value="50,000 - 100,000+ pcs">50,000 - 100,000+ pcs (Enterprise)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-light mb-1">
                    Target Discharge Port
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Southampton, Rotterdam, LA / Long Beach"
                    value={formData.targetPort}
                    onChange={(e) => setFormData({ ...formData, targetPort: e.target.value })}
                    className="w-full bg-deep-blue-card border border-deep-blue-border rounded-sm px-3 py-2 text-sm text-white placeholder-slate-muted focus:outline-none focus:border-brand-blue"
                  />
                </div>

                {/* shadcn Select for Target Delivery Season */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-light mb-1">
                    Target Delivery Season
                  </label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(val) => setFormData({ ...formData, timeline: val })}
                  >
                    <SelectTrigger className="w-full bg-deep-blue-card border-deep-blue-border">
                      <SelectValue placeholder="Select Season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Q3 2026">Q3 2026 (Autumn Delivery)</SelectItem>
                      <SelectItem value="Q4 2026">Q4 2026 (Holiday / Winter)</SelectItem>
                      <SelectItem value="Q1 2027">Q1 2027 (Spring / Pre-Summer)</SelectItem>
                      <SelectItem value="Q2 2027">Q2 2027 (Summer Collection)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-light mb-1">
                  Tech Pack & Material Specifications
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline tech pack summary, fabric compositions (e.g. 100% GOTS organic cotton, merino blend), required certifications, or private label packaging..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-deep-blue-card border border-deep-blue-border rounded-sm p-3 text-sm text-white placeholder-slate-muted focus:outline-none focus:border-brand-blue resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-deep-blue-border">
                <div className="flex items-center gap-2 text-[11px] text-slate-light">
                  <ShieldCheck className="w-4 h-4 text-brand-blue" />
                  <span>Strict NDA executed prior to tech pack review.</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-sm text-xs font-semibold text-slate-light hover:text-white uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <span>Transmit RFQ</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
