export interface ProductItem {
  id: string;
  modelNo: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  moq?: string;
  leadTime?: string;
  fabricComposition?: string;
  sizing?: string;
  colorways?: string[];
  specs?: string[];
  features?: string[];
}

export interface CategoryCatalog {
  slug: string;
  title: string;
  division: string;
  demographic: string;
  description: string;
  items: ProductItem[];
}

export const productCatalogs: Record<string, CategoryCatalog> = {
  "mens-jackets": {
    slug: "mens-jackets",
    title: "Men's Jackets",
    division: "Garments",
    demographic: "Men",
    description: "Export-grade outerwear, varsity bombers, quilted vests, and technical shell jackets tailored for international retail brands.",
    items: [
      {
        id: "mg-25725-01",
        modelNo: "Model No.MG-25725-01",
        title: "Varsity Baseball Jacket",
        description: "Premium leather, modern fit, soft inner lining.",
        image: "/products/mens-jackets-01.jpg",
        gallery: [
          "/products/mens-jackets-01.jpg",
          "/products/varsity-detail-01.jpg",
          "/products/varsity-back-01.jpg",
          "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=85",
        ],
        moq: "500 pcs",
        leadTime: "35-45 days",
        fabricComposition: "450GSM Melton Wool Blend (body) & Genuine Cowhide Leather (sleeves)",
        sizing: "Men's XS - 5XL (Custom Size Spec Chart Accepted)",
        colorways: ["Navy / Bone White", "Pitch Black / Cream", "Forest Green / White", "Burgundy / Black"],
        specs: [
          "Heavyweight 450GSM wool-blend body",
          "Genuine cowhide / premium vegan leather sleeves",
          "Custom chenille embroidered patch & chain stitch crest",
          "Striped 2x2 acrylic-cotton heavy rib collar, cuffs & hem",
          "Internal diamond quilted satin lining with 80GSM thermal polyfill",
          "Custom engraved brass snap button front closure",
        ],
        features: [
          "Wind-resistant exterior with high thermal insulation",
          "Reinforced pocket welts in matching leather",
          "Custom woven neck label & wash care tag",
          "Passes needle detection and pre-shipment AQL 1.5 inspection",
        ],
      },
      {
        id: "mg-25725-02",
        modelNo: "Model No.MG-25725-02",
        title: "Quilted Hooded Puffer Vest",
        description: "Classic blue denim for everyday casual styling.",
        image: "/products/mens-jackets-02.jpg",
        gallery: [
          "/products/mens-jackets-02.jpg",
          "https://images.unsplash.com/photo-1544022613-e87ce7526edb?auto=format&fit=crop&w=1000&q=85",
          "/products/mens-jackets-03.jpg",
        ],
        moq: "600 pcs",
        leadTime: "30-40 days",
        fabricComposition: "100% High-Density Polyester Microfiber with DWR coating",
        sizing: "Men's S - 4XL",
        colorways: ["Deep Navy", "Matte Carbon Black", "Slate Grey", "Olive Drab"],
        specs: [
          "Thermal synthetic faux-down fill (280GSM)",
          "Water-repellent matte polyester shell with DWR finish",
          "Detachable insulated storm hood with bungee toggles",
          "Waterproof reverse-coil SBS/YKK front zipper",
          "Dual zippered fleece-lined hand warmer pockets",
          "Internal concealed zipper security pocket",
        ],
        features: [
          "Lightweight packable warmth for multi-season layering",
          "Elasticated armhole binding for wind protection",
          "Custom rubberized chest logo badge",
        ],
      },
      {
        id: "mg-25725-03",
        modelNo: "Model No.MG-25725-03",
        title: "Technical Outdoor Softshell Jacket",
        description: "Water-resistant performance ripstop with ergonomic storm hood.",
        image: "/products/mens-jackets-03.jpg",
        gallery: [
          "/products/mens-jackets-03.jpg",
          "https://images.unsplash.com/photo-1544022613-e87ce7526edb?auto=format&fit=crop&w=1000&q=85",
        ],
        moq: "500 pcs",
        leadTime: "35-45 days",
        fabricComposition: "3-Layer Bonded Softshell (92% Polyester, 8% Spandex) + TPU membrane",
        sizing: "Men's XS - 4XL",
        colorways: ["Stealth Black", "Titanium Grey", "Alpine Navy", "High-Vis Orange"],
        specs: [
          "3-layer bonded breathable membrane (10,000mm / 8,000 MVP)",
          "Micro-fleece thermal bonded interior lining",
          "Laser-cut chest pocket with waterproof welded seam",
          "Adjustable rubber-tab velcro storm cuffs",
          "Underarm zippered ventilation gussets",
          "Drawcord adjustable drop-tail hem",
        ],
        features: [
          "Engineered for high-output tactical & mountain sports",
          "4-way mechanical stretch for full mobility",
        ],
      },
      {
        id: "mg-25725-04",
        modelNo: "Model No.MG-25725-04",
        title: "Classic Harrington Jacket",
        description: "Tailored stand collar, check tartan interior lining, raglan cut.",
        image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
        moq: "500 pcs",
        leadTime: "30-40 days",
        specs: ["100% combed cotton twill shell", "Traditional yarn-dyed tartan lining", "Two-button stand collar", "Antiqued brass main zipper"],
      },
      {
        id: "mg-25725-05",
        modelNo: "Model No.MG-25725-05",
        title: "Arctic Weather Down Parka",
        description: "Heavy insulation, storm placket with storm cuffs and insulated hood.",
        image: "https://images.unsplash.com/photo-1544022613-e87ce7526edb?auto=format&fit=crop&w=800&q=80",
        moq: "400 pcs",
        leadTime: "40-50 days",
        specs: ["80/20 RDS certified down fill", "Windproof arctic oxford exterior", "Fleece-lined handwarmer pockets", "Internal storm snow skirt"],
      },
      {
        id: "mg-25725-06",
        modelNo: "Model No.MG-25725-06",
        title: "Vintage Denim Trucker Jacket",
        description: "Heavyweight 14oz indigo cotton denim with copper rivets.",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
        moq: "600 pcs",
        leadTime: "35-45 days",
        specs: ["100% BCI ring-spun cotton denim", "Enzyme stone wash with subtle fades", "Double needle felled seam construction", "Reinforced shank button closure"],
      },
    ],
  },
  "mens-sweat-top-hoodies": {
    slug: "mens-sweat-top-hoodies",
    title: "Men's Sweat Top & Hoodies",
    division: "Garments",
    demographic: "Men",
    description: "Premium French terry, brushback fleece, oversized cuts, and custom graphic wash hoodies for global private labels.",
    items: [
      {
        id: "mg-25726-01",
        modelNo: "Model No.MG-25726-01",
        title: "Heavyweight 450GSM Fleece Pullover",
        description: "Double-layered hood, kangaroo pocket, drop shoulder luxury drape.",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
        moq: "500 pcs",
        leadTime: "30-40 days",
        specs: ["100% combed cotton 450GSM fleece", "Pre-shrunk double-rib knit trim", "Preshrunk silicone enzyme wash", "Custom dyed-to-match drawcords"],
      },
      {
        id: "mg-25726-02",
        modelNo: "Model No.MG-25726-02",
        title: "Full-Zip Athletic French Terry Hoodie",
        description: "Moisture-wicking loops interior, matte hardware, clean athletic cut.",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
        moq: "600 pcs",
        leadTime: "30-40 days",
        specs: ["360GSM French terry weave", "Concealed SBS double-pull zipper", "Ergonomic raglan sleeves", "Media pocket with cord exit"],
      },
      {
        id: "mg-25726-03",
        modelNo: "Model No.MG-25726-03",
        title: "Vintage Acid Wash Crewneck Sweat Top",
        description: "Distressed ribbed neck, pigment dyed finish with soft brushed interior.",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
        moq: "500 pcs",
        leadTime: "35-45 days",
        specs: ["400GSM loopback cotton", "Garment mineral dye treatment", "Flatlock reinforced stitching", "Custom neck ribbing"],
      },
    ],
  },
  "mens-shirts": {
    slug: "mens-shirts",
    title: "Men's Shirts",
    division: "Garments",
    demographic: "Men",
    description: "Oxford button-downs, formal dress shirts, garment-dyed linen weaves, and casual yarn-dyed checks.",
    items: [
      {
        id: "mg-25727-01",
        modelNo: "Model No.MG-25727-01",
        title: "Executive Pinpoint Oxford Shirt",
        description: "100% Egyptian Giza 80s 2-ply cotton, wrinkle-free non-iron finish.",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
        moq: "600 pcs",
        leadTime: "30-40 days",
        specs: ["100% long-staple cotton", "Removable collar stays", "Mother-of-pearl buttons", "Single needle tailored side seams"],
      },
      {
        id: "mg-25727-02",
        modelNo: "Model No.MG-25727-02",
        title: "Pure French Flax Linen Casual Shirt",
        description: "Breathable airy weave, camp collar silhouette, garment pre-softened.",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
        moq: "500 pcs",
        leadTime: "35-45 days",
        specs: ["100% certified European linen", "Natural coconut shell buttons", "Curved shirt-tail hem", "Pre-washed for non-shrink fit"],
      },
      {
        id: "mg-25727-03",
        modelNo: "Model No.MG-25727-03",
        title: "Yarn-Dyed Buffalo Plaid Flannel",
        description: "Heavy brushed twill, dual flap chest pockets, durable twin needle seams.",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
        moq: "600 pcs",
        leadTime: "35-45 days",
        specs: ["220GSM double brushed cotton", "Matched pattern pocket placement", "Cross-stitched horn buttons", "Box pleat back yoke"],
      },
    ],
  },
  "mens-t-shirts": {
    slug: "mens-t-shirts",
    title: "Men's T-shirts",
    division: "Garments",
    demographic: "Men",
    description: "Ultra-soft Pima cotton basics, oversized streetwear tees, and moisture-management performance tops.",
    items: [
      {
        id: "mg-25728-01",
        modelNo: "Model No.MG-25728-01",
        title: "Heavyweight 280GSM Streetwear Tee",
        description: "Boxy dropped shoulder cut, thick 1.25-inch crew ribbing, zero side seams.",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
        moq: "800 pcs",
        leadTime: "25-35 days",
        specs: ["100% carded ring-spun cotton 280GSM", "Reactive piece dyed for deep black", "Twill tape shoulder-to-shoulder reinforcement", "Pre-shrunk fabric construction"],
      },
      {
        id: "mg-25728-02",
        modelNo: "Model No.MG-25728-02",
        title: "Luxury Peruvian Pima Cotton Slim Tee",
        description: "Silk-like handfeel, natural luster, fine single jersey weave.",
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
        moq: "1,000 pcs",
        leadTime: "25-35 days",
        specs: ["100% long-staple Pima cotton 180GSM", "Mercerized yarn for luster", "Blind stitched sleeves and hem", "OEKO-TEX eco-friendly dyes"],
      },
    ],
  },
  "mens-shorts-lowers": {
    slug: "mens-shorts-lowers",
    title: "Men's Shorts & Lowers",
    division: "Garments",
    demographic: "Men",
    description: "Athletic performance joggers, cargo shorts, French terry sweatpants, and tailored chino shorts.",
    items: [
      {
        id: "mg-25729-01",
        modelNo: "Model No.MG-25729-01",
        title: "Tapered Heavyweight Fleece Joggers",
        description: "Deep zipper pockets, gusseted crotch panel, thick ribbed ankle cuffs.",
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80",
        moq: "600 pcs",
        leadTime: "30-40 days",
        specs: ["420GSM brushback cotton fleece", "YKK reverse coil pocket zips", "Flat drawstring with dipped silicone tips", "Reinforced back patch pocket"],
      },
      {
        id: "mg-25729-02",
        modelNo: "Model No.MG-25729-02",
        title: "Ripstop Multi-Pocket Utility Shorts",
        description: "Durable military weave, quick-dry finish, elasticated waistband.",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80",
        moq: "600 pcs",
        leadTime: "30-40 days",
        specs: ["Cotton-nylon ripstop blend", "Snap flap cargo pockets", "Key loop D-ring attachment", "Treated for water and stain repellency"],
      },
    ],
  },
  "mens-jeans-pants": {
    slug: "mens-jeans-pants",
    title: "Men's Jeans & Pants",
    division: "Garments",
    demographic: "Men",
    description: "Raw selvedge denim, stretch slim jeans, tailored stretch chinos, and casual cargo trousers.",
    items: [
      {
        id: "mg-25730-01",
        modelNo: "Model No.MG-25730-01",
        title: "13.5oz Stretch Selvedge Denim Jeans",
        description: "Classic 5-pocket silhouette, Japanese shuttle loom red-line selvedge ID.",
        image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80",
        moq: "500 pcs",
        leadTime: "40-50 days",
        specs: ["99% cotton / 1% elastane selvedge denim", "Genuine debossed leather waistband patch", "Custom engraved copper rivets and donut buttons", "Chain-stitched waistband and hem"],
      },
      {
        id: "mg-25730-02",
        modelNo: "Model No.MG-25730-02",
        title: "Tailored Smart-Stretch Chino Trousers",
        description: "Clean flat-front profile, flex-waistband insert, horn button closure.",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
        moq: "600 pcs",
        leadTime: "35-45 days",
        specs: ["97% combed cotton / 3% spandex 240GSM twill", "Pre-washed for peach-fuzz softness", "Internal piped seams", "Welt back pockets with button tab"],
      },
    ],
  },
  "mens-sports-and-casual": {
    slug: "mens-sports-and-casual",
    title: "Men's Sports & Casual Footwear",
    division: "Footwear",
    demographic: "Men",
    description: "High-performance athletic sneakers, lightweight running shoes, and lifestyle casual footwear engineered for global sports labels.",
    items: [
      {
        id: "mf-28410-01",
        modelNo: "Model No.MF-28410-01",
        title: "Aero-Run X2 Performance Sneaker",
        description: "Breathable engineered mesh upper, dual-density responsive cushioning.",
        image: "/products/mens-sports-casual-01.jpg",
        moq: "500 pairs",
        leadTime: "40-50 days",
        specs: ["High-rebound EVA midsole with TPU arch bridge", "High-abrasion carbon rubber outsole", "Ergonomic molded memory foam sockliner", "Reflective safety accents for low-light visibility"],
      },
      {
        id: "mf-28410-02",
        modelNo: "Model No.MF-28410-02",
        title: "Retro Low-Top Lifestyle Sneaker",
        description: "Supple nappa leather with contrast heel tab and vulcanized rubber sole.",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        moq: "500 pairs",
        leadTime: "35-45 days",
        specs: ["Full-grain Italian calf leather", "Stitched cupsole construction for longevity", "Padded collar and tongue for comfort", "Antimicrobial leather-lined interior"],
      },
    ],
  },
  "mens-slippers-and-sandals": {
    slug: "mens-slippers-and-sandals",
    title: "Men's Slippers & Sandals",
    division: "Footwear",
    demographic: "Men",
    description: "Ergonomic leather slides, contoured cork sandals, and indoor/outdoor comfort footwear.",
    items: [
      {
        id: "mf-28420-01",
        modelNo: "Model No.MF-28420-01",
        title: "Comfort Dual-Strap Leather Slide",
        description: "Anatomical contoured footbed, adjustable double brass pin buckles.",
        image: "/products/mens-slippers-sandals-01.jpg",
        moq: "600 pairs",
        leadTime: "30-40 days",
        specs: ["Natural cork-latex anatomical footbed", "Oiled genuine nubuck leather upper straps", "Shock-absorbing EVA lightweight traction outsole", "Soft suede footbed lining"],
      },
      {
        id: "mf-28420-02",
        modelNo: "Model No.MF-28420-02",
        title: "Executive Closed-Toe Leather Mule",
        description: "Soft memory foam padded insole, non-slip textured outsole.",
        image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80",
        moq: "500 pairs",
        leadTime: "35-45 days",
        specs: ["Supple pull-up leather upper", "Hand-stitched perimeter welt", "High-density comfort foam cushioning", "Flexible rubber indoor/outdoor sole"],
      },
    ],
  },
  "mens-office-shoes": {
    slug: "mens-office-shoes",
    title: "Men's Office Shoes",
    division: "Footwear",
    demographic: "Men",
    description: "Handcrafted leather oxfords, derby dress shoes, and professional formal footwear built with traditional craftsmanship.",
    items: [
      {
        id: "mf-28430-01",
        modelNo: "Model No.MF-28430-01",
        title: "The Chelsea Cap-Toe Oxford Shoe",
        description: "Hand-burnished Italian calfskin, Goodyear welted dress profile.",
        image: "/products/mens-office-shoes-01.jpg",
        moq: "400 pairs",
        leadTime: "40-50 days",
        specs: ["Full-grain Italian vegetable-tanned calfskin", "Traditional 360-degree Goodyear welt construction", "Stacked leather heel with protective rubber dovetail", "Breathable calfskin full interior lining"],
      },
      {
        id: "mf-28430-02",
        modelNo: "Model No.MF-28430-02",
        title: "Executive Wingtip Brogue Derby",
        description: "Full-grain leather with precision perforations and leather stacked heel.",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
        moq: "500 pairs",
        leadTime: "40-50 days",
        specs: ["Classic wingtip brogue detailing", "Double leather sole with channeled stitching", "Hand-waxed finish for deep patina", "Reinforced heel counter and steel shank support"],
      },
    ],
  },
};

export function getCatalogBySlug(slug: string): CategoryCatalog {
  const found = productCatalogs[slug];
  if (found) return found;

  // Fallback generation for any other garment or footwear slug
  const readableTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    slug,
    title: readableTitle,
    division: slug.includes("footwear") || slug.includes("shoe") || slug.includes("sneaker") ? "Footwear" : "Garments",
    demographic: slug.includes("women") ? "Women" : slug.includes("kids") || slug.includes("children") ? "Kids" : "Men",
    description: `Full bespoke OEM/ODM production, fabric sourcing, and custom packaging for ${readableTitle}.`,
    items: [
      {
        id: `${slug}-01`,
        modelNo: `Model No.MG-${slug.slice(0, 3).toUpperCase()}-01`,
        title: `${readableTitle} Signature Edition`,
        description: "Premium materials, modern export fit, high durability finish.",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        moq: "500 pcs",
        leadTime: "35-45 days",
        specs: ["BSCI & ISO 9001 certified manufacture", "Custom labeling and barcode packaging", "Custom laboratory lab-dip color matching"],
      },
      {
        id: `${slug}-02`,
        modelNo: `Model No.MG-${slug.slice(0, 3).toUpperCase()}-02`,
        title: `${readableTitle} Casual Line`,
        description: "Classic styling for everyday international commercial retail.",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        moq: "600 pcs",
        leadTime: "30-40 days",
        specs: ["Pre-shrunk high colorfastness fabric", "Reinforced stress-point stitching", "Direct export ocean and air freight logistics"],
      },
    ],
  };
}

export function getProductById(slug: string, productId: string): { product: ProductItem; catalog: CategoryCatalog } | null {
  const catalog = getCatalogBySlug(slug);
  const found = catalog.items.find((i) => i.id.toLowerCase() === productId.toLowerCase());
  if (found) {
    return { product: found, catalog };
  }
  if (catalog.items.length > 0) {
    return { product: catalog.items[0], catalog };
  }
  return null;
}

export function categoryToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
