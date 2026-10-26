export const PRODUCT_INFO_SECTIONS = [
  { key: "specs", title: "Production Capabilities" },
  { key: "oem", title: "Custom OEM / ODM Branding" },
  { key: "packing", title: "Packaging & Sea/Air Logistics" },
] as const;

export type ProductInfoSectionKey = (typeof PRODUCT_INFO_SECTIONS)[number]["key"];

export type ProductInfoItem = {
  heading: string;
  content: string;
};

export type ProductInfoSection = {
  key: ProductInfoSectionKey;
  items: ProductInfoItem[];
};

export function emptyInfoSections(): ProductInfoSection[] {
  return PRODUCT_INFO_SECTIONS.map((section) => ({
    key: section.key,
    items: [{ heading: "", content: "" }],
  }));
}

export function mergeInfoSections(saved?: ProductInfoSection[] | null): ProductInfoSection[] {
  return PRODUCT_INFO_SECTIONS.map((section) => {
    const found = saved?.find((item) => item.key === section.key);
    const items = (found?.items || [])
      .map((item) => ({
        heading: item.heading?.trim() || "",
        content: item.content?.trim() || "",
      }))
      .filter((item) => item.heading || item.content);

    return {
      key: section.key,
      items: items.length ? items : [{ heading: "", content: "" }],
    };
  });
}

export function compactInfoSections(sections?: ProductInfoSection[] | null): ProductInfoSection[] {
  return PRODUCT_INFO_SECTIONS.map((section) => {
    const found = sections?.find((item) => item.key === section.key);
    const items = (found?.items || [])
      .map((item) => ({
        heading: item.heading?.trim() || "",
        content: item.content?.trim() || "",
      }))
      .filter((item) => item.heading && item.content);

    return { key: section.key, items };
  }).filter((section) => section.items.length > 0);
}

export function infoSectionTitle(key: ProductInfoSectionKey): string {
  return PRODUCT_INFO_SECTIONS.find((section) => section.key === key)?.title || key;
}
