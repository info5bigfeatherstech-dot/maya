import type { Category } from "./types";

export function flattenCategories(categories: Category[], prefix = ""): Category[] {
  const rows: Category[] = [];

  for (const category of categories) {
    const path = prefix ? `${prefix} / ${category.name}` : category.path || category.name;
    const current = { ...category, path };
    rows.push(current);
    if (category.children?.length) {
      rows.push(...flattenCategories(category.children, path));
    }
  }

  return rows;
}

export function collectDescendantIds(category: Category): string[] {
  const ids: string[] = [];
  const stack = [...(category.children || [])];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    ids.push(current.id);
    stack.push(...(current.children || []));
  }
  return ids;
}
