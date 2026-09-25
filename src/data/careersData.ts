export interface JobOpening {
  id: string;
  department: string;
  title: string;
  location: string;
  type: string;
  shortDesc: string;
  responsibilities: string[];
  requirements: string[];
  badgeColor?: string;
}

export const jobOpenings: JobOpening[] = [
  {
    id: "merchandising-lead",
    department: "Merchandising",
    title: "Senior Garment & Footwear Merchandiser",
    location: "Shishi City, Fujian / Hong Kong",
    type: "Full-Time",
    shortDesc: "Lead buyer account merchandising, raw material sourcing, critical path management, and sample development for North American and European fashion retail clients.",
    responsibilities: [
      "Manage end-to-end critical path timelines from tech pack handover to FOB port dispatch.",
      "Liaise directly with client buying teams in the USA, UK, and Europe on lab-dips, trims, and strike-offs.",
      "Coordinate with knitting, weaving, and dyeing mills in Fujian and Guangdong for on-time fabric approvals.",
      "Conduct pre-production meetings with factory floor managers to guarantee AQL 1.0 standard compliance.",
    ],
    requirements: [
      "Bachelor's degree in Textile Engineering, Fashion Merchandising, or International Business.",
      "Fluent English communication skills (written and spoken) for international client correspondence.",
      "Deep understanding of fabric specifications (GSM, yarn counts, shrinkage, colorfastness).",
      "Proficiency in ERP / PLM garment management systems and Excel cost sheets.",
    ],
  },
  {
    id: "design-product-development",
    department: "Design & Product Development",
    title: "Apparel & Footwear Product Designer (CAD)",
    location: "Shishi Creative Design Studio",
    type: "Full-Time",
    shortDesc: "Translate international runway trends and client briefs into production-ready tech packs, 3D garment visualizations, and seasonal capsule collections.",
    responsibilities: [
      "Create detailed digital tech packs including bill of materials (BOM), measurement charts, and stitch callouts.",
      "Develop innovative outerwear, hoodie, denim, and sneaker designs using Adobe Illustrator and CLO 3D.",
      "Collaborate with sample pattern-makers to refine fit prototypes and ergonomics.",
      "Research emerging eco-fabrics, recycled polyesters, and sustainable trim innovations.",
    ],
    requirements: [
      "Degree in Fashion Design, Industrial Design, or Footwear Technology.",
      "Expertise in Adobe Creative Suite (Illustrator, Photoshop) and 3D CAD garment software.",
      "Strong understanding of garment construction, grading rules, and footwear sole molding.",
      "Creative portfolio showcasing modern streetwear, outerwear, or commercial footwear lines.",
    ],
  },
  {
    id: "quality-control-inspector",
    department: "Quality Control",
    title: "Senior QA / Quality Control Inspector (AQL 1.0 / 2.5)",
    location: "Fujian Manufacturing Facilities",
    type: "Full-Time",
    shortDesc: "Oversee raw material testing, inline sewing audits, and final pre-shipment random inspections across our garment and footwear assembly lines.",
    responsibilities: [
      "Execute rigorous inline and final pre-shipment inspections following AQL 1.0/2.5 international standards.",
      "Test colorfastness to light and laundering, tensile fabric pull strengths, and seam tolerances.",
      "Audit 100% metal and broken needle detection protocols before packaging.",
      "Generate detailed photographic inspection reports for global brand quality audit portals.",
    ],
    requirements: [
      "Proven quality control inspection background in export apparel or footwear manufacturing.",
      "Familiarity with BSCI, OEKO-TEX 100, and ISO 9001 factory compliance frameworks.",
      "Meticulous eye for sewing defects, fabric shading, needle holes, and measurement variances.",
      "Ability to travel between local factory campuses in Shishi, Jinjiang, and Quanzhou.",
    ],
  },
  {
    id: "production-management",
    department: "Production Management",
    title: "Garment & Footwear Production Floor Supervisor",
    location: "Shishi Manufacturing Hub",
    type: "Full-Time",
    shortDesc: "Drive factory floor efficiency, automated line balancing, capacity scheduling, and on-time shipment fulfillment across multiple client accounts.",
    responsibilities: [
      "Plan and optimize daily line output across automated cutting, sewing, and footwear assembly lines.",
      "Coordinate with warehouse and purchasing teams to verify all fabrics and trims arrive prior to cutting.",
      "Implement lean manufacturing techniques to reduce waste and eliminate production bottlenecks.",
      "Enforce workplace occupational safety, clean-factory standards, and equipment maintenance.",
    ],
    requirements: [
      "Demonstrated track record supervising large-scale textile or shoe assembly facilities.",
      "Strong leadership and cross-functional team coordination capabilities.",
      "Expert knowledge of automated cutting machines, flatlock stitching, and sole vulcanization lines.",
      "Ability to handle peak seasonal delivery schedules while maintaining zero defect targets.",
    ],
  },
  {
    id: "sales-marketing",
    department: "Sales & Marketing",
    title: "International B2B Key Account Executive",
    location: "Hong Kong / Remote (US / Europe Desk)",
    type: "Full-Time",
    shortDesc: "Expand Maya Exports' global retail partnerships, pitch private-label programs to major department stores, and lead international trade fair delegations.",
    responsibilities: [
      "Build relationships with apparel sourcing directors, brand founders, and procurement heads worldwide.",
      "Represent Maya Exports at international trade fairs: Canton Fair, MAGIC Las Vegas, and Première Vision Paris.",
      "Prepare bespoke client presentations, sample swatch kits, and competitive FOB/CIF quotations.",
      "Negotiate annual supply agreements and long-term production contracts.",
    ],
    requirements: [
      "Proven B2B sales success in international apparel, footwear, or textile contract manufacturing.",
      "Established network among North American, European, or Middle Eastern fashion retailers.",
      "Outstanding presentation and contractual negotiation skills.",
      "Willingness to travel internationally for client meetings and trade expos.",
    ],
  },
  {
    id: "logistics-supply-chain",
    department: "Logistics & Supply Chain",
    title: "Global Export & Ocean Freight Logistics Specialist",
    location: "Shishi Logistics Center / Xiamen Port",
    type: "Full-Time",
    shortDesc: "Coordinate container stuffing, customs clearance, sea/air bookings, and international shipping documentation for worldwide port deliveries.",
    responsibilities: [
      "Book ocean freight containers (FCL/LCL) and air cargo with international freight forwarders.",
      "Prepare complete export documentation: Commercial Invoices, Packing Lists, Bills of Lading (B/L), and Certificates of Origin.",
      "Coordinate customs clearance and bonded container transit through Xiamen, Shenzhen, and Hong Kong ports.",
      "Track global shipments in transit and provide milestone updates to international client logistics desks.",
    ],
    requirements: [
      "Degree in Logistics, Supply Chain Management, or International Shipping.",
      "Deep understanding of Incoterms 2020 (FOB, CIF, DDP) and international customs regulations.",
      "Experience working with major shipping lines (Maersk, MSC, COSCO, ONE).",
      "High attention to detail in shipping mark verification and carton packing matrices.",
    ],
  },
  {
    id: "graphic-designer-photographer",
    department: "Graphic Designer / Photographer",
    title: "Commercial Fashion Photographer & Visual Designer",
    location: "Shishi Creative Photo Studio",
    type: "Full-Time",
    shortDesc: "Produce multi-angle studio product photography, ghost mannequin shots, fashion lookbooks, and marketing visuals for international client catalogs.",
    responsibilities: [
      "Photograph seasonal garments, jackets, and footwear prototypes in our professional in-house cyclorama studio.",
      "Perform color-accurate retouching, ghost mannequin composite clipping, and texture enhancement in Photoshop.",
      "Design digital lookbooks, line sheets, and brand presentation decks for international sales meetings.",
      "Create high-impact social media assets and trade show booth graphics.",
    ],
    requirements: [
      "Proficient in studio strobe lighting, DSLR/mirrorless camera systems, and Capture One / Lightroom.",
      "Advanced Photoshop retouching skills with an eye for fabric texture, drape, and color accuracy.",
      "Strong visual aesthetic aligned with modern global streetwear and contemporary fashion brands.",
      "Portfolio of commercial fashion, ghost mannequin, or footwear product photography.",
    ],
  },
  {
    id: "product-modeling",
    department: "Product Modeling",
    title: "Apparel Fit Model & Catalog Showcase Specialist",
    location: "Shishi Creative Studio",
    type: "Full-Time / Part-Time",
    shortDesc: "Collaborate with pattern-makers and designers during fitting sessions to evaluate comfort, garment drape, and pose for official studio lookbooks.",
    responsibilities: [
      "Participate in live pattern fitting sessions with technical designers and master tailors.",
      "Provide constructive feedback on garment ease, mobility, armhole comfort, and fabric handfeel.",
      "Model seasonal jacket, hoodie, shirt, and footwear collections for e-commerce and wholesale buyer line sheets.",
      "Maintain consistent body measurement specs to ensure reliable sizing standards across collections.",
    ],
    requirements: [
      "Previous experience as a fit model or commercial fashion showcase model.",
      "Professional demeanor, punctuality, and ability to hold poses during garment pin-adjustments.",
      "Standard international commercial sizing (sample size M for Men or S/M for Women).",
      "Comfortable in front of studio lighting and camera setups.",
    ],
  },
];

export const culturePillars = [
  {
    title: "Global Fashion Impact",
    desc: "Collaborate directly with renowned retail brands across the United States, Europe, China, and the Middle East.",
    icon: "Globe2",
  },
  {
    title: "State-of-the-Art Infrastructure",
    desc: "Work alongside advanced automated CAD grading, laser-cutting technology, and modern photo studios.",
    icon: "Building2",
  },
  {
    title: "Rapid Career Progression",
    desc: "Promotions and leadership opportunities based on innovation, merit, and dedication — not just seniority.",
    icon: "TrendingUp",
  },
  {
    title: "Collaborative Family Culture",
    desc: "We prioritize a supportive, inclusive, and communicative environment where every team member has a voice.",
    icon: "HeartHandshake",
  },
];
