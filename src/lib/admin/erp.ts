import type {
  CustomerLink,
  ErpFormValues,
  Product,
  ProductAttribute,
  ProductSubVariant,
  ProductVariant,
} from "./types";

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
    primaryAttributes: [],
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
      const parentSku = extraVariantSku(product.productCode, index);
      const subVariants = mapSubVariants(row.subVariants, parentSku, row.color || "");
      return {
        sku: parentSku,
        title: row.title || "",
        description: row.description || "",
        attributes: displayAttributes(row.color || "", row.size || "", row.attributes || [], subVariants),
        images: row.images || [],
        drafts: [],
        stockQty: Number(row.stockQty) || 0,
        priceAdjustment: Number(row.priceAdjustment) || 0,
        status: row.status || "In Stock",
        color: row.color || "",
        size: row.size || "",
        barcode: "",
        subVariants,
      };
    }),
    primaryAttributes: displayAttributes(
      product.color || "",
      "",
      product.primaryAttributes || [],
      product.primarySubVariants
    ),
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

function cleanAttributeList(attributes: ProductAttribute[] | undefined): ProductAttribute[] {
  const out: ProductAttribute[] = [];
  const seen = new Set<string>();
  for (const item of attributes || []) {
    const key = item.key.trim();
    const value = item.value.trim();
    if (!key && !value) {
      out.push({ key: "", value: "" });
      continue;
    }
    const id = key.toLowerCase();
    if (!key || seen.has(id)) continue;
    seen.add(id);
    out.push({ key, value });
  }
  return out.slice(0, MAX_VARIANT_FIELDS);
}

function attributeValue(attributes: ProductAttribute[], name: string): string {
  return attributes.find((item) => item.key.trim().toLowerCase() === name.toLowerCase())?.value.trim() || "";
}

function splitAttributeValues(value: string): string[] {
  return [...new Set(value.split(",").map((item) => item.trim()).filter(Boolean))].slice(0, MAX_SUB_VARIANTS);
}

export function spreadingFields(attributes: ProductAttribute[]): Array<{ key: string; values: string[] }> {
  return cleanAttributeList(attributes)
    .filter((item) => item.key && splitAttributeValues(item.value).length > 1)
    .map((item) => ({ key: item.key, values: splitAttributeValues(item.value) }));
}

export function colorSizeFromAttributes(
  attributes: ProductAttribute[],
  fallbackColor = "",
  fallbackSize = ""
): { color: string; size: string } {
  const spreading = spreadingFields(attributes)[0];
  const color =
    spreading?.key.toLowerCase() === "color" ? "" : attributeValue(attributes, "Color") || fallbackColor;
  const size =
    spreading?.key.toLowerCase() === "size" ? "" : attributeValue(attributes, "Size") || fallbackSize;
  return { color, size };
}

function liftColorSize(color: string, size: string, attributes: ProductAttribute[]): ProductAttribute[] {
  const next = cleanAttributeList(attributes).filter((item) => item.key);
  if (color.trim() && !next.some((item) => item.key.toLowerCase() === "color")) {
    next.unshift({ key: "Color", value: color.trim() });
  }
  if (size.trim() && !next.some((item) => item.key.toLowerCase() === "size")) {
    const colorOffset = next.some((item) => item.key.toLowerCase() === "color") ? 1 : 0;
    next.splice(colorOffset, 0, { key: "Size", value: size.trim() });
  }
  return next.slice(0, MAX_VARIANT_FIELDS);
}

function inferSpreadingAttribute(subs: ProductSubVariant[] | undefined): ProductAttribute | null {
  if (!subs?.length) return null;
  const sizes = [...new Set(subs.map((row) => row.size.trim()).filter(Boolean))];
  if (sizes.length > 1) return { key: "Size", value: sizes.join(", ") };
  const colors = [...new Set(subs.map((row) => row.color.trim()).filter(Boolean))];
  if (colors.length > 1) return { key: "Color", value: colors.join(", ") };
  const counts = new Map<string, Set<string>>();
  for (const row of subs) {
    for (const item of row.attributes || []) {
      const key = item.key.trim();
      const value = item.value.trim();
      if (!key || !value) continue;
      const id = key.toLowerCase();
      if (id === "color" || id === "size") continue;
      const bucket = counts.get(id) || new Set<string>();
      bucket.add(value.toLowerCase());
      counts.set(id, bucket);
      if (!counts.has(`__name__${id}`)) counts.set(`__name__${id}`, new Set([key]));
    }
  }
  for (const [id, values] of counts) {
    if (id.startsWith("__name__")) continue;
    if (values.size > 1) {
      const name = [...(counts.get(`__name__${id}`) || [])][0] || id;
      const ordered: string[] = [];
      for (const row of subs) {
        const value = row.attributes.find((item) => item.key.trim().toLowerCase() === id)?.value.trim();
        if (value && !ordered.some((item) => item.toLowerCase() === value.toLowerCase())) ordered.push(value);
      }
      if (ordered.length > 1) return { key: name, value: ordered.join(", ") };
    }
  }
  return null;
}

export function displayAttributes(
  color: string,
  size: string,
  attributes: ProductAttribute[] | undefined,
  subs?: ProductSubVariant[]
): ProductAttribute[] {
  const lifted = liftColorSize(color, size, attributes || []);
  const spreading = inferSpreadingAttribute(subs);
  if (!spreading) return lifted.length ? lifted : [];
  if (lifted.some((item) => item.key.toLowerCase() === spreading.key.toLowerCase())) return lifted;
  return [...lifted, spreading].slice(0, MAX_VARIANT_FIELDS);
}

function parentPayloadAttributes(attributes: ProductAttribute[]): ProductAttribute[] {
  const cleaned = cleanAttributeList(attributes).filter((item) => item.key && item.value);
  const spreading = spreadingFields(cleaned)[0];
  return spreading
    ? cleaned.filter((item) => item.key.toLowerCase() !== spreading.key.toLowerCase())
    : cleaned;
}

function payloadAttributes(attributes: ProductAttribute[] | undefined, color = "", size = "") {
  return liftColorSize(color, size, parentPayloadAttributes(attributes || []));
}

function payloadSubVariants(rows: ProductSubVariant[] | undefined) {
  return (rows || []).map((row) => {
    const attributes = displayAttributes(row.color, row.size, row.attributes);
    const derived = colorSizeFromAttributes(attributes, row.color, row.size);
    return {
      title: row.title.trim() || derived.size || derived.color || attributes[0]?.value || "",
      attributes: payloadAttributes(attributes, derived.color, derived.size),
      color: derived.color,
      size: derived.size,
      images: (row.images || []).filter(Boolean).slice(0, 5),
      stockQty: Number.isFinite(row.stockQty) ? Math.max(0, row.stockQty) : 0,
      priceAdjustment: Number.isFinite(row.priceAdjustment) ? row.priceAdjustment : 0,
      status: row.status || "In Stock",
    };
  });
}

function spreadingValueOf(row: ProductSubVariant, key: string): string {
  const id = key.toLowerCase();
  if (id === "size") return row.size.trim();
  if (id === "color") return row.color.trim();
  return (
    row.attributes.find((item) => item.key.trim().toLowerCase() === id)?.value.trim() ||
    row.title.trim()
  );
}

export function applyParentAttributes(
  attributes: ProductAttribute[],
  existingSubs: ProductSubVariant[] | undefined,
  parentSku: string,
  fallbackColor = ""
): {
  attributes: ProductAttribute[];
  color: string;
  size: string;
  subVariants: ProductSubVariant[];
  spreadingError: string;
} {
  const nextAttributes = cleanAttributeList(attributes);
  const spreads = spreadingFields(nextAttributes);
  const derived = colorSizeFromAttributes(nextAttributes, fallbackColor);
  if (spreads.length > 1) {
    return {
      attributes: nextAttributes,
      color: derived.color,
      size: derived.size,
      subVariants: stampSubs(parentSku, existingSubs || []),
      spreadingError: `Only one attribute can list multiple values (already spreading ${spreads[0].key})`,
    };
  }
  if (!spreads.length) {
    return {
      attributes: nextAttributes,
      color: derived.color,
      size: derived.size,
      subVariants: stampSubs(parentSku, existingSubs || []),
      spreadingError: "",
    };
  }
  const spreading = spreads[0];
  const isColor = spreading.key.toLowerCase() === "color";
  const isSize = spreading.key.toLowerCase() === "size";
  const current = existingSubs || [];
  const byValue = new Map<string, ProductSubVariant>();
  for (const row of current) {
    const value = spreadingValueOf(row, spreading.key);
    if (value) byValue.set(value.toLowerCase(), row);
  }
  const used = new Set<string>();
  const merged = spreading.values.map((value, index) => {
    const prev = byValue.get(value.toLowerCase());
    used.add(value.toLowerCase());
    if (prev) {
      return {
        ...prev,
        sku: subVariantSku(parentSku, index),
        title: prev.title || value,
        color: isColor ? value : prev.color || derived.color,
        size: isSize ? value : prev.size || derived.size,
        attributes: liftColorSize(
          isColor ? value : prev.color || derived.color,
          isSize ? value : prev.size || derived.size,
          [{ key: spreading.key, value }, ...prev.attributes.filter((item) => item.key.toLowerCase() !== spreading.key.toLowerCase())]
        ),
      };
    }
    return {
      ...emptySubVariant(parentSku, index, {
        color: isColor ? value : derived.color,
        size: isSize ? value : derived.size,
      }),
      title: value,
      attributes: [{ key: spreading.key, value }],
    };
  });
  for (const row of current) {
    const value = spreadingValueOf(row, spreading.key).toLowerCase();
    if (value && used.has(value)) continue;
    merged.push(row);
  }
  return {
    attributes: nextAttributes,
    color: derived.color,
    size: derived.size,
    subVariants: stampSubs(parentSku, merged),
    spreadingError: "",
  };
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
    const attributes = displayAttributes(row.color || "", row.size || "", row.attributes || []);
    const derived = colorSizeFromAttributes(attributes, row.color || fallbackColor, row.size || "");
    return {
      sku: subVariantSku(parentSku, index),
      title: row.title || "",
      color: derived.color,
      size: derived.size,
      attributes,
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

export function spreadingErrorFor(attributes: ProductAttribute[]): string {
  const spreads = spreadingFields(attributes);
  if (spreads.length > 1) {
    return `Only one attribute can list multiple values (already spreading ${spreads[0].key})`;
  }
  return "";
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
    return "Add at least one extra variant or set extra variants to No";
  }
  const primarySpread = spreadingErrorFor(erp.primaryAttributes || []);
  if (primarySpread) return `Primary variant: ${primarySpread}`;
  for (const [index, row] of erp.variantDetails.entries()) {
    const spread = spreadingErrorFor(row.attributes || []);
    if (spread) return `Variant ${index + 2}: ${spread}`;
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
    color: colorSizeFromAttributes(erp.primaryAttributes || [], erp.color).color,
    availableColors: parseColors(erp.availableColorsInput),
    sizeRange: chosenValue(erp.sizeRange, erp.sizeRangeCustom),
    variant: erp.variant,
    variantDetails:
      erp.variant === "Yes"
        ? erp.variantDetails.map((row) => {
            const derived = colorSizeFromAttributes(row.attributes || [], row.color || "", row.size || "");
            return {
              title: row.title.trim(),
              description: row.description.trim(),
              attributes: payloadAttributes(row.attributes, derived.color, derived.size),
              color: derived.color,
              size: derived.size,
              images: (row.images || []).filter(Boolean).slice(0, 5),
              stockQty: Number.isFinite(row.stockQty) ? Math.max(0, row.stockQty) : 0,
              priceAdjustment: Number.isFinite(row.priceAdjustment) ? row.priceAdjustment : 0,
              status: row.status || "In Stock",
              subVariants: payloadSubVariants(row.subVariants),
            };
          })
        : [],
    primaryAttributes: payloadAttributes(
      erp.primaryAttributes,
      colorSizeFromAttributes(erp.primaryAttributes || [], erp.color).color,
      colorSizeFromAttributes(erp.primaryAttributes || [], "", "").size
    ),
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
