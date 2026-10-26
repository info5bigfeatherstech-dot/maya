import type { CatalogCategory, CatalogListing, CatalogProduct } from "./types";

export function flattenCatalog(categories: CatalogCategory[]): CatalogCategory[] {
  const rows: CatalogCategory[] = [];
  for (const category of categories) {
    rows.push(category);
    if (category.children?.length) {
      rows.push(...flattenCatalog(category.children));
    }
  }
  return rows;
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function findCategoryBySlug(
  categories: CatalogCategory[],
  slug: string
): CatalogCategory | null {
  const normalized = toSlug(slug);
  return (
    flattenCatalog(categories).find(
      (category) => category.slug === slug || category.slug === normalized || toSlug(category.name) === normalized
    ) || null
  );
}

export function findSiblings(
  categories: CatalogCategory[],
  category: CatalogCategory
): CatalogCategory[] {
  if (!category.parentId) return categories;
  const parent = flattenCatalog(categories).find((item) => item.id === category.parentId);
  return parent?.children?.length ? parent.children : [category];
}

export function formatModelNo(code: string): string {
  const trimmed = code.trim();
  if (/^model\s*no\.?\s*/i.test(trimmed)) {
    return trimmed.replace(/^model\s*no\.?\s*/i, "Model No.");
  }
  return `Model No.${trimmed}`;
}

export function splitProductCopy(description: string): { paragraph: string; specs: string[] } {
  const lines = description
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { paragraph: "", specs: [] };
  }

  return {
    paragraph: lines[0],
    specs: lines.slice(1),
  };
}

export function attributeValue(
  attributes: { key: string; value: string }[] | undefined,
  names: string[]
): string | undefined {
  const lookup = names.map((name) => name.toLowerCase());
  return attributes?.find((item) => lookup.includes(item.key.trim().toLowerCase()))?.value;
}

const METRIC_KEYS = new Set([
  "moq",
  "minimum order",
  "minimum order (moq)",
  "production time",
  "lead time",
  "production",
  "sample turnaround",
  "sample time",
  "sampling",
]);

const DETAIL_ROWS: { label: string; names: string[]; listing: keyof CatalogListing }[] = [
  {
    label: "Fabric / Material",
    names: ["Fabric / Material", "Fabric", "Material", "Fabric Composition"],
    listing: "fabric",
  },
  {
    label: "Available Sizing",
    names: ["Available Sizing", "Sizing", "Size", "Size Range"],
    listing: "sizing",
  },
  {
    label: "Stock / Lab-Dips",
    names: ["Stock / Lab-Dips", "Stock", "Lab-Dips", "Colorways", "Colors", "Available Colors"],
    listing: "colorways",
  },
  {
    label: "FOB Shipping Ports",
    names: ["FOB Shipping Ports", "FOB Port", "Port"],
    listing: "fobPort",
  },
  {
    label: "Pattern",
    names: ["Pattern"],
    listing: "pattern",
  },
];

const DETAIL_KEYS = new Set(DETAIL_ROWS.flatMap((row) => row.names.map((name) => name.toLowerCase())));

function listingValue(listing: CatalogListing | undefined, key: keyof CatalogListing): string {
  const value = listing?.[key];
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return (value || "").trim();
}

export function buildProductListing(product: Pick<CatalogProduct, "description" | "attributes" | "listing">): {
  paragraph: string;
  specs: string[];
  metrics: { label: string; value: string }[];
  details: { label: string; value: string }[];
} {
  const attributes = product.attributes || [];
  const { paragraph, specs } = splitProductCopy(product.description);
  const moq =
    attributeValue(attributes, ["MOQ", "Minimum Order", "Minimum Order (MOQ)"]) ||
    listingValue(product.listing, "moq");
  const productionTime = attributeValue(attributes, ["Production Time", "Lead Time", "Production"]);
  const sampleTurnaround = attributeValue(attributes, ["Sample Turnaround", "Sample Time", "Sampling"]);
  const metrics = [
    moq ? { label: "Minimum Order (MOQ)", value: moq } : null,
    productionTime ? { label: "Production Time", value: productionTime } : null,
    sampleTurnaround ? { label: "Sample Turnaround", value: sampleTurnaround } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  const details: { label: string; value: string }[] = [];
  for (const row of DETAIL_ROWS) {
    const value = attributeValue(attributes, row.names) || listingValue(product.listing, row.listing);
    if (value) details.push({ label: row.label, value });
  }
  for (const item of attributes) {
    const key = item.key.trim();
    if (!key || METRIC_KEYS.has(key.toLowerCase()) || DETAIL_KEYS.has(key.toLowerCase())) continue;
    details.push({ label: key, value: item.value });
  }

  return { paragraph, specs, metrics, details };
}
