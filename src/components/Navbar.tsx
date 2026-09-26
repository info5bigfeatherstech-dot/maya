"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, ShieldCheck, ChevronDown, ChevronRight, Globe } from "lucide-react";
import MayaLogo from "./MayaLogo";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { categoryToSlug } from "@/data/productCatalog";

interface NavbarProps {
  onOpenQuoteModal?: (category?: string) => void;
  onOpenInfoModal?: (type: "event" | "career") => void;
  solid?: boolean;
}

export default function Navbar({
  onOpenQuoteModal,
  onOpenInfoModal,
  solid = false,
}: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about" || pathname.startsWith("/about/");
  const isProducts = pathname.startsWith("/products");
  const isEvents = pathname === "/events" || pathname.startsWith("/events/");
  const isCareers = pathname === "/careers" || pathname.startsWith("/careers/");
  const isContact = pathname === "/contact" || pathname.startsWith("/contact/");

  const getDesktopLinkClass = (isActive: boolean) =>
    `transition-colors relative py-1 text-[14px] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-brand-blue after:transition-all after:duration-300 ${
      isActive
        ? "text-white after:w-full"
        : "text-slate-light hover:text-brand-blue after:w-0 hover:after:w-full"
    }`;

  const getMobileLinkClass = (isActive: boolean) =>
    `block text-xl font-medium transition-colors py-2 border-b border-deep-blue-border ${
      isActive ? "text-brand-blue font-semibold" : "text-slate-100 hover:text-brand-blue"
    }`;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isInnerPage, setIsInnerPage] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Global (EN)");
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeMainCategory, setActiveMainCategory] = useState("Garments");
  const [activeDemographic, setActiveDemographic] = useState<string | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileGarmentsOpen, setMobileGarmentsOpen] = useState(true);
  const [mobileMenOpen, setMobileMenOpen] = useState(true);
  const [mobileFootwearOpen, setMobileFootwearOpen] = useState(false);
  const [mobileFootwearMenOpen, setMobileFootwearMenOpen] = useState(false);
  const productsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const productsContainerRef = React.useRef<HTMLDivElement | null>(null);

  const handleProductsEnter = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current);
      productsTimeoutRef.current = null;
    }
    setProductsOpen(true);
  };

  const handleProductsLeave = () => {
    if (productsTimeoutRef.current) {
      clearTimeout(productsTimeoutRef.current);
    }
    productsTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 220);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        productsContainerRef.current &&
        !productsContainerRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      if (productsTimeoutRef.current) {
        clearTimeout(productsTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsInnerPage(window.location.pathname !== "/");
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const productCategories = [
    { name: "Garments", hasSubmenu: true, desc: "Woven, knitwear, outerwear, denim & fashion lines" },
    { name: "Footwear", hasSubmenu: true, desc: "Leather footwear, athletic sneakers, boots & casual" },
    { name: "Home Textiles", hasSubmenu: false, desc: "Bed linens, luxury towels, curtains & furnishings" },
    { name: "Fabrics", hasSubmenu: false, desc: "Cotton, synthetics, yarn-dyed & technical weaves" },
    { name: "Electronics & Appliances", hasSubmenu: false, desc: "Consumer electronics, home & kitchen appliances" },
  ];

  const garmentDemographics: Record<string, string[]> = {
    "Men": [
      "Men's Jackets",
      "Men's Sweat Top & Hoodies",
      "Men's Shirts",
      "Men's T-shirts",
      "Men's Shorts & Lowers",
      "Men's Jeans & Pants",
    ],
    "Women": [
      "Women's Jackets & Blazers",
      "Women's Sweat Tops & Hoodies",
      "Women's Blouses & Shirts",
      "Women's T-shirts & Tops",
      "Women's Skirts & Shorts",
      "Women's Jeans & Trousers",
    ],
    "Children": [
      "Children's Jackets & Outerwear",
      "Children's Hoodies & Sweat Tops",
      "Children's School Shirts",
      "Children's Graphic T-shirts",
      "Children's Shorts & Pants",
    ],
    "Kids": [
      "Kids Outerwear & Rompers",
      "Kids Cotton T-shirts & Bodysuits",
      "Kids Sweatshirts & Sets",
      "Kids Soft Joggers & Leggings",
    ],
  };

  const footwearDemographics: Record<string, string[]> = {
    "Men": [
      "Sports & Casual",
      "Slippers & Sandals",
      "Office Shoes",
    ],
    "Women": [
      "Sports & Casual",
      "Slippers & Sandals",
      "Office Shoes",
    ],
    "Children": [
      "Sports & Casual",
      "Slippers & Sandals",
      "Office Shoes",
    ],
    "Kids": [
      "Sports & Casual",
      "Slippers & Sandals",
      "Office Shoes",
    ],
  };

  const otherDivisionsInfo: Record<string, { desc: string; specs: string[] }> = {
    "Footwear": {
      desc: "Handcrafted leather shoes, performance athletic sneakers, casual loafers & boots.",
      specs: ["High-durability EVA/Rubber outsoles", "Full-grain & nubuck leathers", "Direct factory MOQ: 500 pairs"],
    },
    "Home Textiles": {
      desc: "400-1000TC luxury sateen bedding, hotel-grade toweling, curtains & upholstery.",
      specs: ["GOTS certified organic cotton", "OEKO-TEX Standard 100", "Bespoke hotel & retail packaging"],
    },
    "Fabrics": {
      desc: "Organic GOTS cotton, premium silk, linen blends, denim & technical performance textiles.",
      specs: ["Automated circular & flat knits", "Continuous dyeing & finishing", "Direct mill MOQ: 1,500 meters"],
    },
    "Electronics & Appliances": {
      desc: "Smart home electronics, small kitchen appliances, personal care devices & OEM/ODM hardware.",
      specs: ["CE, RoHS & FCC certified", "Custom tooling & injection molding", "Turnkey OEM/ODM production"],
    },
  };

  const regions = [
    { code: "Global (EN)", label: "Global Edition (English)" },
    { code: "UK & Europe", label: "United Kingdom & EU Desk" },
    { code: "North America", label: "US & Canada Trade Desk" },
    { code: "Middle East", label: "GCC & Middle East Liaison" },
    { code: "Australasia", label: "Australia & NZ Desk" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid || isInnerPage || isScrolled
            ? "bg-deep-blue/98 backdrop-blur-md shadow-2xl py-2.5 sm:py-3 border-b border-deep-blue-border"
            : "bg-gradient-to-b from-deep-blue/95 via-deep-blue/50 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo at full color carrying the Brand Blue sphere and Gold M */}
            <a href="/" className="flex items-center" aria-label="Maya Exports Ltd Home">
              <MayaLogo size="md" variant="dark" priority />
            </a>

            {/* Desktop Navigation Links: Home | About Us | Products ▾ | Event | Career | Contact Us */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-light">
              <Link
                href="/"
                className={getDesktopLinkClass(isHome)}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={getDesktopLinkClass(isAbout)}
              >
                About Us
              </Link>

              {/* Products ▾ Multi-Tier Mega Menu */}
              <div
                ref={productsContainerRef}
                onMouseEnter={handleProductsEnter}
                onMouseLeave={handleProductsLeave}
                className="relative py-1"
              >
                <button
                  type="button"
                  onClick={() => setProductsOpen((prev) => !prev)}
                  className={`flex items-center gap-1 transition-colors hover:text-brand-blue py-1 text-[14px] font-semibold outline-none group cursor-pointer ${
                    productsOpen ? "text-brand-blue" : "text-slate-light hover:text-brand-blue"
                  }`}
                  aria-expanded={productsOpen}
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-brand-blue transition-transform duration-200 ${
                      productsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Mega Menu Container */}
                <div
                  className={`absolute top-full left-0 pt-2 transition-all duration-200 z-50 ${
                    productsOpen
                      ? "opacity-100 visible translate-y-0 pointer-events-auto"
                      : "opacity-0 invisible -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="bg-deep-blue-card border border-deep-blue-border rounded-sm shadow-2xl backdrop-blur-md flex overflow-hidden transition-all duration-200">
                    {/* Column 1: Main Export Divisions */}
                    <div
                      className={`w-[205px] p-2 bg-deep-blue-dark/60 shrink-0 ${
                        activeMainCategory === "Garments" || activeMainCategory === "Footwear"
                          ? "border-r border-deep-blue-border/70"
                          : ""
                      }`}
                    >
                      {productCategories.map((prod) => {
                        const isSelected = activeMainCategory === prod.name;
                        return (
                          <div
                            key={prod.name}
                            onMouseEnter={() => {
                              setActiveMainCategory(prod.name);
                              setActiveDemographic(null);
                            }}
                            onClick={() => {
                              if (!prod.hasSubmenu) {
                                setProductsOpen(false);
                                window.location.href = `/products/${categoryToSlug(prod.name)}`;
                              }
                            }}
                            className={`w-full text-left flex items-center justify-between py-2 px-2.5 rounded-xs transition-colors cursor-pointer group ${
                              isSelected
                                ? "bg-deep-blue text-brand-blue font-semibold"
                                : "text-slate-light hover:bg-deep-blue/60 hover:text-white"
                            }`}
                          >
                            <span className="text-xs truncate">{prod.name}</span>
                            {/* Chevron ONLY on Garments & Footwear as requested */}
                            {prod.hasSubmenu && (
                              <ChevronRight
                                className={`w-3.5 h-3.5 transition-transform ${
                                  isSelected ? "text-brand-blue translate-x-0.5" : "text-slate-muted opacity-60"
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Column 2 & 3: ONLY rendered for Garments & Footwear (Home Textiles, Fabrics, Electronics have NO sub-navbar) */}
                    {(activeMainCategory === "Garments" || activeMainCategory === "Footwear") && (() => {
                      const currentDemographics =
                        activeMainCategory === "Garments"
                          ? garmentDemographics
                          : footwearDemographics;

                      return (
                        <div className="flex animate-in fade-in duration-150">
                          {/* Column 2: Demographic Categories */}
                          <div className="w-[140px] p-2 bg-deep-blue-card border-r border-deep-blue-border/70 shrink-0">
                            {Object.keys(currentDemographics).map((demo) => {
                              const isDemoActive = activeDemographic === demo;
                              return (
                                <div
                                  key={demo}
                                  onMouseEnter={() => setActiveDemographic(demo)}
                                  onClick={() => {
                                    if (activeDemographic !== demo) {
                                      setActiveDemographic(demo);
                                    }
                                  }}
                                  className={`w-full text-left flex items-center justify-between py-2 px-2.5 rounded-xs transition-all cursor-pointer group ${
                                    isDemoActive
                                      ? "bg-deep-blue text-brand-blue font-semibold border-l-2 border-brand-blue pl-2"
                                      : "text-slate-light hover:bg-deep-blue/40 hover:text-white"
                                  }`}
                                >
                                  <span className="text-xs">{demo}</span>
                                  <ChevronRight
                                    className={`w-3.5 h-3.5 transition-transform ${
                                      isDemoActive
                                        ? "text-brand-blue translate-x-1"
                                        : "text-slate-muted opacity-50 group-hover:opacity-100"
                                    }`}
                                  />
                                </div>
                              );
                            })}
                          </div>

                          {/* Column 3: The Drawer / Dropdown that appears whenever hovering Men (or any demographic) */}
                          {activeDemographic ? (
                            <div className="w-[240px] p-2 bg-deep-blue-dark/50 overflow-y-auto max-h-[300px] shrink-0 animate-in fade-in slide-in-from-left-2 duration-150">
                              <div className="space-y-0.5">
                                {currentDemographics[activeDemographic]?.map((item) => (
                                  <button
                                    key={item}
                                    type="button"
                                    onClick={() => {
                                      setProductsOpen(false);
                                      const slug =
                                        activeMainCategory === "Footwear"
                                          ? categoryToSlug(`${activeDemographic} ${item}`)
                                          : categoryToSlug(item);
                                      window.location.href = `/products/${slug}`;
                                    }}
                                    className="w-full text-left py-1.5 px-2 rounded-xs text-xs text-slate-light hover:text-white hover:bg-deep-blue transition-colors flex items-center justify-between group/sub cursor-pointer"
                                  >
                                    <span className="group-hover/sub:text-brand-blue transition-colors">
                                      {item}
                                    </span>
                                    <ArrowUpRight className="w-3 h-3 text-slate-muted opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              <Link
                href="/events"
                className={getDesktopLinkClass(isEvents)}
              >
                Events
              </Link>

              <Link
                href="/careers"
                className={getDesktopLinkClass(isCareers)}
              >
                Careers
              </Link>

              <Link
                href="/contact"
                className={getDesktopLinkClass(isContact)}
              >
                Contact Us
              </Link>

              {/* <Link
                href="/admin"
                className="transition-colors hover:text-brand-blue relative py-1 text-[13px] font-medium text-blue-400 hover:text-blue-300 px-2 py-0.5 rounded border border-blue-500/30 bg-blue-500/10"
              >
                Admin
              </Link> */}
            </nav>

            {/* Right Action: International Desk Dropdown + Gold-bordered CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Region Selector with shadcn DropdownMenu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs text-slate-light hover:text-white px-2 py-1 rounded border border-transparent hover:border-deep-blue-border outline-none transition-colors">
                  <Globe className="w-3.5 h-3.5 text-brand-blue" />
                  <span>{selectedRegion}</span>
                  <ChevronDown className="w-3 h-3 text-slate-muted" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-deep-blue-card border-deep-blue-border">
                  <DropdownMenuLabel className="text-[10px] text-brand-blue uppercase">
                    Select Buyer Region
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {regions.map((reg) => (
                    <DropdownMenuItem
                      key={reg.code}
                      onClick={() => setSelectedRegion(reg.code)}
                      className={`text-xs cursor-pointer ${
                        selectedRegion === reg.code ? "text-brand-blue font-semibold" : "text-slate-light"
                      }`}
                    >
                      {reg.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={() => onOpenQuoteModal?.()}
                className="relative group overflow-hidden border border-gold bg-gold/10 hover:bg-gold text-slate-100 hover:text-deep-blue px-5 py-2.5 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => onOpenQuoteModal?.()}
                className="border border-gold text-gold px-3 py-1.5 rounded-sm text-xs font-semibold tracking-wider uppercase"
              >
                Quote
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-light hover:text-white p-1"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-deep-blue/98 backdrop-blur-xl lg:hidden transition-all duration-300 flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-brand-blue font-semibold mb-4">
            Navigation Index
          </p>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClass(isHome)}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClass(isAbout)}
          >
            About Us
          </Link>
          {/* Products Accordion in Mobile */}
          <div className="border-b border-deep-blue-border py-2">
            <button
              type="button"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full flex items-center justify-between text-xl font-medium text-slate-100 hover:text-brand-blue transition-colors text-left"
            >
              <span>Products</span>
              <ChevronDown
                className={`w-5 h-5 text-brand-blue transition-transform duration-200 ${
                  mobileProductsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileProductsOpen && (
              <div className="mt-3 pl-3 space-y-2 border-l border-brand-blue/30 text-sm">
                {/* Garments Tier */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileGarmentsOpen(!mobileGarmentsOpen)}
                    className="w-full flex items-center justify-between py-1 text-slate-200 hover:text-brand-blue font-semibold text-sm"
                  >
                    <span className="text-brand-blue">Garments</span>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-blue transition-transform duration-200 ${
                        mobileGarmentsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileGarmentsOpen && (
                    <div className="mt-2 pl-3 space-y-2 border-l border-gold/40">
                      {/* Men */}
                      <div>
                        <button
                          type="button"
                          onClick={() => setMobileMenOpen(!mobileMenOpen)}
                          className="w-full flex items-center justify-between py-1 text-gold hover:text-white font-medium text-xs uppercase tracking-wider"
                        >
                          <span>Men</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-gold transition-transform duration-200 ${
                              mobileMenOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {mobileMenOpen && (
                          <div className="mt-1 pl-2 space-y-1">
                            {garmentDemographics["Men"]?.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  const slug = categoryToSlug(item);
                                  window.location.href = `/products/${slug}`;
                                }}
                                className="w-full text-left py-1 text-xs text-slate-light hover:text-brand-blue transition-colors flex items-center justify-between"
                              >
                                <span>{item}</span>
                                <ArrowUpRight className="w-3 h-3 text-slate-muted" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Other Garment Demographics: Women, Children, Kids */}
                      {["Women", "Children", "Kids"].map((demo) => (
                        <div key={demo} className="pt-1">
                          <span className="text-xs text-slate-muted font-medium uppercase tracking-wider block mb-1">
                            {demo}
                          </span>
                          <div className="pl-2 space-y-1">
                            {garmentDemographics[demo]?.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  const slug = categoryToSlug(item);
                                  window.location.href = `/products/${slug}`;
                                }}
                                className="w-full text-left py-0.5 text-xs text-slate-light hover:text-brand-blue transition-colors"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footwear Tier (Accordion) */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileFootwearOpen(!mobileFootwearOpen)}
                    className="w-full flex items-center justify-between py-1 text-slate-200 hover:text-brand-blue font-semibold text-sm"
                  >
                    <span className="text-brand-blue">Footwear</span>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-blue transition-transform duration-200 ${
                        mobileFootwearOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileFootwearOpen && (
                    <div className="mt-2 pl-3 space-y-2 border-l border-gold/40">
                      {/* Men Footwear */}
                      <div>
                        <button
                          type="button"
                          onClick={() => setMobileFootwearMenOpen(!mobileFootwearMenOpen)}
                          className="w-full flex items-center justify-between py-1 text-gold hover:text-white font-medium text-xs uppercase tracking-wider"
                        >
                          <span>Men</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-gold transition-transform duration-200 ${
                              mobileFootwearMenOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {mobileFootwearMenOpen && (
                          <div className="mt-1 pl-2 space-y-1">
                            {footwearDemographics["Men"]?.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  const slug = categoryToSlug(`Men ${item}`);
                                  window.location.href = `/products/${slug}`;
                                }}
                                className="w-full text-left py-1 text-xs text-slate-light hover:text-brand-blue transition-colors flex items-center justify-between"
                              >
                                <span>{item}</span>
                                <ArrowUpRight className="w-3 h-3 text-slate-muted" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Women, Children & Kids Footwear */}
                      {["Women", "Children", "Kids"].map((demo) => (
                        <div key={demo} className="pt-1">
                          <span className="text-xs text-slate-muted font-medium uppercase tracking-wider block mb-1">
                            {demo}
                          </span>
                          <div className="pl-2 space-y-1">
                            {footwearDemographics[demo]?.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  const slug = categoryToSlug(`${demo} ${item}`);
                                  window.location.href = `/products/${slug}`;
                                }}
                                className="w-full text-left py-0.5 text-xs text-slate-light hover:text-brand-blue transition-colors"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>


                {/* Direct Action Divisions (NO sub-navbar) */}
                {["Home Textiles", "Fabrics", "Electronics & Appliances"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.location.href = `/products/${categoryToSlug(cat)}`;
                    }}
                    className="w-full text-left py-1.5 text-slate-300 hover:text-white flex items-center justify-between text-xs"
                  >
                    <span>{cat}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-muted opacity-60" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClass(isEvents)}
          >
            Events
          </Link>
          <Link
            href="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClass(isCareers)}
          >
            Careers
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={getMobileLinkClass(isContact)}
          >
            Contact Us
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl font-medium text-blue-400 hover:text-blue-300 transition-colors py-2 border-b border-deep-blue-border"
          >
            Admin ERP Portal
          </Link>
        </div>

        <div className="space-y-4 pt-6 border-t border-deep-blue-border">
          <div className="flex items-center gap-2 text-xs text-slate-light">
            <ShieldCheck className="w-4 h-4 text-brand-blue" />
            <span>ISO 9001 / BSCI Tier-1 Accredited OEM/ODM</span>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuoteModal?.();
            }}
            className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white py-3.5 rounded-sm font-semibold tracking-widest uppercase text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Request Specification & Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
