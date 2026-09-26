"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import InfoModal from "@/components/InfoModal";
import SmoothScroll from "@/components/SmoothScroll";
import { jobOpenings, JobOpening, culturePillars } from "@/data/careersData";
import {
  Briefcase,
  MapPin,
  Sparkles,
  CheckCircle2,
  Users,
  Send,
  ArrowRight,
  TrendingUp,
  Globe2,
  Building2,
  HeartHandshake,
  Mail,
  Phone,
  FileText,
  ChevronDown,
  Layers,
} from "lucide-react";

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "Senior Garment & Footwear Merchandiser",
    portfolioUrl: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSectionRef = useRef<HTMLDivElement>(null);

  const handleApplyClick = (job: JobOpening) => {
    setSelectedJob(job);
    setFormData((prev) => ({
      ...prev,
      position: job.title,
      message: `I am writing to express my strong interest in the ${job.title} role (${job.department}) at Maya Exports Ltd.`,
    }));

    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-deep-blue text-slate-100 overflow-x-hidden selection:bg-brand-blue/30 selection:text-white">
        {/* Navigation */}
        <Navbar
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onOpenInfoModal={(type) => setInfoModalType(type)}
        />

        {/* 1. Hero Header */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-deep-blue-border overflow-hidden">
          <div className="absolute inset-0 bg-grid-deep opacity-35 pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-deep-blue-card border border-deep-blue-border text-[11px] font-semibold uppercase tracking-widest text-gold mb-4">
                <Briefcase className="w-3.5 h-3.5 text-gold" />
                <span>Careers at Maya Exports Ltd. · We Are Hiring Worldwide</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-display mb-6">
                Grow with a Global Leader in <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-sky-300 to-gold">
                  Fashion & Garment Export
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-light leading-relaxed max-w-3xl mx-auto mb-4 font-medium">
                We’re more than a workplace — We’re a family of Innovators, Creators, and Collaborators.
              </p>

              <p className="text-xs sm:text-sm text-slate-muted leading-relaxed max-w-2xl mx-auto mb-10">
                With a strong presence in the Global Fashion and Garment Export Industry, we are always on the lookout for passionate professionals ready to make an impact.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("openings");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto py-3 px-8 rounded-sm font-semibold text-xs uppercase tracking-wider text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>View Current Openings</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (formSectionRef.current) {
                      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full sm:w-auto py-3 px-8 rounded-sm font-semibold text-xs uppercase tracking-wider text-white bg-deep-blue-card hover:bg-deep-blue border border-deep-blue-border hover:border-brand-blue transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-brand-blue" />
                  <span>Send Direct Application</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Career Growth Visual & Team Culture Section */}
        <section className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Studio Photo */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md group">
                  <Image
                    src="/careers/careers-team-culture.jpg"
                    alt="Maya Exports Creative Fashion Design & Merchandising Studio"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-xs">
                    <span className="font-bold text-white block">Creative Design &amp; Merchandising Studio</span>
                    <span className="text-slate-300 text-[11px]">Collaborative swatch reviews and 3D CAD pattern digitization at Maya Exports Hub</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Life at Maya Exports */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-600 block mb-2">
                    Our Culture &amp; Work Environment
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-display">
                    Where Creative Ambition Meets Global Scale
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  At Maya Exports Ltd., you are never just a cog in the wheel. Whether working on outerwear silhouettes for top US department stores, engineering ergonomic athletic footwear, or coordinating international ocean cargo from Xiamen Port — every role has direct visibility, accountability, and high-growth potential.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-blue-400 hover:bg-white hover:shadow-md transition-all space-y-1.5 group/card">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Globe2 className="w-4 h-4" />
                      <h4 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider group-hover/card:text-blue-600 transition-colors">
                        Global Footprint
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Cross-border coordination with offices in Shishi City (Fujian), Hong Kong, and international retail clients.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-amber-400 hover:bg-white hover:shadow-md transition-all space-y-1.5 group/card">
                    <div className="flex items-center gap-2 text-amber-600">
                      <TrendingUp className="w-4 h-4" />
                      <h4 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider group-hover/card:text-amber-600 transition-colors">
                        Merit-Based Growth
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Fast-track promotion pathways and leadership responsibilities based on performance and creative impact.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-emerald-500 hover:bg-white hover:shadow-md transition-all space-y-1.5 group/card">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Building2 className="w-4 h-4" />
                      <h4 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider group-hover/card:text-emerald-600 transition-colors">
                        Modern Tech Stack
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Automated pattern grading, 3D CLO visualization, computerized cutting, and in-house photo cycloramas.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-teal-500 hover:bg-white hover:shadow-md transition-all space-y-1.5 group/card">
                    <div className="flex items-center gap-2 text-teal-600">
                      <HeartHandshake className="w-4 h-4" />
                      <h4 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider group-hover/card:text-teal-600 transition-colors">
                        Family Culture
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Comprehensive health support, continuous mentorship from senior directors, and team celebrations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Current Openings Section: Displayed one by one with complete details */}
        <section id="openings" className="py-16 sm:py-24 bg-offwhite text-deep-blue border-b border-pearl-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-[11px] uppercase font-bold tracking-widest text-brand-blue block mb-1">
                Active Recruitment ({jobOpenings.length} Positions Available)
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-deep-blue font-display">
                Current Openings & Role Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-body mt-2 leading-relaxed">
                Review our open roles across all departments below. Each position includes daily operational responsibilities and candidate qualifications. Click any role to submit your application directly.
              </p>
            </div>

            {/* Job Openings: Displayed one by one with complete details */}
            <div className="space-y-8 mb-16">
              {jobOpenings.map((job, idx) => (
                <div
                  key={job.id}
                  id={job.id}
                  className="bg-white rounded-xl border border-pearl-gray shadow-xs hover:shadow-lg transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-pearl-gray mb-6">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded bg-deep-blue text-white text-[11px] font-mono font-bold">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2.5 py-1 rounded border border-brand-blue/20">
                        {job.department}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {job.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold" />
                        <span className="font-medium text-slate-700">{job.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-deep-blue font-display group-hover:text-brand-blue transition-colors mb-2.5">
                      {job.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-body leading-relaxed max-w-4xl">
                      {job.shortDesc}
                    </p>
                  </div>

                  {/* Two-Column Details Breakdown: Responsibilities & Requirements */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-offwhite p-5 sm:p-6 rounded-lg border border-pearl-gray mb-6">
                    {/* Responsibilities */}
                    <div className="space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-deep-blue flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                        <span>Key Responsibilities & Operational Scope:</span>
                      </span>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-3 lg:border-l lg:border-pearl-gray lg:pl-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-deep-blue flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold shrink-0" />
                        <span>Candidate Requirements & Qualifications:</span>
                      </span>
                      <ul className="space-y-2">
                        {job.requirements.map((req, qIdx) => (
                          <li key={qIdx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Building2 className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Direct Factory Campus &bull; Professional Mentorship</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApplyClick(job)}
                      className="w-full sm:w-auto py-2.5 px-6 rounded font-semibold text-xs uppercase tracking-wider text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Click to apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Interactive Application Form */}
        {/* <section ref={formSectionRef} className="py-16 sm:py-20 bg-deep-blue border-b border-deep-blue-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-sm bg-deep-blue-card border border-deep-blue-border shadow-2xl">
              <div className="mb-8 pb-4 border-b border-deep-blue-border">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold block mb-1">
                  Online Talent Portal
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  Submit Your Career Application
                </h3>
                <p className="text-xs text-slate-light mt-1">
                  {selectedJob
                    ? `You are applying for: ${selectedJob.title} (${selectedJob.department})`
                    : "Fill out the form below and our recruitment coordinator will review your profile within 48 hours."}
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-[#5ecba1] border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-display">
                    Application Received Successfully!
                  </h4>
                  <p className="text-xs text-slate-light max-w-md mx-auto leading-relaxed">
                    Thank you for applying to join Maya Exports Ltd. Our HR and departmental heads will review your credentials and contact you directly via Email and WhatsApp.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-blue border border-brand-blue rounded-sm hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-white mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-3 py-2.5 rounded-sm border border-deep-blue-border bg-deep-blue text-white focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-white mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@domain.com"
                        className="w-full px-3 py-2.5 rounded-sm border border-deep-blue-border bg-deep-blue text-white focus:outline-none focus:border-brand-blue font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-white mb-1">
                        Telephone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+86 / +1 / +44 ..."
                        className="w-full px-3 py-2.5 rounded-sm border border-deep-blue-border bg-deep-blue text-white focus:outline-none focus:border-brand-blue font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-white mb-1">
                        Target Department / Role *
                      </label>
                      <select
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-sm border border-deep-blue-border bg-deep-blue text-white focus:outline-none focus:border-brand-blue"
                      >
                        {jobOpenings.map((job) => (
                          <option key={job.id} value={job.title} className="bg-deep-blue text-white">
                            {job.department} — {job.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-white mb-1">
                      LinkedIn Profile / Portfolio / Work Samples URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/... or online portfolio"
                      className="w-full px-3 py-2.5 rounded-sm border border-deep-blue-border bg-deep-blue text-white focus:outline-none focus:border-brand-blue font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-white mb-1">
                      Cover Note / Summary of Experience *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly highlight your past export apparel/footwear experience, key skills, and why you want to join Maya Exports Ltd..."
                      className="w-full px-3 py-2.5 rounded-sm border border-deep-blue-border bg-deep-blue text-white focus:outline-none focus:border-brand-blue resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-[11px] text-slate-muted flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Direct resume copies can also be emailed to careers@mayaexportsltd.com</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto py-3 px-8 rounded-sm font-semibold text-xs uppercase tracking-wider text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section> */}

        {/* 5. General Application Banner ("Don’t see a position that fits? We still want to hear from you!") */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-deep-blue-dark via-deep-blue to-deep-blue-card border-b border-deep-blue-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-[11px] uppercase font-bold tracking-widest text-gold block">
              Spontaneous Applications
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display">
              Don’t see a position that fits? We still want to hear from you!
            </h2>

            <p className="text-xs sm:text-sm text-slate-light max-w-2xl mx-auto leading-relaxed">
              We are constantly expanding our global manufacturing operations, creative teams, and regional sales desks. Send us your CV and an introduction to be kept in our priority talent network.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:careers@mayaexportsltd.com?subject=Spontaneous%20Application%20-%20Maya%20Exports%20Ltd"
                className="w-full sm:w-auto py-3.5 px-8 rounded-sm font-semibold text-xs uppercase tracking-wider text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 text-center"
              >
                <Mail className="w-4 h-4" />
                <span>Email CV to careers@mayaexportsltd.com</span>
              </a>

              <a
                href="https://wa.me/8613506082198?text=Hello%20Maya%20Exports%20HR,%20I%20would%20like%20to%20inquire%20about%20career%20opportunities%20at%20Maya%20Exports."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-8 rounded-sm font-semibold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all shadow-md flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-4 h-4 text-[#5ecba1]" />
                <span>HR WhatsApp Desk: +86-13506082198</span>
              </a>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />

        {/* Global Modals */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
        />

        <InfoModal
          isOpen={infoModalType !== null}
          onClose={() => setInfoModalType(null)}
          type={infoModalType || "event"}
        />
      </main>
    </SmoothScroll>
  );
}
