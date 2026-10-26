import type { ErpFormValues, Product, ProductVariant } from "./types";

export const YES_NO = ["Yes", "No"] as const;
export const PRODUCT_STATUSES = ["Active", "Inactive"] as const;
export const PRODUCT_TYPES = ["New Developed", "Shipment Sample", "Customer Sample"] as const;
export const GENDERS = ["Women", "Men", "Unisex"] as const;
export const AGE_GROUPS = ["Newborn", "Infant", "Toddler", "Kids", "Teen", "Adult"] as const;
export const GARMENT_CATEGORIES = [
  "Dress",
  "Top",
  "Shirt",
  "Trousers",
  "Outerwear",
  "Knitwear",
  "Other",
] as const;
export const QUANTITY_UNITS = [
  "Pcs",
  "Sets",
  "Dozens",
  "Pairs",
  "Yards",
  "Meters",
  "Packs",
  "Cartons",
] as const;
export const MARKETS = ["USA", "UK", "Europe", "UAE"] as const;
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
export const VARIANT_STATUSES = ["In Stock", "Low Stock", "Out of Stock"] as const;
export const REPEAT_NUMBERS = ["None", "1st", "2nd", "3rd"] as const;
export const SIZE_PRESETS = ["S, M, L, XL", "XS, S, M, L, XL, XXL", "28, 30, 32, 34, 36", "Free Size"] as const;
export const SEASON_PRESETS = ["SS26", "AW26", "Resort", "Holiday"] as const;
export const COLLECTION_PRESETS = ["Summer Collection", "Winter Collection", "Resort", "Core"] as const;
export const CUSTOMER_TIERS = ["Key Account", "Retail Brand", "Boutique", "Wholesale"] as const;
export const MAX_VARIANTS = 200;

export function yearOptions() {
  const current = new Date().getFullYear();
  const years: string[] = [];
  for (let year = current - 4; year <= current + 3; year += 1) {
    years.push(String(year));
  }
  return years;
}

export function emptyErpForm(): ErpFormValues {
  return {
    sku: "",
    purchaseCode: "",
    productType: "",
    productTypeCustom: "",
    gender: "",
    ageGroup: "",
    garmentCategory: "",
    subcategory: "",
    collection: "",
    collectionCustom: "",
    season: "",
    seasonCustom: "",
    developmentMonth: "",
    developmentYear: "",
    shipmentMonth: "",
    shipmentYear: "",
    fabric: "",
    fabricComposition: "",
    gsm: "",
    pattern: "",
    color: "",
    availableColorsInput: "",
    sizeRange: "",
    sizeRangeCustom: "",
    variant: "No",
    variantDetails: [],
    factoryId: "",
    factoryPriceEXW: "",
    salePrice: "",
    fobPrice: "",
    fobPort: "",
    moq: "",
    quantityUnit: "Pcs",
    readyStockAvailability: "No",
    readyStockQuantity: "",
    readyStockQuantityUnit: "Pcs",
    customerId: "",
    customerStyleCode: "",
    repeatOrder: "No",
    repeatOrderNumber: "None",
    productStatus: "Active",
    featuredProduct: "No",
    marketSuitability: [],
  };
}

function presetOrCustom(value: string | undefined, presets: readonly string[]) {
  if (!value) return { value: "", custom: "" };
  if ((presets as readonly string[]).includes(value)) return { value, custom: "" };
  return { value: "Custom", custom: value };
}

export function productToErpForm(product?: Product | null): ErpFormValues {
  const empty = emptyErpForm();
  if (!product) return empty;
  const productType = presetOrCustom(product.productType, PRODUCT_TYPES);
  const collection = presetOrCustom(product.collection, COLLECTION_PRESETS);
  const season = presetOrCustom(product.season, SEASON_PRESETS);
  const sizeRange = presetOrCustom(product.sizeRange, SIZE_PRESETS);
  return {
    ...empty,
    sku: product.sku || product.productCode || "",
    purchaseCode: product.purchaseCode || "",
    productType: productType.value,
    productTypeCustom: productType.custom,
    gender: product.gender || "",
    ageGroup: product.ageGroup || "",
    garmentCategory: product.garmentCategory || "",
    subcategory: product.subcategory || "",
    collection: collection.value,
    collectionCustom: collection.custom,
    season: season.value,
    seasonCustom: season.custom,
    developmentMonth: product.developmentDate?.month || "",
    developmentYear: product.developmentDate?.year || "",
    shipmentMonth: product.shipmentDate?.month || "",
    shipmentYear: product.shipmentDate?.year || "",
    fabric: product.fabric || "",
    fabricComposition: product.fabricComposition || "",
    gsm: product.gsm || "",
    pattern: product.pattern || "",
    color: product.color || "",
    availableColorsInput: (product.availableColors || []).join(", "),
    sizeRange: sizeRange.value,
    sizeRangeCustom: sizeRange.custom,
    variant: product.variant === "Yes" ? "Yes" : "No",
    variantDetails: (product.variantDetails || []).map((row) => ({
      color: row.color || "",
      size: row.size || "",
      sku: row.sku || "",
      barcode: row.barcode || "",
      stockQty: Number(row.stockQty) || 0,
      priceAdjustment: Number(row.priceAdjustment) || 0,
      status: row.status || "In Stock",
    })),
    factoryId: product.factory?.id || "",
    factoryPriceEXW: product.factoryPriceEXW || "",
    salePrice: product.salePrice || "",
    fobPrice: product.fobPrice || "",
    fobPort: product.fobPort || "",
    moq: product.moq || "",
    quantityUnit: product.quantityUnit || "Pcs",
    readyStockAvailability: product.readyStockAvailability === "Yes" ? "Yes" : "No",
    readyStockQuantity: product.readyStockQuantity || "",
    readyStockQuantityUnit: product.readyStockQuantityUnit || "Pcs",
    customerId: product.customer?.id || "",
    customerStyleCode: product.customerStyleCode || "",
    repeatOrder: product.repeatOrder === "Yes" ? "Yes" : "No",
    repeatOrderNumber: product.repeatOrderNumber || "None",
    productStatus: product.productStatus === "Inactive" ? "Inactive" : "Active",
    featuredProduct: product.featuredProduct === "Yes" ? "Yes" : "No",
    marketSuitability: product.marketSuitability || [],
  };
}

function chosenValue(selected: string, custom: string) {
  if (selected === "Custom") return custom.trim();
  return selected.trim();
}

function parseCsv(value: string, max = 30) {
  return [...new Set(value.split(",").map((item) => item.trim()).filter(Boolean))].slice(0, max);
}

export function parseColors(value: string) {
  return parseCsv(value, 30);
}

function skuToken(value: string, length = 3) {
  return value.replace(/[^a-zA-Z0-9]/g, "").slice(0, length).toUpperCase() || "X";
}

export function buildVariantSku(base: string, color: string, size: string) {
  return `${base.trim() || "SKU"}-${skuToken(color)}-${skuToken(size, 4)}`;
}

export function generateVariantMatrix(
  baseSku: string,
  colors: string[],
  sizeRange: string
): ProductVariant[] {
  const sizes = parseCsv(sizeRange, 40);
  const rows: ProductVariant[] = [];
  for (const color of colors) {
    for (const size of sizes) {
      rows.push({
        color,
        size,
        sku: buildVariantSku(baseSku, color, size),
        barcode: "",
        stockQty: 0,
        priceAdjustment: 0,
        status: "In Stock",
      });
      if (rows.length >= MAX_VARIANTS) return rows;
    }
  }
  return rows;
}

export function validateErpForm(erp: ErpFormValues): string {
  if (erp.variant === "Yes") {
    const rows = erp.variantDetails.filter((row) => row.sku.trim() && row.color.trim() && row.size.trim());
    if (rows.length === 0) {
      return "Add at least one complete variant (color, size, SKU) or set Variants to No";
    }
    const seen = new Set<string>();
    for (const row of rows) {
      const key = row.sku.trim().toLowerCase();
      if (seen.has(key)) return `Duplicate variant SKU: ${row.sku.trim()}`;
      seen.add(key);
    }
  }
  return "";
}

export function toErpPayload(erp: ErpFormValues) {
  return {
    sku: erp.sku.trim(),
    purchaseCode: erp.purchaseCode.trim(),
    productType: chosenValue(erp.productType, erp.productTypeCustom),
    gender: erp.gender,
    ageGroup: erp.ageGroup,
    garmentCategory: erp.garmentCategory,
    subcategory: erp.subcategory.trim(),
    collection: chosenValue(erp.collection, erp.collectionCustom),
    season: chosenValue(erp.season, erp.seasonCustom),
    developmentDate: {
      month: erp.developmentMonth,
      year: erp.developmentYear,
    },
    shipmentDate: {
      month: erp.shipmentMonth,
      year: erp.shipmentYear,
    },
    fabric: erp.fabric.trim(),
    fabricComposition: erp.fabricComposition.trim(),
    gsm: erp.gsm.trim(),
    pattern: erp.pattern.trim(),
    color: erp.color.trim(),
    availableColors: parseColors(erp.availableColorsInput),
    sizeRange: chosenValue(erp.sizeRange, erp.sizeRangeCustom),
    variant: erp.variant,
    variantDetails:
      erp.variant === "Yes"
        ? erp.variantDetails
            .filter((row) => row.sku.trim() && row.color.trim() && row.size.trim())
            .map((row) => ({
              color: row.color.trim(),
              size: row.size.trim(),
              sku: row.sku.trim(),
              barcode: row.barcode.trim(),
              stockQty: Number.isFinite(row.stockQty) ? Math.max(0, row.stockQty) : 0,
              priceAdjustment: Number.isFinite(row.priceAdjustment) ? row.priceAdjustment : 0,
              status: row.status || "In Stock",
            }))
        : [],
    factoryId: erp.factoryId,
    factoryPriceEXW: erp.factoryPriceEXW.trim(),
    salePrice: erp.salePrice.trim(),
    fobPrice: erp.fobPrice.trim(),
    fobPort: erp.fobPort.trim(),
    moq: erp.moq.trim(),
    quantityUnit: erp.quantityUnit || "Pcs",
    readyStockAvailability: erp.readyStockAvailability,
    readyStockQuantity: erp.readyStockQuantity.trim(),
    readyStockQuantityUnit: erp.readyStockQuantityUnit || "Pcs",
    customerId: erp.customerId,
    customerStyleCode: erp.customerStyleCode.trim(),
    repeatOrder: erp.repeatOrder,
    repeatOrderNumber: erp.repeatOrderNumber,
    productStatus: erp.productStatus,
    featuredProduct: erp.featuredProduct,
    marketSuitability: erp.marketSuitability.map((item) => item.trim()).filter(Boolean).slice(0, 20),
  };
}
