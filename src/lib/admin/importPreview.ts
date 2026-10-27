export type ImportPreviewRow = {
  row: number;
  productCode: string;
  name: string;
  title: string;
  categoryPath: string;
  attributes: string;
};

function parseCsv(text: string): string[][] {
  const source = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const rows: string[][] = [];
  let row: string[] = [];
  let current = "";
  let inQuotes = false;

  const pushRow = () => {
    if (row.some((cell) => cell.trim()) || current.trim()) {
      row.push(current);
      rows.push(row);
    }
    row = [];
    current = "";
  };

  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '"') {
      if (inQuotes && source[i + 1] === '"') {
        current += '"';
        i += 1;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }
    if (ch === "\n" && !inQuotes) {
      pushRow();
      continue;
    }
    current += ch;
  }

  if (current.length || row.length) {
    row.push(current);
    if (row.some((cell) => cell.trim())) rows.push(row);
  }

  return rows;
}

function headerKey(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export async function previewSpreadsheet(file: File): Promise<{ rows: ImportPreviewRow[]; error?: string }> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".xlsx")) {
    return { rows: [], error: "Excel preview is shown after import. CSV files preview here immediately." };
  }
  if (!name.endsWith(".csv")) {
    return { rows: [], error: "Choose a .csv or .xlsx file" };
  }

  try {
    const text = await file.text();
    const matrix = parseCsv(text);
    if (!matrix.length) return { rows: [], error: "The spreadsheet is empty" };
    const headers = (matrix[0] || []).map(headerKey);
    const codeIndex = headers.findIndex((item) => item === "productcode");
    if (codeIndex < 0) {
      return { rows: [], error: "The spreadsheet must include a productCode column" };
    }
    const indexOf = (...aliases: string[]) => headers.findIndex((item) => aliases.includes(item));
    const nameIndex = indexOf("name");
    const titleIndex = indexOf("title");
    const categoryIndex = indexOf("categorypath", "category", "websitecategory");
    const attributesIndex = indexOf("attributes", "attrs", "variantattributes");

    const rows: ImportPreviewRow[] = [];
    for (let i = 1; i < matrix.length; i += 1) {
      const line = matrix[i] || [];
      if (!line.some((cell) => cell.trim())) continue;
      rows.push({
        row: i + 1,
        productCode: (line[codeIndex] || "").trim(),
        name: nameIndex >= 0 ? (line[nameIndex] || "").trim() : "",
        title: titleIndex >= 0 ? (line[titleIndex] || "").trim() : "",
        categoryPath: categoryIndex >= 0 ? (line[categoryIndex] || "").trim() : "",
        attributes: attributesIndex >= 0 ? (line[attributesIndex] || "").trim() : "",
      });
    }
    if (!rows.length) return { rows: [], error: "No product rows found" };
    return { rows };
  } catch (error) {
    return { rows: [], error: error instanceof Error ? error.message : "Unable to read the spreadsheet" };
  }
}
