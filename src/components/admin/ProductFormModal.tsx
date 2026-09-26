"use client";

import React, { useState, useEffect } from "react";
import {
  AdminProduct,
  CustomerRecord,
  FactoryRecord,
  VariantDetail,
  YesNo,
  ProductStatus,
  GenderType,
  AgeGroupType,
  MainCategory,
  QuantityUnitType,
} from "@/types/adminProduct";
import {
  monthsList,
  yearsList,
  productTypeOptions,
  collectionOptions,
  seasonOptions,
  categoriesList,
  defaultSizeRanges,
  quantityUnitOptions,
  marketOptions,
  fobPorts,
  generateFactoryCode,
  generateCustomerStyleCode,
  generateVariantMatrix,
} from "@/data/adminData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/admin-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/admin-select";
import { Input } from "@/components/ui/admin-input";
import {
  X,
  Plus,
  Trash2,
  RefreshCw,
  Sparkles,
  Layers,
  DollarSign,
  Package,
  Calendar,
  Check,
  Building,
  Upload,
  Info,
  HelpCircle,
  Tag,
  ShoppingBag,
} from "lucide-react";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: AdminProduct) => void;
  initialProduct?: AdminProduct | null;
  factories: FactoryRecord[];
  customers: CustomerRecord[];
}

export function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  initialProduct,
  factories,
  customers,
}: ProductFormModalProps) {
  const isEditing = Boolean(initialProduct);

  // Form fields
  const [productCode, setProductCode] = useState("ST-1001");
  const [sku, setSku] = useState("DRS-001");
  const [purchaseCode, setPurchaseCode] = useState("PUR-001");
  const [productName, setProductName] = useState("Floral Maxi Dress");
  const [productStatus, setProductStatus] = useState<ProductStatus>("Active");
  const [featuredProduct, setFeaturedProduct] = useState<YesNo>("No");

  // Classification
  const [productType, setProductType] = useState("New Developed");
  const [productTypeCustom, setProductTypeCustom] = useState("");
  const [gender, setGender] = useState<GenderType>("Women");
  const [ageGroup, setAgeGroup] = useState<AgeGroupType>("Adult");
  const [category, setCategory] = useState<MainCategory>("Dress");
  const [subcategory, setSubcategory] = useState("Maxi Dress");
  const [collection, setCollection] = useState("Summer Collection");
  const [collectionCustom, setCollectionCustom] = useState("");
  const [season, setSeason] = useState("SS26");
  const [seasonCustom, setSeasonCustom] = useState("");

  // Dates
  const [devMonth, setDevMonth] = useState("March");
  const [devYear, setDevYear] = useState("2026");
  const [shipMonth, setShipMonth] = useState("August");
  const [shipYear, setShipYear] = useState("2026");

  // Specs
  const [fabric, setFabric] = useState("Cotton");
  const [fabricComposition, setFabricComposition] = useState("100% Cotton");
  const [gsm, setGsm] = useState("120");
  const [pattern, setPattern] = useState("Floral");
  const [color, setColor] = useState("Blue");
  const [availableColorsInput, setAvailableColorsInput] = useState("Blue, Pink, Green");
  const [sizeRange, setSizeRange] = useState("S, M, L, XL");
  const [sizeRangeCustom, setSizeRangeCustom] = useState("");

  // Variants
  const [variant, setVariant] = useState<YesNo>("Yes");
  const [variantDetails, setVariantDetails] = useState<VariantDetail[]>([]);

  // Factory & Sourcing
  const [factoryCode, setFactoryCode] = useState("F26-001");
  const [factoryName, setFactoryName] = useState("ABC Garments");
  const [factoryPriceEXW, setFactoryPriceEXW] = useState("$7.20");
  const [fobPrice, setFobPrice] = useState("$8.00");
  const [salePrice, setSalePrice] = useState("$8.50");
  const [fobPort, setFobPort] = useState("Shanghai");
  const [moq, setMoq] = useState("500");
  const [quantityUnit, setQuantityUnit] = useState<QuantityUnitType>("Pcs");

  // Ready Stock
  const [readyStockAvailability, setReadyStockAvailability] = useState<YesNo>("Yes");
  const [readyStockQuantity, setReadyStockQuantity] = useState("2500");
  const [readyStockQuantityUnit, setReadyStockQuantityUnit] =
    useState<QuantityUnitType>("Pcs");

  // Customer
  const [customerName, setCustomerName] = useState("XYZ Fashion");
  const [customerStyleCode, setCustomerStyleCode] = useState("C26-001");
  const [repeatOrder, setRepeatOrder] = useState<YesNo>("No");
  const [repeatOrderNumber, setRepeatOrderNumber] = useState<
    "1st" | "2nd" | "3rd" | "None"
  >("None");

  // Market Suitability
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([
    "USA",
    "UK",
    "Europe",
    "UAE",
  ]);
  const [customMarket, setCustomMarket] = useState("");

  // Media & Metadata
  const [description, setDescription] = useState(
    "Floor-grazing bohemian maxi dress featuring artisanal watercolor floral print, gathered tier skirts, and comfortable elastic smocking across back bodice. Tested for color fastness and shrinkage under international retail standards."
  );
  const [productImage, setProductImage] = useState(
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80"
  );
  const [createdMonth, setCreatedMonth] = useState("March");
  const [createdYear, setCreatedYear] = useState("2026");
  const [updatedAtDate, setUpdatedAtDate] = useState("Tech pack reviewed & ready stock confirmed for SS26 campaign");

  // Initialize or reset form
  useEffect(() => {
    if (initialProduct) {
      setProductCode(initialProduct.productCode);
      setSku(initialProduct.sku);
      setPurchaseCode(initialProduct.purchaseCode);
      setProductName(initialProduct.productName);
      setProductStatus(initialProduct.productStatus);
      setFeaturedProduct(initialProduct.featuredProduct);

      setProductType(initialProduct.productType);
      setProductTypeCustom(initialProduct.productTypeCustom || "");
      setGender(initialProduct.gender);
      setAgeGroup(initialProduct.ageGroup);
      setCategory(initialProduct.category);
      setSubcategory(initialProduct.subcategory);
      setCollection(initialProduct.collection);
      setCollectionCustom(initialProduct.collectionCustom || "");
      setSeason(initialProduct.season);
      setSeasonCustom(initialProduct.seasonCustom || "");

      setDevMonth(initialProduct.developmentDate.month);
      setDevYear(initialProduct.developmentDate.year);
      setShipMonth(initialProduct.shipmentDate.month);
      setShipYear(initialProduct.shipmentDate.year);

      setFabric(initialProduct.fabric);
      setFabricComposition(initialProduct.fabricComposition);
      setGsm(initialProduct.gsm);
      setPattern(initialProduct.pattern);
      setColor(initialProduct.color);
      setAvailableColorsInput(initialProduct.availableColors?.join(", ") || "");
      setSizeRange(initialProduct.sizeRange);
      setSizeRangeCustom(initialProduct.sizeRangeCustom || "");

      setVariant(initialProduct.variant);
      setVariantDetails(initialProduct.variantDetails || []);

      setFactoryCode(initialProduct.factoryCode);
      setFactoryName(initialProduct.factoryName);
      setFactoryPriceEXW(initialProduct.factoryPriceEXW);
      setFobPrice(initialProduct.fobPrice);
      setSalePrice(initialProduct.salePrice);
      setFobPort(initialProduct.fobPort);
      setMoq(initialProduct.moq);
      setQuantityUnit(initialProduct.quantityUnit);

      setReadyStockAvailability(initialProduct.readyStockAvailability);
      setReadyStockQuantity(initialProduct.readyStockQuantity);
      setReadyStockQuantityUnit(initialProduct.readyStockQuantityUnit);

      setCustomerName(initialProduct.customerName);
      setCustomerStyleCode(initialProduct.customerStyleCode);
      setRepeatOrder(initialProduct.repeatOrder);
      setRepeatOrderNumber(initialProduct.repeatOrderNumber);

      setSelectedMarkets(initialProduct.marketSuitability || []);
      setDescription(initialProduct.description);
      setProductImage(initialProduct.productImage);
      setCreatedMonth(initialProduct.createdAtDate.month);
      setCreatedYear(initialProduct.createdAtDate.year);
      setUpdatedAtDate(initialProduct.updatedAtDate || "");
    } else {
      const randomSeq = Math.floor(10 + Math.random() * 89);
      setProductCode(`ST-${1000 + randomSeq}`);
      setSku(`DRS-${String(randomSeq).padStart(3, "0")}`);
      setPurchaseCode(`PUR-${String(randomSeq).padStart(3, "0")}`);
      setProductName("New Garment Development");
      setProductStatus("Active");
      setFeaturedProduct("No");
      setFactoryCode(generateFactoryCode(randomSeq));
      setCustomerStyleCode(generateCustomerStyleCode(randomSeq));
      setVariantDetails([]);
    }
  }, [initialProduct, isOpen]);

  // Auto-generate variants from Color & Size
  const handleAutoGenerateVariants = () => {
    const colorsArray = availableColorsInput
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    const activeSizeRange = sizeRange === "Custom" ? sizeRangeCustom : sizeRange;
    const generated = generateVariantMatrix(sku, colorsArray, activeSizeRange, 100);
    setVariantDetails(generated);
  };

  const handleAddManualVariant = () => {
    const newVariant: VariantDetail = {
      id: `var-${Date.now()}`,
      color: color || "Default",
      size: "M",
      sku: `${sku || "SKU"}-${(color || "COL").slice(0, 3).toUpperCase()}-M`,
      barcode: `890${Math.floor(100000000 + Math.random() * 900000000)}`,
      stockQty: 50,
      priceAdjustment: 0,
      status: "In Stock",
    };
    setVariantDetails([...variantDetails, newVariant]);
  };

  const handleRemoveVariant = (id: string) => {
    setVariantDetails(variantDetails.filter((v) => v.id !== id));
  };

  const handleUpdateVariant = (
    id: string,
    field: keyof VariantDetail,
    val: string | number
  ) => {
    setVariantDetails(
      variantDetails.map((v) => (v.id === id ? { ...v, [field]: val } : v))
    );
  };

  const toggleMarket = (market: string) => {
    if (selectedMarkets.includes(market)) {
      setSelectedMarkets(selectedMarkets.filter((m) => m !== market));
    } else {
      setSelectedMarkets([...selectedMarkets, market]);
    }
  };

  const handleAddCustomMarket = () => {
    if (customMarket.trim() && !selectedMarkets.includes(customMarket.trim())) {
      setSelectedMarkets([...selectedMarkets, customMarket.trim()]);
      setCustomMarket("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const colors = availableColorsInput
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const savedProduct: AdminProduct = {
      id: initialProduct?.id || `prod-${Date.now()}`,
      productCode: productCode.trim() || "ST-0000",
      sku: sku.trim() || "SKU-001",
      purchaseCode: purchaseCode.trim() || "PUR-001",
      productName: productName.trim() || "Untitled Product",
      productStatus,
      featuredProduct,

      productType:
        productType === "Custom" && productTypeCustom
          ? productTypeCustom
          : productType,
      productTypeCustom,
      gender,
      ageGroup,
      category,
      subcategory,
      collection:
        collection === "Custom" && collectionCustom
          ? collectionCustom
          : collection,
      collectionCustom,
      season: season === "Custom" && seasonCustom ? seasonCustom : season,
      seasonCustom,

      developmentDate: {
        month: devMonth,
        year: devYear,
      },
      shipmentDate: {
        month: shipMonth,
        year: shipYear,
      },

      fabric,
      fabricComposition,
      gsm,
      pattern,
      color,
      availableColors: colors.length > 0 ? colors : [color],
      sizeRange:
        sizeRange === "Custom" && sizeRangeCustom ? sizeRangeCustom : sizeRange,
      sizeRangeCustom,

      variant,
      variantDetails: variant === "Yes" ? variantDetails : [],

      factoryCode,
      factoryName,
      factoryPriceEXW,
      fobPrice,
      salePrice,
      fobPort,
      moq,
      quantityUnit,

      readyStockAvailability,
      readyStockQuantity,
      readyStockQuantityUnit,

      customerName,
      customerStyleCode,
      repeatOrder,
      repeatOrderNumber: repeatOrder === "Yes" ? repeatOrderNumber : "None",

      marketSuitability: selectedMarkets,
      description,
      productImage,
      createdAtDate: {
        month: createdMonth,
        year: createdYear,
      },
      updatedAtDate:
        updatedAtDate ||
        `Modified on ${new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })}`,
    };

    onSave(savedProduct);
    onClose();
  };

  const sampleImages = [
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[92vh] flex flex-col p-0 overflow-hidden">
        {/* Sticky Modal Header with Cross Icon */}
        <DialogHeader className="px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-20 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
              M
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                {isEditing ? `Edit Product: ${productCode}` : "Create New Product Entry"}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Configure garment specifications, pricing, factory code and inventory in a single scroll.
              </DialogDescription>
            </div>
          </div>

          {/* Close cross button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-blue-100"
            title="Close modal (Esc)"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-500 hover:text-slate-900" />
          </button>
        </DialogHeader>

        {/* Single Scroll Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10"
        >
          {/* SECTION 1: CORE IDENTIFICATION & VISIBILITY */}
          <section className="space-y-4">
            <div className="border-b border-slate-200 pb-2.5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  1. Core Identification & Visibility
                </h3>
                <p className="text-xs text-slate-500">
                  Primary SKU codes, internal style references, purchase order tags, and visibility status.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Product Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Product Code <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  placeholder="e.g. ST-1001"
                  required
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Internal garment style code
                </span>
              </div>

              {/* SKU */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  SKU <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. DRS-001"
                  required
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Stock Keeping Unit base
                </span>
              </div>

              {/* Purchase Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Purchase Code <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={purchaseCode}
                  onChange={(e) => setPurchaseCode(e.target.value)}
                  placeholder="e.g. PUR-001"
                  required
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Procurement reference
                </span>
              </div>

              {/* Product Name */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Floral Maxi Dress"
                  className="font-medium text-slate-900"
                  required
                />
              </div>

              {/* Product Status (Shadcn Select) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Product Status
                </label>
                <Select
                  value={productStatus}
                  onValueChange={(val) => setProductStatus(val as ProductStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active (In Catalog)</SelectItem>
                    <SelectItem value="Inactive">Inactive (Archived)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Featured Product (Shadcn Select) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Featured Product
                </label>
                <Select
                  value={featuredProduct}
                  onValueChange={(val) => setFeaturedProduct(val as YesNo)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes (Pin to highlights)</SelectItem>
                    <SelectItem value="No">No (Standard catalog)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Product Type (Shadcn Select with custom input) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Product Type
                </label>
                <Select
                  value={productType}
                  onValueChange={(val) => setProductType(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypeOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {productType === "Custom" && (
                  <Input
                    type="text"
                    value={productTypeCustom}
                    onChange={(e) => setProductTypeCustom(e.target.value)}
                    placeholder="Type custom product type..."
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </section>

          {/* SECTION 2: CLASSIFICATION & FABRIC SPECS */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-slate-200 pb-2.5 flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  2. Classification & Fabric Specifications
                </h3>
                <p className="text-xs text-slate-500">
                  Target demographic, apparel category, yarn, fabric blend, GSM and size range.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Gender
                </label>
                <Select
                  value={gender}
                  onValueChange={(val) => setGender(val as GenderType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Men">Men</SelectItem>
                    <SelectItem value="Unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age Group */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Age Group
                </label>
                <Select
                  value={ageGroup}
                  onValueChange={(val) => setAgeGroup(val as AgeGroupType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Adult">Adult</SelectItem>
                    <SelectItem value="Teen">Teen</SelectItem>
                    <SelectItem value="Kids">Kids</SelectItem>
                    <SelectItem value="Toddler">Toddler</SelectItem>
                    <SelectItem value="Infant">Infant</SelectItem>
                    <SelectItem value="Newborn">Newborn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Category
                </label>
                <Select
                  value={category}
                  onValueChange={(val) => {
                    const newCat = val as MainCategory;
                    setCategory(newCat);
                    const subs = categoriesList[newCat] || [];
                    if (subs.length > 0) setSubcategory(subs[0]);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(categoriesList).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Subcategory
                </label>
                <Select
                  value={subcategory}
                  onValueChange={(val) => setSubcategory(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {(categoriesList[category] || ["General"]).map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Collection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Collection
                </label>
                <Select
                  value={collection}
                  onValueChange={(val) => setCollection(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {collectionOptions.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {collection === "Custom" && (
                  <Input
                    type="text"
                    value={collectionCustom}
                    onChange={(e) => setCollectionCustom(e.target.value)}
                    placeholder="Type custom collection name..."
                    className="mt-2"
                  />
                )}
              </div>

              {/* Season */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Season
                </label>
                <Select
                  value={season}
                  onValueChange={(val) => setSeason(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasonOptions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {season === "Custom" && (
                  <Input
                    type="text"
                    value={seasonCustom}
                    onChange={(e) => setSeasonCustom(e.target.value)}
                    placeholder="e.g. Resort 2027..."
                    className="mt-2"
                  />
                )}
              </div>

              {/* Fabric */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Fabric
                </label>
                <Input
                  type="text"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  placeholder="e.g. Cotton / Viscose / Linen"
                />
              </div>

              {/* Fabric Composition */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Fabric Composition
                </label>
                <Input
                  type="text"
                  value={fabricComposition}
                  onChange={(e) => setFabricComposition(e.target.value)}
                  placeholder="e.g. 100% Cotton"
                />
              </div>

              {/* GSM */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  GSM (Fabric Weight)
                </label>
                <Input
                  type="text"
                  value={gsm}
                  onChange={(e) => setGsm(e.target.value)}
                  placeholder="e.g. 120"
                />
              </div>

              {/* Pattern */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Pattern
                </label>
                <Input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="e.g. Solid / Printed / Floral / Striped"
                />
              </div>

              {/* Base Color */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Base / Primary Color
                </label>
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Blue"
                />
              </div>

              {/* Size Range */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Size Range
                </label>
                <Select
                  value={sizeRange}
                  onValueChange={(val) => setSizeRange(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size range" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultSizeRanges.map((sz) => (
                      <SelectItem key={sz} value={sz}>
                        {sz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {sizeRange === "Custom" && (
                  <Input
                    type="text"
                    value={sizeRangeCustom}
                    onChange={(e) => setSizeRangeCustom(e.target.value)}
                    placeholder="e.g. 2, 4, 6, 8, 10, 12"
                    className="mt-2"
                  />
                )}
              </div>

              {/* Available Colors */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Available Colors (Auto-fill or comma-separated list)
                </label>
                <Input
                  type="text"
                  value={availableColorsInput}
                  onChange={(e) => setAvailableColorsInput(e.target.value)}
                  placeholder="e.g. Blue, Pink, Green, White"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {availableColorsInput
                    .split(",")
                    .map((c) => c.trim())
                    .filter(Boolean)
                    .map((col, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        {col}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: VARIANT MATRIX */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-slate-200 pb-2.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    3. Variant Matrix & SKU Combinations
                  </h3>
                  <p className="text-xs text-slate-500">
                    Defines SKU variants for each combination of color & size with inventory and barcode tracking.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-700">Enable Variants:</span>
                <div className="w-36">
                  <Select
                    value={variant}
                    onValueChange={(val) => setVariant(val as YesNo)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes (Multi-Variant)</SelectItem>
                      <SelectItem value="No">No (Single SKU)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {variant === "Yes" ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 space-y-1">
                    <span className="font-semibold text-blue-900 block">
                      How Variants Work in Maya Garments ERP:
                    </span>
                    <p>
                      A variant represents one specific salable unit combination (e.g. <b>{sku || "DRS-001"}</b> in <b>Blue</b>, size <b>Medium</b> = <code>{sku || "DRS-001"}-BLU-M</code>). You can generate the entire matrix automatically from your selected Colors ({availableColorsInput || "none"}) and Sizes ({sizeRange}).
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleAutoGenerateVariants}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Auto-Generate Matrix from Colors & Sizes
                  </button>
                  <button
                    type="button"
                    onClick={handleAddManualVariant}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition"
                  >
                    <Plus className="w-3.5 h-3.5 text-slate-500" />
                    Add Single Variant
                  </button>
                </div>

                {variantDetails.length > 0 ? (
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                    <div className="max-h-80 overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200 sticky top-0 z-1">
                          <tr>
                            <th className="py-2.5 px-3">Variant SKU</th>
                            <th className="py-2.5 px-3">Color</th>
                            <th className="py-2.5 px-3">Size</th>
                            <th className="py-2.5 px-3">Barcode</th>
                            <th className="py-2.5 px-3 text-right">Stock Qty</th>
                            <th className="py-2.5 px-3 text-center">Status</th>
                            <th className="py-2.5 px-3 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {variantDetails.map((v) => (
                            <tr key={v.id} className="hover:bg-slate-50/50">
                              <td className="py-2 px-3 font-mono">
                                <Input
                                  type="text"
                                  value={v.sku}
                                  onChange={(e) =>
                                    handleUpdateVariant(v.id, "sku", e.target.value)
                                  }
                                  className="font-mono text-xs h-8"
                                />
                              </td>
                              <td className="py-2 px-3">
                                <Input
                                  type="text"
                                  value={v.color}
                                  onChange={(e) =>
                                    handleUpdateVariant(v.id, "color", e.target.value)
                                  }
                                  className="w-24 text-xs h-8"
                                />
                              </td>
                              <td className="py-2 px-3">
                                <Input
                                  type="text"
                                  value={v.size}
                                  onChange={(e) =>
                                    handleUpdateVariant(v.id, "size", e.target.value)
                                  }
                                  className="w-16 text-xs h-8 text-center font-semibold"
                                />
                              </td>
                              <td className="py-2 px-3 font-mono">
                                <Input
                                  type="text"
                                  value={v.barcode}
                                  onChange={(e) =>
                                    handleUpdateVariant(v.id, "barcode", e.target.value)
                                  }
                                  className="w-32 text-xs font-mono h-8"
                                />
                              </td>
                              <td className="py-2 px-3 text-right">
                                <Input
                                  type="number"
                                  value={v.stockQty}
                                  onChange={(e) =>
                                    handleUpdateVariant(
                                      v.id,
                                      "stockQty",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-20 text-xs text-right h-8"
                                />
                              </td>
                              <td className="py-2 px-3 text-center">
                                <div className="w-28 mx-auto">
                                  <Select
                                    value={v.status}
                                    onValueChange={(val) =>
                                      handleUpdateVariant(
                                        v.id,
                                        "status",
                                        val as VariantDetail["status"]
                                      )
                                    }
                                  >
                                    <SelectTrigger className="h-8 text-[11px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="In Stock">In Stock</SelectItem>
                                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </td>
                              <td className="py-2 px-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveVariant(v.id)}
                                  className="p-1 text-slate-400 hover:text-red-600 transition"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 border-2 border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-500">
                    Click &quot;Auto-Generate Matrix from Colors & Sizes&quot; above to build all variant SKU combinations.
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center text-slate-500 text-xs bg-slate-50 rounded-xl border border-slate-200">
                Variants disabled for this product. The single base SKU <b>{sku}</b> will be used for all stock tracking.
              </div>
            )}
          </section>

          {/* SECTION 4: FACTORY SOURCING & COMMERCIAL PRICING */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-slate-200 pb-2.5 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  4. Manufacturing Factory Sourcing & Commercial Pricing
                </h3>
                <p className="text-xs text-slate-500">
                  Auto-generated factory identification code, database sourcing, export ports and pricing margins.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Factory Code */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Factory Code <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFactoryCode(
                        generateFactoryCode(Math.floor(1 + Math.random() * 99))
                      )
                    }
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Auto-Gen (F26-xxx)
                  </button>
                </div>
                <Input
                  type="text"
                  value={factoryCode}
                  onChange={(e) => setFactoryCode(e.target.value)}
                  placeholder="e.g. F26-001"
                  required
                  className="font-mono font-semibold"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Auto-generated with current 2-digit year prefix (F26)
                </span>
              </div>

              {/* Factory Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Factory Name (Select or Input)
                </label>
                <Select
                  value={factoryName}
                  onValueChange={(val) => setFactoryName(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Factory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Registered Mills</SelectLabel>
                      {factories.map((f) => (
                        <SelectItem key={f.id} value={f.name}>
                          {f.name} ({f.country})
                        </SelectItem>
                      ))}
                      <SelectItem value="ABC Garments">ABC Garments</SelectItem>
                      <SelectItem value="Custom">Other / Enter Below...</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {factoryName === "Custom" && (
                  <Input
                    type="text"
                    onChange={(e) => setFactoryName(e.target.value)}
                    placeholder="Type factory name..."
                    className="mt-2"
                  />
                )}
              </div>

              {/* FOB Port */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  FOB Port
                </label>
                <Select
                  value={fobPort}
                  onValueChange={(val) => setFobPort(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select FOB Port" />
                  </SelectTrigger>
                  <SelectContent>
                    {fobPorts.map((port) => (
                      <SelectItem key={port} value={port}>
                        {port}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Factory Price EXW */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Factory Price (EXW)
                </label>
                <Input
                  type="text"
                  value={factoryPriceEXW}
                  onChange={(e) => setFactoryPriceEXW(e.target.value)}
                  placeholder="e.g. $7.20"
                  className="font-medium"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Ex-Works factory purchase price
                </span>
              </div>

              {/* FOB Price */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  FOB Price
                </label>
                <Input
                  type="text"
                  value={fobPrice}
                  onChange={(e) => setFobPrice(e.target.value)}
                  placeholder="e.g. $8.00"
                  className="font-medium"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Free on Board export price
                </span>
              </div>

              {/* Sale Price */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Sale Price
                </label>
                <Input
                  type="text"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  placeholder="e.g. $8.50"
                  className="font-medium"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Final buyer quoting price
                </span>
              </div>

              {/* MOQ */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  MOQ (Minimum Order Qty)
                </label>
                <Input
                  type="text"
                  value={moq}
                  onChange={(e) => setMoq(e.target.value)}
                  placeholder="e.g. 500"
                />
              </div>

              {/* Quantity Unit */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Quantity Unit
                </label>
                <Select
                  value={quantityUnit}
                  onValueChange={(val) =>
                    setQuantityUnit(val as QuantityUnitType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {quantityUnitOptions.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* SECTION 5: BUYER ACCOUNT, SCHEDULE & READY STOCK */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-slate-200 pb-2.5 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  5. Buyer Account, Schedule & Ready Stock Inventory
                </h3>
                <p className="text-xs text-slate-500">
                  Customer style code auto-generation, repeat order history, shipment target dates and ready stock.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Customer Name (Buyer)
                </label>
                <Select
                  value={customerName}
                  onValueChange={(val) => setCustomerName(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Buyer Accounts</SelectLabel>
                      {customers.map((c) => (
                        <SelectItem key={c.id} value={c.name}>
                          {c.name} ({c.country})
                        </SelectItem>
                      ))}
                      <SelectItem value="XYZ Fashion">XYZ Fashion</SelectItem>
                      <SelectItem value="Custom">Other Customer...</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Style Code */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Customer Style Code <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setCustomerStyleCode(
                        generateCustomerStyleCode(Math.floor(1 + Math.random() * 99))
                      )
                    }
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Auto-Gen (C26-xxx)
                  </button>
                </div>
                <Input
                  type="text"
                  value={customerStyleCode}
                  onChange={(e) => setCustomerStyleCode(e.target.value)}
                  placeholder="e.g. C26-001 or XYZ-1001"
                  required
                  className="font-mono font-semibold"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Prefix C with current 2-digit year (C26-001)
                </span>
              </div>

              {/* Repeat Order */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Repeat Order
                </label>
                <Select
                  value={repeatOrder}
                  onValueChange={(val) => setRepeatOrder(val as YesNo)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No">No (Initial / First Run)</SelectItem>
                    <SelectItem value="Yes">Yes (Repeat Order)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Repeat Order Number */}
              {repeatOrder === "Yes" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Repeat Order Number
                  </label>
                  <Select
                    value={repeatOrderNumber}
                    onValueChange={(val) =>
                      setRepeatOrderNumber(
                        val as "1st" | "2nd" | "3rd" | "None"
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st">1st Repeat</SelectItem>
                      <SelectItem value="2nd">2nd Repeat</SelectItem>
                      <SelectItem value="3rd">3rd Repeat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Development Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Development Date (Month & Year)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    value={devMonth}
                    onValueChange={(val) => setDevMonth(val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {monthsList.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={devYear}
                    onValueChange={(val) => setDevYear(val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {yearsList.map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Shipment Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Shipment Date (Month & Year)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    value={shipMonth}
                    onValueChange={(val) => setShipMonth(val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {monthsList.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={shipYear}
                    onValueChange={(val) => setShipYear(val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {yearsList.map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Ready Stock Availability */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Ready Stock Availability
                </label>
                <Select
                  value={readyStockAvailability}
                  onValueChange={(val) =>
                    setReadyStockAvailability(val as YesNo)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes (Stock On Hand)</SelectItem>
                    <SelectItem value="No">No (Production on Order)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ready Stock Quantity */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Ready Stock Quantity
                </label>
                <Input
                  type="text"
                  value={readyStockQuantity}
                  onChange={(e) => setReadyStockQuantity(e.target.value)}
                  placeholder="e.g. 2500"
                />
              </div>

              {/* Ready Stock Quantity Unit */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Ready Stock Quantity Unit
                </label>
                <Select
                  value={readyStockQuantityUnit}
                  onValueChange={(val) =>
                    setReadyStockQuantityUnit(val as QuantityUnitType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {quantityUnitOptions.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Market Suitability */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Market Suitability (Multi-select tags + custom addition)
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {marketOptions.map((m) => {
                    const isSel = selectedMarkets.includes(m);
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => toggleMarket(m)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                          isSel
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                        }`}
                      >
                        {m} {isSel && "✓"}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={customMarket}
                    onChange={(e) => setCustomMarket(e.target.value)}
                    placeholder="Add another custom market (e.g. Scandinavia, GCC)..."
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomMarket}
                    className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition"
                  >
                    Add Market
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: MEDIA, DESCRIPTION & AUDIT DATES */}
          <section className="space-y-4 pt-2">
            <div className="border-b border-slate-200 pb-2.5 flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  6. Media, Technical Description & Timestamp History
                </h3>
                <p className="text-xs text-slate-500">
                  Visual garment preview photo, tech description, record creation date and latest update memo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Visual Preview */}
              <div className="md:col-span-4 space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Live Garment Image Preview
                </label>
                <div className="aspect-3/4 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center relative shadow-xs">
                  {productImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={productImage}
                      alt="Product Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-xs text-slate-400 text-center p-4">
                      <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      No image URL provided
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Choose from Quick Garment Gallery:
                  </label>
                  <div className="grid grid-cols-6 gap-1.5">
                    {sampleImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setProductImage(img)}
                        className={`aspect-square rounded-md overflow-hidden border-2 transition ${
                          productImage === img
                            ? "border-blue-600 scale-105"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt={`Preset ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inputs */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Product Image URL or Path
                  </label>
                  <Input
                    type="text"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... or /products/sample.jpg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Description (Short product description)
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter short technical and aesthetic description..."
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
                  />
                </div>

                {/* Created At Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Created At Date (Month & Year)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={createdMonth}
                      onValueChange={(val) => setCreatedMonth(val)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {monthsList.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={createdYear}
                      onValueChange={(val) => setCreatedYear(val)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {yearsList.map((y) => (
                          <SelectItem key={y} value={y}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Updated At Note (Title / Short description of update)
                  </label>
                  <Input
                    type="text"
                    value={updatedAtDate}
                    onChange={(e) => setUpdatedAtDate(e.target.value)}
                    placeholder="e.g. Updated cost sheet and FOB port on Oct 2026"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Sticky Form Actions Footer */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between sticky bottom-0 bg-white py-4 -mb-8 -mx-8 px-8 z-10">
            <div className="text-xs text-slate-500">
              Maya ERP &bull; Single Scroll Garment Form
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                {isEditing ? "Save Changes" : "Create Product Record"}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
