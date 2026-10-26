import type { ProductInfoSection } from "./infoSections";

export type CatalogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  path: string;
  depth: number;
  productCount: number;
  childCount: number;
  children: CatalogCategory[];
};

export type ProductAttribute = {
  key: string;
  value: string;
};

export type CatalogListing = {
  moq?: string;
  fabric?: string;
  sizing?: string;
  colorways?: string[];
  fobPort?: string;
  pattern?: string;
};

export type CatalogOptionAttribute = {
  key: string;
  value: string;
};

export type CatalogOptionVariant = {
  code?: string;
  title: string;
  description: string;
  images: string[];
  attributes: CatalogOptionAttribute[];
  primary?: boolean;
  children?: CatalogOptionVariant[];
};

export type CatalogOptions = {
  keys?: string[];
  variants: CatalogOptionVariant[];
};

export type CatalogProduct = {
  id: string;
  productCode: string;
  modelCode?: string;
  name: string;
  title: string;
  description: string;
  category: {
    id: string;
    name: string;
    slug: string;
    path?: string;
  };
  images: string[];
  attributes: ProductAttribute[];
  infoSections?: ProductInfoSection[];
  listing?: CatalogListing;
  options?: CatalogOptions;
};
