"use client";

import React from "react";
import { Calendar, Briefcase, MapPin, Mail, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface InfoModalProps {
  type: "event" | "career" | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote?: () => void;
}

export default function InfoModal({
  type,
  isOpen,
  onClose,
  onOpenQuote,
}: InfoModalProps) {
  if (!isOpen || !type) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-deep-blue border-deep-blue-border p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="h-1.5 bg-gradient-to-r from-deep-blue via-brand-blue to-gold" />

        {type === "event" ? (
          <div>
            <DialogHeader className="p-6 sm:p-8 border-b border-deep-blue-border">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-widest text-brand-blue mb-1">
                <Calendar className="w-4 h-4 text-brand-blue" />
                <span>Trade Expos & Global Summits 2026</span>
              </div>
              <DialogTitle className="text-2xl font-bold text-white font-display">
                Maya Exports International Events Calendar
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-light">
                Meet our senior executive team, view fabric swatches, and reserve production capacity face-to-face.
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="p-4 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white uppercase tracking-wider font-display">
                    Autumn Canton Fair · Phase 3 (Apparel & Textiles)
                  </span>
                  <span className="text-brand-blue font-mono font-medium">Oct 31 – Nov 4, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-light">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>China Import and Export Fair Complex, Guangzhou · Booth 4.2E18</span>
                </div>
                <p className="text-xs text-slate-muted leading-relaxed">
                  Featuring our Spring/Summer 2027 tailored woven collections, luxury cashmere knitwear, and GOTS-certified sustainable apparel lines.
                </p>
              </div>

              <div className="p-4 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white uppercase tracking-wider font-display">
                    Première Vision Paris · Manufacturing Hall
                  </span>
                  <span className="text-brand-blue font-mono font-medium">July 2 – 4, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-light">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>Paris Nord Villepinte, France · Hall 6 Stand M24</span>
                </div>
                <p className="text-xs text-slate-muted leading-relaxed">
                  Exclusive European buyer showcase focusing on circular textiles, CSDDD compliance traceability, and eco-wash denim innovations.
                </p>
              </div>

              <div className="p-4 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white uppercase tracking-wider font-display">
                    Sourcing at MAGIC Las Vegas
                  </span>
                  <span className="text-brand-blue font-mono font-medium">August 18 – 20, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-light">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>Las Vegas Convention Center, USA · International Sourcing Pavilion</span>
                </div>
                <p className="text-xs text-slate-muted leading-relaxed">
                  Direct North American retail buyer sessions, outerwear capacity bookings, and rapid-sampling commitments.
                </p>
              </div>

              <div className="pt-4 border-t border-deep-blue-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-light">
                  Require an VIP booth meeting invitation?
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenQuote?.();
                  }}
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-sm flex items-center gap-2"
                >
                  <span>Book Meeting</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <DialogHeader className="p-6 sm:p-8 border-b border-deep-blue-border">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-widest text-brand-blue mb-1">
                <Briefcase className="w-4 h-4 text-brand-blue" />
                <span>Careers at Maya Exports Ltd</span>
              </div>
              <DialogTitle className="text-2xl font-bold text-white font-display">
                Shape the Future of Global Apparel Manufacturing
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-light">
                Join our international merchandising, quality engineering, and supply chain teams in Ningbo, Shanghai, and London.
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="p-4 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white font-display uppercase tracking-wider">
                    Senior Garment Merchandiser (UK & EU Accounts)
                  </span>
                  <span className="text-gold font-mono text-[11px]">Full-Time · Ningbo / Remote</span>
                </div>
                <p className="text-xs text-slate-light leading-relaxed">
                  Lead critical path coordination for major European department retail accounts. Minimum 5 years of export garment experience and fluent English required.
                </p>
              </div>

              <div className="p-4 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white font-display uppercase tracking-wider">
                    Textile Chemical & Sustainability Auditor
                  </span>
                  <span className="text-gold font-mono text-[11px]">Full-Time · Ningbo Testing Lab</span>
                </div>
                <p className="text-xs text-slate-light leading-relaxed">
                  Oversee ZDHC Level 3 chemical compliance, wastewater reclamation, and GOTS/GRS audit custody protocols across all manufacturing campuses.
                </p>
              </div>

              <div className="p-4 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white font-display uppercase tracking-wider">
                    International Trade Operations Director
                  </span>
                  <span className="text-gold font-mono text-[11px]">Full-Time · London Mayfair</span>
                </div>
                <p className="text-xs text-slate-light leading-relaxed">
                  Expand high-street and luxury fashion client partnerships across the United Kingdom, Nordics, and Benelux.
                </p>
              </div>

              <div className="pt-4 border-t border-deep-blue-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-light">
                  <Mail className="w-4 h-4 text-brand-blue" />
                  <span>Send resume/CV: <strong className="text-white">careers@mayaexports.com</strong></span>
                </div>
                <a
                  href="mailto:careers@mayaexports.com"
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-sm flex items-center gap-2"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
