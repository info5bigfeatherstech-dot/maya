"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

interface ProductCategoriesProps {
  onSelectCategory?: (category: string) => void;
}

export default function ProductCategories({ onSelectCategory }: ProductCategoriesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const categories = [
    {
      id: "garments",
      title: "Garments",
      subtitle: "Woven apparel, formal suits, fine knitwear, casual denim, outerwear & athleisure",
      moq: "800 pcs / style",
      leadTime: "40-50 days",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: "footwear",
      title: "Footwear",
      subtitle: "Handcrafted leather shoes, performance athletic sneakers, casual loafers & boots",
      moq: "500 pairs / style",
      leadTime: "45-60 days",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: "home-textiles",
      title: "Home Textiles",
      subtitle: "400-1000TC luxury sateen bedding, hotel-grade toweling, curtains & upholstery",
      moq: "1,000 sets / spec",
      leadTime: "35-45 days",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: "fabrics",
      title: "Fabrics",
      subtitle: "Organic GOTS cotton, premium silk, linen blends, denim & technical performance textiles",
      moq: "1,500 meters",
      leadTime: "25-35 days",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
    },
    {
      id: "electronics",
      title: "Electronics & Appliances",
      subtitle: "Smart home electronics, small kitchen appliances, personal care devices & OEM/ODM hardware",
      moq: "1,000 units",
      leadTime: "30-45 days",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=85",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Clip-path wipe reveal on scroll
        gsap.fromTo(
          card,
          {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            y: 40,
            opacity: 0,
          },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: (index % 3) * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="bg-white text-deep-blue py-16 sm:py-20 lg:py-24 relative border-t border-pearl-gray"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-pearl-gray">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-pearl-gray border border-pearl-gray text-[11px] font-semibold uppercase tracking-widest text-deep-blue mb-2.5">
              Export Portfolios
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep-blue font-display">
              Maya Fashion Product Categories.
            </h2>
          </div>
          <p className="text-slate-body max-w-md text-xs sm:text-sm leading-relaxed">
            Manufactured to rigorous European, British, and North American retail tolerances. Fully certified
            fabrics, OEKO-TEX Standard 100 compliance, and bespoke private-label packaging.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              onClick={() => {
                if (cat.id === "home-textiles") {
                  window.location.href = "/products/home-textiles";
                } else if (cat.id === "fabrics") {
                  window.location.href = "/products/fabrics";
                } else if (cat.id === "electronics") {
                  window.location.href = "/products/electronics-and-appliances";
                } else if (cat.id === "footwear") {
                  window.location.href = "/products/mens-sports-and-casual";
                } else if (cat.id === "garments") {
                  window.location.href = "/products/mens-jackets";
                } else {
                  onSelectCategory?.(cat.title);
                }
              }}
              className="group cursor-pointer relative bg-deep-blue-card rounded-sm overflow-hidden border border-deep-blue-border hover:border-brand-blue/60 transition-all duration-500 flex flex-col justify-end min-h-[440px]"
            >
              {/* Full-bleed background image with subtle zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/75 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              {/* Card Meta Content */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end h-full">
                <div className="flex items-center justify-between text-xs text-brand-blue font-semibold tracking-wider uppercase mb-2">
                  <span>MOQ: {cat.moq}</span>
                  <span className="text-slate-light font-normal">Lead: {cat.leadTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-brand-blue transition-colors font-display">
                  {cat.title}
                </h3>

                {/* Thin gold underline on hover as required */}
                <div className="w-0 group-hover:w-full h-[1.5px] bg-gold transition-all duration-500 mb-3" />

                <p className="text-slate-light text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed font-light">
                  {cat.subtitle}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-light group-hover:text-white">
                  <span>View Specifications</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
