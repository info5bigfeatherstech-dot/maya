"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, ShieldCheck, ChevronDown, Globe } from "lucide-react";
import MayaLogo from "./MayaLogo";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ProductsMobileMenu, ProductsNavMenu } from "@/components/ProductsNavMenu";

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
    `transition-colors relative py-1 text-[15.5px] font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-blue after:transition-all after:duration-300 ${
      isActive
        ? "text-white after:w-full font-semibold"
        : "text-slate-light hover:text-white after:w-0 hover:after:w-full"
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
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
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
        <div className="max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between">
            {/* Logo at full color carrying the Brand Blue sphere and Gold M */}
            <a href="/" className="flex items-center" aria-label="Maya Exports Ltd Home">
              <MayaLogo size="md" variant="dark" priority />
            </a>

            {/* Desktop Navigation Links: Home | About Us | Products ▾ | Event | Career | Contact Us */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-slate-light">
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
                  className={`flex items-center gap-1.5 transition-colors hover:text-white py-1 text-[15.5px] font-medium outline-none group cursor-pointer ${
                    productsOpen ? "text-brand-blue font-semibold" : "text-slate-light"
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

                <ProductsNavMenu open={productsOpen} onClose={() => setProductsOpen(false)} />
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
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-[13.5px] text-slate-light hover:text-white px-2.5 py-1.5 rounded-sm border border-transparent hover:border-deep-blue-border outline-none transition-colors">
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
                className="relative group overflow-hidden bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-md shadow-brand-blue/25 hover:shadow-brand-blue/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => onOpenQuoteModal?.()}
                className="bg-brand-blue hover:bg-brand-blue-hover text-white px-3 py-1.5 rounded-sm text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
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

            {mobileProductsOpen ? (
              <div className="mt-3 pl-3 space-y-2 border-l border-brand-blue/30 text-sm">
                <ProductsMobileMenu onNavigate={() => setMobileMenuOpen(false)} />
              </div>
            ) : null}
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
