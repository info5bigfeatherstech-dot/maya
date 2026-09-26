export type YesNo = "Yes" | "No";

export type ProductStatus = "Active" | "Inactive";

export type GenderType = "Women" | "Men" | "Unisex";

export type AgeGroupType =
  | "Newborn"
  | "Infant"
  | "Toddler"
  | "Kids"
  | "Teen"
  | "Adult";

export type MainCategory = "Dress" | "Top" | "Shirt" | "Trousers" | "Outerwear" | "Knitwear" | "Other";

export type QuantityUnitType = "Pcs" | "Sets" | "Dozens" | "Pairs" | "Yards" | "Meters" | "Packs" | "Cartons";

export interface VariantDetail {
  id: string;
  color: string;
  size: string;
  sku: string;
  barcode: string;
  stockQty: number;
  priceAdjustment: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export interface AdminProduct {
  id: string;
  // 1. Basic Identification
  productCode: string; // e.g., ST-1001
  sku: string; // e.g., DRS-001
  purchaseCode: string; // e.g., PUR-001
  productName: string; // e.g., Floral Maxi Dress
  productStatus: ProductStatus; // Active / Inactive
  featuredProduct: YesNo; // Yes / No

  // 2. Classification & Type
  productType: string; // New Developed / Shipment Sample / Customer Sample / Custom
  productTypeCustom?: string;
  gender: GenderType; // Women / Men / Unisex
  ageGroup: AgeGroupType; // Newborn / Infant / Toddler / Kids / Teen / Adult
  category: MainCategory; // Dress / Top / Shirt / Trousers ...
  subcategory: string; // Maxi Dress / T-Shirt / Blouse ...
  collection: string; // Summer Collection / Resort ... + Custom
  collectionCustom?: string;
  season: string; // SS26 / AW26 / Resort ... + Custom
  seasonCustom?: string;

  // 3. Dates
  developmentDate: {
    month: string; // e.g., March
    year: string; // e.g., 2026
  };
  shipmentDate: {
    month: string; // e.g., August
    year: string; // e.g., 2026
  };

  // 4. Fabric & Textile Specs
  fabric: string; // Cotton / Viscose / Linen
  fabricComposition: string; // 100% Cotton
  gsm: string; // 120
  pattern: string; // Solid / Printed / Floral / Striped
  color: string; // Blue (Primary)
  availableColors: string[]; // Blue, Pink, Green
  sizeRange: string; // S, M, L, XL ... or Custom
  sizeRangeCustom?: string;

  // 5. Variants
  variant: YesNo; // Yes / No
  variantDetails: VariantDetail[]; // Generated matrix of Size x Color combinations

  // 6. Sourcing, Factory & Pricing
  factoryCode: string; // auto generate - prefix F current year 2 digits e.g. F26-001
  factoryName: string; // fetch from factory database e.g. ABC Garments
  factoryPriceEXW: string; // $7.20
  fobPrice: string; // $8.00
  salePrice: string; // $8.50
  fobPort: string; // Shanghai / Chittagong / Karachi / Ningbo
  moq: string; // 500
  quantityUnit: QuantityUnitType; // Pcs / Sets / Dozens / Pairs ...

  // 7. Inventory & Ready Stock
  readyStockAvailability: YesNo; // Yes / No
  readyStockQuantity: string; // 2500
  readyStockQuantityUnit: QuantityUnitType; // Pcs / Sets / Dozens ...

  // 8. Buyer / Customer Information
  customerName: string; // XYZ Fashion
  customerStyleCode: string; // auto generate - prefix C current year 2 digits e.g. C26-001
  repeatOrder: YesNo; // Yes / No
  repeatOrderNumber: "1st" | "2nd" | "3rd" | "None"; // 1st / 2nd / 3rd

  // 9. Market Suitability
  marketSuitability: string[]; // USA, UK, Europe, UAE + custom text

  // 10. Media & Description
  description: string; // Short product description
  productImage: string; // Image URL / File preview
  createdAtDate: {
    month: string;
    year: string;
  };
  updatedAtDate: string; // title / short description of update e.g., "Updated shipment notes & cost sheet on Oct 2026"
}

export interface FactoryRecord {
  id: string;
  code: string;
  name: string;
  country: string;
  city: string;
  contactPerson: string;
  phone: string;
  activeOrders: number;
}

export interface CustomerRecord {
  id: string;
  codePrefix: string;
  name: string;
  country: string;
  tier: "Key Account" | "Retail Brand" | "Boutique" | "Wholesale";
  primaryContact: string;
  email: string;
}
