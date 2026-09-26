import { AdminProduct, CustomerRecord, FactoryRecord, VariantDetail } from "@/types/adminProduct";

export const initialFactories: FactoryRecord[] = [
  {
    id: "fac-1",
    code: "FAC-001",
    name: "ABC Garments",
    country: "Bangladesh",
    city: "Dhaka",
    contactPerson: "Rahim Chowdhury",
    phone: "+880 1711-234567",
    activeOrders: 14,
  },
  {
    id: "fac-2",
    code: "FAC-002",
    name: "Maya Global Apparels",
    country: "India",
    city: "Tirupur",
    contactPerson: "Arjun Verma",
    phone: "+91 98451-22901",
    activeOrders: 22,
  },
  {
    id: "fac-3",
    code: "FAC-003",
    name: "Pacific Horizon Textiles",
    country: "Vietnam",
    city: "Ho Chi Minh City",
    contactPerson: "Nguyen Minh",
    phone: "+84 28 3822 5599",
    activeOrders: 9,
  },
  {
    id: "fac-4",
    code: "FAC-004",
    name: "Eastern Weaving Mills",
    country: "China",
    city: "Ningbo",
    contactPerson: "Chen Wei",
    phone: "+86 574 8765 4321",
    activeOrders: 11,
  },
];

export const initialCustomers: CustomerRecord[] = [
  {
    id: "cust-1",
    codePrefix: "XYZ",
    name: "XYZ Fashion",
    country: "United States",
    tier: "Key Account",
    primaryContact: "Jessica Sterling",
    email: "j.sterling@xyzfashion.com",
  },
  {
    id: "cust-2",
    codePrefix: "ZRA",
    name: "Zara International Sourcing",
    country: "Spain",
    tier: "Key Account",
    primaryContact: "Carlos Mendes",
    email: "cmendes@inditex-maya.com",
  },
  {
    id: "cust-3",
    codePrefix: "ASO",
    name: "ASOS Global Supply",
    country: "United Kingdom",
    tier: "Retail Brand",
    primaryContact: "Oliver Grant",
    email: "o.grant@asos-sourcing.co.uk",
  },
  {
    id: "cust-4",
    codePrefix: "NOR",
    name: "Nordstrom Apparel Group",
    country: "United States",
    tier: "Key Account",
    primaryContact: "Claire Dupont",
    email: "c.dupont@nordstrom.com",
  },
  {
    id: "cust-5",
    codePrefix: "MNG",
    name: "Mango Retail Europe",
    country: "Spain",
    tier: "Retail Brand",
    primaryContact: "Sofia Navarro",
    email: "s.navarro@mango.es",
  },
];

export const monthsList = [
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
];

export const yearsList = ["2024", "2025", "2026", "2027", "2028"];

export const productTypeOptions = [
  "New Developed",
  "Shipment Sample",
  "Customer Sample",
  "Production Run",
  "Custom",
];

export const collectionOptions = [
  "Summer Collection",
  "Spring Blossom",
  "Autumn Minimalist",
  "Winter Warmth",
  "Resort Luxe",
  "Urban High-Street",
  "Custom",
];

export const seasonOptions = [
  "SS26",
  "AW26",
  "SS27",
  "AW27",
  "Resort 2026",
  "Cruise 2026",
  "Custom",
];

export const categoriesList: Record<string, string[]> = {
  Dress: ["Maxi Dress", "Midi Dress", "Slip Dress", "Shirt Dress", "Wrap Dress", "Cocktail Dress"],
  Top: ["T-Shirt", "Blouse", "Crop Top", "Tank Top", "Camisole", "Tunic"],
  Shirt: ["Button-down Oxford", "Linen Resort Shirt", "Oversized Shirt", "Flannel Check Shirt"],
  Trousers: ["Chino Trousers", "Wide-Leg Palazzo", "Tailored Trousers", "Cargo Pants", "Joggers"],
  Outerwear: ["Trench Coat", "Varsity Jacket", "Puffer Coat", "Tailored Blazer", "Denim Jacket"],
  Knitwear: ["Fine Gauge Cardigan", "Crewneck Sweater", "Ribbed Turtleneck", "Knitted Polo"],
};

export const defaultSizeRanges = [
  "S, M, L, XL",
  "XS, S, M, L, XL, XXL",
  "28, 30, 32, 34, 36, 38",
  "One Size Fits All",
  "0-3M, 3-6M, 6-12M, 12-18M",
  "Custom",
];

export const quantityUnitOptions = [
  "Pcs",
  "Sets",
  "Dozens",
  "Pairs",
  "Yards",
  "Meters",
  "Packs",
  "Cartons",
];

export const marketOptions = [
  "USA",
  "UK",
  "Europe",
  "UAE",
  "Australia",
  "Canada",
  "Japan",
  "Domestic",
];

export const defaultPatterns = [
  "Solid",
  "Printed",
  "Floral",
  "Striped",
  "Checked / Plaid",
  "Jacquard",
  "Embroidered",
  "Tie-Dye",
];

export const fobPorts = [
  "Shanghai",
  "Ningbo",
  "Chittagong",
  "Ho Chi Minh",
  "Karachi",
  "Colombo",
  "Mumbai",
  "Qingdao",
];

// Helper to generate F26-001 style codes
export function generateFactoryCode(counter: number = 1): string {
  const currentYear = new Date().getFullYear();
  const year2Digits = String(currentYear).slice(-2);
  const formattedCounter = String(counter).padStart(3, "0");
  return `F${year2Digits}-${formattedCounter}`;
}

// Helper to generate C26-001 style codes
export function generateCustomerStyleCode(counter: number = 1): string {
  const currentYear = new Date().getFullYear();
  const year2Digits = String(currentYear).slice(-2);
  const formattedCounter = String(counter).padStart(3, "0");
  return `C${year2Digits}-${formattedCounter}`;
}

// Helper to build automatic variant matrix for Color x Size
export function generateVariantMatrix(
  baseSku: string,
  colors: string[],
  sizeRangeString: string,
  baseStock: number = 100
): VariantDetail[] {
  const cleanColors = colors.filter(Boolean);
  const sizes = sizeRangeString
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (cleanColors.length === 0 || sizes.length === 0) {
    return [];
  }

  const variants: VariantDetail[] = [];
  cleanColors.forEach((col) => {
    const colCode = col.slice(0, 3).toUpperCase();
    sizes.forEach((sz) => {
      const szCode = sz.replace(/\s+/g, "").toUpperCase();
      const variantSku = `${baseSku || "SKU"}-${colCode}-${szCode}`;
      const randomBarcode = `890${Math.floor(100000000 + Math.random() * 900000000)}`;

      variants.push({
        id: `var-${colCode}-${szCode}-${Math.random().toString(36).substr(2, 6)}`,
        color: col,
        size: sz,
        sku: variantSku,
        barcode: randomBarcode,
        stockQty: baseStock,
        priceAdjustment: 0,
        status: "In Stock",
      });
    });
  });

  return variants;
}

export const initialAdminProducts: AdminProduct[] = [
  {
    id: "prod-st1001",
    productCode: "ST-1001",
    sku: "DRS-001",
    purchaseCode: "PUR-001",
    productName: "Floral Maxi Dress",
    productStatus: "Active",
    featuredProduct: "Yes",
    productType: "New Developed",
    gender: "Women",
    ageGroup: "Adult",
    category: "Dress",
    subcategory: "Maxi Dress",
    collection: "Summer Collection",
    season: "SS26",
    developmentDate: {
      month: "March",
      year: "2026",
    },
    shipmentDate: {
      month: "August",
      year: "2026",
    },
    fabric: "Cotton",
    fabricComposition: "100% Cotton",
    gsm: "120",
    pattern: "Floral",
    color: "Blue",
    availableColors: ["Blue", "Pink", "Green"],
    sizeRange: "S, M, L, XL",
    variant: "Yes",
    variantDetails: [
      {
        id: "var-1",
        color: "Blue",
        size: "S",
        sku: "DRS-001-BLU-S",
        barcode: "890128472910",
        stockQty: 600,
        priceAdjustment: 0,
        status: "In Stock",
      },
      {
        id: "var-2",
        color: "Blue",
        size: "M",
        sku: "DRS-001-BLU-M",
        barcode: "890128472911",
        stockQty: 850,
        priceAdjustment: 0,
        status: "In Stock",
      },
      {
        id: "var-3",
        color: "Blue",
        size: "L",
        sku: "DRS-001-BLU-L",
        barcode: "890128472912",
        stockQty: 600,
        priceAdjustment: 0,
        status: "In Stock",
      },
      {
        id: "var-4",
        color: "Blue",
        size: "XL",
        sku: "DRS-001-BLU-XL",
        barcode: "890128472913",
        stockQty: 450,
        priceAdjustment: 0.5,
        status: "In Stock",
      },
      {
        id: "var-5",
        color: "Pink",
        size: "M",
        sku: "DRS-001-PNK-M",
        barcode: "890128472921",
        stockQty: 400,
        priceAdjustment: 0,
        status: "In Stock",
      },
    ],
    factoryCode: "F26-001",
    factoryName: "ABC Garments",
    factoryPriceEXW: "$7.20",
    fobPrice: "$8.00",
    salePrice: "$8.50",
    fobPort: "Shanghai",
    moq: "500",
    quantityUnit: "Pcs",
    readyStockAvailability: "Yes",
    readyStockQuantity: "2500",
    readyStockQuantityUnit: "Pcs",
    customerName: "XYZ Fashion",
    customerStyleCode: "C26-001",
    repeatOrder: "No",
    repeatOrderNumber: "None",
    marketSuitability: ["USA", "UK", "Europe", "UAE"],
    description:
      "Floor-grazing bohemian maxi dress featuring artisanal watercolor floral print, gathered tier skirts, and comfortable elastic smocking across back bodice. Tested for color fastness and shrinkage under international retail standards.",
    productImage:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    createdAtDate: {
      month: "March",
      year: "2026",
    },
    updatedAtDate: "Tech pack reviewed & ready stock confirmed for SS26 campaign",
  },
  {
    id: "prod-st1002",
    productCode: "ST-1002",
    sku: "TSH-042",
    purchaseCode: "PUR-002",
    productName: "Organic Pique Polo Shirt",
    productStatus: "Active",
    featuredProduct: "No",
    productType: "Shipment Sample",
    gender: "Men",
    ageGroup: "Adult",
    category: "Shirt",
    subcategory: "Button-down Oxford",
    collection: "Spring Blossom",
    season: "SS26",
    developmentDate: {
      month: "January",
      year: "2026",
    },
    shipmentDate: {
      month: "June",
      year: "2026",
    },
    fabric: "Organic Cotton",
    fabricComposition: "95% Organic Cotton, 5% Elastane",
    gsm: "220",
    pattern: "Solid",
    color: "Navy Blue",
    availableColors: ["Navy Blue", "White", "Sage Green"],
    sizeRange: "S, M, L, XL",
    variant: "Yes",
    variantDetails: [
      {
        id: "var-101",
        color: "Navy Blue",
        size: "M",
        sku: "TSH-042-NVY-M",
        barcode: "890209481021",
        stockQty: 800,
        priceAdjustment: 0,
        status: "In Stock",
      },
      {
        id: "var-102",
        color: "Navy Blue",
        size: "L",
        sku: "TSH-042-NVY-L",
        barcode: "890209481022",
        stockQty: 600,
        priceAdjustment: 0,
        status: "In Stock",
      },
    ],
    factoryCode: "F26-002",
    factoryName: "Maya Global Apparels",
    factoryPriceEXW: "$4.90",
    fobPrice: "$5.50",
    salePrice: "$6.20",
    fobPort: "Ningbo",
    moq: "1000",
    quantityUnit: "Pcs",
    readyStockAvailability: "Yes",
    readyStockQuantity: "1400",
    readyStockQuantityUnit: "Pcs",
    customerName: "Zara International Sourcing",
    customerStyleCode: "C26-002",
    repeatOrder: "Yes",
    repeatOrderNumber: "2nd",
    marketSuitability: ["Europe", "UK"],
    description:
      "Export grade 220 GSM honeycomb pique knit polo. Mother-of-pearl buttons with reinforced collar stand preventing curl after washing.",
    productImage:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
    createdAtDate: {
      month: "January",
      year: "2026",
    },
    updatedAtDate: "Sample washed & shrinkage testing verified: 2nd repeat order batch",
  },
  {
    id: "prod-st1003",
    productCode: "ST-1003",
    sku: "TRO-118",
    purchaseCode: "PUR-003",
    productName: "Linen Wide-Leg Palazzo Pants",
    productStatus: "Active",
    featuredProduct: "Yes",
    productType: "Customer Sample",
    gender: "Women",
    ageGroup: "Adult",
    category: "Trousers",
    subcategory: "Wide-Leg Palazzo",
    collection: "Resort Luxe",
    season: "SS26",
    developmentDate: {
      month: "February",
      year: "2026",
    },
    shipmentDate: {
      month: "July",
      year: "2026",
    },
    fabric: "French Linen Blend",
    fabricComposition: "55% Linen, 45% Viscose",
    gsm: "185",
    pattern: "Solid",
    color: "Natural Flax",
    availableColors: ["Natural Flax", "Olive", "Terracotta"],
    sizeRange: "XS, S, M, L, XL, XXL",
    variant: "No",
    variantDetails: [],
    factoryCode: "F26-003",
    factoryName: "Pacific Horizon Textiles",
    factoryPriceEXW: "$9.40",
    fobPrice: "$10.50",
    salePrice: "$11.80",
    fobPort: "Ho Chi Minh",
    moq: "600",
    quantityUnit: "Pcs",
    readyStockAvailability: "No",
    readyStockQuantity: "0",
    readyStockQuantityUnit: "Pcs",
    customerName: "ASOS Global Supply",
    customerStyleCode: "C26-003",
    repeatOrder: "No",
    repeatOrderNumber: "None",
    marketSuitability: ["USA", "Europe", "Australia"],
    description:
      "High-rise relaxed silhouette with deep side pockets, tailored front darts, and breezy drape perfect for luxury resort capsules.",
    productImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    createdAtDate: {
      month: "February",
      year: "2026",
    },
    updatedAtDate: "Customer feedback received on waistband fit",
  },
  {
    id: "prod-st1004",
    productCode: "ST-1004",
    sku: "TOP-088",
    purchaseCode: "PUR-004",
    productName: "Embroidered Peasant Blouse",
    productStatus: "Active",
    featuredProduct: "No",
    productType: "New Developed",
    gender: "Women",
    ageGroup: "Adult",
    category: "Top",
    subcategory: "Blouse",
    collection: "Summer Collection",
    season: "SS26",
    developmentDate: {
      month: "March",
      year: "2026",
    },
    shipmentDate: {
      month: "September",
      year: "2026",
    },
    fabric: "Cotton Voile",
    fabricComposition: "100% Combed Cotton",
    gsm: "95",
    pattern: "Embroidered",
    color: "Ivory White",
    availableColors: ["Ivory White", "Blush Pink"],
    sizeRange: "S, M, L, XL",
    variant: "Yes",
    variantDetails: [
      {
        id: "var-201",
        color: "Ivory White",
        size: "S",
        sku: "TOP-088-IVR-S",
        barcode: "890334819011",
        stockQty: 350,
        priceAdjustment: 0,
        status: "In Stock",
      },
      {
        id: "var-202",
        color: "Ivory White",
        size: "M",
        sku: "TOP-088-IVR-M",
        barcode: "890334819012",
        stockQty: 500,
        priceAdjustment: 0,
        status: "In Stock",
      },
    ],
    factoryCode: "F26-001",
    factoryName: "ABC Garments",
    factoryPriceEXW: "$5.80",
    fobPrice: "$6.50",
    salePrice: "$7.10",
    fobPort: "Shanghai",
    moq: "800",
    quantityUnit: "Pcs",
    readyStockAvailability: "Yes",
    readyStockQuantity: "850",
    readyStockQuantityUnit: "Pcs",
    customerName: "Nordstrom Apparel Group",
    customerStyleCode: "C26-004",
    repeatOrder: "Yes",
    repeatOrderNumber: "1st",
    marketSuitability: ["USA", "Canada"],
    description:
      "Lightweight cotton voile blouse with tonal thread geometric embroidery along neckline, tassel drawstrings, and raglan elasticated sleeves.",
    productImage:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
    createdAtDate: {
      month: "March",
      year: "2026",
    },
    updatedAtDate: "Export packing list finalized & carton specifications confirmed",
  },
  {
    id: "prod-st1005",
    productCode: "ST-1005",
    sku: "KID-019",
    purchaseCode: "PUR-005",
    productName: "Toddler Striped Dungarees",
    productStatus: "Inactive",
    featuredProduct: "No",
    productType: "Customer Sample",
    gender: "Unisex",
    ageGroup: "Toddler",
    category: "Dress",
    subcategory: "Slip Dress",
    collection: "Autumn Minimalist",
    season: "AW26",
    developmentDate: {
      month: "February",
      year: "2026",
    },
    shipmentDate: {
      month: "October",
      year: "2026",
    },
    fabric: "Cotton Twill",
    fabricComposition: "100% Organic Cotton Twill",
    gsm: "210",
    pattern: "Striped",
    color: "Camel / Cream",
    availableColors: ["Camel / Cream", "Denim Blue"],
    sizeRange: "0-3M, 3-6M, 6-12M, 12-18M",
    variant: "No",
    variantDetails: [],
    factoryCode: "F26-004",
    factoryName: "Eastern Weaving Mills",
    factoryPriceEXW: "$4.20",
    fobPrice: "$4.75",
    salePrice: "$5.30",
    fobPort: "Ningbo",
    moq: "1200",
    quantityUnit: "Pcs",
    readyStockAvailability: "No",
    readyStockQuantity: "0",
    readyStockQuantityUnit: "Pcs",
    customerName: "Mango Retail Europe",
    customerStyleCode: "C26-005",
    repeatOrder: "No",
    repeatOrderNumber: "None",
    marketSuitability: ["Europe", "UK"],
    description:
      "OEKO-TEX Class 1 certified organic cotton twill dungarees for infants and toddlers. Nickel-free metal buckles and easy-access crotch snap buttons.",
    productImage:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    createdAtDate: {
      month: "February",
      year: "2026",
    },
    updatedAtDate: "Sample archived pending buyer seasonal review",
  },
];
