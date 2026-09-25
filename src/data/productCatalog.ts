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
  "home-textiles": {
    slug: "home-textiles",
    title: "Home Textiles",
    division: "Home Textiles",
    demographic: "Commercial & Retail",
    description: "Export-grade 400-1000TC luxury sateen bedding, zero-twist plush Turkish towels, and certified thermal blackout drapery for international hospitality and enterprise home retail.",
    items: [
      {
        id: "ht-49210-01",
        modelNo: "Model No.HT-49210-01",
        title: "1000TC Royal Sateen Egyptian Cotton Bedding Set",
        description: "Ultra-silky long-staple Egyptian cotton sateen sheets, duvet covers & oxford pillow shams.",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=85",
        gallery: [
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85",
        ],
        moq: "500 sets",
        leadTime: "30-40 days",
        fabricComposition: "100% Giza Long-Staple Combed Cotton (1000 Thread Count Sateen)",
        sizing: "Twin, Full, Queen, King, Cal-King, Euro Single / Double",
        colorways: ["Pure Hotel White", "Champagne Ivory", "Slate Mineral Grey", "Deep Navy", "Sage Olive"],
        specs: [
          "1000 Thread count high-density sateen weave with lustrous sheen",
          "Mercerized yarn for enhanced tensile strength and zero pilling",
          "Precision 5mm cord embroidery or hemstitch border details",
          "OEKO-TEX Standard 100 Class I & GOTS certified organic options",
          "Commercial laundry resistant (tested for 150+ industrial wash cycles)",
          "Custom brand embroidered packaging, ribbon bands, and barcode tags",
        ],
        features: [
          "Silky smooth hand feel with natural temperature-regulating breathability",
          "Deep 40cm elasticated pocket fits modern pillow-top hotel mattresses",
          "Concealed button closure on duvet cover with internal corner tie anchors",
          "Pre-shrunk sanforized finishing with dimensional stability < 2%",
        ],
      },
      {
        id: "ht-49210-02",
        modelNo: "Model No.HT-49210-02",
        title: "650GSM Zero-Twist Turkish Bath & Spa Towel Collection",
        description: "Ultra-plush, highly absorbent Turkish combed Aegean cotton bath sheets, hand towels, and washcloths.",
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=85",
        gallery: [
          "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=85",
        ],
        moq: "1,000 pcs / size",
        leadTime: "25-35 days",
        fabricComposition: "100% Aegean Long-Staple Combed Cotton (Zero-Twist 650 GSM)",
        sizing: "Bath Sheet (100x150cm), Bath Towel (70x140cm), Hand Towel (50x90cm), Washcloth (33x33cm)",
        colorways: ["Crisp White", "Charcoal Graphite", "Warm Taupe", "Ocean Teal", "Blush Sand"],
        specs: [
          "Zero-twist loop technology absorbs 4x its weight in water within 3 seconds",
          "Double-stitched reinforced side hems preventing unraveling",
          "Reactive dye formulations with colorfastness Grade 4-5 to chlorine & laundering",
          "Hypoallergenic, chemical-free finishing certified by OEKO-TEX",
          "Custom woven dobby border or engraved jacquard corporate logo",
        ],
        features: [
          "Cloud-like plushness that gets softer after every wash",
          "Fast-drying aerated fiber structure preventing mildew odor",
          "Tailored woven loop hanger for luxury hospitality fixtures",
        ],
      },
      {
        id: "ht-49210-03",
        modelNo: "Model No.HT-49210-03",
        title: "Thermal Blackout Linen-Texture Jacquard Drapery",
        description: "3-Pass 100% light-blocking insulated drapery panels engineered for high-end boutique hospitality and modern residential interiors.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85",
        gallery: [
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85",
        ],
        moq: "600 pairs",
        leadTime: "35-45 days",
        fabricComposition: "100% Slub-Textured Polyester Face with 3-Pass Acrylic Foam Backing",
        sizing: "52\"x84\", 52\"x96\", 52\"x108\", Custom Hotel Ceiling Drops up to 320cm",
        colorways: ["Oatmeal Natural Linen", "Smoky Pearl Grey", "Dark Espresso", "Midnight Navy"],
        specs: [
          "Certified 100% total room blackout (0 Lux light transmittance)",
          "Sound-dampening acoustic barrier reduces ambient noise by up to 18dB",
          "Thermal insulating core reduces heating and cooling loss by up to 25%",
          "Heavyweight 340GSM fabric weight with graceful weighted bottom corners",
          "Choice of stainless steel grommet eyelets, pinch pleat, or rod pocket header",
        ],
        features: [
          "Sophisticated slubbed faux-linen texture with rich depth and matte finish",
          "Formaldehyde-free, odorless non-toxic acrylic barrier backing",
          "Passes NFPA 701 and BS 5867 fire-retardant standards on request",
        ],
      },
    ],
  },
  "fabrics": {
    slug: "fabrics",
    title: "Fabrics & Raw Textiles",
    division: "Fabrics",
    demographic: "Industrial Mill Sourcing",
    description: "Certified sustainable raw textiles, organic GOTS knits, authentic vintage selvage denim, and high-performance weather-barrier functional shell fabrics.",
    items: [
      {
        id: "fb-68190-01",
        modelNo: "Model No.FB-68190-01",
        title: "Organic GOTS Combed Ring-Spun Cotton Jersey",
        description: "Premium circular knitted single jersey with compact spinning and enzyme biopolish for designer apparel.",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
        gallery: [
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=85",
        ],
        moq: "1,000 meters / color",
        leadTime: "20-30 days",
        fabricComposition: "100% Organic Combed Ring-Spun Cotton (Optional 95/5 Cotton/Elastane)",
        sizing: "Full Roll Width 185cm (Open Width / Tubular available)",
        colorways: ["Custom Pantone TPX / TCX Lab Dip Matching (Delta E < 0.8)"],
        specs: [
          "32s/1, 26s/1 or 20s/1 combed compact yarn count (180 - 260 GSM)",
          "Ultra-clean bio-polishing enzyme wash eliminates surface fuzz and pilling",
          "Zero shrinkage treatment (< 3% dimensional stability warp & weft)",
          "GOTS (Global Organic Textile Standard) Certified & ZDHC compliant dyes",
          "Colorfastness to washing: Grade 4-5 (ISO 105-C06)",
        ],
        features: [
          "Buttery soft hand feel with clean micro-rib structure",
          "Excellent dye uptake with vibrant color depth",
          "Ideal for high-definition screen printing, direct-to-garment, and embroidery",
        ],
      },
      {
        id: "fb-68190-02",
        modelNo: "Model No.FB-68190-02",
        title: "Heavyweight Ring-Spun Indigo Selvage Denim (13.5 oz)",
        description: "Authentic shuttle-loom woven selvage denim featuring rope-dyed pure indigo warp and vintage red-line ticker.",
        image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=85",
        gallery: [
          "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=85",
        ],
        moq: "1,500 meters",
        leadTime: "30-40 days",
        fabricComposition: "100% Slub Ring-Spun Cotton (Optional 1% Lycra Comfort Stretch)",
        sizing: "Width 31\" / 79cm (Traditional Narrow Shuttle Loom Width)",
        colorways: ["Deep Indigo Raw", "Vintage Green-Cast Indigo", "Sulfur Black", "Double Black"],
        specs: [
          "13.5 oz / sq yard unwashed raw denim weight (14.2 oz post-soak)",
          "12-dip continuous pure indigo rope dyeing process",
          "Distinctive red ID woven edge ticker on vintage shuttle looms",
          "Sanforized raw finish to stabilize warp shrinkage to < 3%",
          "Rich vertical slub texture develops high-contrast fading whiskering and honeycombs",
        ],
        features: [
          "Authentic heritage drape and structural durability",
          "Zero chemical resin coatings preserving pure cotton tactile grain",
          "Meets strict international AQL 1.0 fabric inspection standards",
        ],
      },
      {
        id: "fb-68190-03",
        modelNo: "Model No.FB-68190-03",
        title: "Recycled Poly-Spandex DWR 4-Way Technical Stretch Shell",
        description: "Fluorocarbon-free water repellent 4-way stretch performance fabric engineered for technical outerwear and activewear.",
        image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=85",
        gallery: [
          "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85",
        ],
        moq: "1,200 meters",
        leadTime: "25-35 days",
        fabricComposition: "88% Post-Consumer Recycled Polyester (GRS Certified), 12% Spandex",
        sizing: "Cuttable Width 148cm (58\")",
        colorways: ["Matte Black", "Granite Charcoal", "Alpine Olive", "Glacier Blue", "Safety Orange"],
        specs: [
          "210GSM weight with balanced multi-directional elasticity",
          "Hydrophobic C0 Eco-DWR surface finish (Rain Test AATCC 35 compliant)",
          "Breathability MVTR rating > 10,000 g/m²/24hr",
          "Hydrostatic Head waterproof resistance > 15,000mm with bonded membrane backing",
          "High abrasion resistance (> 45,000 Martindale rubs)",
        ],
        features: [
          "Silent, low-noise movement with zero swish sounds",
          "Quick-drying and wind-resistant outer face",
          "Certified Global Recycled Standard (GRS) traceable chain of custody",
        ],
      },
    ],
  },
  "electronics-and-appliances": {
    slug: "electronics-and-appliances",
    title: "Electronics & Appliances",
    division: "Electronics & Appliances",
    demographic: "OEM/ODM Hardware",
    description: "Precision-engineered consumer electronics, smart kitchen appliances, personal care devices, and turnkey OEM/ODM hardware certified for CE, RoHS, FCC, and global markets.",
    items: [
      {
        id: "ea-81320-01",
        modelNo: "Model No.EA-81320-01",
        title: "Smart 8.5L Dual-Zone Digital Air Fryer (WiFi & App)",
        description: "High-capacity dual-basket convection air fryer with sync-cook technology and 12 digital preset cooking programs.",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85",
        gallery: [
          "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=85",
        ],
        moq: "500 units",
        leadTime: "35-45 days",
        fabricComposition: "BPA-Free Food Grade Housing, Stainless Steel Trim & Ceramic Non-Stick Baskets",
        sizing: "420mm x 380mm x 320mm / 8.5L Net Capacity (Dual 4.25L Baskets)",
        colorways: ["Matte Midnight Black / Rose Gold", "Stainless Steel / Black", "Nordic White / Silver"],
        specs: [
          "1800W High-efficiency rapid 360° cyclonic turbo fan heating system (80°C - 200°C)",
          "Dual independent cooking zones with smart MatchCook and SyncFinish functions",
          "Touch capacitive LED glass digital control panel with audible timer",
          "Food-grade non-toxic ceramic coating free from PTFE, PFOA, lead & cadmium",
          "Certified: CE, GS, CB, ETL/UL, RoHS, FDA, LFGB, REACH compliant",
          "Turnkey customized retail gift box, multilingual user manual, and bespoke recipe book",
        ],
        features: [
          "Cuts oil usage by up to 90% compared to traditional deep frying",
          "Dishwasher-safe removable crisper plates and non-stick basket drawers",
          "Auto-shutoff safety sensor with overheat thermal cutoff fuse",
        ],
      },
      {
        id: "ea-81320-02",
        modelNo: "Model No.EA-81320-02",
        title: "110,000 RPM Brushless High-Speed Ionic Hair Dryer",
        description: "Salon-grade ultra-lightweight high-velocity hair dryer with 200 million negative ion technology and smart NTC thermal monitoring.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
        gallery: [
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1000&q=85",
        ],
        moq: "1,000 units",
        leadTime: "30-40 days",
        fabricComposition: "High-Strength Thermal Resistant Polycarbonate & Aluminum Alloy",
        sizing: "275mm x 90mm x 72mm (Ultra-light 395g Net Weight)",
        colorways: ["Space Grey Metallic", "Champagne Gold", "Pearl White", "Moroccan Indigo"],
        specs: [
          "110,000 RPM proprietary 3-phase brushless DC motor delivering 21 m/s air velocity",
          "200,000,000 negative ions/cm³ for instant frizz elimination and silky shine",
          "NTC smart temperature sensor samples temperature 100 times/sec to prevent hair damage",
          "4 heat settings (Cold, Warm, Hot, Cycle) and 2 speed levels with LED ring indicator",
          "Low noise operation (< 59dB at maximum airflow)",
          "Certified: CE, CB, FCC, PSE, KC, RoHS, ERP compliant",
        ],
        features: [
          "Dries medium hair in 2-3 minutes without heat damage",
          "Includes 360° magnetic styling concentrator nozzle and magnetic diffuser",
          "Reverse airflow self-cleaning cycle for lint filter maintenance",
        ],
      },
      {
        id: "ea-81320-03",
        modelNo: "Model No.EA-81320-03",
        title: "Smart LiDAR Laser Navigation Robotic Vacuum & Mop",
        description: "High-precision LiDAR SLAM robotic vacuum with 5000Pa extreme suction, electronic oscillating water tank, and multi-floor 3D mapping.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
        gallery: [
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
          "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=85",
        ],
        moq: "300 units",
        leadTime: "40-50 days",
        fabricComposition: "ABS Engineering Plastic, Tempered Glass Top Plate & Rubber Bumpers",
        sizing: "350mm Diameter x 98mm Height (Ultra-slim clearance)",
        colorways: ["Piano Gloss Black", "Ceramic White / Silver"],
        specs: [
          "5000Pa heavy-duty brushless suction motor with 4 adjustable power modes",
          "360° LDS LiDAR scanner with 8-meter scanning radius and millimeter obstacle detection",
          "5200mAh high-capacity LG lithium battery delivering up to 180 mins continuous runtime",
          "2-in-1 450ml dustbin and 300ml electronically controlled 3-stage water tank",
          "WiFi 2.4GHz + Bluetooth connectivity; works with Alexa, Google Home, and iOS/Android app",
          "Certified: CE, RoHS, FCC, CB, UN38.3, MSDS for global export shipping",
        ],
        features: [
          "Multi-floor mapping with virtual no-go zones, selective room cleaning & spot cleaning",
          "Automatic carpet boost sensor dynamically increases suction over rugs",
          "Smart auto-return to charging base with resume-clean memory",
        ],
      },
    ],
  },
};

// Alias electronics to electronics-and-appliances
productCatalogs["electronics"] = productCatalogs["electronics-and-appliances"];

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
