import type { CustomerLink, ErpFormValues, Product, ProductSubVariant, ProductVariant } from "./types";

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
export const MAX_VARIANTS = 20;
export const MAX_SUB_VARIANTS = 20;
export const MAX_VARIANT_FIELDS = 10;
export const MAX_CUSTOMERS = 10;

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
    primarySubVariants: [],
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
    customers: [],
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
    variantDetails: (product.variantDetails || []).map((row, index) => {
      const attributes = (row.attributes || []).map((item) => ({ key: item.key, value: item.value }));
      const color =
        row.color ||
        attributes.find((item) => item.key.trim().toLowerCase() === "color")?.value ||
        "";
      const size =
        row.size ||
        attributes.find((item) => item.key.trim().toLowerCase() === "size")?.value ||
        "";
      const parentSku = extraVariantSku(product.productCode, index);
      return {
        sku: parentSku,
        title: row.title || "",
        description: row.description || "",
        attributes: attributes.filter((item) => !["color", "size"].includes(item.key.trim().toLowerCase())),
        images: row.images || [],
        drafts: [],
        stockQty: Number(row.stockQty) || 0,
        priceAdjustment: Number(row.priceAdjustment) || 0,
        status: row.status || "In Stock",
        color,
        size,
        barcode: "",
        subVariants: mapSubVariants(row.subVariants, parentSku, color),
      };
    }),
    primarySubVariants: mapSubVariants(
      product.primarySubVariants,
      serialVariantSku(product.productCode, 0),
      product.color || ""
    ),
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
    customers: productCustomers(product),
    productStatus: product.productStatus === "Inactive" ? "Inactive" : "Active",
    featuredProduct: product.featuredProduct === "Yes" ? "Yes" : "No",
    marketSuitability: product.marketSuitability || [],
  };
}

function chosenValue(selected: string, custom: string) {
  if (selected === "Custom") return custom.trim();
  return selected.trim();
}

function payloadAttributes(color: string, size: string, attributes: { key: string; value: string }[]) {
  return [
    ...(color.trim() ? [{ key: "Color", value: color.trim() }] : []),
    ...(size.trim() ? [{ key: "Size", value: size.trim() }] : []),
    ...(attributes || [])
      .map((item) => ({ key: item.key.trim(), value: item.value.trim() }))
      .filter((item) => item.key && item.value && !["color", "size"].includes(item.key.toLowerCase())),
  ];
}

function payloadSubVariants(rows: ProductSubVariant[] | undefined) {
  return (rows || []).map((row) => ({
    title: row.title.trim(),
    attributes: payloadAttributes(row.color, row.size, row.attributes),
    color: row.color.trim(),
    size: row.size.trim(),
    images: (row.images || []).filter(Boolean).slice(0, 5),
    stockQty: Number.isFinite(row.stockQty) ? Math.max(0, row.stockQty) : 0,
    priceAdjustment: Number.isFinite(row.priceAdjustment) ? row.priceAdjustment : 0,
    status: row.status || "In Stock",
  }));
}

function parseCsv(value: string, max = 30) {
  return [...new Set(value.split(",").map((item) => item.trim()).filter(Boolean))].slice(0, max);
}

export function parseColors(value: string) {
  return parseCsv(value, 30);
}

export function serialVariantSku(productCode: string, index: number) {
  const base = productCode.trim().toUpperCase() || "CODE";
  return `${base}-${index + 1}`;
}

export function extraVariantSku(productCode: string, extraIndex: number) {
  return serialVariantSku(productCode, extraIndex + 1);
}

export function subVariantSku(parentSku: string, index: number) {
  return `${parentSku}-${index + 1}`;
}

export function catalogColorList(erp: ErpFormValues): string[] {
  const listed = parseColors(erp.availableColorsInput);
  if (listed.length) return listed;
  return erp.color.trim() ? [erp.color.trim()] : [];
}

export function catalogSizeList(erp: ErpFormValues): string[] {
  return catalogSizeSeed(erp)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function mapSubVariants(
  rows: Product["primarySubVariants"] | ProductVariant["subVariants"],
  parentSku: string,
  fallbackColor: string
): ProductSubVariant[] {
  return (rows || []).map((row, index) => {
    const attributes = (row.attributes || []).map((item) => ({ key: item.key, value: item.value }));
    return {
      sku: subVariantSku(parentSku, index),
      title: row.title || "",
      color:
        row.color ||
        attributes.find((item) => item.key.trim().toLowerCase() === "color")?.value ||
        fallbackColor,
      size:
        row.size ||
        attributes.find((item) => item.key.trim().toLowerCase() === "size")?.value ||
        "",
      attributes: attributes.filter((item) => !["color", "size"].includes(item.key.trim().toLowerCase())),
      images: row.images || [],
      drafts: [],
      stockQty: Number(row.stockQty) || 0,
      priceAdjustment: Number(row.priceAdjustment) || 0,
      status: row.status || "In Stock",
    };
  });
}

export function emptySubVariant(
  parentSku: string,
  index: number,
  seed?: { color?: string; size?: string }
): ProductSubVariant {
  return {
    sku: subVariantSku(parentSku, index),
    title: "",
    color: seed?.color || "",
    size: seed?.size || "",
    attributes: [],
    images: [],
    drafts: [],
    stockQty: 0,
    priceAdjustment: 0,
    status: "In Stock",
  };
}

function stampSubs(parentSku: string, rows: ProductSubVariant[]): ProductSubVariant[] {
  return rows.slice(0, MAX_SUB_VARIANTS).map((row, index) => ({
    ...row,
    sku: subVariantSku(parentSku, index),
  }));
}

function mergeSizeSubs(
  existing: ProductSubVariant[] | undefined,
  sizes: string[],
  parentSku: string,
  parentColor: string
): ProductSubVariant[] {
  const current = existing || [];
  if (!sizes.length) return stampSubs(parentSku, current);
  const bySize = new Map(
    current
      .filter((row) => row.size.trim())
      .map((row) => [row.size.trim().toLowerCase(), row] as const)
  );
  const used = new Set<string>();
  const merged = sizes.map((size, index) => {
    const prev = bySize.get(size.toLowerCase());
    if (prev) {
      used.add(size.toLowerCase());
      return {
        ...prev,
        size,
        color: prev.color || parentColor,
        sku: subVariantSku(parentSku, index),
      };
    }
    return emptySubVariant(parentSku, index, { color: parentColor, size });
  });
  for (const row of current) {
    const key = row.size.trim().toLowerCase();
    if (key && used.has(key)) continue;
    merged.push(row);
  }
  return stampSubs(parentSku, merged);
}

export function syncVariantsFromCatalog(productCode: string, erp: ErpFormValues): Partial<ErpFormValues> {
  const colors = catalogColorList(erp);
  const sizes = catalogSizeList(erp);
  const colorParents = colors.length > 0;
  const parentValues = colorParents ? colors : sizes;
  const primarySku = serialVariantSku(productCode || "MG-001", 0);

  if (parentValues.length === 0) {
    return {
      primarySubVariants: stampSubs(primarySku, erp.primarySubVariants || []),
    };
  }

  const extraNeeded = Math.min(MAX_VARIANTS, Math.max(erp.variantDetails.length, parentValues.length - 1));
  const extras = [...erp.variantDetails];
  while (extras.length < extraNeeded) {
    extras.push(emptyVariant(productCode, extras.length));
  }

  const stamped = extras.map((row, index) => {
    const sku = extraVariantSku(productCode, index);
    const assigned = parentValues[index + 1] || "";
    const color = colorParents ? assigned || row.color || "" : row.color || "";
    const size = colorParents ? row.size || "" : assigned || row.size || "";
    const subVariants =
      colorParents && sizes.length
        ? mergeSizeSubs(row.subVariants, sizes, sku, color)
        : stampSubs(sku, row.subVariants || []);
    return { ...row, sku, color, size, subVariants };
  });

  const primaryColor = colorParents ? parentValues[0] : erp.color;
  const primarySubVariants =
    colorParents && sizes.length
      ? mergeSizeSubs(erp.primarySubVariants, sizes, primarySku, primaryColor)
      : stampSubs(primarySku, erp.primarySubVariants || []);

  return {
    color: primaryColor || erp.color,
    variant: stamped.length > 0 ? "Yes" : erp.variant,
    variantDetails: stamped,
    primarySubVariants,
  };
}

export function emptyCustomerLink(): CustomerLink {
  return {
    customerId: "",
    styleCode: "",
    repeatOrder: "No",
    repeatOrderNumber: "None",
  };
}

function productCustomers(product: Product): CustomerLink[] {
  if (product.customers?.length) {
    return product.customers.map((item) => ({
      customerId: item.id,
      styleCode: item.styleCode || "",
      repeatOrder: item.repeatOrder === "Yes" ? "Yes" : "No",
      repeatOrderNumber:
        item.repeatOrderNumber === "1st" || item.repeatOrderNumber === "2nd" || item.repeatOrderNumber === "3rd"
          ? item.repeatOrderNumber
          : "None",
    }));
  }
  if (!product.customer?.id) return [];
  return [
    {
      customerId: product.customer.id,
      styleCode: product.customerStyleCode || "",
      repeatOrder: product.repeatOrder === "Yes" ? "Yes" : "No",
      repeatOrderNumber: product.repeatOrderNumber || "None",
    },
  ];
}

export function catalogColorSeed(erp: ErpFormValues): string {
  return erp.color.trim() || parseColors(erp.availableColorsInput)[0] || "";
}

export function catalogSizeSeed(erp: ErpFormValues): string {
  return chosenValue(erp.sizeRange, erp.sizeRangeCustom);
}

export function catalogColorSuggestions(erp: ErpFormValues): string[] {
  return [...new Set([erp.color.trim(), ...parseColors(erp.availableColorsInput)].filter(Boolean))];
}

export function emptyVariant(
  productCode: string,
  extraIndex: number,
  seed?: { color?: string; size?: string }
): ProductVariant {
  return {
    sku: extraVariantSku(productCode, extraIndex),
    title: "",
    description: "",
    attributes: [],
    images: [],
    drafts: [],
    stockQty: 0,
    priceAdjustment: 0,
    status: "In Stock",
    color: seed?.color || "",
    size: seed?.size || "",
    barcode: "",
    subVariants: [],
  };
}

export function validateErpForm(erp: ErpFormValues): string {
  if (erp.variant === "Yes" && erp.variantDetails.length === 0) {
    return "Add at least one variant or set Variants to No";
  }
  return "";
}

export function toErpPayload(erp: ErpFormValues) {
  return {
    sku: "",
    purchaseCode: erp.purchaseCode.trim(),
    productType: chosenValue(erp.productType, erp.productTypeCustom),
    gender: erp.gender,
    ageGroup: erp.ageGroup,
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
        ? erp.variantDetails.map((row) => ({
            title: row.title.trim(),
            description: row.description.trim(),
            attributes: payloadAttributes(row.color || "", row.size || "", row.attributes),
            color: row.color?.trim() || "",
            size: row.size?.trim() || "",
            images: (row.images || []).filter(Boolean).slice(0, 5),
            stockQty: Number.isFinite(row.stockQty) ? Math.max(0, row.stockQty) : 0,
            priceAdjustment: Number.isFinite(row.priceAdjustment) ? row.priceAdjustment : 0,
            status: row.status || "In Stock",
            subVariants: payloadSubVariants(row.subVariants),
          }))
        : [],
    primarySubVariants: payloadSubVariants(erp.primarySubVariants),
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
    customerId: erp.customers[0]?.customerId || erp.customerId,
    customerStyleCode: erp.customers[0]?.styleCode.trim() || erp.customerStyleCode.trim(),
    repeatOrder: erp.customers[0]?.repeatOrder || erp.repeatOrder,
    repeatOrderNumber: erp.customers[0]?.repeatOrderNumber || erp.repeatOrderNumber,
    customers: erp.customers
      .filter((item) => item.customerId)
      .map((item) => ({
        customerId: item.customerId,
        styleCode: item.styleCode.trim(),
        repeatOrder: item.repeatOrder,
        repeatOrderNumber: item.repeatOrder === "Yes" ? item.repeatOrderNumber : "None",
      })),
    productStatus: erp.productStatus,
    marketSuitability: erp.marketSuitability.map((item) => item.trim()).filter(Boolean).slice(0, 20),
  };
}
