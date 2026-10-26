"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronRight } from "lucide-react";
import { fetchCategoryTreeSafe } from "@/lib/catalog/api";
import { categoryToSlug, FIXED_PRODUCT_MENU } from "@/lib/catalog/headerMenu";
import type { CatalogCategory } from "@/lib/catalog/types";

const productCategories = [
  { name: "Garments", hasSubmenu: true },
  { name: "Footwear", hasSubmenu: true },
  { name: "Home Textiles", hasSubmenu: false },
  { name: "Fabrics", hasSubmenu: false },
  { name: "Electronics & Appliances", hasSubmenu: false },
];

const garmentDemographics: Record<string, string[]> = {
  Men: [
    "Men's Jackets",
    "Men's Sweat Top & Hoodies",
    "Men's Shirts",
    "Men's T-shirts",
    "Men's Shorts & Lowers",
    "Men's Jeans & Pants",
  ],
  Women: [
    "Women's Jackets & Blazers",
    "Women's Sweat Tops & Hoodies",
    "Women's Blouses & Shirts",
    "Women's T-shirts & Tops",
    "Women's Skirts & Shorts",
    "Women's Jeans & Trousers",
  ],
  Children: [
    "Children's Jackets & Outerwear",
    "Children's Hoodies & Sweat Tops",
    "Children's School Shirts",
    "Children's Graphic T-shirts",
    "Children's Shorts & Pants",
  ],
  Kids: [
    "Kids Outerwear & Rompers",
    "Kids Cotton T-shirts & Bodysuits",
    "Kids Sweatshirts & Sets",
    "Kids Soft Joggers & Leggings",
  ],
};

const footwearDemographics: Record<string, string[]> = {
  Men: ["Sports & Casual", "Slippers & Sandals", "Office Shoes"],
  Women: ["Sports & Casual", "Slippers & Sandals", "Office Shoes"],
  Children: ["Sports & Casual", "Slippers & Sandals", "Office Shoes"],
  Kids: ["Sports & Casual", "Slippers & Sandals", "Office Shoes"],
};

const fixedRootNames = new Set(FIXED_PRODUCT_MENU.map((item) => item.name.toLowerCase()));

function extraRoots(liveTree: CatalogCategory[]) {
  return liveTree.filter((item) => !fixedRootNames.has(item.name.toLowerCase()));
}

interface ProductsNavMenuProps {
  open: boolean;
  onClose: () => void;
}

export function ProductsNavMenu({ open, onClose }: ProductsNavMenuProps) {
  const [activeMainCategory, setActiveMainCategory] = useState("Garments");
  const [activeDemographic, setActiveDemographic] = useState<string | null>(null);
  const [liveTree, setLiveTree] = useState<CatalogCategory[]>([]);

  useEffect(() => {
    fetchCategoryTreeSafe().then(setLiveTree);
  }, []);

  if (!open) return null;

  const extras = extraRoots(liveTree);
  const currentDemographics =
    activeMainCategory === "Garments"
      ? garmentDemographics
      : activeMainCategory === "Footwear"
        ? footwearDemographics
        : null;
  const extraRoot = extras.find((item) => item.name === activeMainCategory);

  return (
    <div className="absolute top-full left-0 pt-2 z-50">
      <div className="bg-deep-blue-card border border-deep-blue-border rounded-sm shadow-2xl backdrop-blur-md flex overflow-hidden transition-all duration-200">
        <div
          className={`w-[205px] p-2 bg-deep-blue-dark/60 shrink-0 ${
            activeMainCategory === "Garments" || activeMainCategory === "Footwear" || (extraRoot && extraRoot.children.length > 0)
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
                  if (!prod.hasSubmenu) onClose();
                }}
                className={`w-full text-left flex items-center justify-between py-2 px-2.5 rounded-xs transition-colors cursor-pointer group ${
                  isSelected
                    ? "bg-deep-blue text-brand-blue font-semibold"
                    : "text-slate-light hover:bg-deep-blue/60 hover:text-white"
                }`}
              >
                {prod.hasSubmenu ? (
                  <span className="text-xs truncate">{prod.name}</span>
                ) : (
                  <Link
                    href={`/products/${categoryToSlug(prod.name)}`}
                    onClick={onClose}
                    className="text-xs truncate flex-1"
                  >
                    {prod.name}
                  </Link>
                )}
                {prod.hasSubmenu ? (
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? "text-brand-blue translate-x-0.5" : "text-slate-muted opacity-60"
                    }`}
                  />
                ) : null}
              </div>
            );
          })}

          {extras.map((prod) => {
            const isSelected = activeMainCategory === prod.name;
            const hasSubmenu = prod.children.length > 0;
            return (
              <div
                key={prod.id}
                onMouseEnter={() => {
                  setActiveMainCategory(prod.name);
                  setActiveDemographic(null);
                }}
                onClick={() => {
                  if (!hasSubmenu) onClose();
                }}
                className={`w-full text-left flex items-center justify-between py-2 px-2.5 rounded-xs transition-colors cursor-pointer group ${
                  isSelected
                    ? "bg-deep-blue text-brand-blue font-semibold"
                    : "text-slate-light hover:bg-deep-blue/60 hover:text-white"
                }`}
              >
                {hasSubmenu ? (
                  <span className="text-xs truncate">{prod.name}</span>
                ) : (
                  <Link href={`/products/${prod.slug}`} onClick={onClose} className="text-xs truncate flex-1">
                    {prod.name}
                  </Link>
                )}
                {hasSubmenu ? (
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? "text-brand-blue translate-x-0.5" : "text-slate-muted opacity-60"
                    }`}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        {currentDemographics ? (
          <div className="flex animate-in fade-in duration-150">
            <div className="w-[140px] p-2 bg-deep-blue-card border-r border-deep-blue-border/70 shrink-0">
              {Object.keys(currentDemographics).map((demo) => {
                const isDemoActive = activeDemographic === demo;
                return (
                  <div
                    key={demo}
                    onMouseEnter={() => setActiveDemographic(demo)}
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

            {activeDemographic ? (
              <div className="w-[240px] p-2 bg-deep-blue-dark/50 overflow-y-auto max-h-[300px] shrink-0 animate-in fade-in slide-in-from-left-2 duration-150">
                <div className="space-y-0.5">
                  {currentDemographics[activeDemographic]?.map((item) => {
                    const slug =
                      activeMainCategory === "Footwear"
                        ? categoryToSlug(`${activeDemographic} ${item}`)
                        : categoryToSlug(item);
                    return (
                      <Link
                        key={item}
                        href={`/products/${slug}`}
                        onClick={onClose}
                        className="w-full text-left py-1.5 px-2 rounded-xs text-xs text-slate-light hover:text-white hover:bg-deep-blue transition-colors flex items-center justify-between group/sub cursor-pointer"
                      >
                        <span className="group-hover/sub:text-brand-blue transition-colors">{item}</span>
                        <ArrowUpRight className="w-3 h-3 text-slate-muted opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        ) : extraRoot && extraRoot.children.length > 0 ? (
          <div className="flex animate-in fade-in duration-150">
            <div className="w-[240px] p-2 bg-deep-blue-dark/50 overflow-y-auto max-h-[300px] shrink-0">
              {extraRoot.children.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  onClick={onClose}
                  className="w-full text-left py-1.5 px-2 rounded-xs text-xs text-slate-light hover:text-white hover:bg-deep-blue transition-colors flex items-center justify-between group/sub cursor-pointer"
                >
                  <span className="group-hover/sub:text-brand-blue transition-colors">{item.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-muted opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ProductsMobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [mobileGarmentsOpen, setMobileGarmentsOpen] = useState(true);
  const [mobileMenOpen, setMobileMenOpen] = useState(true);
  const [mobileFootwearOpen, setMobileFootwearOpen] = useState(false);
  const [mobileFootwearMenOpen, setMobileFootwearMenOpen] = useState(false);
  const [liveTree, setLiveTree] = useState<CatalogCategory[]>([]);

  useEffect(() => {
    fetchCategoryTreeSafe().then(setLiveTree);
  }, []);

  const extras = extraRoots(liveTree);

  return (
    <div className="space-y-2">
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
        {mobileGarmentsOpen ? (
          <div className="mt-2 pl-3 space-y-2 border-l border-gold/40">
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
              {mobileMenOpen ? (
                <div className="mt-1 pl-2 space-y-1">
                  {garmentDemographics.Men.map((item) => (
                    <Link
                      key={item}
                      href={`/products/${categoryToSlug(item)}`}
                      onClick={onNavigate}
                      className="w-full text-left py-1 text-xs text-slate-light hover:text-brand-blue transition-colors flex items-center justify-between"
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-muted" />
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            {["Women", "Children", "Kids"].map((demo) => (
              <div key={demo} className="pt-1">
                <span className="text-xs text-slate-muted font-medium uppercase tracking-wider block mb-1">
                  {demo}
                </span>
                <div className="pl-2 space-y-1">
                  {garmentDemographics[demo]?.map((item) => (
                    <Link
                      key={item}
                      href={`/products/${categoryToSlug(item)}`}
                      onClick={onNavigate}
                      className="w-full text-left py-0.5 text-xs text-slate-light hover:text-brand-blue transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

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
        {mobileFootwearOpen ? (
          <div className="mt-2 pl-3 space-y-2 border-l border-gold/40">
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
              {mobileFootwearMenOpen ? (
                <div className="mt-1 pl-2 space-y-1">
                  {footwearDemographics.Men.map((item) => (
                    <Link
                      key={item}
                      href={`/products/${categoryToSlug(`Men ${item}`)}`}
                      onClick={onNavigate}
                      className="w-full text-left py-1 text-xs text-slate-light hover:text-brand-blue transition-colors flex items-center justify-between"
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-muted" />
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            {["Women", "Children", "Kids"].map((demo) => (
              <div key={demo} className="pt-1">
                <span className="text-xs text-slate-muted font-medium uppercase tracking-wider block mb-1">
                  {demo}
                </span>
                <div className="pl-2 space-y-1">
                  {footwearDemographics[demo]?.map((item) => (
                    <Link
                      key={item}
                      href={`/products/${categoryToSlug(`${demo} ${item}`)}`}
                      onClick={onNavigate}
                      className="w-full text-left py-0.5 text-xs text-slate-light hover:text-brand-blue transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {["Home Textiles", "Fabrics", "Electronics & Appliances"].map((cat) => (
        <Link
          key={cat}
          href={`/products/${categoryToSlug(cat)}`}
          onClick={onNavigate}
          className="w-full text-left py-1.5 text-slate-300 hover:text-white flex items-center justify-between text-xs"
        >
          <span>{cat}</span>
          <ArrowUpRight className="w-3 h-3 text-slate-muted opacity-60" />
        </Link>
      ))}

      {extras.map((cat) => (
        <Link
          key={cat.id}
          href={`/products/${cat.slug}`}
          onClick={onNavigate}
          className="w-full text-left py-1.5 text-slate-300 hover:text-white flex items-center justify-between text-xs"
        >
          <span>{cat.name}</span>
          <ArrowUpRight className="w-3 h-3 text-slate-muted opacity-60" />
        </Link>
      ))}
    </div>
  );
}
