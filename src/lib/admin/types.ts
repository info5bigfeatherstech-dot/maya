import type { ProductInfoSection } from "@/lib/catalog/infoSections";

export type AdminUser = {
  id: string;
  email: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  path: string;
  depth: number;
  productCount: number;
  childCount: number;
  children: Category[];
  createdAt?: string;
  updatedAt?: string;
};

export type ProductCategoryRef = {
  id: string;
  name: string;
  slug: string;
  path?: string;
};

export type ProductAttribute = {
  key: string;
  value: string;
};

export type NamedRef = {
  id: string;
  code: string;
  name: string;
};

export type VariantStatus = "In Stock" | "Low Stock" | "Out of Stock";

export type CustomerLink = {
  customerId: string;
  styleCode: string;
  repeatOrder: "Yes" | "No";
  repeatOrderNumber: "None" | "1st" | "2nd" | "3rd";
};

export type ProductSubVariant = {
  sku: string;
  title: string;
  color: string;
  size: string;
  attributes: ProductAttribute[];
  images: string[];
  drafts?: Array<{ kind: "new"; file: File; preview: string }>;
  stockQty: number;
  priceAdjustment: number;
  status: VariantStatus;
};

export type ProductVariant = {
  sku: string;
  title: string;
  description: string;
  attributes: ProductAttribute[];
  images: string[];
  drafts?: Array<{ kind: "new"; file: File; preview: string }>;
  stockQty: number;
  priceAdjustment: number;
  status: VariantStatus;
  color?: string;
  size?: string;
  barcode?: string;
  subVariants?: ProductSubVariant[];
};

export type Factory = {
  id: string;
  code: string;
  name: string;
  country: string;
  city: string;
  contactPerson: string;
  phone: string;
};

export type Customer = {
  id: string;
  code: string;
  name: string;
  country: string;
  tier: "Key Account" | "Retail Brand" | "Boutique" | "Wholesale";
  primaryContact: string;
  email: string;
};

export type FactoryPayload = {
  name: string;
  country?: string;
  city?: string;
  contactPerson?: string;
  phone?: string;
};

export type CustomerPayload = {
  name: string;
  country?: string;
  tier?: Customer["tier"];
  primaryContact?: string;
  email?: string;
};

export type Product = {
  id: string;
  productCode: string;
  sku?: string;
  purchaseCode?: string;
  name: string;
  title: string;
  description: string;
  category: ProductCategoryRef;
  images: string[];
  attributes: ProductAttribute[];
  infoSections?: ProductInfoSection[];
  productType?: string;
  gender?: string;
  ageGroup?: string;
  garmentCategory?: string;
  subcategory?: string;
  collection?: string;
  season?: string;
  developmentDate?: { month: string; year: string };
  shipmentDate?: { month: string; year: string };
  fabric?: string;
  fabricComposition?: string;
  gsm?: string;
  pattern?: string;
  color?: string;
  availableColors?: string[];
  sizeRange?: string;
  variant?: "Yes" | "No";
  variantDetails?: ProductVariant[];
  primarySubVariants?: ProductSubVariant[];
  factory?: NamedRef | null;
  factoryPriceEXW?: string;
  salePrice?: string;
  fobPrice?: string;
  fobPort?: string;
  moq?: string;
  quantityUnit?: string;
  readyStockAvailability?: "Yes" | "No";
  readyStockQuantity?: string;
  readyStockQuantityUnit?: string;
  customer?: NamedRef | null;
  customers?: Array<NamedRef & { styleCode?: string; repeatOrder?: "Yes" | "No"; repeatOrderNumber?: string }>;
  customerStyleCode?: string;
  repeatOrder?: "Yes" | "No";
  repeatOrderNumber?: "None" | "1st" | "2nd" | "3rd";
  productStatus?: "Active" | "Inactive";
  featuredProduct?: "Yes" | "No";
  marketSuitability?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type ProductImportFailure = {
  row: number;
  productCode: string;
  familyCode: string;
  reason: string;
};

export type ProductImportResult = {
  created: Product[];
  failed: ProductImportFailure[];
  skippedFolders: Array<{ folder: string; reason: string }>;
  warnings: string[];
  summary: {
    families: number;
    rows: number;
    created: number;
    failed: number;
    imagesQueued: number;
  };
};

export type CategoryPayload = {
  name: string;
  description?: string;
  parentId?: string | null;
};

export type ErpFormValues = {
  sku: string;
  purchaseCode: string;
  productType: string;
  productTypeCustom: string;
  gender: string;
  ageGroup: string;
  garmentCategory: string;
  subcategory: string;
  collection: string;
  collectionCustom: string;
  season: string;
  seasonCustom: string;
  developmentMonth: string;
  developmentYear: string;
  shipmentMonth: string;
  shipmentYear: string;
  fabric: string;
  fabricComposition: string;
  gsm: string;
  pattern: string;
  color: string;
  availableColorsInput: string;
  sizeRange: string;
  sizeRangeCustom: string;
  variant: "Yes" | "No";
  variantDetails: ProductVariant[];
  primarySubVariants: ProductSubVariant[];
  factoryId: string;
  factoryPriceEXW: string;
  salePrice: string;
  fobPrice: string;
  fobPort: string;
  moq: string;
  quantityUnit: string;
  readyStockAvailability: "Yes" | "No";
  readyStockQuantity: string;
  readyStockQuantityUnit: string;
  customerId: string;
  customerStyleCode: string;
  repeatOrder: "Yes" | "No";
  repeatOrderNumber: "None" | "1st" | "2nd" | "3rd";
  customers: CustomerLink[];
  productStatus: "Active" | "Inactive";
  featuredProduct: "Yes" | "No";
  marketSuitability: string[];
};

export type ProductFormValues = {
  productCode: string;
  name: string;
  title: string;
  description: string;
  category: string;
  attributes: ProductAttribute[];
  infoSections: ProductInfoSection[];
  erp: ErpFormValues;
};
