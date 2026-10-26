import type { CatalogCategory } from "./types";


export type HeaderMenuNode = {
  name: string;
  slug: string;
  hasSubmenu: boolean;
  extra?: boolean;
  children: HeaderMenuNode[];
};

export function categoryToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const garmentItems = {
  Men: [
    "Men's Jackets",
    "Men's Sweat Top & Hoodies",
    "Men's Shirts",
    "Men's T-shirts",
    "Men's Shorts & Lowers",
    "Men's Jeans & Pants",
  ],
  Women: [
    "Women's Jackets & Blazers",
    "Women's Sweat Tops & Hoodies",
    "Women's Blouses & Shirts",
    "Women's T-shirts & Tops",
    "Women's Skirts & Shorts",
    "Women's Jeans & Trousers",
  ],
  Children: [
    "Children's Jackets & Outerwear",
    "Children's Hoodies & Sweat Tops",
    "Children's School Shirts",
    "Children's Graphic T-shirts",
    "Children's Shorts & Pants",
  ],
  Kids: [
    "Kids Outerwear & Rompers",
    "Kids Cotton T-shirts & Bodysuits",
    "Kids Sweatshirts & Sets",
    "Kids Soft Joggers & Leggings",
  ],
};

const footwearItems = ["Sports & Casual", "Slippers & Sandals", "Office Shoes"];
const footwearGroups = ["Men", "Women", "Children", "Kids"];

function leaf(name: string, slug?: string): HeaderMenuNode {
  return {
    name,
    slug: slug || categoryToSlug(name),
    hasSubmenu: false,
    children: [],
  };
}

function branch(name: string, slug: string, children: HeaderMenuNode[]): HeaderMenuNode {
  return {
    name,
    slug,
    hasSubmenu: children.length > 0,
    children,
  };
}

export const FIXED_PRODUCT_MENU: HeaderMenuNode[] = [
  branch(
    "Garments",
    "garments",
    Object.entries(garmentItems).map(([group, items]) =>
      branch(
        group,
        categoryToSlug(`garments ${group}`),
        items.map((item) => leaf(item))
      )
    )
  ),
  branch(
    "Footwear",
    "footwear",
    footwearGroups.map((group) =>
      branch(
        group,
        categoryToSlug(`footwear ${group}`),
        footwearItems.map((item) =>
          leaf(item, categoryToSlug(`${group === "Men" ? "mens" : group.toLowerCase()} ${item}`))
        )
      )
    )
  ),
  leaf("Home Textiles", "home-textiles"),
  leaf("Fabrics", "fabrics"),
  leaf("Electronics & Appliances", "electronics-and-appliances"),
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sameCategory(a: { name: string; slug: string }, b: { name: string; slug: string }): boolean {
  return a.slug === b.slug || normalize(a.name) === normalize(b.name);
}

function fromBackend(category: CatalogCategory, extra = true): HeaderMenuNode {
  return {
    name: category.name,
    slug: category.slug,
    hasSubmenu: category.children.length > 0,
    extra,
    children: category.children.map((child) => fromBackend(child, true)),
  };
}

function mergeLevel(fixed: HeaderMenuNode[], live: CatalogCategory[] = []): HeaderMenuNode[] {
  const merged = fixed.map((item) => {
    const match = live.find((candidate) => sameCategory(candidate, item));
    const children = mergeLevel(item.children, match?.children || []);
    return {
      ...item,
      slug: match?.slug || item.slug,
      children,
      hasSubmenu: children.length > 0,
    };
  });

  const extras = live
    .filter((candidate) => !fixed.some((item) => sameCategory(item, candidate)))
    .map((category) => fromBackend(category, true));

  return [...merged, ...extras];
}

export function mergeHeaderMenu(liveTree: CatalogCategory[]): HeaderMenuNode[] {
  return mergeLevel(FIXED_PRODUCT_MENU, liveTree);
}

export function findFixedMenuBySlug(
  slug: string,
  nodes: HeaderMenuNode[] = FIXED_PRODUCT_MENU
): HeaderMenuNode | null {
  const stack = [...nodes];
  while (stack.length > 0) {
    const node = stack.shift();
    if (!node) continue;
    if (node.slug === slug) return node;
    stack.push(...node.children);
  }
  return null;
}

export function findFixedSiblings(slug: string): HeaderMenuNode[] {
  const visit = (nodes: HeaderMenuNode[]): HeaderMenuNode[] | null => {
    if (nodes.some((node) => node.slug === slug)) return nodes;
    for (const node of nodes) {
      const found = visit(node.children);
      if (found) return found;
    }
    return null;
  };
  return visit(FIXED_PRODUCT_MENU) || [];
}

export function toCatalogCategory(node: HeaderMenuNode): CatalogCategory {
  return {
    id: node.slug,
    name: node.name,
    slug: node.slug,
    description: "",
    parentId: null,
    path: node.name,
    depth: 0,
    productCount: 0,
    childCount: node.children.length,
    children: node.children.map(toCatalogCategory),
  };
}
