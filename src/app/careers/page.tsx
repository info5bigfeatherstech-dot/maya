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
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "Merchandising",
    portfolioUrl: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSectionRef = useRef<HTMLDivElement>(null);

  const departments = [
    "All",
    "Merchandising",
    "Design & Product Development",
    "Quality Control",
    "Production Management",
    "Sales & Marketing",
    "Logistics & Supply Chain",
    "Graphic Designer / Photographer",
    "Product Modeling",
  ];

  const filteredJobs =
    selectedDepartment === "All"
      ? jobOpenings
      : jobOpenings.filter((j) => j.department === selectedDepartment);

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
        <section className="py-16 sm:py-24 bg-deep-blue border-b border-deep-blue-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              {/* Left Column: Studio Photo */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-deep-blue-dark border border-deep-blue-border shadow-2xl group">
                  <Image
                    src="/careers/careers-team-culture.jpg"
                    alt="Maya Exports Creative Fashion Design & Merchandising Studio"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-blue-dark/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-xs p-3 rounded border border-white/10 text-xs">
                    <span className="font-bold text-white block">Creative Design & Merchandising Studio</span>
                    <span className="text-slate-light text-[11px]">Collaborative swatch reviews and 3D CAD pattern digitization at Maya Exports Hub</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Life at Maya Exports */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-widest text-gold block mb-2">
                    Our Culture & Work Environment
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    Where Creative Ambition Meets Global Scale
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-light leading-relaxed">
                  At Maya Exports Ltd., you are never just a cog in the wheel. Whether working on outerwear silhouettes for top US department stores, engineering ergonomic athletic footwear, or coordinating international ocean cargo from Xiamen Port — every role has direct visibility, accountability, and high-growth potential.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-1.5">
                    <div className="flex items-center gap-2 text-brand-blue">
                      <Globe2 className="w-4 h-4" />
                      <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                        Global Footprint
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-muted leading-relaxed">
                      Cross-border coordination with offices in Shishi City (Fujian), Hong Kong, and international retail clients.
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-1.5">
                    <div className="flex items-center gap-2 text-gold">
                      <TrendingUp className="w-4 h-4" />
                      <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                        Merit-Based Growth
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-muted leading-relaxed">
                      Fast-track promotion pathways and leadership responsibilities based on performance and creative impact.
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Building2 className="w-4 h-4" />
                      <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                        Modern Tech Stack
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-muted leading-relaxed">
                      Automated pattern grading, 3D CLO visualization, computerized cutting, and in-house photo cycloramas.
                    </p>
                  </div>

                  <div className="p-4 rounded-sm bg-deep-blue-card border border-deep-blue-border space-y-1.5">
                    <div className="flex items-center gap-2 text-[#5ecba1]">
                      <HeartHandshake className="w-4 h-4" />
                      <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                        Family Culture
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-muted leading-relaxed">
                      Comprehensive health support, continuous mentorship from senior directors, and team celebrations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Current Openings Section */}
        <section id="openings" className="py-16 sm:py-24 bg-offwhite text-deep-blue border-b border-pearl-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-[11px] uppercase font-bold tracking-widest text-brand-blue block mb-1">
                Active Recruitment
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-deep-blue font-display">
                Current Openings Across All Departments
              </h2>
              <p className="text-xs sm:text-sm text-slate-body mt-2 leading-relaxed">
                We are hiring across various departments including Merchandising, Design, Quality Control, Production, Sales, Logistics, Photography, and Product Modeling. Click any role to submit your application.
              </p>
            </div>

            {/* Department Filter Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
              {departments.map((dept) => {
                const isSelected = selectedDepartment === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-3.5 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-deep-blue text-white shadow-md"
                        : "bg-white text-slate-600 hover:text-deep-blue border border-pearl-gray hover:bg-slate-100"
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-sm border border-pearl-gray shadow-xs hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Tags */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/30">
                        {job.department}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-deep-blue font-display group-hover:text-brand-blue transition-colors mb-2">
                      {job.title}
                    </h3>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-slate-muted mb-3 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Direct Factory Operations</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-body leading-relaxed mb-4">
                      {job.shortDesc}
                    </p>

                    {/* Key Responsibilities Preview */}
                    <div className="space-y-1.5 border-t border-pearl-gray pt-3 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block">
                        Core Focus:
                      </span>
                      {job.responsibilities.slice(0, 2).map((resp, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5ecba1] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button: Exact wording requested by user "Click to apply" */}
                  <button
                    type="button"
                    onClick={() => handleApplyClick(job)}
                    className="w-full py-2.5 px-4 rounded-sm font-semibold text-xs uppercase tracking-wider text-slate-900 bg-[#5ecba1] hover:bg-[#52be95] active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <span>Click to apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Interactive Application Form */}
        <section ref={formSectionRef} className="py-16 sm:py-20 bg-deep-blue border-b border-deep-blue-border">
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
        </section>

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
