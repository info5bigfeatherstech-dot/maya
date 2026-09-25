"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import About from "@/components/About";
import ProductCategories from "@/components/ProductCategories";
import Manufacturing from "@/components/Manufacturing";
import ProductionProcess from "@/components/ProductionProcess";
import QualityControl from "@/components/QualityControl";
import ExportMarkets from "@/components/ExportMarkets";
import Certifications from "@/components/Certifications";
import Sustainability from "@/components/Sustainability";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import InfoModal from "@/components/InfoModal";

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<"event" | "career" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Garments");

  const handleOpenQuote = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-deep-blue text-slate-100 overflow-x-hidden selection:bg-brand-blue/30 selection:text-white">
        {/* 1. Fixed Navigation Bar with exact requested links: Home | About Us | Products ▾ | Event | Career | Contact Us */}
        <Navbar
          onOpenQuoteModal={(cat) => handleOpenQuote(cat)}
          onOpenInfoModal={(type) => setInfoModalType(type)}
        />

        {/* 2. Hero Section (Fullscreen video / Ken Burns, editorial typography, scroll-cue) */}
        <Hero onOpenQuoteModal={() => handleOpenQuote()} />

        {/* 3. Trusted By / Buyer Regions Strip */}
        <TrustedBy />

        {/* 4. About Company (Two-column, stats count-up, vertical heritage) */}
        <About />

        {/* 5. Product Categories Grid (Clip-path wipe, gold underline hover, image zoom) */}
        <ProductCategories onSelectCategory={(cat) => handleOpenQuote(cat)} />

        {/* 6. Manufacturing Capabilities (High capacity stats count-up, facility tabs) */}
        <Manufacturing />

        {/* 7. Production Process (Horizontal 6-step sequence, animated progress line) */}
        <ProductionProcess />

        {/* 8. Quality Control (Four-tier inspection protocol, testing lab, photo wipe) */}
        <QualityControl />

        {/* 9. Global Export Markets (Interactive SVG world map, trade corridors, stat strip) */}
        <ExportMarkets />

        {/* 10. Certifications (ISO 9001, BSCI, Sedex, Oeko-Tex, WRAP, GOTS) */}
        <Certifications />

        {/* 11. Sustainability & ESG (Clean solar, closed-loop water, ZDHC, circularity) */}
        <Sustainability />

        {/* 12. Contact & RFQ Call to Action (Direct inquiry, response guarantee, global desks) */}
        <ContactCTA onOpenQuoteModal={() => handleOpenQuote()} />

        {/* 13. Multinational Industrial Footer */}
        <Footer />

        {/* Enterprise RFQ & Capacity Booking Modal */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={handleCloseQuote}
          initialCategory={selectedCategory}
        />

        {/* Global Events & Careers Modal */}
        <InfoModal
          type={infoModalType}
          isOpen={infoModalType !== null}
          onClose={() => setInfoModalType(null)}
          onOpenQuote={() => handleOpenQuote()}
        />
      </main>
    </SmoothScroll>
  );
}
