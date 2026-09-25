"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, CheckCircle2, FileCheck2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const certList = [
    {
      code: "ISO 9001:2015",
      name: "Quality Management System",
      body: "Bureau Veritas UKAS Accredited",
      scope: "Full manufacturing cycle from spinning to packaging",
      status: "Active · Annual Audit Rating 100%",
      tooltipText: "Direct audit certificate #BV-CN-94021. Covers all 44 automated sewing lines and in-house CNAS laboratory.",
    },
    {
      code: "BSCI Grade-A",
      name: "Business Social Compliance Initiative",
      body: "amfori Global Social Auditing",
      scope: "Fair remuneration, workplace safety & ethical labor",
      status: "Grade A Rating · Unannounced Audit Verified",
      tooltipText: "Highest tier social compliance ranking. Zero child labor, fair working hours, and medical coverage verified.",
    },
    {
      code: "OEKO-TEX® 100",
      name: "Standard 100 Class I & II",
      body: "TESTEX AG Swiss Textile Testing",
      scope: "Zero harmful azo dyes, phthalates, or heavy metals",
      status: "Certified Safe for Baby & Sensitive Skin",
      tooltipText: "Tested against 300+ regulated harmful chemical compounds. Safe for direct skin contact and babywear.",
    },
    {
      code: "SEDEX SMETA 4-Pillar",
      name: "Sedex Members Ethical Trade Audit",
      body: "SGS International Inspection",
      scope: "Labor standards, health & safety, environment & business ethics",
      status: "Zero Non-Conformance Issues",
      tooltipText: "Full 4-Pillar SMETA protocol audited by SGS. Audit dossiers directly accessible via Sedex portal ID #S-48912.",
    },
    {
      code: "WRAP Platinum",
      name: "Worldwide Responsible Accredited Production",
      body: "WRAP Independent Board",
      scope: "Lawful, humane, and ethical apparel manufacturing",
      status: "Platinum Level 3-Year Continuous Award",
      tooltipText: "Top accreditation level awarded only to facilities demonstrating 3 consecutive years of 100% compliance.",
    },
    {
      code: "GOTS Version 7.0",
      name: "Global Organic Textile Standard",
      body: "Control Union Certifications",
      scope: "Certified organic fibers, chemical inputs and wastewater processing",
      status: "Full Custody Organic License CU-847291",
      tooltipText: "Transaction certificates (TC) issued for every GOTS organic lot with full farm-to-hanger traceability.",
    },
    {
      code: "HIGG INDEX",
      name: "FEM & FSLM Verified Modules",
      body: "Sustainable Apparel Coalition",
      scope: "Carbon footprint, environmental management & social labor score",
      status: "FEM Score 86.4 · Top Decile in Sector",
      tooltipText: "Higg Facility Environmental Module (FEM) and Facility Social & Labor Module (FSLM) publicly posted.",
    },
    {
      code: "GRS Version 4.0",
      name: "Global Recycled Standard",
      body: "Intertek Certification Group",
      scope: "Recycled polyester & regenerated yarn chain of custody",
      status: "Post-Consumer PET Recycled Traced",
      tooltipText: "Full chain-of-custody verification for 100% recycled PET and post-consumer textile waste.",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          opacity: 0,
          y: 25,
          stagger: 0.08,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <TooltipProvider delayDuration={200}>
      <section
        id="certifications"
        ref={sectionRef}
        className="bg-offwhite text-deep-blue py-16 sm:py-20 lg:py-24 relative border-t border-pearl-gray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-pearl-gray">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-pearl-gray border border-pearl-gray text-[11px] font-semibold uppercase tracking-widest text-deep-blue mb-2.5">
                <FileCheck2 className="w-3.5 h-3.5 text-brand-blue" />
                <span>International Compliance & Verification</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep-blue font-display">
                Enterprise Certifications & Audit Accreditations.
              </h2>
            </div>
            <p className="text-slate-body max-w-md text-xs sm:text-sm leading-relaxed">
              Full compliance dossiers available immediately upon signing mutual NDA. Verified by SGS,
              Intertek, Control Union, and Bureau Veritas for seamless enterprise onboarding.
            </p>
          </div>

          {/* Certifications Grid with shadcn Tooltips */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {certList.map((cert, idx) => (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <div className="group bg-white border border-pearl-gray p-6 rounded-sm shadow-sm hover:shadow-xl hover:border-brand-blue/70 transition-all duration-300 flex flex-col justify-between cursor-pointer">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-sm bg-pearl-gray border border-pearl-gray flex items-center justify-center text-slate-muted group-hover:bg-deep-blue group-hover:text-brand-blue transition-colors">
                          <Award className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono uppercase bg-pearl-gray text-slate-body px-2 py-0.5 rounded font-semibold group-hover:bg-brand-blue/15 group-hover:text-brand-blue transition-colors">
                            {cert.code.split(" ")[0]}
                          </span>
                          <Info className="w-3.5 h-3.5 text-slate-muted opacity-60 group-hover:opacity-100 group-hover:text-brand-blue transition-opacity" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-deep-blue font-display mb-1 group-hover:text-brand-blue transition-colors">
                        {cert.code}
                      </h3>
                      <p className="text-xs font-semibold text-slate-body mb-3">
                        {cert.name}
                      </p>
                      <p className="text-[11px] text-slate-muted leading-relaxed mb-4">
                        {cert.scope}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-pearl-gray">
                      <span className="text-[10px] font-medium text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{cert.status}</span>
                      </span>
                      <span className="text-[10px] text-slate-muted block mt-1 font-mono">
                        {cert.body}
                      </span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-3 bg-deep-blue border-deep-blue-border text-white text-xs leading-relaxed shadow-2xl">
                  <p className="font-semibold text-brand-blue mb-1 font-display">{cert.code} Verification Details</p>
                  <p className="text-slate-light">{cert.tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
